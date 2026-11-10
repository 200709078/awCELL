/*
 * awCELL formül motoru.
 *
 * Formül metni önce belirteçlere ayrılır, sonra ayrıştırılıp (AST) değerlendirilir; hiçbir aşamada
 * JavaScript kodu çalıştırılmaz. Excel ile aynı adlar (SUM, IF…) ve Türkçe Excel adları (TOPLA,
 * EĞER…) birlikte geçer; bağımsız değişken ayırıcısı "," ya da ";" olabilir.
 *
 * ES modülü: `import AwFormula from "./formula.js"` (uygulama ve Node testleri).
 */
const AwFormula = (function () {
    "use strict";

    /* ---------- Hatalar ---------- */

    const ERROR_TEXT = {
        DIV0: { tr: "#SAYI/0!", en: "#DIV/0!" },
        REF: { tr: "#BAŞV!", en: "#REF!" },
        NAME: { tr: "#AD?", en: "#NAME?" },
        VALUE: { tr: "#DEĞER!", en: "#VALUE!" },
        NA: { tr: "#YOK", en: "#N/A" },
        NUM: { tr: "#SAYI!", en: "#NUM!" },
        NULL: { tr: "#BOŞ!", en: "#NULL!" },
        CYCLE: { tr: "#DÖNGÜ!", en: "#REF!" }
    };

    class FormulaError {
        constructor(code) {
            this.code = code;
        }

        toString() {
            return ERROR_TEXT[this.code].tr;
        }
    }

    const ERRORS = Object.fromEntries(Object.keys(ERROR_TEXT).map((code) => [code, new FormulaError(code)]));
    const ERROR_LITERALS = new Map();
    Object.entries(ERROR_TEXT).forEach(([code, text]) => {
        ERROR_LITERALS.set(text.tr.toLocaleUpperCase("tr-TR"), code);
        if (code !== "CYCLE") ERROR_LITERALS.set(text.en.toUpperCase(), code);
    });
    const ERROR_DISPLAY_TEXTS = new Set(Object.values(ERROR_TEXT).flatMap((text) => [text.tr, text.en]));

    function isError(value) {
        return value instanceof FormulaError;
    }

    /* ---------- Sayılar ve metin ---------- */

    const NUMBER_RE = /^([+-]?)(\d+(?:[.,]\d+)?|[.,]\d+)(?:[eE]([+-]?\d+))?(%?)$/;
    const GROUPED_NUMBER_RE = /^([+-]?)(\d{1,3}(?:\.\d{3})+)(?:,(\d+))?(%?)$/;

    /** Hücreye yazılmış metni sayıya çevirir ("3,5", "3.5", "1.234,5", "%" destekli); sayı değilse null. */
    function parseNumber(text) {
        if (typeof text === "number") return Number.isFinite(text) ? text : null;
        const source = String(text ?? "").trim();
        if (!source) return null;

        let match = source.match(NUMBER_RE);
        if (match) {
            const exponent = match[3] !== undefined ? `e${match[3]}` : "";
            let number = Number(`${match[1]}${match[2].replace(",", ".")}${exponent}`);
            if (match[4]) number /= 100;
            return Number.isFinite(number) ? number : null;
        }

        match = source.match(GROUPED_NUMBER_RE);
        if (match) {
            let number = Number(`${match[1]}${match[2].replace(/\./g, "")}.${match[3] ?? "0"}`);
            if (match[4]) number /= 100;
            return Number.isFinite(number) ? number : null;
        }

        return null;
    }

    /** Hesaplanan sayıyı hücrede saklanacak biçime getirir (kayan nokta artıkları atılır). */
    function numberToStorage(number) {
        if (!Number.isFinite(number)) return ERRORS.NUM.toString();
        if (Object.is(number, -0) || number === 0) return "0";
        if (Number.isInteger(number) && Math.abs(number) < 1e21) return String(number);
        return String(Number(number.toPrecision(15)));
    }

    function numberToText(number) {
        return numberToStorage(number).replace(".", ",");
    }

    /** Değerlendirilen değeri hücrenin `value` alanına yazılacak metne çevirir. */
    function valueToStorage(value) {
        if (value === null || value === undefined) return "0";
        if (isError(value)) return value.toString();
        if (typeof value === "number") return numberToStorage(value);
        if (typeof value === "boolean") return value ? "DOĞRU" : "YANLIŞ";
        return String(value);
    }

    function isErrorText(text) {
        return ERROR_DISPLAY_TEXTS.has(String(text ?? ""));
    }

    /* ---------- Sütun adları ---------- */

    function columnToIndex(letters) {
        let index = 0;
        const upper = letters.toUpperCase();
        for (let i = 0; i < upper.length; i++) {
            index = index * 26 + (upper.charCodeAt(i) - 64);
        }
        return index - 1;
    }

    function indexToColumn(index) {
        let label = "";
        let current = index + 1;
        while (current > 0) {
            const remainder = (current - 1) % 26;
            label = String.fromCharCode(65 + remainder) + label;
            current = Math.floor((current - 1) / 26);
        }
        return label;
    }

    /* ---------- Belirteçler ---------- */

    const LETTERS = "A-Za-zÇĞİÖŞÜçğıöşü";
    const IDENT_RE = new RegExp(`^[${LETTERS}_][${LETTERS}0-9_.]*`);
    const IDENT_CHAR_RE = new RegExp(`[${LETTERS}0-9_.(!]`);
    const SHEET_RE = new RegExp(`^(?:'((?:[^']|'')+)'|([${LETTERS}0-9_.]+))!`);
    const CELL_RE = /^(\$?)([A-Za-z]{1,3})(\$?)(\d{1,7})(?::(\$?)([A-Za-z]{1,3})(\$?)(\d{1,7}))?/;
    const COLS_RE = /^(\$?)([A-Za-z]{1,3}):(\$?)([A-Za-z]{1,3})/;
    const ROWS_RE = /^(\$?)(\d{1,7}):(\$?)(\d{1,7})/;
    const NUMBER_TOKEN_RE = /^(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?/;
    const ERROR_TOKEN_RE = /^#(?:DIV\/0!|REF!|NAME\?|VALUE!|N\/A|NUM!|NULL!|SAYI\/0!|BAŞV!|AD\?|DEĞER!|YOK|SAYI!|BOŞ!|DÖNGÜ!)/i;
    const OPERATORS = ["<=", ">=", "<>", "+", "-", "*", "/", "^", "&", "=", "<", ">", "%"];

    function nextCharBlocksReference(source, index) {
        const next = source[index];
        return next !== undefined && IDENT_CHAR_RE.test(next);
    }

    function readReference(source, start) {
        let index = start;
        let sheet = null;
        const sheetMatch = source.slice(index).match(SHEET_RE);
        if (sheetMatch) {
            sheet = sheetMatch[1] !== undefined ? sheetMatch[1].replace(/''/g, "'") : sheetMatch[2];
            index += sheetMatch[0].length;
        }

        const rest = source.slice(index);
        let match = rest.match(CELL_RE);
        if (match && !nextCharBlocksReference(source, index + match[0].length)) {
            const a = {
                colAbs: Boolean(match[1]),
                col: columnToIndex(match[2]),
                rowAbs: Boolean(match[3]),
                row: Number(match[4]) - 1
            };
            if (a.row < 0) return null;
            if (match[6] === undefined) {
                return { end: index + match[0].length, ref: { sheet, kind: "cell", a } };
            }
            const b = {
                colAbs: Boolean(match[5]),
                col: columnToIndex(match[6]),
                rowAbs: Boolean(match[7]),
                row: Number(match[8]) - 1
            };
            if (b.row < 0) return null;
            return { end: index + match[0].length, ref: { sheet, kind: "range", a, b } };
        }

        match = rest.match(COLS_RE);
        if (match && !nextCharBlocksReference(source, index + match[0].length)) {
            return {
                end: index + match[0].length,
                ref: {
                    sheet,
                    kind: "cols",
                    a: { colAbs: Boolean(match[1]), col: columnToIndex(match[2]) },
                    b: { colAbs: Boolean(match[3]), col: columnToIndex(match[4]) }
                }
            };
        }

        match = rest.match(ROWS_RE);
        if (match && (sheet || start === index) && !nextCharBlocksReference(source, index + match[0].length)) {
            const a = { rowAbs: Boolean(match[1]), row: Number(match[2]) - 1 };
            const b = { rowAbs: Boolean(match[3]), row: Number(match[4]) - 1 };
            if (a.row < 0 || b.row < 0) return null;
            return { end: index + match[0].length, ref: { sheet, kind: "rows", a, b } };
        }

        return null;
    }

    /** Tırnak dışında ";" var mı? Varsa formül Türkçe Excel yazımındadır: "," ondalık ayırıcıdır. */
    function usesSemicolonSeparator(source) {
        let quoted = false;
        for (const char of source) {
            if (char === '"') quoted = !quoted;
            else if (char === ";" && !quoted) return true;
        }
        return false;
    }

    function tokenize(source) {
        const tokens = [];
        let index = 0;
        let depth = 0;
        const semicolonMode = usesSemicolonSeparator(source);

        while (index < source.length) {
            const char = source[index];
            if (/\s/.test(char)) {
                index++;
                continue;
            }

            const start = index;
            const rest = source.slice(index);

            if (char === '"') {
                let value = "";
                index++;
                let closed = false;
                while (index < source.length) {
                    if (source[index] === '"') {
                        if (source[index + 1] === '"') {
                            value += '"';
                            index += 2;
                            continue;
                        }
                        index++;
                        closed = true;
                        break;
                    }
                    value += source[index];
                    index++;
                }
                if (!closed) throw new SyntaxError("Kapanmamış metin");
                tokens.push({ type: "str", value, start, end: index });
                continue;
            }

            const errorMatch = rest.match(ERROR_TOKEN_RE);
            if (errorMatch) {
                index += errorMatch[0].length;
                tokens.push({
                    type: "err",
                    code: ERROR_LITERALS.get(errorMatch[0].toLocaleUpperCase("tr-TR")) ?? ERROR_LITERALS.get(errorMatch[0].toUpperCase()) ?? "NAME",
                    start,
                    end: index
                });
                continue;
            }

            // Hücre başvurusu sayıdan önce denenir: "1:3" bir satır aralığıdır.
            const previous = tokens[tokens.length - 1];
            const canStartOperand = !previous || ["op", "lparen", "sep", "func"].includes(previous.type);
            if (canStartOperand && (/[A-Za-z$'0-9ÇĞİÖŞÜçğıöşü_]/.test(char))) {
                const reference = readReference(source, index);
                if (reference) {
                    index = reference.end;
                    tokens.push({ type: "ref", ref: reference.ref, start, end: index });
                    continue;
                }
            }

            const numberMatch = rest.match(NUMBER_TOKEN_RE);
            if (numberMatch) {
                let text = numberMatch[0];
                // "2,5": ";" kullanan formülde ya da işlev dışında virgül ondalıktır (=A1*0,5).
                const decimalMatch = /^\d+$/.test(text) && (semicolonMode || depth === 0)
                    ? rest.slice(text.length).match(/^,(\d+)(?:[eE][+-]?\d+)?/)
                    : null;
                if (decimalMatch) text += decimalMatch[0];
                index += text.length;
                tokens.push({ type: "num", value: Number(text.replace(",", ".")), start, end: index });
                continue;
            }

            const identMatch = rest.match(IDENT_RE);
            if (identMatch) {
                index += identMatch[0].length;
                let lookahead = index;
                while (lookahead < source.length && /\s/.test(source[lookahead])) lookahead++;
                const isFunction = source[lookahead] === "(";
                tokens.push({ type: isFunction ? "func" : "name", name: identMatch[0], start, end: index });
                continue;
            }

            if (char === "(") {
                depth++;
                tokens.push({ type: "lparen", start, end: ++index });
                continue;
            }
            if (char === ")") {
                depth = Math.max(0, depth - 1);
                tokens.push({ type: "rparen", start, end: ++index });
                continue;
            }
            if (char === "," || char === ";") {
                tokens.push({ type: "sep", start, end: ++index });
                continue;
            }

            const operator = OPERATORS.find((op) => source.startsWith(op, index));
            if (operator) {
                index += operator.length;
                tokens.push({ type: "op", op: operator, start, end: index });
                continue;
            }

            throw new SyntaxError(`Beklenmeyen karakter: ${char}`);
        }

        return tokens;
    }

    /* ---------- Ayrıştırıcı ---------- */

    const BINARY_PRECEDENCE = {
        "=": 1, "<>": 1, "<": 1, ">": 1, "<=": 1, ">=": 1,
        "&": 2,
        "+": 3, "-": 3,
        "*": 4, "/": 4,
        "^": 5
    };

    function parseTokens(tokens) {
        let position = 0;
        const peek = () => tokens[position];
        const take = () => tokens[position++];

        function parseExpression(minPrecedence) {
            let left = parseUnary();

            while (true) {
                const token = peek();
                if (!token || token.type !== "op") break;
                const precedence = BINARY_PRECEDENCE[token.op];
                if (!precedence || precedence < minPrecedence) break;
                take();
                const right = parseExpression(precedence + 1);
                left = { type: "binary", op: token.op, left, right };
            }

            return left;
        }

        function parseUnary() {
            const token = peek();
            if (token?.type === "op" && (token.op === "-" || token.op === "+")) {
                take();
                return { type: "unary", op: token.op, operand: parseUnary() };
            }
            return parsePostfix();
        }

        function parsePostfix() {
            let node = parsePrimary();
            while (peek()?.type === "op" && peek().op === "%") {
                take();
                node = { type: "percent", operand: node };
            }
            return node;
        }

        function parsePrimary() {
            const token = take();
            if (!token) throw new SyntaxError("Eksik ifade");

            switch (token.type) {
                case "num":
                    return { type: "num", value: token.value };
                case "str":
                    return { type: "str", value: token.value };
                case "err":
                    return { type: "err", code: token.code };
                case "ref":
                    return { type: "ref", ref: token.ref };
                case "name": {
                    const key = normalizeName(token.name);
                    if (key === "TRUE" || key === "DOĞRU") return { type: "bool", value: true };
                    if (key === "FALSE" || key === "YANLIŞ") return { type: "bool", value: false };
                    return { type: "name", name: token.name };
                }
                case "func": {
                    if (take()?.type !== "lparen") throw new SyntaxError("Parantez bekleniyordu");
                    const args = [];
                    if (peek()?.type === "rparen") {
                        take();
                        return { type: "call", name: token.name, args };
                    }
                    while (true) {
                        if (peek()?.type === "sep" || peek()?.type === "rparen") {
                            args.push({ type: "missing" });
                        } else {
                            args.push(parseExpression(1));
                        }
                        const next = take();
                        if (next?.type === "rparen") break;
                        if (next?.type !== "sep") throw new SyntaxError("Ayırıcı bekleniyordu");
                    }
                    return { type: "call", name: token.name, args };
                }
                case "lparen": {
                    const inner = parseExpression(1);
                    if (take()?.type !== "rparen") throw new SyntaxError("Kapanmamış parantez");
                    return inner;
                }
                default:
                    throw new SyntaxError("Beklenmeyen belirteç");
            }
        }

        const ast = parseExpression(1);
        if (position < tokens.length) throw new SyntaxError("Fazla belirteç");
        return ast;
    }

    const parseCache = new Map();

    /** "=..." formülünü ayrıştırır; sözdizimi hatasında { error } döner. */
    function parse(formula) {
        const source = String(formula ?? "");
        if (parseCache.has(source)) return parseCache.get(source);

        let result;
        try {
            const body = source.startsWith("=") ? source.slice(1) : source;
            if (!body.trim()) throw new SyntaxError("Boş formül");
            result = { ast: parseTokens(tokenize(body)) };
        } catch (error) {
            result = { error: ERRORS.NAME, message: error.message };
        }

        if (parseCache.size > 5000) parseCache.clear();
        parseCache.set(source, result);
        return result;
    }

    /* ---------- İşlevler ---------- */

    function normalizeName(name) {
        return String(name).toLocaleUpperCase("tr-TR").replace(/İ/g, "I");
    }

    const FUNCTIONS = new Map();
    const CANONICAL_NAMES = new Map();

    function define(name, aliases, implementation) {
        const entry = { name, implementation };
        [name, ...aliases].forEach((alias) => {
            FUNCTIONS.set(normalizeName(alias), entry);
        });
        CANONICAL_NAMES.set(normalizeName(name), name);
    }

    function lookupFunction(name) {
        const key = normalizeName(String(name).replace(/^_xl(?:fn|ws)\./i, ""));
        return FUNCTIONS.get(key) ?? null;
    }

    function roundHalfAwayFromZero(number, digits) {
        const factor = Math.trunc(digits);
        const sign = number < 0 ? -1 : 1;
        const shifted = Number(`${Math.abs(number)}e${factor}`);
        return sign * Number(`${Math.round(shifted)}e${-factor}`);
    }

    function roundWith(number, digits, method) {
        const factor = 10 ** Math.trunc(digits);
        const sign = number < 0 ? -1 : 1;
        const scaled = Number((Math.abs(number) * factor).toPrecision(15));
        return (sign * method(scaled)) / factor;
    }

    function wildcardToRegExp(pattern) {
        let source = "";
        for (let i = 0; i < pattern.length; i++) {
            const char = pattern[i];
            if (char === "~" && i + 1 < pattern.length) {
                source += pattern[++i].replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            } else if (char === "*") {
                source += ".*";
            } else if (char === "?") {
                source += ".";
            } else {
                source += char.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            }
        }
        return new RegExp(`^${source}$`, "i");
    }

    const collator = new Intl.Collator("tr-TR", { sensitivity: "base", numeric: false });

    function textEquals(a, b) {
        return collator.compare(a, b) === 0;
    }

    function createCriteria(criteria) {
        if (isError(criteria)) return () => false;
        if (typeof criteria === "number" || typeof criteria === "boolean") {
            return (value) => {
                const number = typeof value === "number" ? value : parseNumber(value);
                return typeof criteria === "boolean" ? value === criteria : number === criteria;
            };
        }

        const text = criteria === null ? "" : String(criteria);
        const match = text.match(/^(<=|>=|<>|<|>|=)?([\s\S]*)$/);
        const operator = match[1] ?? "=";
        const operand = match[2];
        const operandNumber = parseNumber(operand);

        return (value) => {
            const isBlank = value === null || value === "";
            if (operandNumber !== null && operator !== "=" && operator !== "<>") {
                const number = typeof value === "number" ? value : null;
                if (number === null) return false;
                if (operator === "<") return number < operandNumber;
                if (operator === ">") return number > operandNumber;
                if (operator === "<=") return number <= operandNumber;
                return number >= operandNumber;
            }

            if (operator === "<" || operator === ">" || operator === "<=" || operator === ">=") {
                if (typeof value !== "string" || isBlank) return false;
                const order = collator.compare(value, operand);
                if (operator === "<") return order < 0;
                if (operator === ">") return order > 0;
                if (operator === "<=") return order <= 0;
                return order >= 0;
            }

            let equal;
            if (operand === "") {
                equal = isBlank;
            } else if (operandNumber !== null && (typeof value === "number" || parseNumber(value) !== null)) {
                equal = (typeof value === "number" ? value : parseNumber(value)) === operandNumber;
            } else if (/[*?]/.test(operand)) {
                equal = !isBlank && typeof value !== "number" && wildcardToRegExp(operand).test(String(value));
            } else {
                equal = !isBlank && typeof value === "string" && textEquals(value, operand);
            }
            return operator === "<>" ? !equal : equal;
        };
    }

    function formatDate(date, withTime) {
        const pad = (number) => String(number).padStart(2, "0");
        const datePart = `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()}`;
        return withTime ? `${datePart} ${pad(date.getHours())}:${pad(date.getMinutes())}` : datePart;
    }

    function properCase(text) {
        return text.toLocaleLowerCase("tr-TR").replace(/(^|[^A-Za-zÇĞİÖŞÜçğıöşü])([a-zçğıöşü])/g,
            (_, before, letter) => before + letter.toLocaleUpperCase("tr-TR"));
    }

    // Toplama ve istatistik
    define("SUM", ["TOPLA"], (args, cx) => {
        let total = 0;
        for (const value of cx.numbers(args)) {
            if (isError(value)) return value;
            total += value;
        }
        return total;
    });
    define("AVERAGE", ["ORTALAMA", "AVG"], (args, cx) => {
        let total = 0;
        let count = 0;
        for (const value of cx.numbers(args)) {
            if (isError(value)) return value;
            total += value;
            count++;
        }
        return count ? total / count : ERRORS.DIV0;
    });
    define("COUNT", ["BAĞ_DEĞ_SAY", "SAY"], (args, cx) => {
        let count = 0;
        for (const item of cx.items(args)) {
            if (item.fromRange ? typeof item.value === "number" : cx.toNumberOrNull(item.value) !== null) count++;
        }
        return count;
    });
    define("COUNTA", ["BAĞ_DEĞ_DOLU_SAY"], (args, cx) => {
        let count = 0;
        for (const item of cx.items(args)) {
            if (item.value !== null && !(item.fromRange && item.value === "")) count++;
        }
        return count;
    });
    define("COUNTBLANK", ["BOŞLUKSAY"], (args, cx) => {
        let count = 0;
        for (const item of cx.items(args)) {
            if (item.value === null || item.value === "") count++;
        }
        return count;
    });
    define("MIN", ["MİN"], (args, cx) => {
        let result = null;
        for (const value of cx.numbers(args)) {
            if (isError(value)) return value;
            result = result === null ? value : Math.min(result, value);
        }
        return result ?? 0;
    });
    define("MAX", ["MAK"], (args, cx) => {
        let result = null;
        for (const value of cx.numbers(args)) {
            if (isError(value)) return value;
            result = result === null ? value : Math.max(result, value);
        }
        return result ?? 0;
    });
    define("PRODUCT", ["ÇARPIM"], (args, cx) => {
        let result = null;
        for (const value of cx.numbers(args)) {
            if (isError(value)) return value;
            result = (result ?? 1) * value;
        }
        return result ?? 0;
    });
    define("MEDIAN", ["ORTANCA"], (args, cx) => {
        const values = [];
        for (const value of cx.numbers(args)) {
            if (isError(value)) return value;
            values.push(value);
        }
        if (!values.length) return ERRORS.NUM;
        values.sort((a, b) => a - b);
        const middle = Math.floor(values.length / 2);
        return values.length % 2 ? values[middle] : (values[middle - 1] + values[middle]) / 2;
    });
    define("STDEV", ["STDEV.S", "STDSAPMA", "STDSAPMA.S"], (args, cx) => {
        const values = [];
        for (const value of cx.numbers(args)) {
            if (isError(value)) return value;
            values.push(value);
        }
        if (values.length < 2) return ERRORS.DIV0;
        const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
        const variance = values.reduce((sum, value) => sum + (value - mean) ** 2, 0) / (values.length - 1);
        return Math.sqrt(variance);
    });
    define("LARGE", ["BÜYÜK"], (args, cx) => {
        if (args.length !== 2) return ERRORS.VALUE;
        const values = [];
        for (const value of cx.numbers([args[0]])) {
            if (isError(value)) return value;
            values.push(value);
        }
        const k = cx.number(args[1]);
        if (isError(k)) return k;
        values.sort((a, b) => b - a);
        return k >= 1 && k <= values.length ? values[Math.ceil(k) - 1] : ERRORS.NUM;
    });
    define("SMALL", ["KÜÇÜK"], (args, cx) => {
        if (args.length !== 2) return ERRORS.VALUE;
        const values = [];
        for (const value of cx.numbers([args[0]])) {
            if (isError(value)) return value;
            values.push(value);
        }
        const k = cx.number(args[1]);
        if (isError(k)) return k;
        values.sort((a, b) => a - b);
        return k >= 1 && k <= values.length ? values[Math.ceil(k) - 1] : ERRORS.NUM;
    });
    define("RANK", ["RANK.EQ", "RANK.EŞİT"], (args, cx) => {
        if (args.length < 2) return ERRORS.VALUE;
        const number = cx.number(args[0]);
        if (isError(number)) return number;
        const values = [];
        for (const value of cx.numbers([args[1]])) {
            if (isError(value)) return value;
            values.push(value);
        }
        const ascending = args[2] ? cx.number(args[2]) : 0;
        if (isError(ascending)) return ascending;
        if (!values.includes(number)) return ERRORS.NA;
        return 1 + values.filter((value) => (ascending ? value < number : value > number)).length;
    });

    // Matematik
    const unaryMath = (method, check) => (args, cx) => {
        if (args.length !== 1) return ERRORS.VALUE;
        const number = cx.number(args[0]);
        if (isError(number)) return number;
        if (check && !check(number)) return ERRORS.NUM;
        return method(number);
    };
    define("ABS", ["MUTLAK"], unaryMath(Math.abs));
    define("SQRT", ["KAREKÖK"], unaryMath(Math.sqrt, (n) => n >= 0));
    define("INT", ["TAMSAYI"], unaryMath(Math.floor));
    define("SIGN", ["İŞARET"], unaryMath(Math.sign));
    define("EXP", ["ÜS"], unaryMath(Math.exp));
    define("LN", [], unaryMath(Math.log, (n) => n > 0));
    define("LOG10", [], unaryMath(Math.log10, (n) => n > 0));
    define("LOG", [], (args, cx) => {
        const number = cx.number(args[0]);
        const base = args[1] ? cx.number(args[1]) : 10;
        if (isError(number)) return number;
        if (isError(base)) return base;
        if (number <= 0 || base <= 0 || base === 1) return ERRORS.NUM;
        return Math.log(number) / Math.log(base);
    });
    define("PI", ["Pİ"], () => Math.PI);
    define("POWER", ["KUVVET"], (args, cx) => {
        const base = cx.number(args[0]);
        const exponent = cx.number(args[1]);
        if (isError(base)) return base;
        if (isError(exponent)) return exponent;
        const result = base ** exponent;
        return Number.isFinite(result) ? result : ERRORS.NUM;
    });
    define("MOD", [], (args, cx) => {
        const number = cx.number(args[0]);
        const divisor = cx.number(args[1]);
        if (isError(number)) return number;
        if (isError(divisor)) return divisor;
        if (divisor === 0) return ERRORS.DIV0;
        return number - divisor * Math.floor(number / divisor);
    });
    const roundingFunction = (mode) => (args, cx) => {
        const number = cx.number(args[0]);
        const digits = args[1] && args[1].type !== "missing" ? cx.number(args[1]) : 0;
        if (isError(number)) return number;
        if (isError(digits)) return digits;
        if (mode === "round") return roundHalfAwayFromZero(number, digits);
        if (mode === "up") return roundWith(number, digits, Math.ceil);
        return roundWith(number, digits, Math.floor);
    };
    define("ROUND", ["YUVARLA"], roundingFunction("round"));
    define("ROUNDUP", ["YUKARIYUVARLA"], roundingFunction("up"));
    define("ROUNDDOWN", ["AŞAĞIYUVARLA"], roundingFunction("down"));
    define("TRUNC", ["NSAT"], roundingFunction("down"));
    define("RAND", ["S_SAYI_ÜRET"], () => Math.random());
    define("RANDBETWEEN", ["RASTGELEARADA"], (args, cx) => {
        const low = cx.number(args[0]);
        const high = cx.number(args[1]);
        if (isError(low)) return low;
        if (isError(high)) return high;
        const min = Math.ceil(low);
        const max = Math.floor(high);
        if (max < min) return ERRORS.NUM;
        return min + Math.floor(Math.random() * (max - min + 1));
    });

    // Mantık
    define("IF", ["EĞER"], (args, cx) => {
        if (args.length < 1 || args.length > 3) return ERRORS.VALUE;
        const condition = cx.boolean(args[0]);
        if (isError(condition)) return condition;
        const branch = condition ? args[1] : args[2];
        if (!branch) return false;
        if (branch.type === "missing") return 0;
        return cx.scalar(branch);
    });
    define("IFERROR", ["EĞERHATA"], (args, cx) => {
        const value = cx.scalar(args[0]);
        return isError(value) ? cx.scalar(args[1] ?? { type: "missing" }) : value;
    });
    const logicalFold = (initial, combine) => (args, cx) => {
        let result = null;
        for (const item of cx.items(args)) {
            if (isError(item.value)) return item.value;
            if (item.value === null || (item.fromRange && typeof item.value === "string")) continue;
            const value = cx.toBoolean(item.value);
            if (isError(value)) return value;
            result = result === null ? combine(initial, value) : combine(result, value);
        }
        return result ?? ERRORS.VALUE;
    };
    define("AND", ["VE"], logicalFold(true, (a, b) => a && b));
    define("OR", ["YADA"], logicalFold(false, (a, b) => a || b));
    define("NOT", ["DEĞİL"], (args, cx) => {
        const value = cx.boolean(args[0]);
        return isError(value) ? value : !value;
    });
    define("TRUE", ["DOĞRU"], () => true);
    define("FALSE", ["YANLIŞ"], () => false);
    define("ISBLANK", ["EBOŞSA"], (args, cx) => cx.scalar(args[0]) === null);
    define("ISNUMBER", ["ESAYIYSA"], (args, cx) => typeof cx.scalar(args[0]) === "number");
    define("ISTEXT", ["EMETİNSE"], (args, cx) => typeof cx.scalar(args[0]) === "string");
    define("ISERROR", ["EHATALIYSA"], (args, cx) => isError(cx.scalar(args[0])));

    // Metin
    const textFunction = (method) => (args, cx) => {
        const text = cx.text(args[0]);
        return isError(text) ? text : method(text);
    };
    define("LEN", ["UZUNLUK"], textFunction((text) => [...text].length));
    define("UPPER", ["BÜYÜKHARF"], textFunction((text) => text.toLocaleUpperCase("tr-TR")));
    define("LOWER", ["KÜÇÜKHARF"], textFunction((text) => text.toLocaleLowerCase("tr-TR")));
    define("PROPER", ["YAZIM.DÜZENİ"], textFunction(properCase));
    define("TRIM", ["KIRP"], textFunction((text) => text.replace(/ +/g, " ").trim()));
    define("VALUE", ["SAYIYAÇEVİR"], textFunction((text) => parseNumber(text) ?? ERRORS.VALUE));
    define("LEFT", ["SOLDAN"], (args, cx) => {
        const text = cx.text(args[0]);
        const count = args[1] ? cx.number(args[1]) : 1;
        if (isError(text)) return text;
        if (isError(count)) return count;
        return count < 0 ? ERRORS.VALUE : [...text].slice(0, Math.floor(count)).join("");
    });
    define("RIGHT", ["SAĞDAN"], (args, cx) => {
        const text = cx.text(args[0]);
        const count = args[1] ? cx.number(args[1]) : 1;
        if (isError(text)) return text;
        if (isError(count)) return count;
        if (count < 0) return ERRORS.VALUE;
        const chars = [...text];
        return Math.floor(count) === 0 ? "" : chars.slice(-Math.floor(count)).join("");
    });
    define("MID", ["PARÇAAL"], (args, cx) => {
        const text = cx.text(args[0]);
        const start = cx.number(args[1]);
        const count = cx.number(args[2]);
        if (isError(text)) return text;
        if (isError(start)) return start;
        if (isError(count)) return count;
        if (start < 1 || count < 0) return ERRORS.VALUE;
        return [...text].slice(Math.floor(start) - 1, Math.floor(start) - 1 + Math.floor(count)).join("");
    });
    const concatenate = (args, cx) => {
        let result = "";
        for (const item of cx.items(args)) {
            if (isError(item.value)) return item.value;
            result += cx.toText(item.value);
        }
        return result;
    };
    define("CONCATENATE", ["BİRLEŞTİR"], concatenate);
    define("CONCAT", ["ARALIKBİRLEŞTİR"], concatenate);

    // Koşullu toplama ve sayma
    function conditionalPairs(cx, args, startIndex) {
        const pairs = [];
        for (let i = startIndex; i + 1 < args.length; i += 2) {
            const range = cx.matrix(args[i]);
            if (isError(range)) return range;
            pairs.push({ range, test: createCriteria(cx.scalar(args[i + 1])) });
        }
        return pairs;
    }

    function matchesAll(pairs, rowIndex, colIndex) {
        return pairs.every(({ range, test }) => {
            const row = range[rowIndex];
            return row !== undefined && row[colIndex] !== undefined && test(row[colIndex]);
        });
    }

    define("SUMIF", ["ETOPLA"], (args, cx) => {
        if (args.length < 2) return ERRORS.VALUE;
        const range = cx.matrix(args[0]);
        if (isError(range)) return range;
        const test = createCriteria(cx.scalar(args[1]));
        const sumRange = args[2] ? cx.matrix(args[2]) : range;
        if (isError(sumRange)) return sumRange;
        let total = 0;
        range.forEach((row, r) => row.forEach((value, c) => {
            const target = sumRange[r]?.[c];
            if (test(value) && typeof target === "number") total += target;
        }));
        return total;
    });
    define("SUMIFS", ["ÇOKETOPLA"], (args, cx) => {
        const sumRange = cx.matrix(args[0]);
        if (isError(sumRange)) return sumRange;
        const pairs = conditionalPairs(cx, args, 1);
        if (isError(pairs)) return pairs;
        let total = 0;
        sumRange.forEach((row, r) => row.forEach((value, c) => {
            if (typeof value === "number" && matchesAll(pairs, r, c)) total += value;
        }));
        return total;
    });
    define("COUNTIF", ["EĞERSAY"], (args, cx) => {
        if (args.length !== 2) return ERRORS.VALUE;
        const range = cx.matrix(args[0]);
        if (isError(range)) return range;
        const test = createCriteria(cx.scalar(args[1]));
        let count = 0;
        range.forEach((row) => row.forEach((value) => {
            if (test(value)) count++;
        }));
        return count;
    });
    define("COUNTIFS", ["ÇOKEĞERSAY"], (args, cx) => {
        const pairs = conditionalPairs(cx, args, 0);
        if (isError(pairs)) return pairs;
        if (!pairs.length) return ERRORS.VALUE;
        let count = 0;
        pairs[0].range.forEach((row, r) => row.forEach((_, c) => {
            if (matchesAll(pairs, r, c)) count++;
        }));
        return count;
    });
    define("AVERAGEIF", ["EĞERORTALAMA"], (args, cx) => {
        if (args.length < 2) return ERRORS.VALUE;
        const range = cx.matrix(args[0]);
        if (isError(range)) return range;
        const test = createCriteria(cx.scalar(args[1]));
        const averageRange = args[2] ? cx.matrix(args[2]) : range;
        if (isError(averageRange)) return averageRange;
        let total = 0;
        let count = 0;
        range.forEach((row, r) => row.forEach((value, c) => {
            const target = averageRange[r]?.[c];
            if (test(value) && typeof target === "number") {
                total += target;
                count++;
            }
        }));
        return count ? total / count : ERRORS.DIV0;
    });

    // Arama
    function compareForLookup(a, b) {
        if (typeof a === "number" && typeof b === "number") return a - b;
        if (typeof a === "string" && typeof b === "string") return collator.compare(a, b);
        if (typeof a === "number") return -1;
        return 1;
    }

    function lookupIndex(values, lookup, approximate) {
        if (!approximate) {
            return values.findIndex((value) => {
                if (typeof lookup === "number") {
                    return value === lookup || (typeof value === "string" && parseNumber(value) === lookup);
                }
                if (typeof lookup === "string") {
                    if (typeof value !== "string") return false;
                    return /[*?]/.test(lookup) ? wildcardToRegExp(lookup).test(value) : textEquals(value, lookup);
                }
                return value === lookup;
            });
        }

        let found = -1;
        for (let i = 0; i < values.length; i++) {
            if (values[i] === null) continue;
            if (compareForLookup(values[i], lookup) <= 0) found = i;
            else break;
        }
        return found;
    }

    define("VLOOKUP", ["DÜŞEYARA"], (args, cx) => {
        if (args.length < 3) return ERRORS.VALUE;
        const lookup = cx.scalar(args[0]);
        if (isError(lookup)) return lookup;
        const table = cx.matrix(args[1]);
        if (isError(table)) return table;
        const column = cx.number(args[2]);
        if (isError(column)) return column;
        const approximate = args[3] && args[3].type !== "missing" ? cx.boolean(args[3]) : true;
        if (isError(approximate)) return approximate;
        if (column < 1 || column > (table[0]?.length ?? 0)) return ERRORS.REF;
        const index = lookupIndex(table.map((row) => row[0]), lookup, approximate);
        if (index < 0) return ERRORS.NA;
        return table[index][Math.floor(column) - 1];
    });
    define("HLOOKUP", ["YATAYARA"], (args, cx) => {
        if (args.length < 3) return ERRORS.VALUE;
        const lookup = cx.scalar(args[0]);
        if (isError(lookup)) return lookup;
        const table = cx.matrix(args[1]);
        if (isError(table)) return table;
        const row = cx.number(args[2]);
        if (isError(row)) return row;
        const approximate = args[3] && args[3].type !== "missing" ? cx.boolean(args[3]) : true;
        if (isError(approximate)) return approximate;
        if (row < 1 || row > table.length) return ERRORS.REF;
        const index = lookupIndex(table[0] ?? [], lookup, approximate);
        if (index < 0) return ERRORS.NA;
        return table[Math.floor(row) - 1][index];
    });
    define("MATCH", ["KAÇINCI"], (args, cx) => {
        if (args.length < 2) return ERRORS.VALUE;
        const lookup = cx.scalar(args[0]);
        if (isError(lookup)) return lookup;
        const table = cx.matrix(args[1]);
        if (isError(table)) return table;
        const type = args[2] ? cx.number(args[2]) : 1;
        if (isError(type)) return type;
        const values = table.length === 1 ? table[0] : table.map((row) => row[0]);
        let index;
        if (type === 0) {
            index = lookupIndex(values, lookup, false);
        } else if (type > 0) {
            index = lookupIndex(values, lookup, true);
        } else {
            index = -1;
            for (let i = 0; i < values.length; i++) {
                if (values[i] !== null && compareForLookup(values[i], lookup) >= 0) index = i;
                else break;
            }
        }
        return index < 0 ? ERRORS.NA : index + 1;
    });
    define("INDEX", ["İNDİS"], (args, cx) => {
        if (args.length < 2) return ERRORS.VALUE;
        const table = cx.matrix(args[0]);
        if (isError(table)) return table;
        let row = cx.number(args[1]);
        let column = args[2] ? cx.number(args[2]) : 1;
        if (isError(row)) return row;
        if (isError(column)) return column;
        if (table.length === 1 && !args[2]) {
            column = row;
            row = 1;
        }
        const value = table[Math.floor(row) - 1]?.[Math.floor(column) - 1];
        return value === undefined ? ERRORS.REF : value;
    });

    // Tarih
    define("TODAY", ["BUGÜN"], (args, cx) => formatDate(cx.now(), false));
    define("NOW", ["ŞİMDİ"], (args, cx) => formatDate(cx.now(), true));

    const VOLATILE = new Set(["TODAY", "NOW", "RAND", "RANDBETWEEN"]);

    /* ---------- Değerlendirme ---------- */

    function compareValues(a, b) {
        const rank = (value) => (typeof value === "number" ? 0 : typeof value === "string" ? 1 : 2);
        let left = a;
        let right = b;
        if (left === null) left = typeof right === "string" ? "" : typeof right === "boolean" ? false : 0;
        if (right === null) right = typeof left === "string" ? "" : typeof left === "boolean" ? false : 0;
        if (rank(left) !== rank(right)) return rank(left) - rank(right);
        if (typeof left === "string") return collator.compare(left, right);
        return Number(left) - Number(right);
    }

    /**
     * Çalışma kitabı değerlendiricisi.
     * workbook: {
     *   sheetCount, getSheetName(index), getSize(index) -> { rows, cols },
     *   getCell(index, row, col) -> { value, formula } | null, now?: Date
     * }
     */
    function createEvaluator(workbook) {
        const memo = new Map();
        const inProgress = new Set();
        const now = workbook.now ?? new Date();

        function findSheet(name, currentSheet) {
            if (name === null || name === undefined) return currentSheet;
            for (let i = 0; i < workbook.sheetCount; i++) {
                if (textEquals(workbook.getSheetName(i), name)) return i;
            }
            return -1;
        }

        function literalValue(cell) {
            const text = cell?.value;
            if (text === null || text === undefined || text === "") return null;
            if (typeof text === "number") return text;
            const number = parseNumber(text);
            return number !== null ? number : String(text);
        }

        function getValue(sheetIndex, row, col) {
            const cell = workbook.getCell(sheetIndex, row, col);
            if (!cell?.formula) return literalValue(cell);

            const key = `${sheetIndex}:${row}:${col}`;
            if (memo.has(key)) return memo.get(key);
            if (inProgress.has(key)) return ERRORS.CYCLE;

            inProgress.add(key);
            let value;
            try {
                value = evaluateFormula(cell.formula, sheetIndex, row, col);
            } catch (error) {
                value = error instanceof RangeError ? ERRORS.CYCLE : ERRORS.VALUE;
            }
            inProgress.delete(key);
            memo.set(key, value);
            return value;
        }

        function resolveArea(ref, context) {
            const sheetIndex = findSheet(ref.sheet, context.sheet);
            if (sheetIndex < 0) return ERRORS.REF;
            const size = workbook.getSize(sheetIndex);
            let minRow;
            let maxRow;
            let minCol;
            let maxCol;
            if (ref.kind === "cell") {
                minRow = maxRow = ref.a.row;
                minCol = maxCol = ref.a.col;
            } else if (ref.kind === "range") {
                minRow = Math.min(ref.a.row, ref.b.row);
                maxRow = Math.max(ref.a.row, ref.b.row);
                minCol = Math.min(ref.a.col, ref.b.col);
                maxCol = Math.max(ref.a.col, ref.b.col);
            } else if (ref.kind === "cols") {
                minRow = 0;
                maxRow = size.rows - 1;
                minCol = Math.min(ref.a.col, ref.b.col);
                maxCol = Math.max(ref.a.col, ref.b.col);
            } else {
                minRow = Math.min(ref.a.row, ref.b.row);
                maxRow = Math.max(ref.a.row, ref.b.row);
                minCol = 0;
                maxCol = size.cols - 1;
            }
            return { sheetIndex, minRow, maxRow, minCol, maxCol, size };
        }

        function readArea(area) {
            const rows = [];
            for (let r = area.minRow; r <= area.maxRow; r++) {
                const row = [];
                for (let c = area.minCol; c <= area.maxCol; c++) {
                    row.push(r < area.size.rows && c < area.size.cols ? getValue(area.sheetIndex, r, c) : null);
                }
                rows.push(row);
            }
            return rows;
        }

        function makeContext(context) {
            const cx = {
                now: () => now,
                scalar(node) {
                    return evaluateNode(node, context);
                },
                number(node) {
                    return cx.toNumber(cx.scalar(node));
                },
                text(node) {
                    const value = cx.scalar(node);
                    return isError(value) ? value : cx.toText(value);
                },
                boolean(node) {
                    return cx.toBoolean(cx.scalar(node));
                },
                matrix(node) {
                    if (node?.type === "ref") {
                        const area = resolveArea(node.ref, context);
                        return isError(area) ? area : readArea(area);
                    }
                    const value = cx.scalar(node);
                    return isError(value) ? value : [[value]];
                },
                *items(args) {
                    for (const node of args) {
                        if (node.type === "missing") continue;
                        if (node.type === "ref") {
                            const area = resolveArea(node.ref, context);
                            if (isError(area)) {
                                yield { value: area, fromRange: true };
                                continue;
                            }
                            for (const row of readArea(area)) {
                                for (const value of row) yield { value, fromRange: true };
                            }
                        } else {
                            yield { value: cx.scalar(node), fromRange: false };
                        }
                    }
                },
                *numbers(args) {
                    for (const item of cx.items(args)) {
                        if (isError(item.value)) {
                            yield item.value;
                        } else if (item.fromRange) {
                            if (typeof item.value === "number") yield item.value;
                        } else {
                            yield cx.toNumber(item.value);
                        }
                    }
                },
                toNumber(value) {
                    if (isError(value)) return value;
                    if (value === null) return 0;
                    if (typeof value === "number") return value;
                    if (typeof value === "boolean") return value ? 1 : 0;
                    const number = parseNumber(value);
                    if (number !== null) return number;
                    return value === "" ? 0 : ERRORS.VALUE;
                },
                toNumberOrNull(value) {
                    const number = cx.toNumber(value);
                    return isError(number) || value === null ? null : number;
                },
                toText(value) {
                    if (value === null) return "";
                    if (typeof value === "number") return numberToText(value);
                    if (typeof value === "boolean") return value ? "DOĞRU" : "YANLIŞ";
                    return String(value);
                },
                toBoolean(value) {
                    if (isError(value)) return value;
                    if (value === null) return false;
                    if (typeof value === "boolean") return value;
                    if (typeof value === "number") return value !== 0;
                    const key = normalizeName(value);
                    if (key === "TRUE" || key === "DOĞRU") return true;
                    if (key === "FALSE" || key === "YANLIŞ") return false;
                    const number = parseNumber(value);
                    return number !== null ? number !== 0 : ERRORS.VALUE;
                }
            };
            return cx;
        }

        function evaluateNode(node, context) {
            switch (node.type) {
                case "num":
                    return node.value;
                case "str":
                    return node.value;
                case "bool":
                    return node.value;
                case "err":
                    return ERRORS[node.code] ?? ERRORS.NAME;
                case "missing":
                    return null;
                case "name":
                    return ERRORS.NAME;
                case "ref": {
                    const area = resolveArea(node.ref, context);
                    if (isError(area)) return area;
                    if (area.minRow !== area.maxRow || area.minCol !== area.maxCol) return ERRORS.VALUE;
                    if (area.minRow >= area.size.rows || area.minCol >= area.size.cols) return null;
                    return getValue(area.sheetIndex, area.minRow, area.minCol);
                }
                case "unary": {
                    const cx = makeContext(context);
                    const value = cx.toNumber(evaluateNode(node.operand, context));
                    if (isError(value)) return value;
                    return node.op === "-" ? -value : value;
                }
                case "percent": {
                    const cx = makeContext(context);
                    const value = cx.toNumber(evaluateNode(node.operand, context));
                    return isError(value) ? value : value / 100;
                }
                case "binary":
                    return evaluateBinary(node, context);
                case "call": {
                    const entry = lookupFunction(node.name);
                    if (!entry) return ERRORS.NAME;
                    const result = entry.implementation(node.args, makeContext(context));
                    if (typeof result === "number" && !Number.isFinite(result)) return ERRORS.NUM;
                    return result === undefined ? null : result;
                }
                default:
                    return ERRORS.VALUE;
            }
        }

        function evaluateBinary(node, context) {
            const left = evaluateNode(node.left, context);
            if (isError(left)) return left;
            const right = evaluateNode(node.right, context);
            if (isError(right)) return right;
            const cx = makeContext(context);

            if (node.op === "&") return cx.toText(left) + cx.toText(right);

            if (["=", "<>", "<", ">", "<=", ">="].includes(node.op)) {
                const order = compareValues(left, right);
                switch (node.op) {
                    case "=": return order === 0;
                    case "<>": return order !== 0;
                    case "<": return order < 0;
                    case ">": return order > 0;
                    case "<=": return order <= 0;
                    default: return order >= 0;
                }
            }

            const a = cx.toNumber(left);
            if (isError(a)) return a;
            const b = cx.toNumber(right);
            if (isError(b)) return b;
            let result;
            switch (node.op) {
                case "+": result = a + b; break;
                case "-": result = a - b; break;
                case "*": result = a * b; break;
                case "/":
                    if (b === 0) return ERRORS.DIV0;
                    result = a / b;
                    break;
                case "^":
                    if (a === 0 && b < 0) return ERRORS.DIV0;
                    result = a ** b;
                    break;
                default:
                    return ERRORS.VALUE;
            }
            return Number.isFinite(result) ? result : ERRORS.NUM;
        }

        function evaluateFormula(formula, sheetIndex, row, col) {
            const parsed = parse(formula);
            if (parsed.error) return parsed.error;
            const value = evaluateNode(parsed.ast, { sheet: sheetIndex, row, col });
            return value;
        }

        return {
            getValue,
            evaluate: evaluateFormula
        };
    }

    /* ---------- Başvuru dönüşümleri ---------- */

    function quoteSheetName(name) {
        return /^[A-Za-zÇĞİÖŞÜçğıöşü_][A-Za-z0-9ÇĞİÖŞÜçğıöşü_]*$/.test(name) && !/^[A-Za-z]{1,3}\d+$/.test(name)
            ? name
            : `'${String(name).replace(/'/g, "''")}'`;
    }

    function formatPoint(point, kind) {
        const col = kind === "rows" ? "" : `${point.colAbs ? "$" : ""}${indexToColumn(point.col)}`;
        const row = kind === "cols" ? "" : `${point.rowAbs ? "$" : ""}${point.row + 1}`;
        return col + row;
    }

    function formatReference(ref) {
        const prefix = ref.sheet !== null && ref.sheet !== undefined ? `${quoteSheetName(ref.sheet)}!` : "";
        if (ref.kind === "cell") return prefix + formatPoint(ref.a, "cell");
        return `${prefix}${formatPoint(ref.a, ref.kind)}:${formatPoint(ref.b, ref.kind)}`;
    }

    function cloneRef(ref) {
        return {
            sheet: ref.sheet,
            kind: ref.kind,
            a: { ...ref.a },
            b: ref.b ? { ...ref.b } : undefined
        };
    }

    /**
     * Formüldeki her başvuruyu `mapper(ref)` ile değiştirir. mapper yeni bir ref, aynı ref ya da
     * null (geçersiz → #REF!) döndürür. Ayrıştırılamayan formül olduğu gibi kalır.
     */
    function mapReferences(formula, mapper) {
        const source = String(formula ?? "");
        if (!source.startsWith("=")) return source;

        let tokens;
        try {
            tokens = tokenize(source.slice(1));
        } catch {
            return source;
        }

        let output = "=";
        let cursor = 0;
        const body = source.slice(1);
        tokens.forEach((token) => {
            output += body.slice(cursor, token.start);
            if (token.type === "ref") {
                const mapped = mapper(cloneRef(token.ref));
                output += mapped ? formatReference(mapped) : "#REF!";
            } else {
                output += body.slice(token.start, token.end);
            }
            cursor = token.end;
        });
        output += body.slice(cursor);
        return output;
    }

    /** Formülün başvurduğu ref'leri listeler (grafik ve bağımlılık denetimleri için). */
    function listReferences(formula) {
        const parsed = String(formula ?? "");
        if (!parsed.startsWith("=")) return [];
        try {
            return tokenize(parsed.slice(1)).filter((token) => token.type === "ref").map((token) => cloneRef(token.ref));
        } catch {
            return [];
        }
    }

    function isVolatile(formula) {
        const source = String(formula ?? "");
        if (!source.startsWith("=")) return false;
        try {
            return tokenize(source.slice(1)).some((token) => {
                if (token.type !== "func") return false;
                const entry = lookupFunction(token.name);
                return entry && VOLATILE.has(entry.name);
            });
        } catch {
            return false;
        }
    }

    /**
     * Formülü başka bir uygulamanın sözdizimine çevirir.
     * options.format: "excel" (A1, ","), "r1c1" (Excel 2003 XML), "openformula" (ODS, "of:=").
     * options.row / options.col: formül hücresi (r1c1 için).
     * options.sheetName(name): sayfa adlarını dışa aktarımdaki adlara çevirir.
     */
    function translateFormula(formula, options) {
        const source = String(formula ?? "");
        const body = source.startsWith("=") ? source.slice(1) : source;
        let tokens;
        try {
            tokens = tokenize(body);
        } catch {
            return null;
        }

        const format = options.format;
        const sheetName = options.sheetName ?? ((name) => name);
        const separator = format === "openformula" ? ";" : ",";

        const r1c1Point = (point, kind) => {
            let text = "";
            if (kind !== "cols") {
                text += point.rowAbs ? `R${point.row + 1}` : point.row === options.row ? "R" : `R[${point.row - options.row}]`;
            }
            if (kind !== "rows") {
                text += point.colAbs ? `C${point.col + 1}` : point.col === options.col ? "C" : `C[${point.col - options.col}]`;
            }
            return text;
        };

        const formatRef = (ref) => {
            const sheet = ref.sheet !== null && ref.sheet !== undefined ? sheetName(ref.sheet) : null;
            if (format === "openformula") {
                const prefix = sheet !== null ? `$'${sheet.replace(/'/g, "''")}'` : "";
                if (ref.kind === "cell") return `[${prefix}.${formatPoint(ref.a, "cell")}]`;
                if (ref.kind === "range") return `[${prefix}.${formatPoint(ref.a, "range")}:.${formatPoint(ref.b, "range")}]`;
                return `[${prefix}.${formatPoint(ref.a, ref.kind)}:.${formatPoint(ref.b, ref.kind)}]`;
            }
            const prefix = sheet !== null ? `'${sheet.replace(/'/g, "''")}'!` : "";
            if (format === "r1c1") {
                if (ref.kind === "cell") return prefix + r1c1Point(ref.a, "cell");
                return `${prefix}${r1c1Point(ref.a, ref.kind)}:${r1c1Point(ref.b, ref.kind)}`;
            }
            return prefix + formatReference({ ...ref, sheet: null });
        };

        let output = "";
        let cursor = 0;
        tokens.forEach((token) => {
            output += body.slice(cursor, token.start);
            switch (token.type) {
                case "ref":
                    output += formatRef(token.ref);
                    break;
                case "func": {
                    const entry = lookupFunction(token.name);
                    output += entry ? entry.name : token.name;
                    break;
                }
                case "name": {
                    const key = normalizeName(token.name);
                    if (key === "TRUE" || key === "DOĞRU") output += format === "openformula" ? "TRUE()" : "TRUE";
                    else if (key === "FALSE" || key === "YANLIŞ") output += format === "openformula" ? "FALSE()" : "FALSE";
                    else output += token.name;
                    break;
                }
                case "err":
                    output += ERROR_TEXT[token.code]?.en ?? "#NAME?";
                    break;
                case "sep":
                    output += separator;
                    break;
                case "str":
                    output += `"${token.value.replace(/"/g, '""')}"`;
                    break;
                case "num":
                    output += String(token.value);
                    break;
                default:
                    output += body.slice(token.start, token.end);
            }
            cursor = token.end;
        });
        output += body.slice(cursor);

        if (format === "openformula") return `of:=${output}`;
        return format === "r1c1" ? `=${output}` : output;
    }

    /** ODS'deki "of:=SUM([.A1:.A3])" biçimini awCELL formülüne çevirir. */
    function fromOpenFormula(formula) {
        let body = String(formula ?? "").replace(/^(?:of:|oooc:)?=?/i, "");
        body = body.replace(/\[([^\]]+)\]/g, (_, inner) => {
            const parts = inner.split(":").map((part) => {
                const match = part.match(/^\$?(?:'((?:[^']|'')+)'|([^.']*))?\.(.+)$/);
                if (!match) return { sheet: null, ref: part.replace(/^\./, "") };
                const sheet = match[1] !== undefined ? match[1].replace(/''/g, "'") : (match[2] || null);
                return { sheet, ref: match[3] };
            });
            const sheet = parts[0].sheet;
            const prefix = sheet ? `${quoteSheetName(sheet)}!` : "";
            return prefix + parts.map((part) => part.ref).join(":");
        });
        return `=${body}`;
    }

    function getFunctionNames() {
        return [...new Set([...FUNCTIONS.values()].map((entry) => entry.name))].sort();
    }

    return {
        ERRORS,
        isError,
        isErrorText,
        parse,
        tokenize,
        parseNumber,
        numberToStorage,
        numberToText,
        valueToStorage,
        columnToIndex,
        indexToColumn,
        createEvaluator,
        mapReferences,
        listReferences,
        formatReference,
        quoteSheetName,
        isVolatile,
        translateFormula,
        fromOpenFormula,
        getFunctionNames,
        lookupFunction
    };
})();

export default AwFormula;
