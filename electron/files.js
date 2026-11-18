// Masaüstü dosya hizmeti. Sayfa diske erişemez: dosya pencerelerini burası açar, sayfa yalnız
// kullanıcının seçtiği (ya da "Birlikte aç" ile gelen) dosyalara, verilen numarayla okuyup yazar.
// Dosyanın yolu sayfaya hiç gönderilmez.
import { app, BrowserWindow, dialog, ipcMain } from "electron";
import { randomUUID } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

/** Açılabilen uzantılar (.xls uygulamada "açılamaz" iletisiyle karşılanır). */
export const OPEN_EXTENSIONS = new Set(["awc", "json", "xlsx", "xlsm", "ods", "csv", "tsv", "txt", "xls"]);
/** Yazılabilen uzantılar: awCELL'in kaydettiği biçimler. */
const SAVE_EXTENSIONS = new Set(["awc", "xlsx", "ods", "pdf", "csv", "xls"]);
const MAX_FILE_BYTES = 200 * 1024 * 1024;
/** Son dosyalar için hatırlanan yollar (tablolar.json); en eskiler sonra gider. */
const MAX_SOURCES = 100;

const extensionOf = (filePath) => path.extname(filePath).slice(1).toLowerCase();

/** Sayfanın gönderdiği filtreleri ({ name, extensions }) yalnız bilinen uzantılarla sınırlar. */
function cleanFilters(filters, allowed) {
    if (!Array.isArray(filters)) return [];
    return filters
        .map((filter) => ({
            name: typeof filter?.name === "string" ? filter.name.slice(0, 80) : "Dosya",
            extensions: (Array.isArray(filter?.extensions) ? filter.extensions : [])
                .map((extension) => String(extension).replace(/^\./, "").toLowerCase())
                .filter((extension) => allowed.has(extension))
        }))
        .filter((filter) => filter.extensions.length > 0);
}

export class DesktopFiles {
    #paths = new Map();
    #lastId = 0;
    #page = null;
    #waiting = [];
    /** Kalıcı anahtar → yol. Sayfa yolu görmez; son dosyalar listesinde yalnız anahtarı saklar. */
    #sources = null;

    #sourcesFile() {
        return path.join(app.getPath("userData"), "tablolar.json");
    }

    #loadSources() {
        if (this.#sources) return this.#sources;
        this.#sources = new Map();
        try {
            const stored = JSON.parse(readFileSync(this.#sourcesFile(), "utf8"));
            for (const [key, value] of Object.entries(stored)) {
                if (typeof value === "string") this.#sources.set(key, value);
            }
        } catch {
            // İlk açılış ya da bozuk dosya: liste boş başlar.
        }
        return this.#sources;
    }

    /** Bir yolun kalıcı anahtarı (yoksa yeni); en yeni sona taşınır. */
    #sourceOf(filePath) {
        const sources = this.#loadSources();
        let key = [...sources].find(([, value]) => value === filePath)?.[0];
        if (key) sources.delete(key);
        key ??= randomUUID();
        sources.set(key, filePath);
        while (sources.size > MAX_SOURCES) sources.delete(sources.keys().next().value);
        try {
            writeFileSync(this.#sourcesFile(), JSON.stringify(Object.fromEntries(sources)));
        } catch {
            // Yazılamadıysa yalnız bu oturumda hatırlanır.
        }
        return key;
    }

    /** Bir yolu kaydeder; sayfaya yalnız numarası ve adı gider. */
    #register(filePath) {
        const id = ++this.#lastId;
        this.#paths.set(id, filePath);
        return { id, name: path.basename(filePath) };
    }

    /** Komut satırındaki tablolar: yollar ya da dosya yöneticisinden gelen file: adresleri. */
    static pathsFromArgv(argv, directory) {
        return argv.slice(1)
            .filter((argument) => !argument.startsWith("-"))
            .map((argument) => (argument.startsWith("file:") ? fileURLToPath(argument) : path.resolve(directory, argument)))
            .filter((argument) => OPEN_EXTENSIONS.has(extensionOf(argument)));
    }

    /** "Birlikte aç" ile gelen dosyaları sayfaya iletir; sayfa hazır değilse bekletir. */
    deliver(filePaths) {
        for (const filePath of filePaths) {
            const file = this.#register(filePath);
            if (this.#page && !this.#page.isDestroyed()) this.#page.send("files:opened", file);
            else this.#waiting.push(file);
        }
    }

    register() {
        ipcMain.on("files:ready", (event) => {
            this.#page = event.sender;
            for (const file of this.#waiting.splice(0)) this.#page.send("files:opened", file);
        });

        ipcMain.handle("files:show-open", async (event, filters) => {
            const window = BrowserWindow.fromWebContents(event.sender);
            const clean = cleanFilters(filters, OPEN_EXTENSIONS);
            const options = {
                defaultPath: app.getPath("documents"),
                properties: ["openFile"],
                filters: clean.length ? clean : [{ name: "Elektronik tablolar", extensions: [...OPEN_EXTENSIONS] }]
            };
            const { canceled, filePaths } = window ? await dialog.showOpenDialog(window, options) : await dialog.showOpenDialog(options);
            if (canceled || !filePaths?.[0]) return null;
            return this.#register(filePaths[0]);
        });

        ipcMain.handle("files:show-save", async (event, suggestedName, filters) => {
            const window = BrowserWindow.fromWebContents(event.sender);
            const clean = cleanFilters(filters, SAVE_EXTENSIONS);
            const defaultExtension = clean[0]?.extensions[0] ?? "awc";
            const name = path.basename(typeof suggestedName === "string" && suggestedName ? suggestedName : `Tablo.${defaultExtension}`);
            const options = {
                defaultPath: path.join(app.getPath("documents"), name),
                filters: clean.length ? clean : [{ name: "awCELL dosyası", extensions: ["awc"] }]
            };
            const { canceled, filePath } = window ? await dialog.showSaveDialog(window, options) : await dialog.showSaveDialog(options);
            if (canceled || !filePath) return null;
            // Uzantı yazılmadıysa ya da izin verilmeyen bir uzantıysa seçilen biçimin uzantısı eklenir.
            const allowed = new Set(clean.flatMap((filter) => filter.extensions));
            const target = allowed.has(extensionOf(filePath)) ? filePath : `${filePath}.${defaultExtension}`;
            return this.#register(target);
        });

        /** Son dosyalar: açılan / kaydedilen dosyanın kalıcı anahtarı. */
        ipcMain.handle("files:source", (_event, id) => {
            const filePath = this.#paths.get(id);
            return filePath ? this.#sourceOf(filePath) : null;
        });

        /** Son dosyalardan yeniden açma: dosya hâlâ yerindeyse yeni bir numarayla verilir. */
        ipcMain.handle("files:reopen", async (_event, key) => {
            const filePath = typeof key === "string" ? this.#loadSources().get(key) : undefined;
            if (!filePath) return null;
            try {
                if (!(await stat(filePath)).isFile()) return null;
            } catch {
                return null;
            }
            return this.#register(filePath);
        });

        ipcMain.handle("files:read", async (_event, id) => {
            const filePath = this.#paths.get(id);
            if (!filePath) throw new Error("Dosya bulunamadı.");
            const { size } = await stat(filePath);
            if (size > MAX_FILE_BYTES) throw new Error("Dosya çok büyük (en çok 200 MB).");
            return new Uint8Array(await readFile(filePath));
        });

        ipcMain.handle("files:write", async (_event, id, data) => {
            const filePath = this.#paths.get(id);
            if (!filePath) throw new Error("Dosya bulunamadı.");
            if (!SAVE_EXTENSIONS.has(extensionOf(filePath))) throw new Error("Bu dosyaya yazılamaz.");
            if (!(data instanceof Uint8Array)) throw new Error("Kaydedilecek veri yok.");
            await writeFile(filePath, data);
            return true;
        });
    }
}
