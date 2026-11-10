/*
 * Android (Capacitor) uyarlaması. Tarayıcıda ve masaüstünde hiçbir şey yapmaz.
 *
 * - Dosyalar: uygulama tarayıcının dosya erişim arayüzünü (showOpenFilePicker, showSaveFilePicker,
 *   dosya tutamaçları) kullanır; Android'de aynı arayüz sistemin dosya ekranlarıyla sağlanır
 *   (android/.../AwCellNativePlugin.java). Kaydet, açık dosyanın üstüne yazar; izin yoksa "kaydet"
 *   ekranı açılır.
 * - "Birlikte aç": başka uygulamadan gelen tablolar açılır.
 * - Yazdırma: sayfa görüntüleri yalnız yazdırmada görünen bir alana konur, Android yazdırır.
 * - Geri tuşu: önce açık menü, pencere ya da düzenleme kapanır; açık bir şey yoksa uygulama arka plana geçer.
 */
import { Capacitor, registerPlugin } from "@capacitor/core";

const Native = registerPlugin("AwCellNative");
const CHUNK_BYTES = 512 * 1024;

export function isAndroidApp() {
    return Capacitor.isNativePlatform() && Capacitor.getPlatform() === "android";
}

function abortError() {
    return new DOMException("Vazgeçildi.", "AbortError");
}

function base64ToBytes(base64) {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let index = 0; index < binary.length; index++) bytes[index] = binary.charCodeAt(index);
    return bytes;
}

function bytesToBase64(bytes) {
    let binary = "";
    for (let index = 0; index < bytes.length; index += 0x8000) {
        binary += String.fromCharCode(...bytes.subarray(index, index + 0x8000));
    }
    return btoa(binary);
}

async function stageData(blob) {
    const bytes = new Uint8Array(await blob.arrayBuffer());
    if (bytes.length === 0) {
        await Native.appendSaveData({ data: "", first: true });
        return;
    }
    for (let offset = 0; offset < bytes.length; offset += CHUNK_BYTES) {
        await Native.appendSaveData({ data: bytesToBase64(bytes.subarray(offset, offset + CHUNK_BYTES)), first: offset === 0 });
    }
}

/**
 * Tarayıcıdaki FileSystemFileHandle'a benzeyen tutamaç. Numarası olmayan (yeni) dosya ilk yazışta
 * Android'in "kaydet" ekranıyla oluşur; sonra aynı dosyaya yazılır.
 */
function createHandle(file) {
    const handle = {
        kind: "file",
        name: file.name,
        id: file.id ?? null,
        writable: file.writable === true,
        async getFile() {
            if (!handle.id) throw new Error("Dosya henüz kaydedilmedi.");
            const { data } = await Native.readFile({ id: handle.id });
            return new File([base64ToBytes(data)], handle.name);
        },
        async createWritable() {
            const parts = [];
            return {
                async write(data) {
                    parts.push(data);
                },
                async close() {
                    await stageData(new Blob(parts));
                    if (handle.id && handle.writable) {
                        try {
                            await Native.writeFile({ id: handle.id });
                            return;
                        } catch {
                            // İzin yok ("Birlikte aç" çoğu zaman yalnız okuma verir): yeni dosya olarak kaydedilir.
                            await stageData(new Blob(parts));
                        }
                    }
                    const saved = await Native.saveFile({ name: handle.name });
                    if (!saved?.id) throw abortError();
                    Object.assign(handle, { id: saved.id, name: saved.name, writable: true });
                }
            };
        }
    };
    return handle;
}

function installFilePickers() {
    window.showOpenFilePicker = async () => {
        const file = await Native.pickFile();
        if (!file?.id) throw abortError();
        return [createHandle(file)];
    };
    // Yer ve ad, veri hazır olunca (ilk yazışta) Android'in ekranında seçilir.
    window.showSaveFilePicker = async ({ suggestedName } = {}) => createHandle({ name: suggestedName || "Tablo.awc" });
}

/** Görüntüleri yazdırma alanına koyup Android'in yazdırma hizmetini açar. */
export async function printImagesOnAndroid(imageUrls, { landscape = false, title = "awCELL" } = {}) {
    document.getElementById("android-print-root")?.remove();
    document.getElementById("android-print-page")?.remove();
    const root = document.createElement("div");
    root.id = "android-print-root";
    root.setAttribute("aria-hidden", "true");
    for (const url of imageUrls) {
        const image = document.createElement("img");
        image.src = url;
        image.alt = "";
        root.appendChild(image);
    }
    const pageStyle = document.createElement("style");
    pageStyle.id = "android-print-page";
    pageStyle.textContent = `@page { size: A4 ${landscape ? "landscape" : "portrait"}; margin: 0; }`;
    document.head.appendChild(pageStyle);
    document.body.appendChild(root);
    document.body.classList.add("android-printing");
    await Promise.all([...root.querySelectorAll("img")].map((image) => (image.complete ? null : new Promise((resolve) => {
        image.onload = resolve;
        image.onerror = resolve;
    }))));
    // Yazdırma önizlemesi sayfayı sonradan da okur; alan bir sonraki yazdırmaya kadar kalır (ekranda gizli).
    await Native.print({ name: title });
}

/**
 * Android'deyse dosya katmanını, "Birlikte aç"ı ve geri tuşunu kurar.
 * openFile(file, handle): uygulamanın açma işlevi; onBack(): bir şey kapattıysa true döner.
 */
export function setupAndroid({ openFile, onBack }) {
    if (!isAndroidApp()) return false;
    document.body.classList.add("android-app");
    installFilePickers();
    void Native.addListener("fileOpened", async (file) => {
        const handle = createHandle(file);
        try {
            await openFile(await handle.getFile(), handle);
        } catch (error) {
            console.error(error);
        }
    });
    void Native.addListener("backButton", () => {
        if (!onBack()) void Native.leaveApp();
    });
    return true;
}
