// awCELL masaüstü uygulaması (Electron ana süreci). Sayfa dist/'ten, kendi adresinden
// (awcell://app/) yüklenir: file:// kullanılmaz, böylece sayfa diskteki dosyaları okuyamaz.
// Pencere çerçevesizdir; başlık çubuğunu sayfa çizer (src/desktop.js), düğmeleri buradan çalışır.
// Geliştirmede: AWCELL_DEV_SERVER_URL=http://127.0.0.1:4177 (npm run dev ile).
import { app, BrowserWindow, ipcMain, Menu, net, protocol, shell } from "electron";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { DesktopFiles } from "./files.js";

const distPath = fileURLToPath(new URL("../dist/", import.meta.url));
const preloadPath = fileURLToPath(new URL("./preload.cjs", import.meta.url));
const devServerUrl = app.isPackaged ? undefined : process.env.AWCELL_DEV_SERVER_URL;
const iconPath = path.join(distPath, "icons", "app-icon.png");

const SCHEME = "awcell";
const APP_HOST = "app";
const OPENABLE_PROTOCOLS = new Set(["http:", "https:", "mailto:"]);
// Uygulama ağsız çalışır; açılan tablolar güvenilmez veridir ve hiçbir şey makineden çıkmaz.
const CONTENT_SECURITY_POLICY = [
    "default-src 'self'",
    "script-src 'self'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self' data:",
    "connect-src 'self' data: blob:",
    "object-src 'none'",
    "base-uri 'none'",
    "form-action 'none'"
].join("; ");

protocol.registerSchemesAsPrivileged([{
    scheme: SCHEME,
    privileges: { standard: true, secure: true, supportFetchAPI: true }
}]);

function registerAppProtocol() {
    protocol.handle(SCHEME, async (request) => {
        const { host, pathname } = new URL(request.url);
        const file = path.join(distPath, decodeURIComponent(pathname));
        if (host !== APP_HOST || !file.startsWith(distPath)) return new Response(null, { status: 404 });
        const response = await net.fetch(pathToFileURL(file).href);
        const headers = new Headers(response.headers);
        headers.set("Content-Security-Policy", CONTENT_SECURITY_POLICY);
        return new Response(response.body, { status: response.status, headers });
    });
}

const senderWindow = (event) => BrowserWindow.fromWebContents(event.sender);

/** Sayfanın çizdiği başlık çubuğundaki pencere düğmeleri. */
function registerWindowControls() {
    ipcMain.on("window:minimize", (event) => senderWindow(event)?.minimize());
    ipcMain.on("window:toggle-maximize", (event) => {
        const window = senderWindow(event);
        if (!window) return;
        if (window.isMaximized()) window.unmaximize();
        else window.maximize();
    });
    ipcMain.on("window:toggle-fullscreen", (event) => {
        const window = senderWindow(event);
        window?.setFullScreen(!window.isFullScreen());
    });
    ipcMain.on("window:set-fullscreen", (event, enabled) => senderWindow(event)?.setFullScreen(enabled === true));
    ipcMain.on("window:close", (event) => senderWindow(event)?.close());
    ipcMain.handle("window:is-maximized", (event) => senderWindow(event)?.isMaximized() ?? false);
    ipcMain.handle("window:is-fullscreen", (event) => senderWindow(event)?.isFullScreen() ?? false);
}

async function createWindow() {
    const window = new BrowserWindow({
        title: "awCELL | mADEMatik",
        width: 1280,
        height: 800,
        minWidth: 640,
        minHeight: 480,
        backgroundColor: "#ffffff",
        icon: iconPath,
        autoHideMenuBar: true,
        frame: false,
        titleBarStyle: "hidden",
        fullscreenable: true,
        // Testler pencereyi ekrana getirmeden çalıştırır.
        show: process.env.AWCELL_TEST_HIDDEN !== "1",
        webPreferences: {
            preload: preloadPath,
            nodeIntegration: false,
            contextIsolation: true,
            sandbox: true
        }
    });

    window.on("maximize", () => window.webContents.send("window:maximize-changed", true));
    window.on("unmaximize", () => window.webContents.send("window:maximize-changed", false));
    window.on("enter-full-screen", () => window.webContents.send("window:fullscreen-changed", true));
    window.on("leave-full-screen", () => window.webContents.send("window:fullscreen-changed", false));
    // F11 burada karşılanır; sayfa ikinci kez çevirmesin.
    window.webContents.on("before-input-event", (event, input) => {
        if (input.type === "keyDown" && input.key === "F11") {
            event.preventDefault();
            window.setFullScreen(!window.isFullScreen());
        }
    });
    // Bağlantılar (madematik.com imzası) sistemin tarayıcısında açılır; uygulama penceresi gezinmez.
    window.webContents.setWindowOpenHandler(({ url }) => {
        if (OPENABLE_PROTOCOLS.has(new URL(url).protocol)) void shell.openExternal(url).catch(console.error);
        return { action: "deny" };
    });
    window.webContents.on("will-navigate", (event) => event.preventDefault());

    await window.loadURL(devServerUrl || `${SCHEME}://${APP_HOST}/index.html`);
}

// Tek pencere: ikinci kez açılınca (ör. başka bir dosyaya çift tıklayınca) dosya var olan pencerede açılır.
const isFirstInstance = app.requestSingleInstanceLock();
if (!isFirstInstance) app.quit();

if (isFirstInstance) {
    const files = new DesktopFiles();
    app.on("second-instance", (_event, argv, directory) => {
        files.deliver(DesktopFiles.pathsFromArgv(argv, directory));
        const window = BrowserWindow.getAllWindows()[0];
        if (window?.isMinimized()) window.restore();
        window?.focus();
    });

    app.whenReady().then(async () => {
        app.setAppUserModelId("com.madematik.awcell");
        // Electron'un kendi menüsü Ctrl+R ile sayfayı yeniler, Ctrl+W ile pencereyi kapatır.
        Menu.setApplicationMenu(null);
        registerAppProtocol();
        registerWindowControls();
        files.register();
        files.deliver(DesktopFiles.pathsFromArgv(process.argv, process.cwd()));
        await createWindow();
        app.on("activate", () => {
            if (BrowserWindow.getAllWindows().length === 0) void createWindow().catch(console.error);
        });
    }).catch((error) => {
        console.error(error);
        app.quit();
        process.exitCode = 1;
    });
}

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});
