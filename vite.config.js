import { defineConfig } from "vite";

export default defineConfig({
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
