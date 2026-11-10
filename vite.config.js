import { readFileSync } from "node:fs";
import { defineConfig } from "vite";

const { version } = JSON.parse(readFileSync(new URL("./package.json", import.meta.url), "utf8"));

export default defineConfig({
    // Hakkında penceresindeki sürüm package.json'dan gelir; elle güncellenmez.
    define: { __APP_VERSION__: JSON.stringify(version) },
    // Aynı çıktı web sunucusunda (madematik.com/awCELL/), Electron'da ve Android WebView'da çalışır.
    base: "./",
    server: {
        host: "127.0.0.1",
        // drAW2D/drAW3D 4173, awPDF 4175 kullanır.
        port: 4177,
        watch: {
            ignored: ["**/release/**", "**/dist/**"]
        }
    },
    preview: {
        host: "127.0.0.1",
        port: 4177
    }
});
