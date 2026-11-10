/*
 * awCELL dosya biçimleri: ZIP okuma/yazma, XLSX, ODS, XLS (Excel 2003 XML), CSV ve PDF.
 *
 * Girdi/çıktı "çalışma kitabı yükü"dür (payload): { sheets: [{ name, rowCount, colCount,
 * tableData, colWidths, rowHeights, hiddenRows, hiddenCols, frozenRows, frozenCols }] }.
 * Hücre: { value, formula, style, borders, merge, mergedTo, note }.
 *
 * ES modülü: `import AwFileIO from "./fileio.js"` (uygulama ve Node testleri).
 */
import AwFormula from "./formula.js";

const AwFileIO = (function (F) {
    "use strict";

    const DEFAULT_COL_WIDTH = 84;
    const DEFAULT_ROW_HEIGHT = 26;
    const DEFAULT_FONT_SIZE = 13;
    const MAX_IMPORT_ROWS = 5000;
    const MAX_IMPORT_COLS = 200;
    const encoder = new TextEncoder();

    /* ---------- Ortak yardımcılar ---------- */

    function xmlEscape(value) {
        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&apos;")
            // XML 1.0'da geçersiz denetim karakterleri atılır.
            .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "");
    }

    function defaultStyle() {
        return {
            bold: false,
            italic: false,
            underline: false,
            strikeThrough: false,
            fontSize: DEFAULT_FONT_SIZE,
            color: "#202124",
            backgroundColor: "",
            horizontalAlign: "left",
            verticalAlign: "middle",
            numberFormat: "automatic",
            decimalPlaces: 2
        };
    }

    function emptyBorders() {
        return { top: false, right: false, bottom: false, left: false };
    }

    function createCell() {
        return {
            value: "",
            formula: null,
            borders: emptyBorders(),
            style: defaultStyle(),
            merge: null,
            mergedTo: null
        };
    }

    function cellStyle(cell) {
        return { ...defaultStyle(), ...(cell?.style ?? {}) };
    }

    function cellBorders(cell) {
        return { ...emptyBorders(), ...(cell?.borders ?? {}) };
    }

    function hasStyle(cell) {
        const style = cellStyle(cell);
        const borders = cellBorders(cell);
        return Boolean(
            style.backgroundColor ||
            borders.top || borders.right || borders.bottom || borders.left ||
            cell?.merge
        );
    }

    function cellText(cell) {
        return String(cell?.formula ?? cell?.value ?? "");
    }

    /** Dışa aktarılacak alan: içeriği, dolgusu, kenarlığı ya da birleştirmesi olan son hücre. */
    function getUsedBounds(sheet, includeStyles = true) {
        let maxRow = -1;
        let maxCol = -1;
        for (let r = 0; r < sheet.rowCount; r++) {
            const row = sheet.tableData[r];
            if (!row) continue;
            for (let c = 0; c < sheet.colCount; c++) {
                const cell = row[c];
                if (!cell) continue;
                if (cellText(cell) !== "" || cell.note || (includeStyles && hasStyle(cell))) {
                    let lastRow = r;
                    let lastCol = c;
                    if (cell.merge) {
                        lastRow = r + cell.merge.rowspan - 1;
                        lastCol = c + cell.merge.colspan - 1;
                    }
                    maxRow = Math.max(maxRow, lastRow);
                    maxCol = Math.max(maxCol, lastCol);
                }
            }
        }
        return { maxRow, maxCol };
    }

    function sanitizeSheetName(name, fallback) {
        const cleaned = String(name || fallback).replace(/[\[\]:*?/\\]/g, " ").trim().slice(0, 31);
        return cleaned || fallback;
    }

    /** Dışa aktarımda sayfa adları Excel kurallarına uydurulur; aynı adlar numaralanır. */
    function createSheetNameMap(sheets) {
        const used = new Set();
        const names = sheets.map((sheet, index) => {
            const base = sanitizeSheetName(sheet.name, `Sayfa${index + 1}`);
            let candidate = base;
            let counter = 2;
            while (used.has(candidate.toLocaleLowerCase("tr-TR"))) {
                candidate = `${base.slice(0, 28)} ${counter++}`;
            }
            used.add(candidate.toLocaleLowerCase("tr-TR"));
            return candidate;
        });
        const lookup = (name) => {
            const index = sheets.findIndex((sheet) => String(sheet.name).toLocaleLowerCase("tr-TR") === String(name).toLocaleLowerCase("tr-TR"));
            return index >= 0 ? names[index] : name;
        };
        return { names, lookup };
    }

    const DATE_TEXT_RE = /^(\d{1,2})[./-](\d{1,2})[./-](\d{4})$/;
    const EXCEL_EPOCH = Date.UTC(1899, 11, 30);

    function dateTextToSerial(text) {
        const match = String(text).trim().match(DATE_TEXT_RE);
        if (!match) return null;
        const day = Number(match[1]);
        const month = Number(match[2]);
        const year = Number(match[3]);
        const time = Date.UTC(year, month - 1, day);
        const date = new Date(time);
        if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) return null;
        return (time - EXCEL_EPOCH) / 86400000;
    }

    function serialToDateText(serial, withTime) {
        const pad = (number) => String(number).padStart(2, "0");
        const ms = Math.round(serial * 86400000);
        const date = new Date(EXCEL_EPOCH + ms);
        const datePart = `${pad(date.getUTCDate())}.${pad(date.getUTCMonth() + 1)}.${date.getUTCFullYear()}`;
        if (!withTime) return datePart;
        return `${datePart} ${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}`;
    }

    function serialToTimeText(serial) {
        const pad = (number) => String(number).padStart(2, "0");
        const totalSeconds = Math.round((serial - Math.floor(serial)) * 86400);
        return `${pad(Math.floor(totalSeconds / 3600) % 24)}:${pad(Math.floor(totalSeconds / 60) % 60)}:${pad(totalSeconds % 60)}`;
    }

    /**
     * Dışa aktarım için hücrenin türü: { kind: "number" | "string" | "bool" | "error" | "blank",
     * value, autoFormat }. Baştaki sıfırlar ("007") metin kalır.
     */
    function classifyValue(cell) {
        const text = String(cell?.value ?? "");
        if (text === "") return { kind: "blank", value: "" };
        if (F.isErrorText(text)) return { kind: "error", value: text };
        if (cell?.formula && (text === "DOĞRU" || text === "YANLIŞ")) return { kind: "bool", value: text === "DOĞRU" };
        if (/^[+-]?0\d/.test(text.trim())) return { kind: "string", value: text };
        const number = F.parseNumber(text);
        if (number !== null) {
            return {
                kind: "number",
                value: number,
                autoFormat: text.trim().endsWith("%") ? "percent" : null
            };
        }
        const serial = cell?.formula ? null : dateTextToSerial(text);
        if (serial !== null) return { kind: "number", value: serial, autoFormat: "date" };
        return { kind: "string", value: text };
    }

    /* ---------- ZIP ---------- */

    const CRC_TABLE = (() => {
        const table = new Uint32Array(256);
        for (let i = 0; i < 256; i++) {
            let value = i;
            for (let bit = 0; bit < 8; bit++) {
                value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
            }
            table[i] = value >>> 0;
        }
        return table;
    })();

    function crc32(bytes) {
        let crc = 0xffffffff;
        for (let i = 0; i < bytes.length; i++) {
            crc = CRC_TABLE[(crc ^ bytes[i]) & 0xff] ^ (crc >>> 8);
        }
        return (crc ^ 0xffffffff) >>> 0;
    }

    /** Sıkıştırmasız (stored) ZIP. ODS'nin ilk girdisi "mimetype" olmalıdır; sıra korunur. */
    function createZip(entries) {
        const parts = [];
        const central = [];
        let offset = 0;

        entries.forEach((entry) => {
            const nameBytes = encoder.encode(entry.name);
            const data = typeof entry.data === "string" ? encoder.encode(entry.data) : entry.data;
            const crc = crc32(data);

            const local = new Uint8Array(30);
            const localView = new DataView(local.buffer);
            localView.setUint32(0, 0x04034b50, true);
            localView.setUint16(4, 20, true);
            localView.setUint16(6, 0x0800, true); // UTF-8 dosya adları
            localView.setUint16(8, 0, true);
            localView.setUint32(14, crc, true);
            localView.setUint32(18, data.length, true);
            localView.setUint32(22, data.length, true);
            localView.setUint16(26, nameBytes.length, true);
            parts.push(local, nameBytes, data);

            const header = new Uint8Array(46);
            const headerView = new DataView(header.buffer);
            headerView.setUint32(0, 0x02014b50, true);
            headerView.setUint16(4, 20, true);
            headerView.setUint16(6, 20, true);
            headerView.setUint16(8, 0x0800, true);
            headerView.setUint32(16, crc, true);
            headerView.setUint32(20, data.length, true);
            headerView.setUint32(24, data.length, true);
            headerView.setUint16(28, nameBytes.length, true);
            headerView.setUint32(42, offset, true);
            central.push(header, nameBytes);

            offset += local.length + nameBytes.length + data.length;
        });

        const centralSize = central.reduce((sum, part) => sum + part.length, 0);
        const end = new Uint8Array(22);
        const endView = new DataView(end.buffer);
        endView.setUint32(0, 0x06054b50, true);
        endView.setUint16(8, entries.length, true);
        endView.setUint16(10, entries.length, true);
        endView.setUint32(12, centralSize, true);
        endView.setUint32(16, offset, true);

        return concatBytes([...parts, ...central, end]);
    }

    function concatBytes(parts) {
        const total = parts.reduce((sum, part) => sum + part.length, 0);
        const output = new Uint8Array(total);
        let offset = 0;
        parts.forEach((part) => {
            output.set(part, offset);
            offset += part.length;
        });
        return output;
    }

    async function inflateRaw(bytes) {
        if (typeof DecompressionStream === "undefined") {
            throw new Error("Bu tarayıcı sıkıştırılmış dosyaları açamıyor; tarayıcıyı güncelleyin.");
        }
        const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream("deflate-raw"));
        return new Uint8Array(await new Response(stream).arrayBuffer());
    }

    /** ZIP içeriğini okur: { names, read(name) -> Promise<Uint8Array>, text(name) }. */
    function readZip(buffer) {
        const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
        const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
        let endOffset = -1;
        for (let i = bytes.length - 22; i >= Math.max(0, bytes.length - 65557); i--) {
            if (view.getUint32(i, true) === 0x06054b50) {
                endOffset = i;
                break;
            }
        }
        if (endOffset < 0) throw new Error("Dosya bir ZIP arşivi değil.");

        const count = view.getUint16(endOffset + 10, true);
        let pointer = view.getUint32(endOffset + 16, true);
        const entries = new Map();
        const decoder = new TextDecoder();

        for (let i = 0; i < count; i++) {
            if (view.getUint32(pointer, true) !== 0x02014b50) throw new Error("ZIP dizini bozuk.");
            const method = view.getUint16(pointer + 10, true);
            const compressedSize = view.getUint32(pointer + 20, true);
            const nameLength = view.getUint16(pointer + 28, true);
            const extraLength = view.getUint16(pointer + 30, true);
            const commentLength = view.getUint16(pointer + 32, true);
            const localOffset = view.getUint32(pointer + 42, true);
            const name = decoder.decode(bytes.subarray(pointer + 46, pointer + 46 + nameLength));
            entries.set(name, { method, compressedSize, localOffset });
            pointer += 46 + nameLength + extraLength + commentLength;
        }

        async function read(name) {
            const entry = entries.get(name) ?? entries.get(name.replace(/^\//, ""));
            if (!entry) return null;
            const nameLength = view.getUint16(entry.localOffset + 26, true);
            const extraLength = view.getUint16(entry.localOffset + 28, true);
            const start = entry.localOffset + 30 + nameLength + extraLength;
            const data = bytes.subarray(start, start + entry.compressedSize);
            if (entry.method === 0) return data;
            if (entry.method === 8) return inflateRaw(data);
            throw new Error("Desteklenmeyen ZIP sıkıştırması.");
        }

        return {
            names: [...entries.keys()],
            read,
            async text(name) {
                const data = await read(name);
                return data ? new TextDecoder().decode(data) : null;
            }
        };
    }

    /* ---------- Stil kayıtları (XLSX / XLS / ODS ortak) ---------- */

    function colorHex(color) {
        return /^#[0-9a-f]{6}$/i.test(color ?? "") ? color.slice(1).toUpperCase() : null;
    }

    function pxToPt(px) {
        return Math.round(px * 0.75 * 2) / 2;
    }

    function effectiveNumberFormat(style, autoFormat) {
        if (style.numberFormat && style.numberFormat !== "automatic") {
            return { type: style.numberFormat, decimals: Math.max(0, Math.min(8, Number(style.decimalPlaces) || 0)) };
        }
        if (autoFormat === "percent") return { type: "percent", decimals: 0 };
        if (autoFormat === "date") return { type: "date", decimals: 0 };
        return { type: "automatic", decimals: 0 };
    }

    function excelNumberFormatCode(format) {
        const decimals = format.decimals > 0 ? `.${"0".repeat(format.decimals)}` : "";
        switch (format.type) {
            case "number": return `#,##0${decimals}`;
            case "currency": return `#,##0${decimals} "₺"`;
            case "percent": return `0${decimals}%`;
            case "date": return "dd.mm.yyyy";
            case "time": return "hh:mm:ss";
            default: return null;
        }
    }

    /* ---------- XLSX dışa aktarım ---------- */

    function buildXlsx(payload) {
        const sheetNames = createSheetNameMap(payload.sheets);
        const fonts = [];
        const fills = ['<fill><patternFill patternType="none"/></fill>', '<fill><patternFill patternType="gray125"/></fill>'];
        const borders = ["<border><left/><right/><top/><bottom/><diagonal/></border>"];
        const numFmts = [];
        const xfs = [];
        const fontIndex = new Map();
        const fillIndex = new Map();
        const borderIndex = new Map();
        const numFmtIndex = new Map();
        const xfIndex = new Map();

        const register = (map, list, key, xml) => {
            if (!map.has(key)) {
                map.set(key, list.length);
                list.push(xml);
            }
            return map.get(key);
        };

        const fontFor = (style) => {
            const size = pxToPt(Math.max(6, Number(style.fontSize) || DEFAULT_FONT_SIZE));
            const color = colorHex(style.color) ?? "202124";
            const key = `${style.bold}|${style.italic}|${style.underline}|${style.strikeThrough}|${size}|${color}`;
            const xml = `<font>${style.bold ? "<b/>" : ""}${style.italic ? "<i/>" : ""}${style.strikeThrough ? "<strike/>" : ""}${style.underline ? "<u/>" : ""}<sz val="${size}"/><color rgb="FF${color}"/><name val="Arial"/><family val="2"/></font>`;
            return register(fontIndex, fonts, key, xml);
        };
        fontFor(defaultStyle());

        const fillFor = (style) => {
            const color = colorHex(style.backgroundColor);
            if (!color) return 0;
            return register(fillIndex, fills, color, `<fill><patternFill patternType="solid"><fgColor rgb="FF${color}"/><bgColor indexed="64"/></patternFill></fill>`);
        };

        const borderFor = (cellBorder) => {
            const key = `${cellBorder.left}${cellBorder.right}${cellBorder.top}${cellBorder.bottom}`;
            if (key === "falsefalsefalsefalse") return 0;
            const side = (name, on) => (on ? `<${name} style="thin"><color rgb="FF000000"/></${name}>` : `<${name}/>`);
            return register(borderIndex, borders, key,
                `<border>${side("left", cellBorder.left)}${side("right", cellBorder.right)}${side("top", cellBorder.top)}${side("bottom", cellBorder.bottom)}<diagonal/></border>`);
        };

        const numFmtFor = (format) => {
            const code = excelNumberFormatCode(format);
            if (!code) return 0;
            if (format.type === "date") return 14;
            if (!numFmtIndex.has(code)) {
                const id = 164 + numFmts.length;
                numFmtIndex.set(code, id);
                numFmts.push(`<numFmt numFmtId="${id}" formatCode="${xmlEscape(code)}"/>`);
            }
            return numFmtIndex.get(code);
        };

        const xfFor = (cell, autoFormat) => {
            const style = cellStyle(cell);
            const font = fontFor(style);
            const fill = fillFor(style);
            const border = borderFor(cellBorders(cell));
            const numFmt = numFmtFor(effectiveNumberFormat(style, autoFormat));
            const horizontal = ["center", "right", "justify"].includes(style.horizontalAlign) ? style.horizontalAlign : "";
            const vertical = style.verticalAlign === "top" ? "top" : style.verticalAlign === "bottom" ? "bottom" : "center";
            const wrap = /\n/.test(String(cell?.value ?? ""));
            const key = `${font}|${fill}|${border}|${numFmt}|${horizontal}|${vertical}|${wrap}`;
            if (xfIndex.has(key)) return xfIndex.get(key);
            const alignment = `<alignment${horizontal ? ` horizontal="${horizontal}"` : ""} vertical="${vertical}"${wrap ? ' wrapText="1"' : ""}/>`;
            const xml = `<xf numFmtId="${numFmt}" fontId="${font}" fillId="${fill}" borderId="${border}" xfId="0" applyNumberFormat="1" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1">${alignment}</xf>`;
            xfIndex.set(key, xfs.length);
            xfs.push(xml);
            return xfs.length - 1;
        };
        xfFor(createCell(), null);

        const sheetFiles = payload.sheets.map((sheet, sheetIndex) => {
            const bounds = getUsedBounds(sheet);
            const hiddenRows = new Set(sheet.hiddenRows ?? []);
            const hiddenCols = new Set(sheet.hiddenCols ?? []);
            const rows = [];
            const merges = [];

            for (let r = 0; r <= bounds.maxRow; r++) {
                const cells = [];
                for (let c = 0; c <= bounds.maxCol; c++) {
                    const cell = sheet.tableData[r]?.[c];
                    if (!cell) continue;
                    const ref = `${F.indexToColumn(c)}${r + 1}`;
                    const classified = classifyValue(cell);
                    const styleId = hasStyle(cell) || cellStyle(cell).bold || cellText(cell) !== "" || classified.autoFormat
                        ? xfFor(cell, classified.autoFormat)
                        : 0;
                    if (cell.merge && (cell.merge.rowspan > 1 || cell.merge.colspan > 1)) {
                        merges.push(`<mergeCell ref="${ref}:${F.indexToColumn(c + cell.merge.colspan - 1)}${r + cell.merge.rowspan}"/>`);
                    }

                    const styleAttr = styleId ? ` s="${styleId}"` : "";
                    if (cell.formula) {
                        const translated = F.translateFormula(cell.formula, { format: "excel", sheetName: sheetNames.lookup });
                        if (translated !== null) {
                            const f = `<f>${xmlEscape(translated)}</f>`;
                            if (classified.kind === "number") cells.push(`<c r="${ref}"${styleAttr}>${f}<v>${classified.value}</v></c>`);
                            else if (classified.kind === "bool") cells.push(`<c r="${ref}"${styleAttr} t="b">${f}<v>${classified.value ? 1 : 0}</v></c>`);
                            else if (classified.kind === "error") cells.push(`<c r="${ref}"${styleAttr} t="e">${f}<v>${xmlEscape(errorToEnglish(classified.value))}</v></c>`);
                            else cells.push(`<c r="${ref}"${styleAttr} t="str">${f}<v>${xmlEscape(classified.value)}</v></c>`);
                            continue;
                        }
                    }

                    if (classified.kind === "number") {
                        cells.push(`<c r="${ref}"${styleAttr}><v>${classified.value}</v></c>`);
                    } else if (classified.kind === "blank") {
                        if (styleId) cells.push(`<c r="${ref}"${styleAttr}/>`);
                    } else {
                        const text = String(cell.formula ?? classified.value);
                        cells.push(`<c r="${ref}"${styleAttr} t="inlineStr"><is><t xml:space="preserve">${xmlEscape(text)}</t></is></c>`);
                    }
                }

                const height = sheet.rowHeights?.[r] ?? DEFAULT_ROW_HEIGHT;
                const rowAttrs = [
                    height !== DEFAULT_ROW_HEIGHT ? ` ht="${pxToPt(height)}" customHeight="1"` : "",
                    hiddenRows.has(r) ? ' hidden="1"' : ""
                ].join("");
                if (cells.length || rowAttrs) rows.push(`<row r="${r + 1}"${rowAttrs}>${cells.join("")}</row>`);
            }

            const cols = [];
            const colLimit = Math.max(bounds.maxCol, (sheet.colWidths?.length ?? 0) - 1);
            for (let c = 0; c <= colLimit && c < sheet.colCount; c++) {
                const width = sheet.colWidths?.[c] ?? DEFAULT_COL_WIDTH;
                const hidden = hiddenCols.has(c);
                if (width === DEFAULT_COL_WIDTH && !hidden) continue;
                cols.push(`<col min="${c + 1}" max="${c + 1}" width="${Math.max(1, (width - 5) / 7).toFixed(2)}" customWidth="1"${hidden ? ' hidden="1"' : ""}/>`);
            }

            const frozenRows = Number(sheet.frozenRows) || 0;
            const frozenCols = Number(sheet.frozenCols) || 0;
            let pane = "";
            if (frozenRows || frozenCols) {
                const activePane = frozenRows && frozenCols ? "bottomRight" : frozenRows ? "bottomLeft" : "topRight";
                pane = `<pane${frozenCols ? ` xSplit="${frozenCols}"` : ""}${frozenRows ? ` ySplit="${frozenRows}"` : ""} topLeftCell="${F.indexToColumn(frozenCols)}${frozenRows + 1}" activePane="${activePane}" state="frozen"/>`;
            }

            const xml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>`
                + `<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">`
                + `<sheetViews><sheetView workbookViewId="0"${sheetIndex === (payload.activeSheetIndex ?? 0) ? ' tabSelected="1"' : ""}>${pane}</sheetView></sheetViews>`
                + `<sheetFormatPr defaultRowHeight="${pxToPt(DEFAULT_ROW_HEIGHT)}"/>`
                + (cols.length ? `<cols>${cols.join("")}</cols>` : "")
                + `<sheetData>${rows.join("")}</sheetData>`
                + (merges.length ? `<mergeCells count="${merges.length}">${merges.join("")}</mergeCells>` : "")
                + `</worksheet>`;
            return { name: `xl/worksheets/sheet${sheetIndex + 1}.xml`, data: xml };
        });

        const sheetCount = payload.sheets.length;
        const stylesXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>`
            + `<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">`
            + (numFmts.length ? `<numFmts count="${numFmts.length}">${numFmts.join("")}</numFmts>` : "")
            + `<fonts count="${fonts.length}">${fonts.join("")}</fonts>`
            + `<fills count="${fills.length}">${fills.join("")}</fills>`
            + `<borders count="${borders.length}">${borders.join("")}</borders>`
            + `<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>`
            + `<cellXfs count="${xfs.length}">${xfs.join("")}</cellXfs>`
            + `<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>`
            + `</styleSheet>`;

        return createZip([
            {
                name: "[Content_Types].xml",
                data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/><Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>${payload.sheets.map((_, i) => `<Override PartName="/xl/worksheets/sheet${i + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`).join("")}</Types>`
            },
            {
                name: "_rels/.rels",
                data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/></Relationships>`
            },
            {
                name: "docProps/app.xml",
                data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties"><Application>awCELL</Application></Properties>`
            },
            {
                name: "xl/workbook.xml",
                data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><bookViews><workbookView activeTab="${Math.max(0, Math.min(sheetCount - 1, payload.activeSheetIndex ?? 0))}"/></bookViews><sheets>${sheetNames.names.map((name, i) => `<sheet name="${xmlEscape(name)}" sheetId="${i + 1}" r:id="rId${i + 1}"/>`).join("")}</sheets><calcPr calcId="191029" fullCalcOnLoad="1"/></workbook>`
            },
            {
                name: "xl/_rels/workbook.xml.rels",
                data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${payload.sheets.map((_, i) => `<Relationship Id="rId${i + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${i + 1}.xml"/>`).join("")}<Relationship Id="rId${sheetCount + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>`
            },
            { name: "xl/styles.xml", data: stylesXml },
            ...sheetFiles
        ]);
    }

    function errorToEnglish(text) {
        const map = {
            "#SAYI/0!": "#DIV/0!", "#BAŞV!": "#REF!", "#AD?": "#NAME?", "#DEĞER!": "#VALUE!",
            "#YOK": "#N/A", "#SAYI!": "#NUM!", "#BOŞ!": "#NULL!", "#DÖNGÜ!": "#REF!"
        };
        return map[text] ?? text;
    }

    /* ---------- XML ayrıştırma yardımcıları (tarayıcı) ---------- */

    function parseXml(text) {
        if (typeof DOMParser === "undefined") throw new Error("XML ayrıştırıcı yok.");
        const doc = new DOMParser().parseFromString(text, "application/xml");
        if (doc.getElementsByTagName("parsererror").length) throw new Error("Dosyadaki XML bozuk.");
        return doc;
    }

    function children(element, localName) {
        return Array.from(element?.children ?? []).filter((child) => child.localName === localName);
    }

    function child(element, localName) {
        return children(element, localName)[0] ?? null;
    }

    function descendants(element, localName) {
        return Array.from(element?.getElementsByTagNameNS("*", localName) ?? []);
    }

    function attr(element, name) {
        if (!element) return null;
        if (element.hasAttribute(name)) return element.getAttribute(name);
        const local = name.includes(":") ? name.split(":")[1] : name;
        for (const attribute of Array.from(element.attributes)) {
            if (attribute.localName === local) return attribute.value;
        }
        return null;
    }

    function parseCellRef(ref) {
        const match = String(ref).match(/^\$?([A-Za-z]+)\$?(\d+)$/);
        if (!match) return null;
        return { row: Number(match[2]) - 1, col: F.columnToIndex(match[1]) };
    }

    function createSheet(name, rows, cols) {
        const rowCount = Math.max(100, rows);
        const colCount = Math.max(26, cols);
        return {
            name,
            rowCount,
            colCount,
            tableData: Array.from({ length: rowCount }, () => Array.from({ length: colCount }, createCell)),
            colWidths: Array.from({ length: colCount }, () => DEFAULT_COL_WIDTH),
            rowHeights: Array.from({ length: rowCount }, () => DEFAULT_ROW_HEIGHT),
            hiddenRows: [],
            hiddenCols: [],
            frozenRows: 0,
            frozenCols: 0,
            charts: [],
            nextChartNumber: 1,
            selectedCell: { row: 0, col: 0 },
            selectionRange: null,
            selectionMode: "cell",
            activeFilter: null
        };
    }

    function applyMerge(sheet, minRow, minCol, maxRow, maxCol) {
        if (maxRow >= sheet.rowCount || maxCol >= sheet.colCount) return;
        if (maxRow === minRow && maxCol === minCol) return;
        sheet.tableData[minRow][minCol].merge = { rowspan: maxRow - minRow + 1, colspan: maxCol - minCol + 1 };
        for (let r = minRow; r <= maxRow; r++) {
            for (let c = minCol; c <= maxCol; c++) {
                if (r === minRow && c === minCol) continue;
                const cell = sheet.tableData[r][c];
                cell.value = "";
                cell.formula = null;
                cell.mergedTo = { row: minRow, col: minCol };
            }
        }
    }

    /* ---------- XLSX içe aktarım ---------- */

    const BUILTIN_DATE_FORMATS = new Set([14, 15, 16, 17, 22, 27, 30, 36, 45, 46, 47, 50, 57]);
    const BUILTIN_TIME_FORMATS = new Set([18, 19, 20, 21, 45, 46, 47]);

    function describeNumberFormat(id, code) {
        const cleaned = String(code ?? "").replace(/"[^"]*"/g, "").replace(/\[[^\]]*\]/g, "").replace(/\\./g, "");
        if (BUILTIN_TIME_FORMATS.has(id) || (/[hs]/i.test(cleaned) && !/[dy]/i.test(cleaned))) return { type: "time" };
        if (BUILTIN_DATE_FORMATS.has(id) || /[dy]/i.test(cleaned) || /m{3,}/i.test(cleaned)) return { type: "date", withTime: /h/i.test(cleaned) };
        if (id === 9 || id === 10 || cleaned.includes("%")) {
            return { type: "percent", decimals: (cleaned.match(/\.(0+)/)?.[1].length) ?? (id === 10 ? 2 : 0) };
        }
        if (/₺|TL/.test(String(code ?? ""))) return { type: "currency", decimals: (cleaned.match(/\.(0+)/)?.[1].length) ?? 2 };
        if ([2, 4].includes(id) || /0\.0+/.test(cleaned)) return { type: "number", decimals: (cleaned.match(/\.(0+)/)?.[1].length) ?? 2 };
        return null;
    }

    function readXlsxColor(element) {
        const rgb = attr(element, "rgb");
        if (rgb && /^[0-9a-f]{6,8}$/i.test(rgb)) return `#${rgb.slice(-6).toLowerCase()}`;
        return null;
    }

    function parseXlsxStyles(doc) {
        if (!doc) return [];
        const root = doc.documentElement;
        const customFormats = new Map(children(child(root, "numFmts"), "numFmt").map((item) => [Number(attr(item, "numFmtId")), attr(item, "formatCode")]));
        const fonts = children(child(root, "fonts"), "font").map((font) => {
            const underline = child(font, "u");
            return {
                bold: Boolean(child(font, "b")) && attr(child(font, "b"), "val") !== "0",
                italic: Boolean(child(font, "i")) && attr(child(font, "i"), "val") !== "0",
                underline: Boolean(underline) && attr(underline, "val") !== "none",
                strikeThrough: Boolean(child(font, "strike")) && attr(child(font, "strike"), "val") !== "0",
                fontSize: Math.round((Number(attr(child(font, "sz"), "val")) || 10) / 0.75),
                color: readXlsxColor(child(font, "color"))
            };
        });
        const fills = children(child(root, "fills"), "fill").map((fill) => {
            const pattern = child(fill, "patternFill");
            if (!pattern || attr(pattern, "patternType") !== "solid") return null;
            return readXlsxColor(child(pattern, "fgColor"));
        });
        const borders = children(child(root, "borders"), "border").map((border) => {
            const has = (name) => Boolean(attr(child(border, name), "style"));
            return { top: has("top"), right: has("right"), bottom: has("bottom"), left: has("left") };
        });

        return children(child(root, "cellXfs"), "xf").map((xf) => {
            const font = fonts[Number(attr(xf, "fontId")) || 0] ?? {};
            const numFmtId = Number(attr(xf, "numFmtId")) || 0;
            const alignment = child(xf, "alignment");
            const horizontal = attr(alignment, "horizontal");
            const vertical = attr(alignment, "vertical");
            const style = {
                bold: Boolean(font.bold),
                italic: Boolean(font.italic),
                underline: Boolean(font.underline),
                strikeThrough: Boolean(font.strikeThrough),
                fontSize: Math.max(8, Math.min(36, font.fontSize || DEFAULT_FONT_SIZE)),
                color: font.color && font.color !== "#000000" ? font.color : "#202124",
                backgroundColor: fills[Number(attr(xf, "fillId")) || 0] ?? "",
                horizontalAlign: ["center", "right", "justify"].includes(horizontal) ? horizontal : (horizontal === "centerContinuous" ? "center" : "left"),
                verticalAlign: vertical === "top" ? "top" : vertical === "bottom" || !vertical ? "bottom" : "middle"
            };
            if (style.backgroundColor === "#ffffff") style.backgroundColor = "";
            return {
                style,
                borders: borders[Number(attr(xf, "borderId")) || 0] ?? emptyBorders(),
                format: describeNumberFormat(numFmtId, customFormats.get(numFmtId))
            };
        });
    }

    function resolveZipPath(base, target) {
        if (target.startsWith("/")) return target.slice(1);
        const parts = base.split("/").slice(0, -1);
        target.split("/").forEach((part) => {
            if (part === "..") parts.pop();
            else if (part !== ".") parts.push(part);
        });
        return parts.join("/");
    }

    function readRichText(element) {
        const runs = children(element, "r");
        if (runs.length) return runs.map((run) => child(run, "t")?.textContent ?? "").join("");
        return child(element, "t")?.textContent ?? "";
    }

    async function importXlsx(buffer) {
        const zip = readZip(buffer);
        const workbookDoc = parseXml(await zip.text("xl/workbook.xml") ?? "");
        const relsText = await zip.text("xl/_rels/workbook.xml.rels");
        const rels = new Map();
        if (relsText) {
            children(parseXml(relsText).documentElement, "Relationship").forEach((rel) => {
                rels.set(attr(rel, "Id"), resolveZipPath("xl/workbook.xml", attr(rel, "Target")));
            });
        }
        const sharedText = await zip.text("xl/sharedStrings.xml");
        const sharedStrings = sharedText ? children(parseXml(sharedText).documentElement, "si").map(readRichText) : [];
        const stylesText = await zip.text("xl/styles.xml");
        const xfs = parseXlsxStyles(stylesText ? parseXml(stylesText) : null);
        const warnings = [];

        const sheetElements = descendants(workbookDoc.documentElement, "sheet");
        const sheets = [];
        for (const [index, sheetElement] of sheetElements.entries()) {
            const name = attr(sheetElement, "name") || `Sayfa${index + 1}`;
            const path = rels.get(attr(sheetElement, "r:id")) ?? `xl/worksheets/sheet${index + 1}.xml`;
            const xml = await zip.text(path);
            if (!xml) continue;
            sheets.push(parseXlsxSheet(parseXml(xml), name, sharedStrings, xfs, warnings));
        }

        if (!sheets.length) throw new Error("Dosyada sayfa bulunamadı.");
        const activeTab = Number(attr(descendants(workbookDoc.documentElement, "workbookView")[0], "activeTab")) || 0;
        return { sheets, activeSheetIndex: Math.min(activeTab, sheets.length - 1), warnings };
    }

    function parseXlsxSheet(doc, name, sharedStrings, xfs, warnings) {
        const root = doc.documentElement;
        const rowElements = descendants(child(root, "sheetData"), "row");
        let maxRow = 0;
        let maxCol = 0;
        const cells = [];
        const sharedFormulas = new Map();
        let truncated = false;

        rowElements.forEach((rowElement, rowPosition) => {
            const rowIndex = (Number(attr(rowElement, "r")) || rowPosition + 1) - 1;
            let colCursor = 0;
            children(rowElement, "c").forEach((cellElement) => {
                const position = parseCellRef(attr(cellElement, "r")) ?? { row: rowIndex, col: colCursor };
                colCursor = position.col + 1;
                if (position.row >= MAX_IMPORT_ROWS || position.col >= MAX_IMPORT_COLS) {
                    truncated = true;
                    return;
                }
                cells.push({ element: cellElement, ...position });
                maxRow = Math.max(maxRow, position.row);
                maxCol = Math.max(maxCol, position.col);
            });
        });

        const sheet = createSheet(name, maxRow + 1, maxCol + 1);

        cells.forEach(({ element, row, col }) => {
            const target = sheet.tableData[row][col];
            const type = attr(element, "t") ?? "n";
            const styleInfo = xfs[Number(attr(element, "s")) || 0];
            if (styleInfo) {
                target.style = { ...defaultStyle(), ...styleInfo.style };
                target.borders = { ...styleInfo.borders };
            }

            const valueText = child(element, "v")?.textContent ?? "";
            const formulaElement = child(element, "f");
            let formulaText = formulaElement?.textContent ?? "";

            if (formulaElement && attr(formulaElement, "t") === "shared") {
                const sharedIndex = attr(formulaElement, "si");
                if (formulaText) {
                    sharedFormulas.set(sharedIndex, { formula: `=${formulaText}`, row, col });
                } else if (sharedFormulas.has(sharedIndex)) {
                    const master = sharedFormulas.get(sharedIndex);
                    formulaText = F.mapReferences(master.formula, (ref) => {
                        const shift = (point) => {
                            if (point.row !== undefined && !point.rowAbs) point.row += row - master.row;
                            if (point.col !== undefined && !point.colAbs) point.col += col - master.col;
                            return point.row >= 0 && point.col >= 0;
                        };
                        if (!shift(ref.a) || (ref.b && !shift(ref.b))) return null;
                        return ref;
                    }).slice(1);
                }
            }
            if (formulaText) {
                target.formula = `=${formulaText.replace(/_xl(?:fn|ws)\./gi, "")}`;
            }

            let value = "";
            if (type === "s") {
                value = sharedStrings[Number(valueText)] ?? "";
            } else if (type === "inlineStr") {
                value = readRichText(child(element, "is"));
            } else if (type === "b") {
                value = valueText === "1" ? "DOĞRU" : "YANLIŞ";
            } else if (type === "str" || type === "e") {
                value = valueText;
            } else if (valueText !== "") {
                const number = Number(valueText);
                const format = styleInfo?.format;
                if (Number.isFinite(number) && format?.type === "date") {
                    value = serialToDateText(number, format.withTime && number % 1 !== 0);
                    if (!target.formula) target.style.numberFormat = "date";
                } else if (Number.isFinite(number) && format?.type === "time") {
                    value = serialToTimeText(number);
                    if (!target.formula) target.style.numberFormat = "time";
                } else {
                    value = Number.isFinite(number) ? F.numberToText(number) : valueText;
                    if (format && ["percent", "number", "currency"].includes(format.type)) {
                        target.style.numberFormat = format.type;
                        target.style.decimalPlaces = format.decimals;
                    }
                }
            }
            target.value = value;
        });

        children(child(root, "cols"), "col").forEach((colElement) => {
            const min = Number(attr(colElement, "min")) - 1;
            const max = Math.min(sheet.colCount, Number(attr(colElement, "max"))) - 1;
            const width = Number(attr(colElement, "width"));
            for (let c = min; c <= max && c < sheet.colCount; c++) {
                if (Number.isFinite(width) && width > 0) sheet.colWidths[c] = Math.max(48, Math.round(width * 7 + 5));
                if (attr(colElement, "hidden") === "1" || attr(colElement, "hidden") === "true") sheet.hiddenCols.push(c);
            }
        });

        rowElements.forEach((rowElement) => {
            const rowIndex = Number(attr(rowElement, "r")) - 1;
            if (!(rowIndex >= 0 && rowIndex < sheet.rowCount)) return;
            const height = Number(attr(rowElement, "ht"));
            if (Number.isFinite(height) && height > 0 && attr(rowElement, "customHeight") === "1") {
                sheet.rowHeights[rowIndex] = Math.max(22, Math.round(height / 0.75));
            }
            if (attr(rowElement, "hidden") === "1" || attr(rowElement, "hidden") === "true") sheet.hiddenRows.push(rowIndex);
        });

        descendants(child(root, "mergeCells"), "mergeCell").forEach((mergeElement) => {
            const [start, end] = String(attr(mergeElement, "ref")).split(":").map(parseCellRef);
            if (start && end) applyMerge(sheet, start.row, start.col, end.row, end.col);
        });

        const pane = descendants(root, "pane")[0];
        if (pane && attr(pane, "state") === "frozen") {
            sheet.frozenCols = Math.min(sheet.colCount, Number(attr(pane, "xSplit")) || 0);
            sheet.frozenRows = Math.min(sheet.rowCount, Number(attr(pane, "ySplit")) || 0);
        }

        if (truncated) warnings.push(`"${name}" sayfasının ${MAX_IMPORT_ROWS} satır / ${MAX_IMPORT_COLS} sütun dışındaki bölümü alınmadı.`);
        return sheet;
    }

    /* ---------- ODS dışa aktarım ---------- */

    function buildOds(payload) {
        const sheetNames = createSheetNameMap(payload.sheets);
        const cellStyles = new Map();
        const columnStyles = new Map();
        const rowStyles = new Map();
        const styleXml = [];

        const cellStyleFor = (cell, autoFormat) => {
            const style = cellStyle(cell);
            const borders = cellBorders(cell);
            const format = effectiveNumberFormat(style, autoFormat);
            const key = JSON.stringify([style.bold, style.italic, style.underline, style.strikeThrough, style.fontSize, style.color,
                style.backgroundColor, style.horizontalAlign, style.verticalAlign, borders, format]);
            if (cellStyles.has(key)) return cellStyles.get(key);

            const name = `ce${cellStyles.size + 1}`;
            let dataStyle = "";
            if (format.type !== "automatic") {
                const dataName = `N${cellStyles.size + 1}`;
                dataStyle = ` style:data-style-name="${dataName}"`;
                const decimals = format.decimals;
                if (format.type === "percent") {
                    styleXml.push(`<number:percentage-style style:name="${dataName}"><number:number number:decimal-places="${decimals}" number:min-integer-digits="1"/><number:text>%</number:text></number:percentage-style>`);
                } else if (format.type === "currency") {
                    styleXml.push(`<number:number-style style:name="${dataName}"><number:number number:decimal-places="${decimals}" number:min-integer-digits="1" number:grouping="true"/><number:text> ₺</number:text></number:number-style>`);
                } else if (format.type === "date") {
                    styleXml.push(`<number:date-style style:name="${dataName}"><number:day number:style="long"/><number:text>.</number:text><number:month number:style="long"/><number:text>.</number:text><number:year number:style="long"/></number:date-style>`);
                } else if (format.type === "time") {
                    dataStyle = "";
                } else {
                    styleXml.push(`<number:number-style style:name="${dataName}"><number:number number:decimal-places="${decimals}" number:min-integer-digits="1" number:grouping="true"/></number:number-style>`);
                }
            }

            const border = (on) => (on ? "0.75pt solid #000000" : "none");
            const textAlign = { center: "center", right: "end", justify: "justify" }[style.horizontalAlign] ?? "start";
            const verticalAlign = style.verticalAlign === "top" ? "top" : style.verticalAlign === "bottom" ? "bottom" : "middle";
            const textProps = [
                `fo:font-size="${pxToPt(Number(style.fontSize) || DEFAULT_FONT_SIZE)}pt"`,
                `fo:color="${colorHex(style.color) ? style.color : "#202124"}"`,
                style.bold ? 'fo:font-weight="bold"' : "",
                style.italic ? 'fo:font-style="italic"' : "",
                style.underline ? 'style:text-underline-style="solid" style:text-underline-width="auto" style:text-underline-color="font-color"' : "",
                style.strikeThrough ? 'style:text-line-through-style="solid"' : ""
            ].filter(Boolean).join(" ");
            styleXml.push(`<style:style style:name="${name}" style:family="table-cell" style:parent-style-name="Default"${dataStyle}>`
                + `<style:table-cell-properties fo:background-color="${colorHex(style.backgroundColor) ? style.backgroundColor : "transparent"}" style:vertical-align="${verticalAlign}" fo:border-top="${border(borders.top)}" fo:border-bottom="${border(borders.bottom)}" fo:border-left="${border(borders.left)}" fo:border-right="${border(borders.right)}"/>`
                + `<style:paragraph-properties fo:text-align="${textAlign}"/>`
                + `<style:text-properties ${textProps}/></style:style>`);
            cellStyles.set(key, name);
            return name;
        };

        const columnStyleFor = (width) => {
            const key = Math.round(width);
            if (!columnStyles.has(key)) {
                const name = `co${columnStyles.size + 1}`;
                columnStyles.set(key, name);
                styleXml.push(`<style:style style:name="${name}" style:family="table-column"><style:table-column-properties style:column-width="${(key / 96).toFixed(3)}in"/></style:style>`);
            }
            return columnStyles.get(key);
        };

        const rowStyleFor = (height) => {
            const key = Math.round(height);
            if (!rowStyles.has(key)) {
                const name = `ro${rowStyles.size + 1}`;
                rowStyles.set(key, name);
                styleXml.push(`<style:style style:name="${name}" style:family="table-row"><style:table-row-properties style:row-height="${(key / 96).toFixed(3)}in" style:use-optimal-row-height="false"/></style:style>`);
            }
            return rowStyles.get(key);
        };

        const tables = payload.sheets.map((sheet, sheetIndex) => {
            const bounds = getUsedBounds(sheet);
            const hiddenRows = new Set(sheet.hiddenRows ?? []);
            const hiddenCols = new Set(sheet.hiddenCols ?? []);
            const columns = [];
            for (let c = 0; c <= Math.max(0, bounds.maxCol); c++) {
                columns.push(`<table:table-column table:style-name="${columnStyleFor(sheet.colWidths?.[c] ?? DEFAULT_COL_WIDTH)}"${hiddenCols.has(c) ? ' table:visibility="collapse"' : ""} table:default-cell-style-name="Default"/>`);
            }

            const rows = [];
            for (let r = 0; r <= bounds.maxRow; r++) {
                const cells = [];
                for (let c = 0; c <= bounds.maxCol; c++) {
                    const cell = sheet.tableData[r]?.[c];
                    if (!cell || cell.mergedTo) {
                        cells.push("<table:covered-table-cell/>");
                        continue;
                    }
                    const classified = classifyValue(cell);
                    const styleName = cellStyleFor(cell, classified.autoFormat);
                    const span = cell.merge
                        ? ` table:number-columns-spanned="${cell.merge.colspan}" table:number-rows-spanned="${cell.merge.rowspan}"`
                        : "";
                    let formulaAttr = "";
                    if (cell.formula) {
                        const translated = F.translateFormula(cell.formula, { format: "openformula", sheetName: sheetNames.lookup });
                        if (translated) formulaAttr = ` table:formula="${xmlEscape(translated)}"`;
                    }
                    const noteXml = cell.note ? `<office:annotation><text:p>${xmlEscape(cell.note)}</text:p></office:annotation>` : "";
                    const paragraphs = (text) => String(text).split("\n").map((line) => `<text:p>${xmlEscape(line)}</text:p>`).join("");
                    if (classified.kind === "number") {
                        const valueAttrs = classified.autoFormat === "date" && !cell.formula
                            ? ` office:value-type="date" office:date-value="${new Date(EXCEL_EPOCH + classified.value * 86400000).toISOString().slice(0, 10)}"`
                            : effectiveNumberFormat(cellStyle(cell), classified.autoFormat).type === "percent"
                                ? ` office:value-type="percentage" office:value="${classified.value}"`
                                : ` office:value-type="float" office:value="${classified.value}"`;
                        cells.push(`<table:table-cell table:style-name="${styleName}"${span}${formulaAttr}${valueAttrs}>${noteXml}${paragraphs(cell.value)}</table:table-cell>`);
                    } else if (classified.kind === "bool") {
                        cells.push(`<table:table-cell table:style-name="${styleName}"${span}${formulaAttr} office:value-type="boolean" office:boolean-value="${classified.value}">${noteXml}${paragraphs(cell.value)}</table:table-cell>`);
                    } else if (classified.kind === "blank" && !formulaAttr) {
                        cells.push(`<table:table-cell table:style-name="${styleName}"${span}>${noteXml}</table:table-cell>`);
                    } else {
                        const text = formulaAttr ? cell.value : cell.formula ?? cell.value;
                        cells.push(`<table:table-cell table:style-name="${styleName}"${span}${formulaAttr} office:value-type="string">${noteXml}${paragraphs(text)}</table:table-cell>`);
                    }
                }
                rows.push(`<table:table-row table:style-name="${rowStyleFor(sheet.rowHeights?.[r] ?? DEFAULT_ROW_HEIGHT)}"${hiddenRows.has(r) ? ' table:visibility="collapse"' : ""}>${cells.join("") || "<table:table-cell/>"}</table:table-row>`);
            }
            if (!rows.length) rows.push("<table:table-row><table:table-cell/></table:table-row>");

            return `<table:table table:name="${xmlEscape(sheetNames.names[sheetIndex])}">${columns.join("")}${rows.join("")}</table:table>`;
        });

        const namespaces = 'xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0" xmlns:style="urn:oasis:names:tc:opendocument:xmlns:style:1.0" xmlns:text="urn:oasis:names:tc:opendocument:xmlns:text:1.0" xmlns:table="urn:oasis:names:tc:opendocument:xmlns:table:1.0" xmlns:fo="urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0" xmlns:number="urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0" xmlns:of="urn:oasis:names:tc:opendocument:xmlns:of:1.2"';
        const content = `<?xml version="1.0" encoding="UTF-8"?><office:document-content ${namespaces} office:version="1.2"><office:automatic-styles>${styleXml.join("")}</office:automatic-styles><office:body><office:spreadsheet>${tables.join("")}</office:spreadsheet></office:body></office:document-content>`;
        const styles = `<?xml version="1.0" encoding="UTF-8"?><office:document-styles ${namespaces} office:version="1.2"><office:styles><style:style style:name="Default" style:family="table-cell"><style:text-properties style:font-name="Arial" fo:font-size="10pt"/></style:style></office:styles></office:document-styles>`;

        return createZip([
            { name: "mimetype", data: "application/vnd.oasis.opendocument.spreadsheet" },
            {
                name: "META-INF/manifest.xml",
                data: `<?xml version="1.0" encoding="UTF-8"?><manifest:manifest xmlns:manifest="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0" manifest:version="1.2"><manifest:file-entry manifest:full-path="/" manifest:version="1.2" manifest:media-type="application/vnd.oasis.opendocument.spreadsheet"/><manifest:file-entry manifest:full-path="content.xml" manifest:media-type="text/xml"/><manifest:file-entry manifest:full-path="styles.xml" manifest:media-type="text/xml"/></manifest:manifest>`
            },
            { name: "content.xml", data: content },
            { name: "styles.xml", data: styles }
        ]);
    }

    /* ---------- ODS içe aktarım ---------- */

    function odsCellText(cellElement) {
        return children(cellElement, "p").map((paragraph) => {
            let text = "";
            const walk = (node) => {
                node.childNodes.forEach((childNode) => {
                    if (childNode.nodeType === 3) {
                        text += childNode.nodeValue;
                    } else if (childNode.nodeType === 1) {
                        if (childNode.localName === "s") text += " ".repeat(Number(attr(childNode, "text:c")) || 1);
                        else if (childNode.localName === "tab") text += "\t";
                        else if (childNode.localName === "line-break") text += "\n";
                        else if (childNode.localName !== "annotation") walk(childNode);
                    }
                });
            };
            walk(paragraph);
            return text;
        }).join("\n");
    }

    async function importOds(buffer) {
        const zip = readZip(buffer);
        const content = await zip.text("content.xml");
        if (!content) throw new Error("ODS içeriği bulunamadı.");
        const doc = parseXml(content);
        const warnings = [];
        const tables = descendants(doc.documentElement, "table").filter((table) => table.parentElement?.localName === "spreadsheet");

        const sheets = tables.map((table, index) => {
            const name = attr(table, "table:name") || `Sayfa${index + 1}`;
            const parsedRows = [];
            let rowIndex = 0;
            let maxCol = -1;
            let truncated = false;

            const rowElements = descendants(table, "table-row").filter((row) => {
                let parent = row.parentElement;
                while (parent && parent !== table) {
                    if (parent.localName === "table") return false;
                    parent = parent.parentElement;
                }
                return true;
            });

            rowElements.forEach((rowElement) => {
                const repeatRows = Math.max(1, Number(attr(rowElement, "table:number-rows-repeated")) || 1);
                const cells = [];
                let colIndex = 0;
                Array.from(rowElement.children).forEach((cellElement) => {
                    if (cellElement.localName !== "table-cell" && cellElement.localName !== "covered-table-cell") return;
                    const repeatCols = Math.max(1, Number(attr(cellElement, "table:number-columns-repeated")) || 1);
                    const isCovered = cellElement.localName === "covered-table-cell";
                    const text = isCovered ? "" : odsCellText(cellElement);
                    const formulaAttr = attr(cellElement, "table:formula");
                    const hasContent = !isCovered && (text !== "" || formulaAttr || attr(cellElement, "office:value-type"));
                    if (hasContent || attr(cellElement, "table:number-columns-spanned")) {
                        for (let i = 0; i < Math.min(repeatCols, MAX_IMPORT_COLS); i++) {
                            if (colIndex + i >= MAX_IMPORT_COLS) {
                                truncated = true;
                                break;
                            }
                            cells.push({ col: colIndex + i, element: cellElement, text, formula: formulaAttr });
                        }
                    }
                    colIndex += repeatCols;
                });

                const contentCells = cells.filter((cell) => cell.col < MAX_IMPORT_COLS);
                if (contentCells.length) {
                    for (let i = 0; i < repeatRows && rowIndex + i < MAX_IMPORT_ROWS; i++) {
                        parsedRows.push({ row: rowIndex + i, cells: contentCells });
                        maxCol = Math.max(maxCol, ...contentCells.map((cell) => cell.col));
                    }
                    if (rowIndex + repeatRows > MAX_IMPORT_ROWS) truncated = true;
                }
                rowIndex += repeatRows;
            });

            const maxRow = parsedRows.length ? parsedRows[parsedRows.length - 1].row : 0;
            const sheet = createSheet(name, maxRow + 1, maxCol + 1);
            const merges = [];

            parsedRows.forEach(({ row, cells }) => {
                cells.forEach(({ col, element, text, formula }) => {
                    const target = sheet.tableData[row][col];
                    const type = attr(element, "office:value-type");
                    if (formula) target.formula = F.fromOpenFormula(formula);
                    if (type === "float" || type === "currency") {
                        const number = Number(attr(element, "office:value"));
                        target.value = Number.isFinite(number) ? F.numberToText(number) : text;
                    } else if (type === "percentage") {
                        const number = Number(attr(element, "office:value"));
                        target.value = Number.isFinite(number) ? F.numberToText(number) : text;
                        target.style.numberFormat = "percent";
                        target.style.decimalPlaces = (text.match(/[.,](\d+)\s*%/)?.[1].length) ?? 0;
                    } else if (type === "date") {
                        const iso = attr(element, "office:date-value") ?? "";
                        const match = iso.match(/^(\d{4})-(\d{2})-(\d{2})/);
                        target.value = match ? `${match[3]}.${match[2]}.${match[1]}` : text;
                        target.style.numberFormat = "date";
                    } else if (type === "boolean") {
                        target.value = attr(element, "office:boolean-value") === "true" ? "DOĞRU" : "YANLIŞ";
                    } else {
                        target.value = text;
                    }
                    const colSpan = Number(attr(element, "table:number-columns-spanned")) || 1;
                    const rowSpan = Number(attr(element, "table:number-rows-spanned")) || 1;
                    if (colSpan > 1 || rowSpan > 1) merges.push([row, col, row + rowSpan - 1, col + colSpan - 1]);
                    const annotation = descendants(element, "annotation")[0];
                    if (annotation) target.note = children(annotation, "p").map((p) => p.textContent).join("\n");
                });
            });
            merges.forEach(([r1, c1, r2, c2]) => applyMerge(sheet, r1, c1, r2, c2));
            if (truncated) warnings.push(`"${name}" sayfasının ${MAX_IMPORT_ROWS} satır / ${MAX_IMPORT_COLS} sütun dışındaki bölümü alınmadı.`);
            return sheet;
        });

        if (!sheets.length) throw new Error("Dosyada sayfa bulunamadı.");
        return { sheets, activeSheetIndex: 0, warnings };
    }

    /* ---------- XLS (Excel 2003 XML) ---------- */

    function buildXmlSpreadsheet(payload) {
        const sheetNames = createSheetNameMap(payload.sheets);
        const styles = new Map();
        const styleXml = ['<Style ss:ID="Default" ss:Name="Normal"><Alignment ss:Vertical="Center"/><Font ss:FontName="Arial" ss:Size="10"/></Style>'];

        const styleFor = (cell, autoFormat) => {
            const style = cellStyle(cell);
            const borders = cellBorders(cell);
            const format = effectiveNumberFormat(style, autoFormat);
            const key = JSON.stringify([style.bold, style.italic, style.underline, style.strikeThrough, style.fontSize, style.color,
                style.backgroundColor, style.horizontalAlign, style.verticalAlign, borders, format]);
            if (styles.has(key)) return styles.get(key);
            const id = `s${styles.size + 1}`;
            const horizontal = { center: "Center", right: "Right", justify: "Justify" }[style.horizontalAlign] ?? "Left";
            const vertical = style.verticalAlign === "top" ? "Top" : style.verticalAlign === "bottom" ? "Bottom" : "Center";
            const side = (position, on) => (on ? `<Border ss:Position="${position}" ss:LineStyle="Continuous" ss:Weight="1"/>` : "");
            const code = excelNumberFormatCode(format);
            styleXml.push(`<Style ss:ID="${id}">`
                + `<Alignment ss:Horizontal="${horizontal}" ss:Vertical="${vertical}"${/\n/.test(cell?.value ?? "") ? ' ss:WrapText="1"' : ""}/>`
                + `<Borders>${side("Top", borders.top)}${side("Bottom", borders.bottom)}${side("Left", borders.left)}${side("Right", borders.right)}</Borders>`
                + `<Font ss:FontName="Arial" ss:Size="${pxToPt(Number(style.fontSize) || DEFAULT_FONT_SIZE)}" ss:Color="${colorHex(style.color) ? style.color : "#202124"}"${style.bold ? ' ss:Bold="1"' : ""}${style.italic ? ' ss:Italic="1"' : ""}${style.underline ? ' ss:Underline="Single"' : ""}${style.strikeThrough ? ' ss:StrikeThrough="1"' : ""}/>`
                + (colorHex(style.backgroundColor) ? `<Interior ss:Color="${style.backgroundColor}" ss:Pattern="Solid"/>` : "")
                + (code ? `<NumberFormat ss:Format="${xmlEscape(format.type === "date" ? "Short Date" : code)}"/>` : "")
                + `</Style>`);
            styles.set(key, id);
            return id;
        };

        const worksheets = payload.sheets.map((sheet, sheetIndex) => {
            const bounds = getUsedBounds(sheet);
            const rows = [];
            for (let r = 0; r <= bounds.maxRow; r++) {
                const cells = [];
                let expectedCol = 0;
                for (let c = 0; c <= bounds.maxCol; c++) {
                    const cell = sheet.tableData[r]?.[c];
                    if (!cell || cell.mergedTo) continue;
                    const classified = classifyValue(cell);
                    const attrs = [];
                    if (c !== expectedCol) attrs.push(`ss:Index="${c + 1}"`);
                    attrs.push(`ss:StyleID="${styleFor(cell, classified.autoFormat)}"`);
                    if (cell.merge?.colspan > 1) attrs.push(`ss:MergeAcross="${cell.merge.colspan - 1}"`);
                    if (cell.merge?.rowspan > 1) attrs.push(`ss:MergeDown="${cell.merge.rowspan - 1}"`);
                    if (cell.formula) {
                        const translated = F.translateFormula(cell.formula, { format: "r1c1", row: r, col: c, sheetName: sheetNames.lookup });
                        if (translated) attrs.push(`ss:Formula="${xmlEscape(translated)}"`);
                    }
                    let data = "";
                    if (classified.kind === "number") {
                        data = `<Data ss:Type="${classified.autoFormat === "date" && !cell.formula ? "DateTime" : "Number"}">${classified.autoFormat === "date" && !cell.formula
                            ? `${new Date(EXCEL_EPOCH + classified.value * 86400000).toISOString().slice(0, 10)}T00:00:00.000`
                            : classified.value}</Data>`;
                    } else if (classified.kind === "bool") {
                        data = `<Data ss:Type="Boolean">${classified.value ? 1 : 0}</Data>`;
                    } else if (classified.kind === "error") {
                        data = `<Data ss:Type="Error">${xmlEscape(errorToEnglish(classified.value))}</Data>`;
                    } else if (classified.kind === "string") {
                        data = `<Data ss:Type="String">${xmlEscape(classified.value).replace(/\n/g, "&#10;")}</Data>`;
                    }
                    const comment = cell.note ? `<Comment><Data>${xmlEscape(cell.note)}</Data></Comment>` : "";
                    cells.push(`<Cell ${attrs.join(" ")}>${data}${comment}</Cell>`);
                    expectedCol = c + (cell.merge?.colspan ?? 1);
                }
                const height = sheet.rowHeights?.[r] ?? DEFAULT_ROW_HEIGHT;
                rows.push(`<Row ss:Index="${r + 1}"${height !== DEFAULT_ROW_HEIGHT ? ` ss:Height="${pxToPt(height)}" ss:AutoFitHeight="0"` : ""}${(sheet.hiddenRows ?? []).includes(r) ? ' ss:Hidden="1"' : ""}>${cells.join("")}</Row>`);
            }
            const columns = [];
            for (let c = 0; c <= Math.max(0, bounds.maxCol); c++) {
                columns.push(`<Column ss:Index="${c + 1}" ss:Width="${pxToPt(sheet.colWidths?.[c] ?? DEFAULT_COL_WIDTH)}"${(sheet.hiddenCols ?? []).includes(c) ? ' ss:Hidden="1"' : ""}/>`);
            }
            return `<Worksheet ss:Name="${xmlEscape(sheetNames.names[sheetIndex])}"><Table>${columns.join("")}${rows.join("")}</Table></Worksheet>`;
        });

        return `<?xml version="1.0" encoding="UTF-8"?><?mso-application progid="Excel.Sheet"?>`
            + `<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" xmlns:html="http://www.w3.org/TR/REC-html40">`
            + `<DocumentProperties xmlns="urn:schemas-microsoft-com:office:office"><Author>awCELL</Author></DocumentProperties>`
            + `<Styles>${styleXml.join("")}</Styles>${worksheets.join("")}</Workbook>`;
    }

    /* ---------- CSV ---------- */

    function buildCsv(sheet, delimiter = ";") {
        const bounds = getUsedBounds(sheet, false);
        const lines = [];
        for (let r = 0; r <= bounds.maxRow; r++) {
            const fields = [];
            for (let c = 0; c <= bounds.maxCol; c++) {
                const text = String(sheet.tableData[r]?.[c]?.value ?? "");
                fields.push(/["\n\r]/.test(text) || text.includes(delimiter) ? `"${text.replace(/"/g, '""')}"` : text);
            }
            lines.push(fields.join(delimiter));
        }
        return `﻿${lines.join("\r\n")}\r\n`;
    }

    function detectDelimiter(text) {
        const sample = text.split(/\r?\n/).slice(0, 5).join("\n");
        const counts = [";", "\t", ","].map((delimiter) => {
            let count = 0;
            let quoted = false;
            for (const char of sample) {
                if (char === '"') quoted = !quoted;
                else if (!quoted && char === delimiter) count++;
            }
            return { delimiter, count };
        });
        counts.sort((a, b) => b.count - a.count);
        return counts[0].count ? counts[0].delimiter : ";";
    }

    /** CSV/TSV metnini satır dizisine çevirir (tırnaklı alanlar ve alan içi satır sonu desteklenir). */
    function parseDelimited(text, delimiter = detectDelimiter(text)) {
        const rows = [];
        let row = [];
        let field = "";
        let quoted = false;
        const source = text.replace(/^﻿/, "");

        for (let i = 0; i < source.length; i++) {
            const char = source[i];
            if (quoted) {
                if (char === '"') {
                    if (source[i + 1] === '"') {
                        field += '"';
                        i++;
                    } else {
                        quoted = false;
                    }
                } else {
                    field += char;
                }
                continue;
            }
            if (char === '"' && field === "") {
                quoted = true;
            } else if (char === delimiter) {
                row.push(field);
                field = "";
            } else if (char === "\n" || char === "\r") {
                if (char === "\r" && source[i + 1] === "\n") i++;
                row.push(field);
                rows.push(row);
                row = [];
                field = "";
            } else {
                field += char;
            }
        }
        if (field !== "" || row.length) {
            row.push(field);
            rows.push(row);
        }
        return rows;
    }

    function decodeText(bytes) {
        const utf8 = new TextDecoder("utf-8").decode(bytes);
        if (!utf8.includes("�")) return utf8;
        try {
            return new TextDecoder("windows-1254").decode(bytes);
        } catch {
            return utf8;
        }
    }

    function importCsv(buffer, name = "Sayfa1") {
        const text = decodeText(buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer));
        const rows = parseDelimited(text);
        const warnings = [];
        const rowTotal = Math.min(rows.length, MAX_IMPORT_ROWS);
        const colTotal = Math.min(Math.max(1, ...rows.map((row) => row.length)), MAX_IMPORT_COLS);
        if (rows.length > MAX_IMPORT_ROWS || rows.some((row) => row.length > MAX_IMPORT_COLS)) {
            warnings.push(`İlk ${MAX_IMPORT_ROWS} satır ve ${MAX_IMPORT_COLS} sütun alındı.`);
        }
        const sheet = createSheet(name, rowTotal, colTotal);
        for (let r = 0; r < rowTotal; r++) {
            for (let c = 0; c < Math.min(rows[r].length, MAX_IMPORT_COLS); c++) {
                const text = rows[r][c];
                if (text.startsWith("=") && text.length > 1) sheet.tableData[r][c].formula = text;
                else sheet.tableData[r][c].value = text;
            }
        }
        return { sheets: [sheet], activeSheetIndex: 0, warnings };
    }

    /* ---------- PDF (sayfa görüntülerinden) ---------- */

    /**
     * pages: [{ jpeg: Uint8Array, pixelWidth, pixelHeight, widthPt, heightPt }]
     * Her sayfa tam sayfa bir JPEG görüntüsüdür; Türkçe harfler görüntüye çizildiği için sorunsuz çıkar.
     */
    function buildPdf(pages, title = "awCELL") {
        const chunks = [];
        const offsets = [];
        let length = 0;
        const push = (data) => {
            const bytes = typeof data === "string" ? encoder.encode(data) : data;
            chunks.push(bytes);
            length += bytes.length;
        };
        const objectCount = 3 + pages.length * 3;
        const startObject = (id) => {
            offsets[id] = length;
            push(`${id} 0 obj\n`);
        };

        push("%PDF-1.4\n%\xE2\xE3\xCF\xD3\n");
        startObject(1);
        push("<< /Type /Catalog /Pages 2 0 R >>\nendobj\n");
        const pageIds = pages.map((_, index) => 4 + index * 3);
        startObject(2);
        push(`<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${pages.length} >>\nendobj\n`);
        startObject(3);
        const pdfTitle = Array.from(String(title)).map((char) => {
            const code = char.charCodeAt(0);
            return code < 128 && /[\w .-]/.test(char) ? char : "";
        }).join("") || "awCELL";
        push(`<< /Title (${pdfTitle}) /Producer (awCELL) >>\nendobj\n`);

        pages.forEach((page, index) => {
            const pageId = pageIds[index];
            const contentId = pageId + 1;
            const imageId = pageId + 2;
            const content = `q ${page.widthPt.toFixed(2)} 0 0 ${page.heightPt.toFixed(2)} 0 0 cm /Im0 Do Q`;
            startObject(pageId);
            push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${page.widthPt.toFixed(2)} ${page.heightPt.toFixed(2)}] /Resources << /XObject << /Im0 ${imageId} 0 R >> >> /Contents ${contentId} 0 R >>\nendobj\n`);
            startObject(contentId);
            push(`<< /Length ${content.length} >>\nstream\n${content}\nendstream\nendobj\n`);
            startObject(imageId);
            push(`<< /Type /XObject /Subtype /Image /Width ${page.pixelWidth} /Height ${page.pixelHeight} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${page.jpeg.length} >>\nstream\n`);
            push(page.jpeg);
            push("\nendstream\nendobj\n");
        });

        const xrefOffset = length;
        let xref = `xref\n0 ${objectCount + 1}\n0000000000 65535 f \n`;
        for (let id = 1; id <= objectCount; id++) {
            xref += `${String(offsets[id] ?? 0).padStart(10, "0")} 00000 n \n`;
        }
        push(xref);
        push(`trailer\n<< /Size ${objectCount + 1} /Root 1 0 R /Info 3 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`);
        return concatBytes(chunks);
    }

    /* ---------- Sayfa görüntüleri (PDF ve yazdırma) ---------- */

    const A4 = { widthPt: 595.28, heightPt: 841.89 };
    const PT_TO_PX = 96 / 72;

    function measurePrintLayout(sheet) {
        const bounds = getUsedBounds(sheet);
        const hiddenRows = new Set(sheet.hiddenRows ?? []);
        const hiddenCols = new Set(sheet.hiddenCols ?? []);
        const rows = [];
        const cols = [];
        for (let r = 0; r <= bounds.maxRow; r++) if (!hiddenRows.has(r)) rows.push(r);
        for (let c = 0; c <= bounds.maxCol; c++) if (!hiddenCols.has(c)) cols.push(c);
        return { bounds, rows, cols };
    }

    /**
     * Sayfayı A4 sayfalarına böler ve her sayfayı tuvale çizer.
     * options.formatCell(cell) → ekranda görünen metin; options.scale → çözünürlük çarpanı.
     * Dönüş: [{ canvas, widthPt, heightPt }]
     */
    function renderSheetPages(sheet, options) {
        const { rows, cols } = measurePrintLayout(sheet);
        if (!rows.length || !cols.length) return [];

        const colWidth = (c) => sheet.colWidths?.[c] ?? DEFAULT_COL_WIDTH;
        const rowHeight = (r) => sheet.rowHeights?.[r] ?? DEFAULT_ROW_HEIGHT;
        const totalWidth = cols.reduce((sum, c) => sum + colWidth(c), 0);
        const margin = 36 * PT_TO_PX;
        const headerSpace = 22;
        const portrait = { width: A4.widthPt * PT_TO_PX, height: A4.heightPt * PT_TO_PX };
        const landscape = { width: portrait.height, height: portrait.width };
        const usableWidth = (paper) => paper.width - margin * 2;
        const paper = totalWidth > usableWidth(portrait) ? landscape : portrait;
        const fit = Math.max(0.6, Math.min(1, usableWidth(paper) / totalWidth));
        const usableHeight = paper.height - margin * 2 - headerSpace * 2;

        const columnGroups = [];
        let group = [];
        let groupWidth = 0;
        cols.forEach((c) => {
            const width = colWidth(c) * fit;
            if (group.length && groupWidth + width > usableWidth(paper)) {
                columnGroups.push(group);
                group = [];
                groupWidth = 0;
            }
            group.push(c);
            groupWidth += width;
        });
        if (group.length) columnGroups.push(group);

        const rowGroups = [];
        group = [];
        let groupHeight = 0;
        rows.forEach((r) => {
            const height = rowHeight(r) * fit;
            if (group.length && groupHeight + height > usableHeight) {
                rowGroups.push(group);
                group = [];
                groupHeight = 0;
            }
            group.push(r);
            groupHeight += height;
        });
        if (group.length) rowGroups.push(group);

        const pages = [];
        const resolution = options?.scale ?? 2;
        columnGroups.forEach((colGroup) => {
            rowGroups.forEach((rowGroup) => {
                const canvas = (options?.createCanvas ?? (() => document.createElement("canvas")))();
                canvas.width = Math.round(paper.width * resolution);
                canvas.height = Math.round(paper.height * resolution);
                const ctx = canvas.getContext("2d");
                ctx.scale(resolution, resolution);
                ctx.fillStyle = "#ffffff";
                ctx.fillRect(0, 0, paper.width, paper.height);
                drawPage(ctx, sheet, rowGroup, colGroup, {
                    left: margin,
                    top: margin + headerSpace,
                    fit,
                    colWidth,
                    rowHeight,
                    formatCell: options?.formatCell ?? ((cell) => String(cell?.value ?? "")),
                    gridlines: options?.gridlines !== false
                });
                pages.push({ canvas, ctx, paper, margin, headerSpace });
            });
        });

        pages.forEach((page, index) => {
            const { ctx } = page;
            ctx.save();
            ctx.fillStyle = "#5f6368";
            ctx.font = "11px Arial, sans-serif";
            ctx.textBaseline = "alphabetic";
            ctx.textAlign = "left";
            ctx.fillText(String(sheet.name ?? ""), page.margin, page.margin + 12);
            ctx.textAlign = "center";
            ctx.fillText(`${index + 1} / ${pages.length}`, page.paper.width / 2, page.paper.height - page.margin + 18);
            ctx.restore();
        });

        return pages.map((page) => ({
            canvas: page.canvas,
            widthPt: page.paper.width / PT_TO_PX,
            heightPt: page.paper.height / PT_TO_PX
        }));
    }

    function drawPage(ctx, sheet, rowGroup, colGroup, layout) {
        const { fit } = layout;
        const xOf = new Map();
        const yOf = new Map();
        let x = layout.left;
        colGroup.forEach((c) => {
            xOf.set(c, x);
            x += layout.colWidth(c) * fit;
        });
        let y = layout.top;
        rowGroup.forEach((r) => {
            yOf.set(r, y);
            y += layout.rowHeight(r) * fit;
        });
        const colSet = new Set(colGroup);
        const rowSet = new Set(rowGroup);

        const spanWidth = (c, span) => {
            let width = 0;
            for (let i = c; i < c + span; i++) if (colSet.has(i)) width += layout.colWidth(i) * fit;
            return width;
        };
        const spanHeight = (r, span) => {
            let height = 0;
            for (let i = r; i < r + span; i++) if (rowSet.has(i)) height += layout.rowHeight(i) * fit;
            return height;
        };

        // Görünür bölgeye düşen birleştirilmiş hücrelerin sol üst köşesi sayfa dışında olabilir.
        const drawList = [];
        const seen = new Set();
        rowGroup.forEach((r) => {
            colGroup.forEach((c) => {
                let cell = sheet.tableData[r]?.[c];
                let row = r;
                let col = c;
                if (cell?.mergedTo) {
                    row = cell.mergedTo.row;
                    col = cell.mergedTo.col;
                    cell = sheet.tableData[row]?.[col];
                }
                const key = `${row}:${col}`;
                if (seen.has(key)) return;
                seen.add(key);
                const rowspan = cell?.merge?.rowspan ?? 1;
                const colspan = cell?.merge?.colspan ?? 1;
                const firstVisibleCol = colGroup.find((value) => value >= col && value < col + colspan);
                const firstVisibleRow = rowGroup.find((value) => value >= row && value < row + rowspan);
                drawList.push({
                    cell,
                    left: xOf.get(firstVisibleCol),
                    top: yOf.get(firstVisibleRow),
                    width: spanWidth(firstVisibleCol, col + colspan - firstVisibleCol),
                    height: spanHeight(firstVisibleRow, row + rowspan - firstVisibleRow)
                });
            });
        });

        drawList.forEach(({ cell, left, top, width, height }) => {
            const style = cellStyle(cell);
            if (colorHex(style.backgroundColor)) {
                ctx.fillStyle = style.backgroundColor;
                ctx.fillRect(left, top, width, height);
            }
        });

        if (layout.gridlines) {
            ctx.strokeStyle = "#d4d7dc";
            ctx.lineWidth = 0.6;
            drawList.forEach(({ left, top, width, height }) => {
                ctx.strokeRect(left, top, width, height);
            });
        }

        drawList.forEach(({ cell, left, top, width, height }) => {
            if (!cell) return;
            const text = layout.formatCell(cell);
            if (text === "") return;
            const style = cellStyle(cell);
            const fontSize = Math.max(6, (Number(style.fontSize) || DEFAULT_FONT_SIZE) * fit);
            ctx.save();
            ctx.beginPath();
            ctx.rect(left + 1, top + 1, width - 2, height - 2);
            ctx.clip();
            ctx.font = `${style.italic ? "italic " : ""}${style.bold ? "700 " : "400 "}${fontSize}px Arial, "Liberation Sans", sans-serif`;
            ctx.fillStyle = colorHex(style.color) ? style.color : "#202124";
            const lines = String(text).split(/\r\n|\r|\n/);
            const lineHeight = fontSize * 1.35;
            const blockHeight = lines.length * lineHeight;
            const padding = 5 * fit;
            let baseTop;
            if (style.verticalAlign === "top") baseTop = top + padding * 0.6;
            else if (style.verticalAlign === "bottom") baseTop = top + height - blockHeight - padding * 0.6;
            else baseTop = top + (height - blockHeight) / 2;
            const align = style.horizontalAlign;
            ctx.textBaseline = "middle";
            lines.forEach((line, index) => {
                const lineWidth = ctx.measureText(line).width;
                let textX = left + padding;
                if (align === "center") textX = left + (width - lineWidth) / 2;
                else if (align === "right") textX = left + width - padding - lineWidth;
                const textY = baseTop + lineHeight * index + lineHeight / 2;
                ctx.fillText(line, textX, textY);
                if (style.underline || style.strikeThrough) {
                    ctx.strokeStyle = ctx.fillStyle;
                    ctx.lineWidth = Math.max(0.6, fontSize / 14);
                    ctx.beginPath();
                    if (style.underline) {
                        ctx.moveTo(textX, textY + fontSize * 0.45);
                        ctx.lineTo(textX + lineWidth, textY + fontSize * 0.45);
                    }
                    if (style.strikeThrough) {
                        ctx.moveTo(textX, textY);
                        ctx.lineTo(textX + lineWidth, textY);
                    }
                    ctx.stroke();
                }
            });
            ctx.restore();
        });

        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 1;
        drawList.forEach(({ cell, left, top, width, height }) => {
            const borders = cellBorders(cell);
            ctx.beginPath();
            if (borders.top) {
                ctx.moveTo(left, top);
                ctx.lineTo(left + width, top);
            }
            if (borders.bottom) {
                ctx.moveTo(left, top + height);
                ctx.lineTo(left + width, top + height);
            }
            if (borders.left) {
                ctx.moveTo(left, top);
                ctx.lineTo(left, top + height);
            }
            if (borders.right) {
                ctx.moveTo(left + width, top);
                ctx.lineTo(left + width, top + height);
            }
            ctx.stroke();
        });
    }

    return {
        MAX_IMPORT_ROWS,
        MAX_IMPORT_COLS,
        xmlEscape,
        createZip,
        readZip,
        buildXlsx,
        importXlsx,
        buildOds,
        importOds,
        buildXmlSpreadsheet,
        buildCsv,
        parseDelimited,
        importCsv,
        buildPdf,
        renderSheetPages,
        getUsedBounds,
        dateTextToSerial,
        serialToDateText,
        classifyValue
    };
})(AwFormula);

export default AwFileIO;
