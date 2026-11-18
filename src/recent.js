/*
 * Son dosyalar (awPDF ve awDOC'taki gibi): açılan ve kaydedilen tablolar, en yenisi üstte, en çok 12.
 * Yalnız bu cihazda (IndexedDB) saklanır. Saklanan, dosyayı yeniden bulmanın yolu:
 *   - tarayıcıda (Chromium) dosya tutamacı,
 *   - masaüstünde kabuğun verdiği kalıcı anahtar (tablolar.json; yol sayfaya gelmez),
 *   - Android'de kalıcı izinli içerik adresi.
 * Yeniden bulunamayan dosya (silinmiş, izni kalkmış) listeden çıkar.
 */
import { isAndroidApp, reopenAndroidFile } from "./android.js";
import { isDesktopApp, reopenDesktopFile } from "./desktop.js";

const DATABASE = "awCELL";
const STORE = "recent";
const MAX_RECENT = 12;

let opened;

function database() {
    opened ??= new Promise((resolve, reject) => {
        const request = indexedDB.open(DATABASE, 1);
        request.onupgradeneeded = () => {
            if (!request.result.objectStoreNames.contains(STORE)) request.result.createObjectStore(STORE, { keyPath: "key" });
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    }).catch((error) => {
        opened = undefined;
        throw error;
    });
    return opened;
}

async function inStore(mode, work) {
    const connection = await database();
    return new Promise((resolve, reject) => {
        const transaction = connection.transaction(STORE, mode);
        const request = work(transaction.objectStore(STORE));
        transaction.oncomplete = () => resolve(request.result);
        transaction.onerror = () => reject(transaction.error ?? request.error);
        transaction.onabort = () => reject(transaction.error ?? request.error);
    });
}

export async function listRecentFiles() {
    try {
        const all = await inStore("readonly", (store) => store.getAll());
        return all.sort((a, b) => b.usedAt - a.usedAt);
    } catch {
        return [];
    }
}

/** What to keep of a handle: the handle itself in a browser, the shell's key or Android's address in the apps. */
async function storableOf(handle) {
    if (typeof handle?.awcellSource === "function") {
        const source = await handle.awcellSource();
        return typeof source === "string" && source ? source : null;
    }
    if (typeof FileSystemFileHandle === "function" && handle instanceof FileSystemFileHandle) return handle;
    return null;
}

/** The file just opened or saved goes to the top; one that cannot be found again is not listed. */
export async function rememberRecentFile(name, handle) {
    try {
        const stored = await storableOf(handle);
        if (!stored) return;
        const key = typeof stored === "string" ? stored : `ad:${name}`;
        await inStore("readwrite", (store) => store.put({ key, name, usedAt: Date.now(), stored }));
        for (const old of (await listRecentFiles()).slice(MAX_RECENT)) await forgetRecentFile(old.key);
    } catch (error) {
        console.error(error);
    }
}

export async function forgetRecentFile(key) {
    await inStore("readwrite", (store) => store.delete(key)).catch(console.error);
}

export async function clearRecentFiles() {
    await inStore("readwrite", (store) => store.clear()).catch(console.error);
}

/**
 * The file of an entry again, as { file, handle }; null when it is gone or no longer allowed. Runs
 * from the tap on the list: a browser asks for permission again only within such a tap.
 */
export async function reopenRecentFile(entry) {
    let handle = null;
    if (typeof entry.stored === "string") {
        if (isDesktopApp()) handle = await reopenDesktopFile(entry.stored);
        else if (isAndroidApp()) handle = await reopenAndroidFile(entry.stored);
    } else if (entry.stored && typeof entry.stored.getFile === "function") {
        handle = entry.stored;
        const permission = await handle.queryPermission?.({ mode: "readwrite" });
        if (permission !== "granted" && (await handle.requestPermission?.({ mode: "readwrite" })) !== "granted") return null;
    }
    if (!handle) return null;
    return { file: await handle.getFile(), handle };
}
