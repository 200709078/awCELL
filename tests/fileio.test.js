import test from "node:test";
import assert from "node:assert/strict";
import IO from "../src/fileio.js";

function cell(value, extra = {}) {
    return {
        value: String(value).startsWith("=") ? "" : value,
        formula: String(value).startsWith("=") ? value : null,
        borders: { top: false, right: false, bottom: false, left: false },
        style: {},
        merge: null,
        mergedTo: null,
        ...extra
    };
}

function sheet(name, rows) {
    const tableData = Array.from({ length: 100 }, (_, r) => Array.from({ length: 26 }, (_, c) => (rows[r]?.[c] ?? cell(""))));
    return {
        name,
        rowCount: 100,
        colCount: 26,
        tableData,
        colWidths: Array(26).fill(84),
        rowHeights: Array(100).fill(26),
        hiddenRows: [],
        hiddenCols: [],
        frozenRows: 1,
        frozenCols: 0
    };
}

const decode = (bytes) => new TextDecoder().decode(bytes);

test("ZIP yazılıp yeniden okunabilir", async () => {
    const zip = IO.createZip([
        { name: "mimetype", data: "application/vnd.oasis.opendocument.spreadsheet" },
        { name: "klasör/içerik.xml", data: "<a>çğış</a>" }
    ]);
    const reader = IO.readZip(zip);
    assert.deepEqual(reader.names, ["mimetype", "klasör/içerik.xml"]);
    assert.equal(await reader.text("klasör/içerik.xml"), "<a>çğış</a>");
    // ODS kuralı: ilk girdi sıkıştırmasız "mimetype", 38. bayttan başlar.
    assert.equal(decode(zip.subarray(30, 38)), "mimetype");
});

test("XLSX: formüller İngilizceye çevrilir, değerler ve biçimler yazılır", async () => {
    const payload = {
        activeSheetIndex: 0,
        sheets: [
            sheet("Notlar", [
                [cell("Ad", { style: { bold: true, backgroundColor: "#fff2cc" } }), cell("Not")],
                [cell("Ayşe"), cell("85")],
                [cell("Ali"), cell("3,5")],
                [cell("Ortalama"), { ...cell("=ORTALAMA(B2:B3)"), value: "44.25" }],
                [cell("Tarih"), cell("10.11.2026")],
                [cell("Kod"), cell("007")]
            ]),
            sheet("Özet", [[{ ...cell("=Notlar!B4*2"), value: "88.5" }]])
        ]
    };
    const reader = IO.readZip(IO.buildXlsx(payload));
    const sheet1 = await reader.text("xl/worksheets/sheet1.xml");
    const sheet2 = await reader.text("xl/worksheets/sheet2.xml");
    const styles = await reader.text("xl/styles.xml");
    assert.match(sheet1, /<f>AVERAGE\(B2:B3\)<\/f><v>44.25<\/v>/);
    assert.match(sheet1, /<c r="B3"[^>]*><v>3.5<\/v><\/c>/);
    assert.match(sheet1, /<c r="B5"[^>]*><v>46336<\/v><\/c>/);
    assert.match(sheet1, /<c r="B6"[^>]*t="inlineStr"><is><t xml:space="preserve">007<\/t>/);
    assert.match(sheet1, /state="frozen"/);
    assert.match(sheet2, /<f>&apos;Notlar&apos;!B4\*2<\/f>/);
    assert.match(styles, /<b\/>/);
    assert.match(styles, /FFFFF2CC/);
});

test("ODS: formüller OpenFormula biçiminde, birleştirme korunur", async () => {
    const merged = cell("Başlık", { merge: { rowspan: 1, colspan: 2 } });
    const covered = cell("", { mergedTo: { row: 0, col: 0 } });
    const payload = {
        sheets: [sheet("S1", [
            [merged, covered],
            [cell("1"), cell("2")],
            [{ ...cell("=TOPLA(A2:B2)"), value: "3" }]
        ])]
    };
    const reader = IO.readZip(IO.buildOds(payload));
    const content = await reader.text("content.xml");
    assert.match(content, /table:number-columns-spanned="2"/);
    assert.match(content, /<table:covered-table-cell\/>/);
    assert.match(content, /table:formula="of:=SUM\(\[\.A2:\.B2\]\)" office:value-type="float" office:value="3"/);
});

test("XLS (2003 XML): formüller R1C1 biçiminde", () => {
    const payload = { sheets: [sheet("S1", [[cell("1"), cell("2"), { ...cell("=A1+B1"), value: "3" }]])] };
    const xml = IO.buildXmlSpreadsheet(payload);
    assert.match(xml, /ss:Formula="=RC\[-2\]\+RC\[-1\]"/);
    assert.match(xml, /<Data ss:Type="Number">3<\/Data>/);
});

test("CSV: Türkçe Excel için ; ayırıcı ve BOM; tırnaklı alanlar geri okunur", () => {
    const payload = sheet("S1", [[cell("Ad"), cell("Açıklama")], [cell("Ayşe"), cell('Bir; "iki"\nüç')]]);
    const csv = IO.buildCsv(payload);
    assert.ok(csv.startsWith("﻿Ad;Açıklama\r\n"));
    const rows = IO.parseDelimited(csv);
    assert.deepEqual(rows, [["Ad", "Açıklama"], ["Ayşe", 'Bir; "iki"\nüç']]);
    assert.deepEqual(IO.parseDelimited("a,b\n1,2"), [["a", "b"], ["1", "2"]]);
    assert.deepEqual(IO.parseDelimited("a\tb\n1\t2"), [["a", "b"], ["1", "2"]]);
});

test("CSV içe aktarım: windows-1254 kodlaması da okunur", () => {
    const bytes = Uint8Array.from([0x41, 0x64, 0x3b, 0xdd, 0x6c, 0x0a, 0xde, 0x65, 0x6e, 0x3b, 0x31]);
    const result = IO.importCsv(bytes);
    assert.equal(result.sheets[0].tableData[0][1].value, "İl");
    assert.equal(result.sheets[0].tableData[1][0].value, "Şen");
});

test("PDF: sayfa görüntüleri doğru nesne yapısıyla yazılır", () => {
    const jpeg = Uint8Array.from([0xff, 0xd8, 0xff, 0xd9]);
    const pdf = IO.buildPdf([{ jpeg, pixelWidth: 2, pixelHeight: 2, widthPt: 595.28, heightPt: 841.89 }], "Not Listesi");
    const text = new TextDecoder("latin1").decode(pdf);
    assert.ok(text.startsWith("%PDF-1.4"));
    assert.match(text, /\/Type \/Pages \/Kids \[4 0 R\] \/Count 1/);
    assert.match(text, /\/Filter \/DCTDecode \/Length 4/);
    const xrefOffset = Number(text.match(/startxref\n(\d+)/)[1]);
    assert.equal(text.slice(xrefOffset, xrefOffset + 4), "xref");
    const firstObject = Number(text.match(/xref\n0 \d+\n0000000000 65535 f \n(\d{10})/)[1]);
    assert.equal(text.slice(firstObject, firstObject + 7), "1 0 obj");
});
