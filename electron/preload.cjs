// Sandbox'lı preload CommonJS çalışır ve yalnız Electron'un sayfa modüllerini yükleyebilir.
// Sayfaya açılan her şey burada: pencere düğmeleri ve dosya hizmeti (electron/files.js).
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("awCELLDesktop", {
    files: {
        /** "Birlikte aç" ile gelen dosyalar: { id, name }. */
        onOpened: (callback) => {
            ipcRenderer.on("files:opened", (_event, file) => callback(file));
            ipcRenderer.send("files:ready");
        },
        showOpen: (filters) => ipcRenderer.invoke("files:show-open", filters),
        showSave: (suggestedName, filters) => ipcRenderer.invoke("files:show-save", suggestedName, filters),
        read: (id) => ipcRenderer.invoke("files:read", id),
        /** Son dosyalar: dosyanın kalıcı anahtarı ve o anahtarla yeniden açma. */
        source: (id) => ipcRenderer.invoke("files:source", id),
        reopen: (key) => ipcRenderer.invoke("files:reopen", key),
        write: (id, data) => ipcRenderer.invoke("files:write", id, data)
    },
    windowControls: {
        minimize: () => ipcRenderer.send("window:minimize"),
        toggleMaximize: () => ipcRenderer.send("window:toggle-maximize"),
        toggleFullscreen: () => ipcRenderer.send("window:toggle-fullscreen"),
        setFullscreen: (enabled) => ipcRenderer.send("window:set-fullscreen", enabled === true),
        close: () => ipcRenderer.send("window:close"),
        isMaximized: () => ipcRenderer.invoke("window:is-maximized"),
        isFullscreen: () => ipcRenderer.invoke("window:is-fullscreen"),
        onMaximizeChanged: (callback) => {
            ipcRenderer.on("window:maximize-changed", (_event, maximized) => callback(maximized === true));
        },
        onFullscreenChanged: (callback) => {
            ipcRenderer.on("window:fullscreen-changed", (_event, fullscreen) => callback(fullscreen === true));
        },
        /** The window is to close with unsaved changes: the page asks, then calls closeNow. */
        onCloseRequested: (callback) => {
            ipcRenderer.on("window:close-requested", () => callback());
        },
        closeNow: () => ipcRenderer.send("window:close-now")
    }
});
