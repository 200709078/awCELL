import test from "node:test";
import assert from "node:assert/strict";
import F from "../src/formula.js";

/** Basit bir çalışma kitabı: sheets = { Ad: { A1: "5", B1: "=A1*2" } } */
function workbook(sheets) {
    const names = Object.keys(sheets);
    const grids = names.map((name) => {
        const grid = new Map();
        Object.entries(sheets[name]).forEach(([ref, text]) => {
            const match = ref.match(/^([A-Z]+)(\d+)$/);
            const cell = String(text).startsWith("=") ? { formula: text, value: "" } : { value: text, formula: null };
            grid.set(`${Number(match[2]) - 1}:${F.columnToIndex(match[1])}`, cell);
        });
        return grid;
    });
    return {
        sheetCount: names.length,
        getSheetName: (index) => names[index],
        getSize: () => ({ rows: 100, cols: 26 }),
        getCell: (index, row, col) => grids[index].get(`${row}:${col}`) ?? null,
        now: new Date(2026, 10, 10, 9, 5)
    };
}

function evaluate(formula, cells = {}, extraSheets = {}) {
    const book = workbook({ Sayfa1: cells, ...extraSheets });
    return F.createEvaluator(book).evaluate(formula, 0, 50, 10);
}

const value = (formula, cells, extra) => F.valueToStorage(evaluate(formula, cells, extra));

test("dört işlem, öncelik, üs ve yüzde", () => {
    assert.equal(value("=1+2*3"), "7");
    assert.equal(value("=(1+2)*3"), "9");
    assert.equal(value("=-2^2"), "4");
    assert.equal(value("=2^3^2"), "64");
    assert.equal(value("=50%*10"), "5");
    assert.equal(value("=0.1+0.2"), "0.3");
    assert.equal(value("=1/0"), "#SAYI/0!");
    assert.equal(value('="a"&1,5'), "a1,5");
    assert.equal(value('="a"&1.5'), "a1,5");
});

test("formülde virgüllü ondalık (Türkçe Excel yazımı)", () => {
    const cells = { A1: "4" };
    assert.equal(value("=A1*0,5", cells), "2");
    assert.equal(value("=TOPLA(1;2,5)"), "3.5");
    assert.equal(value("=YUVARLA(2,345;2)"), "2.35");
    assert.equal(value("=ROUND(2.345,2)"), "2.35");
    assert.equal(value("=SUM(1,5)"), "6");
    assert.equal(value('=EĞER(A1>3,5;"büyük";"küçük")', cells), "büyük");
    assert.equal(F.translateFormula("=YUVARLA(2,345;2)", { format: "excel" }), "ROUND(2.345,2)");
});

test("başvurular, Türkçe ondalık ve metin", () => {
    const cells = { A1: "3,5", A2: "2", A3: "elma", A4: "=A1*A2" };
    assert.equal(value("=A1*A2", cells), "7");
    assert.equal(value("=A4+1", cells), "8");
    assert.equal(value("=A3+1", cells), "#DEĞER!");
    assert.equal(value("=A9", cells), "0");
    assert.equal(value("=$A$1+A$2", cells), "5.5");
});

test("toplama işlevleri, Türkçe adlar ve ; ayırıcı", () => {
    const cells = { A1: "1", A2: "2", A3: "x", A4: "4", B1: "10" };
    assert.equal(value("=SUM(A1:A4)", cells), "7");
    assert.equal(value("=topla(A1:A4;B1)", cells), "17");
    assert.equal(value("=ORTALAMA(A1:A4)", cells), "2.33333333333333");
    assert.equal(value("=AVG(A1:A2)", cells), "1.5");
    assert.equal(value("=COUNT(A1:A4)", cells), "3");
    assert.equal(value("=BAĞ_DEĞ_DOLU_SAY(A1:A5)", cells), "4");
    assert.equal(value("=MİN(A1:A4)", cells), "1");
    assert.equal(value("=min(A1:A4)", cells), "1");
    assert.equal(value("=MAK(A1:A4)", cells), "4");
    assert.equal(value("=SUM(A:A)", cells), "7");
    assert.equal(value("=ORTANCA(A1:A4)", cells), "2");
    assert.equal(value("=AVERAGE(C1:C3)", cells), "#SAYI/0!");
});

test("mantık ve koşullu işlevler", () => {
    const cells = { A1: "45", A2: "70", A3: "90", B1: "Ali", B2: "Ayşe", B3: "ali" };
    assert.equal(value('=EĞER(A1>=50;"Geçti";"Kaldı")', cells), "Kaldı");
    assert.equal(value('=IF(A2>=50,"Geçti","Kaldı")', cells), "Geçti");
    assert.equal(value("=VE(A1>0;A2>0)", cells), "DOĞRU");
    assert.equal(value("=OR(A1>100,A2>100)", cells), "YANLIŞ");
    assert.equal(value('=EĞERSAY(A1:A3;">=50")', cells), "2");
    assert.equal(value('=COUNTIF(B1:B3,"ali")', cells), "2");
    assert.equal(value('=COUNTIF(B1:B3,"A*")', cells), "3");
    assert.equal(value('=ETOPLA(B1:B3;"ali";A1:A3)', cells), "135");
    assert.equal(value('=EĞERORTALAMA(A1:A3;">50")', cells), "80");
    assert.equal(value('=ÇOKEĞERSAY(A1:A3;">40";B1:B3;"Ali")', cells), "2");
    assert.equal(value("=EĞERHATA(1/0;-1)", cells), "-1");
});

test("yuvarlama ve matematik", () => {
    assert.equal(value("=YUVARLA(2.345;2)"), "2.35");
    assert.equal(value("=ROUND(-2.5,0)"), "-3");
    assert.equal(value("=ROUND(1.005,2)"), "1.01");
    assert.equal(value("=YUKARIYUVARLA(1.21;1)"), "1.3");
    assert.equal(value("=AŞAĞIYUVARLA(1.29;1)"), "1.2");
    assert.equal(value("=MOD(-3;2)"), "1");
    assert.equal(value("=KAREKÖK(16)"), "4");
    assert.equal(value("=SQRT(-1)"), "#SAYI!");
    assert.equal(value("=LOG10(1000)"), "3");
    assert.equal(value("=TAMSAYI(-1.5)"), "-2");
});

test("metin ve arama", () => {
    const cells = { A1: "Elma", A2: "Armut", A3: "Kiraz", B1: "10", B2: "20", B3: "30" };
    assert.equal(value('=BÜYÜKHARF("istanbul")'), "İSTANBUL");
    assert.equal(value('=UZUNLUK("çiçek")'), "5");
    assert.equal(value('=PARÇAAL("merhaba";2;3)'), "erh");
    assert.equal(value('=BİRLEŞTİR(A1;"-";B1)', cells), "Elma-10");
    assert.equal(value('=DÜŞEYARA("armut";A1:B3;2;YANLIŞ)', cells), "20");
    assert.equal(value('=VLOOKUP("Yok",A1:B3,2,FALSE)', cells), "#YOK");
    assert.equal(value('=KAÇINCI("Kiraz";A1:A3;0)', cells), "3");
    assert.equal(value("=İNDİS(B1:B3;2)", cells), "20");
    assert.equal(value("=RANK(20;B1:B3)", cells), "2");
    assert.equal(value("=BUGÜN()"), "10.11.2026");
});

test("döngüsel başvuru uygulamayı kilitlemez", () => {
    const book = workbook({ Sayfa1: { A1: "=B1+1", B1: "=A1+1", C1: "=C1" } });
    const evaluator = F.createEvaluator(book);
    assert.equal(F.valueToStorage(evaluator.getValue(0, 0, 0)), "#DÖNGÜ!");
    assert.equal(F.valueToStorage(evaluator.getValue(0, 0, 2)), "#DÖNGÜ!");
});

test("uzun zincir yığını taşırmaz", () => {
    const cells = { A1: "1" };
    for (let row = 2; row <= 3000; row++) cells[`A${row}`] = `=A${row - 1}+1`;
    const book = workbook({ Sayfa1: cells });
    book.getSize = () => ({ rows: 3000, cols: 26 });
    const evaluator = F.createEvaluator(book);
    for (let row = 0; row < 3000; row++) evaluator.getValue(0, row, 0);
    assert.equal(F.valueToStorage(evaluator.getValue(0, 2999, 0)), "3000");
});

test("sayfalar arası başvuru", () => {
    const extra = { "Not Listesi": { A1: "7" }, Sayfa2: { B2: "3" } };
    assert.equal(value("='Not Listesi'!A1*2", {}, extra), "14");
    assert.equal(value("=Sayfa2!B2+'not listesi'!A1", {}, extra), "10");
    assert.equal(value("=Yok!A1", {}, extra), "#BAŞV!");
});

test("güvenlik: JavaScript ifadesi çalışmaz", () => {
    assert.equal(value("=alert(1)"), "#AD?");
    assert.equal(value("=constructor"), "#AD?");
    assert.equal(value("=1;2"), "#AD?");
    assert.equal(value("=globalThis.process"), "#AD?");
});

test("sözdizimi hataları ve bilinmeyen adlar", () => {
    assert.equal(value("=SUM(1,"), "#AD?");
    assert.equal(value("=BILINMEYEN(1)"), "#AD?");
    assert.equal(value('="kapanmamış'), "#AD?");
    assert.equal(value("=LOG10(100)+A1"), "2");
});

test("başvuru eşleme (kopyalama, ekleme)", () => {
    const shift = (formula, dr, dc) => F.mapReferences(formula, (ref) => {
        const move = (point) => {
            if (point.row !== undefined && !point.rowAbs) point.row += dr;
            if (point.col !== undefined && !point.colAbs) point.col += dc;
            return point.row < 0 || point.col < 0 ? null : point;
        };
        if (!move(ref.a)) return null;
        if (ref.b && !move(ref.b)) return null;
        return ref;
    });
    assert.equal(shift("=SUM(A1:B2)+$C$3+LOG10(A1)", 1, 1), "=SUM(B2:C3)+$C$3+LOG10(B2)");
    assert.equal(shift('="A1"&A1', 1, 0), '="A1"&A2');
    assert.equal(shift("=A1", -1, 0), "=#REF!");
    assert.equal(shift("='Not Listesi'!A1+Sayfa2!B$1", 2, 0), "='Not Listesi'!A3+Sayfa2!B$1");
});

test("dışa aktarım için formül çevirisi", () => {
    assert.equal(F.translateFormula('=TOPLA(A1:A3;B1)+EĞER(C1>0;1;0)', { format: "excel" }), "SUM(A1:A3,B1)+IF(C1>0,1,0)");
    assert.equal(F.translateFormula("=Sayfa2!A1", { format: "excel" }), "'Sayfa2'!A1");
    assert.equal(F.translateFormula("=SUM(A1:A3)", { format: "openformula" }), "of:=SUM([.A1:.A3])");
    assert.equal(F.translateFormula("=Sayfa2!$A$1", { format: "openformula" }), "of:=[$'Sayfa2'.$A$1]");
    assert.equal(F.translateFormula("=A1+$B$2", { format: "r1c1", row: 1, col: 1 }), "=R[-1]C[-1]+R2C2");
    assert.equal(F.translateFormula("=1/0+#SAYI/0!", { format: "excel" }), "1/0+#DIV/0!");
    assert.equal(F.fromOpenFormula("of:=SUM([.A1:.A3];[$'Sayfa 2'.B1])"), "=SUM(A1:A3;'Sayfa 2'!B1)");
});

test("sayı ayrıştırma", () => {
    assert.equal(F.parseNumber("3,5"), 3.5);
    assert.equal(F.parseNumber("-3.5"), -3.5);
    assert.equal(F.parseNumber("1.234,5"), 1234.5);
    assert.equal(F.parseNumber("50%"), 0.5);
    assert.equal(F.parseNumber("10.11.2026"), null);
    assert.equal(F.parseNumber("abc"), null);
    assert.equal(F.parseNumber(""), null);
    assert.equal(F.numberToStorage(0.1 + 0.2), "0.3");
});
