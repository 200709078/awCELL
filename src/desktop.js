/*
 * Masaüstü (Electron) uyarlaması. Tarayıcıda hiçbir şey yapmaz.
 *
 * - Başlık çubuğu: pencere çerçevesizdir; ad ve pencere düğmeleri burada çizilir (drAW ailesi ve
 *   awPDF ile aynı görünüm).
 * - Dosyalar: uygulama tarayıcının dosya erişim arayüzünü (showOpenFilePicker, showSaveFilePicker,
 *   dosya tutamaçları) kullanır. Masaüstünde aynı arayüz Electron'un dosya pencereleriyle sağlanır;
 *   böylece açma/kaydetme kodu tek kalır ve Ctrl+S açılan dosyanın üstüne yazar.
 * - "Birlikte aç": dosya yöneticisinden gelen tablolar açılır.
 */

const ICONS = {
    minimize: '<path d="M1 6h10"/>',
    maximize: '<rect x="1.5" y="1.5" width="9" height="9" rx="1"/>',
    restore: '<rect x="3.5" y="3.5" width="7" height="7" rx="1"/>'
        + '<path d="M8.5 3.5v-1a1 1 0 0 0-1-1h-5a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h1"/>',
    close: '<path d="M2 2l8 8"/><path d="M10 2l-8 8"/>',
    fullscreen: '<path d="M3.5 1.5H2.5a1 1 0 0 0-1 1v1M10.5 3.5v-1a1 1 0 0 0-1-1h-1'
        + 'M1.5 8.5v1a1 1 0 0 0 1 1h1M8.5 10.5h1a1 1 0 0 0 1-1v-1"/>',
    exitFullscreen: '<path d="M3.5 1.5v1a1 1 0 0 1-1 1h-1M10.5 3.5h-1a1 1 0 0 1-1-1v-1'
        + 'M1.5 8.5h1a1 1 0 0 1 1 1v1M8.5 10.5v-1a1 1 0 0 1 1-1h1"/>'
};
const APP_TITLE = "awCELL | mADEMatik";

export function getDesktop() {
    return window.awCELLDesktop ?? null;
}

export function isDesktopApp() {
    return Boolean(getDesktop());
}

function setIcon(button, icon, label) {
    button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" fill="none" stroke="currentColor"'
        + ` stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[icon]}</svg>`;
    button.title = label;
    button.setAttribute("aria-label", label);
}

function windowButton(icon, label, onClick, extraClass = "") {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `titlebar__button ${extraClass}`.trim();
    setIcon(button, icon, label);
    button.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        onClick();
    });
    return button;
}

/** Sayfa başlığı ("Not Listesi.awc - awCELL") başlık çubuğunda da görünür. */
function titleText() {
    const title = document.title.trim();
    return !title || title === "awCELL" ? APP_TITLE : title;
}

function mountTitleBar(controls) {
    document.body.classList.add("has-custom-titlebar");

    const bar = document.createElement("div");
    bar.className = "titlebar";
    bar.id = "titlebar";

    const drag = document.createElement("div");
    drag.className = "titlebar__drag";
    drag.addEventListener("dblclick", () => controls.toggleMaximize());

    const icon = document.createElement("img");
    icon.className = "titlebar__icon";
    icon.src = "./icons/app-icon.png";
    icon.alt = "";
    icon.draggable = false;

    const text = document.createElement("span");
    text.className = "titlebar__title";
    const showTitle = () => {
        text.textContent = titleText();
        drag.title = text.textContent;
    };
    showTitle();
    drag.append(icon, text);
    const titleElement = document.querySelector("title");
    if (titleElement) new MutationObserver(showTitle).observe(titleElement, { childList: true, characterData: true, subtree: true });

    const maximize = windowButton("maximize", "Büyüt", () => controls.toggleMaximize());
    const fullscreen = windowButton("fullscreen", "Tam ekran", () => controls.toggleFullscreen());
    const buttons = document.createElement("div");
    buttons.className = "titlebar__controls";
    buttons.append(
        windowButton("minimize", "Küçült", () => controls.minimize()),
        maximize,
        fullscreen,
        windowButton("close", "Kapat", () => controls.close(), "titlebar__button--close")
    );
    bar.append(drag, buttons);
    document.body.prepend(bar);

    let isFullscreen = false;
    const showMaximized = (maximized) => setIcon(maximize, maximized ? "restore" : "maximize", maximized ? "Geri yükle" : "Büyüt");
    const showFullscreen = (enabled) => {
        isFullscreen = enabled;
        document.body.classList.toggle("is-fullscreen", enabled);
        setIcon(fullscreen, enabled ? "exitFullscreen" : "fullscreen", enabled ? "Tam ekrandan çık" : "Tam ekran");
    };
    controls.onMaximizeChanged(showMaximized);
    controls.onFullscreenChanged(showFullscreen);
    void controls.isMaximized().then(showMaximized).catch(() => undefined);
    void controls.isFullscreen().then(showFullscreen).catch(() => undefined);

    // F11'i ana süreç karşılar; tam ekrandayken Esc de çıkarır.
    window.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && isFullscreen) controls.setFullscreen(false);
    });
}

/** Tarayıcı arayüzündeki types listesini Electron filtrelerine çevirir. */
function toFilters(types = []) {
    return types.map((type) => ({
        name: type.description || "Dosya",
        extensions: Object.values(type.accept || {}).flat().map((extension) => String(extension).replace(/^\./, ""))
    }));
}

function abortError() {
    return new DOMException("Vazgeçildi.", "AbortError");
}

/** Bir dosyanın tarayıcıdaki FileSystemFileHandle'a benzeyen karşılığı. */
function createHandle(files, { id, name }) {
    return {
        kind: "file",
        name,
        async getFile() {
            const bytes = await files.read(id);
            return new File([bytes], name);
        },
        async createWritable() {
            const parts = [];
            return {
                async write(data) {
                    parts.push(data);
                },
                async close() {
                    const blob = new Blob(parts);
                    await files.write(id, new Uint8Array(await blob.arrayBuffer()));
                }
            };
        }
    };
}

function installFilePickers(files) {
    window.showOpenFilePicker = async ({ types } = {}) => {
        const file = await files.showOpen(toFilters(types));
        if (!file) throw abortError();
        return [createHandle(files, file)];
    };
    window.showSaveFilePicker = async ({ suggestedName, types } = {}) => {
        const file = await files.showSave(suggestedName ?? "", toFilters(types));
        if (!file) throw abortError();
        return createHandle(files, file);
    };
}

/**
 * Masaüstündeyse başlık çubuğunu ve dosya katmanını kurar. openFile(file, handle): uygulamanın
 * dosya açma işlevi ("Birlikte aç" ile gelen dosyalar için).
 */
export function setupDesktop({ openFile }) {
    const desktop = getDesktop();
    if (!desktop) return false;
    mountTitleBar(desktop.windowControls);
    installFilePickers(desktop.files);
    desktop.files.onOpened(async (opened) => {
        const handle = createHandle(desktop.files, opened);
        try {
            await openFile(await handle.getFile(), handle);
        } catch (error) {
            console.error(error);
        }
    });
    return true;
}
