// Google Play mağaza görsellerini üretir (docs/play/): npm run play:gorseller (önce derler).
// Uygulamanın derlenmiş hâli (dist/) Vite önizleme sunucusunda açılır; ekran görüntülerindeki tablo aşağıdaki
// uydurma not çizelgesidir (gerçek öğrenci verisi yok). Tarayıcı: sistemdeki Chromium (/usr/bin/chromium) ya da
// Playwright'ın kendi tarayıcısı (npx playwright install chromium).
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { chromium } from "playwright";
import { preview } from "vite";

const root = path.resolve(import.meta.dirname, "../..");
const out = path.join(root, "docs/play");
const shots = path.join(out, "ekran");
mkdirSync(shots, { recursive: true });

const STUDENTS = [
    ["Ayşe Yılmaz", 78, 85, 90], ["Mehmet Kaya", 45, 52, 60], ["Zeynep Aydın", 92, 88, 95], ["Emre Taş", 38, 41, 55],
    ["Elif Demir", 67, 74, 80], ["Can Öztürk", 55, 61, 70], ["Defne Şahin", 88, 93, 85], ["Mert Bulut", 72, 65, 75],
    ["Ecem Çelik", 81, 79, 88], ["Kerem Sarı", 49, 44, 50], ["Sude Güneş", 95, 97, 100], ["Arda Erdem", 63, 58, 72]
];
const HEADER = ["Öğrenci", "1. Yazılı", "2. Yazılı", "Performans", "Ortalama", "Durum"];

function sampleWorkbook() {
    const box = { top: true, right: true, bottom: true, left: true };
    const header = HEADER.map((value) => ({ value, borders: box, style: { bold: true, backgroundColor: "#d9ead3", horizontalAlign: "center" } }));
    const rows = STUDENTS.map(([name, a, b, c], index) => {
        const r = index + 2;
        return [
            { value: name, borders: box },
            { value: String(a), borders: box, style: { horizontalAlign: "center" } },
            { value: String(b), borders: box, style: { horizontalAlign: "center" } },
            { value: String(c), borders: box, style: { horizontalAlign: "center" } },
            { formula: `=ORTALAMA(B${r}:D${r})`, borders: box, style: { horizontalAlign: "center", numberFormat: "number", decimalPlaces: 1 } },
            { formula: `=EĞER(E${r}>=50;"Geçti";"Kaldı")`, borders: box, style: { horizontalAlign: "center" } }
        ];
    });
    const summary = [
        [{ value: "Sınıf ortalaması", style: { bold: true } }, null, null, null,
            { formula: "=ORTALAMA(E2:E13)", style: { bold: true, horizontalAlign: "center", numberFormat: "number", decimalPlaces: 1 } }],
        [{ value: "Geçen öğrenci", style: { bold: true } }, null, null, null,
            { formula: '=EĞERSAY(F2:F13;"Geçti")', style: { bold: true, horizontalAlign: "center" } }]
    ];
    const colWidths = Array.from({ length: 52 }, (_, c) => [110, 68, 68, 92, 80, 64][c] ?? 84);
    return {
        app: "awCELL",
        version: 1,
        activeSheetIndex: 0,
        sheets: [{
            name: "9-A Matematik",
            rowCount: 200,
            colCount: 52,
            tableData: [header, ...rows, [], ...summary],
            colWidths,
            rowHeights: Array.from({ length: 200 }, () => 26),
            frozenRows: 1,
            frozenCols: 0
        }]
    };
}

const DEVICES = {
    telefon: { viewport: { width: 360, height: 720 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true },
    tablet7: { viewport: { width: 600, height: 960 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
    tablet10: { viewport: { width: 1280, height: 800 }, deviceScaleFactor: 2, isMobile: false, hasTouch: true }
};

const server = await preview({ root, preview: { host: "127.0.0.1", port: 4178, strictPort: true } });
const url = "http://127.0.0.1:4178/";
const browser = await chromium.launch(existsSync("/usr/bin/chromium") ? { executablePath: "/usr/bin/chromium" } : {});
const work = mkdtempSync(path.join(tmpdir(), "awcell-play-"));
const workbookPath = path.join(work, "9-A Matematik.awc");
writeFileSync(workbookPath, JSON.stringify(sampleWorkbook()));

async function openPage(device) {
    const context = await browser.newContext({ ...DEVICES[device], locale: "tr-TR" });
    const page = await context.newPage();
    await page.goto(url);
    await page.waitForSelector("td[data-row='0'][data-col='0']");
    await page.setInputFiles("#open-file-input", workbookPath);
    await page.waitForFunction(() => document.querySelector('td[data-row="1"][data-col="4"]')?.textContent.trim() === "84,3");
    // Telefonda %75: Öğrenci'den Ortalama'ya kadar ekrana sığar.
    if (device === "telefon") {
        await page.click("#zoom-value-btn");
        await page.click('#zoom-menu [data-zoom-value="75"]');
        await page.waitForTimeout(200);
    }
    return { context, page };
}

const cell = (r, c) => `td[data-row="${r}"][data-col="${c}"]`;
const save = (page, name) => page.screenshot({ path: path.join(shots, `${name}.png`) });

async function chart(page) {
    await page.click(cell(0, 0));
    await page.keyboard.down("Shift");
    await page.click(cell(12, 4));
    await page.keyboard.up("Shift");
    const button = page.locator("#insert-chart-btn");
    if (!(await button.isVisible())) await page.click("#toolbar-menu-btn");
    await button.click();
    await page.waitForTimeout(500);
    await page.fill("#chart-settings-title-input", "Öğrenci ortalamaları");
    await page.fill("#chart-settings-label-range", "A2:A13");
    await page.dispatchEvent("#chart-settings-label-range", "change");
    await page.fill("#chart-settings-value-range", "E2:E13");
    await page.dispatchEvent("#chart-settings-value-range", "change");
    await page.waitForTimeout(300);
    await page.click("#chart-settings-close-btn");
    await page.evaluate(() => { document.getElementById("sheet-scroll").scrollTo(0, 0); });
    await page.waitForTimeout(800);
}

try {
    for (const device of Object.keys(DEVICES)) {
        let { context, page } = await openPage(device);
        await page.click(cell(1, 4));
        await page.evaluate(() => { document.getElementById("sheet-scroll").scrollTo(0, 0); });
        await page.waitForTimeout(300);
        await save(page, `${device}-1-tablo`);

        await page.click(cell(0, 1));
        await page.click("#text-group-btn");
        await page.waitForTimeout(300);
        await save(page, `${device}-2-bicim`);
        await context.close();

        ({ context, page } = await openPage(device));
        await chart(page);
        await save(page, `${device}-3-grafik`);
        await context.close();

        if (device === "telefon") {
            ({ context, page } = await openPage(device));
            await page.click("#help-menu-btn").catch(async () => {
                await page.locator("#menu-bar .text-menu").evaluate((menu) => { menu.scrollLeft = menu.scrollWidth; });
                await page.click("#help-menu-btn");
            });
            await page.click('[data-help-action="functions"]');
            await page.waitForTimeout(400);
            await save(page, `${device}-4-formuller`);
            await context.close();
        }
        console.log(`${device}: tamam`);
    }

    // Öne çıkan görsel (1024×500)
    const page = await browser.newPage({ viewport: { width: 1024, height: 500 } });
    await page.setContent(`<!doctype html><html lang="tr"><head><meta charset="utf-8"><style>
        body { margin: 0; width: 1024px; height: 500px; display: flex; align-items: center; gap: 48px; padding: 0 64px; box-sizing: border-box;
            background: linear-gradient(135deg, #ffffff 0%, #e6f4ea 100%); font-family: "Noto Sans", Arial, sans-serif; color: #202124; }
        img { width: 220px; height: 220px; flex: none; }
        h1 { margin: 0; font-size: 84px; letter-spacing: -1px; }
        h1 span { color: #188038; }
        p { margin: 8px 0 0; font-size: 30px; color: #3c4043; }
        ul { display: flex; gap: 12px; margin: 28px 0 0; padding: 0; list-style: none; }
        li { padding: 8px 16px; border-radius: 999px; background: #ffffff; border: 2px solid #ceead6; font-size: 20px; font-weight: 600; color: #137333; }
    </style></head><body>
        <img src="${url}icons/app-icon.svg" alt="">
        <div><h1>aw<span>CELL</span></h1><p>Türkçe formüllü elektronik tablo</p>
        <ul><li>Excel</li><li>LibreOffice</li><li>PDF</li><li>Grafik</li></ul></div>
    </body></html>`);
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(out, "one-cikan-1024x500.png") });
    copyFileSync(path.join(root, "public/icons/app-icon.png"), path.join(out, "simge-512.png"));
    console.log("öne çıkan görsel ve simge: tamam");
} finally {
    await browser.close();
    await new Promise((resolve) => server.httpServer.close(resolve));
    rmSync(work, { recursive: true, force: true });
}
