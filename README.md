# awCELL

Tarayıcıda çalışan, kurulum gerektirmeyen elektronik tablo uygulaması. Excel ve LibreOffice
dosyalarını açar ve kaydeder; internet kesildiğinde de son açılan sürüm çalışmaya devam eder.

**mADEMatik Solutions** — [madematik.com](https://www.madematik.com)

## Özellikler

- **Formüller**: güvenli, kendi ayrıştırıcısı olan formül motoru (JavaScript kodu çalıştırmaz).
  Türkçe Excel adları ve İngilizce adlar birlikte geçer (`=TOPLA(A1:A5)` = `=SUM(A1:A5)`);
  Türkçe Excel yazımı (`;` ayırıcı, ondalık virgül: `=YUVARLA(2,345;2)`, `=A1*0,5`) ve İngilizce
  yazım (`=ROUND(2.345,2)`) ikisi de geçer. Başka sayfaya başvuru: `='Not Listesi'!B4`.
  Formül yazarken bir hücreye tıklamak (sürüklemek) başvurusunu ekler.
- **İşlevler**: TOPLA, ORTALAMA, MİN, MAK, BAĞ_DEĞ_SAY, BAĞ_DEĞ_DOLU_SAY, BOŞLUKSAY, ÇARPIM, ORTANCA,
  STDSAPMA, BÜYÜK, KÜÇÜK, RANK, EĞER, EĞERHATA, VE, YADA, DEĞİL, EĞERSAY, ETOPLA, EĞERORTALAMA,
  ÇOKEĞERSAY, ÇOKETOPLA, DÜŞEYARA, YATAYARA, KAÇINCI, İNDİS, YUVARLA, YUKARIYUVARLA, AŞAĞIYUVARLA,
  TAMSAYI, NSAT, MUTLAK, KAREKÖK, KUVVET, MOD, Pİ, İŞARET, ÜS, LN, LOG, LOG10, UZUNLUK, BÜYÜKHARF,
  KÜÇÜKHARF, YAZIM.DÜZENİ, KIRP, SOLDAN, SAĞDAN, PARÇAAL, BİRLEŞTİR, SAYIYAÇEVİR, BUGÜN, ŞİMDİ,
  S_SAYI_ÜRET, RASTGELEARADA (ve İngilizce karşılıkları). Liste uygulamada **Yardım → Formüller**'de.
- **Hatalar** Türkçe Excel'deki gibi gösterilir: `#SAYI/0!`, `#DEĞER!`, `#AD?`, `#BAŞV!`, `#YOK`;
  döngüsel başvuru uygulamayı kilitlemez, `#DÖNGÜ!` olur.
- **Ondalık**: `3,5` ve `3.5` ikisi de sayıdır; formül sonuçları virgülle gösterilir.
- **Satır / sütun**: ekleme, silme, gizleme, taşıma, dondurma; ekleme/silmede formüller ve grafik
  aralıkları (diğer sayfalardakiler dahil) güncellenir.
- **Hücre biçimi**: kalın, italik, altı/üstü çizili, yazı rengi ve boyutu, dolgu, hizalama, kenarlık,
  birleştirme, sayı biçimleri (sayı, para, yüzde, tarih, saat), notlar.
- **Veri**: Türkçe alfabe sırasıyla sıralama (sütun seçiliyse satırlar bütün olarak, başlık yerinde),
  filtre, bul ve değiştir.
- **Grafikler**: sütun, çizgi, alan, yatay çubuk, pasta, halka, radar, saçılım (Chart.js).
- **Pano**: Excel, LibreOffice ya da web sayfasıyla kopyala-yapıştır (sekmeli metin).
- **Geri al / yinele**: her sayfanın geçmişi ayrı tutulur.
- **Otomatik kayıt**: tarayıcı deposunda. Sayfa yenilenince çalışma kendiliğinden gelir; sekme
  kapatılıp yeniden açılınca "Son çalışmanız bulundu — Geri yükle" önerilir.
- **Araç çubuğu**: işler gruplu (Yazı, Hizalama, Kenarlık, Sayı biçimi, Satır, Sütun, Sırala ve süz,
  Satır/sütun görünümü). Grup düğmesi tıklayınca açılır; Hizalama ve Kenarlık'ta düğmenin büyük kısmı
  son seçimi tek dokunuşla uygular. Ekran darsa sığmayanlar ☰ menüsüne geçer (açıkken ✕).
- **Yazdırma** (Ctrl+P): etkin sayfa A4'e bölünür; geniş tablolar yatay sayfaya geçer.

## Dosya biçimleri

| İşlem | Biçimler |
| --- | --- |
| Aç | `.awc`, `.xlsx`, `.ods`, `.csv` / `.tsv` (UTF-8 ya da Windows-1254) |
| Kaydet | `.awc` (awCELL'in kendi JSON biçimi) |
| Farklı kaydet / Dışa aktar | `.awc`, `.xlsx`, `.ods`, `.pdf`, `.csv` (etkin sayfa, `;` ayırıcılı), `.xls` (Excel 2003 XML) |

- `.xlsx` / `.ods` dışa aktarımında formüller (Türkçe adlar İngilizceye çevrilerek), hesaplanmış
  değerler, biçimler, kenarlıklar, birleştirmeler, sütun genişlikleri, satır yükseklikleri, gizli
  satır/sütunlar ve dondurulmuş bölmeler yazılır. Notlar `.ods`'ye yazılır, `.xlsx`'e yazılmaz.
- `.xlsx` içe aktarımında değerler, formüller (paylaşılan formüller dahil), biçimler, birleştirmeler,
  sütun/satır boyutları ve dondurma okunur; `.ods`'den değerler, formüller, birleştirmeler ve notlar.
- Eski ikili `.xls` açılamaz; dosyayı Excel/LibreOffice'te `.xlsx` olarak kaydedip açın.
- Bir sayfadan en çok 5000 satır ve 200 sütun içe alınır.
- PDF, sayfaların görüntüsünden oluşur (Türkçe harfler doğru çıkar; metin seçilemez). Grafikler PDF'e
  ve yazdırmaya girmez.
- Bütün dosyalar tarayıcıda üretilir; hiçbir veri sunucuya gönderilmez.

## Klavye kısayolları

| Kısayol | İşlem |
| --- | --- |
| `Ctrl+S` / `Ctrl+Shift+S` | Kaydet / Farklı kaydet |
| `Ctrl+O` / `Ctrl+P` | Aç / Yazdır |
| `Ctrl+Z` / `Ctrl+Y` | Geri al / Yinele |
| `Ctrl+C` / `Ctrl+X` / `Ctrl+V` | Kopyala / Kes / Yapıştır |
| `Ctrl+B` / `Ctrl+I` / `Ctrl+U` | Kalın / İtalik / Altı çizili |
| `Ctrl+F` | Bul ve değiştir |
| `Ctrl+A` | Tümünü seç |
| `F2` | Hücreyi düzenle (oklar imleci taşır) |
| `Delete` | İçeriği sil (biçim kalır) |
| `Enter` / `Tab` | Aşağı / sağa geç (`Shift` ile geri) |
| `Alt+Enter` | Hücrede yeni satır |
| `Ctrl+ok` | Verinin kenarına atla |
| `Ctrl+Home` / `Ctrl+End` | İlk / son dolu hücre |

## Geliştirme

Kod düz JavaScript (ES modülleri); Vite ile derlenir. Node 22.13 ya da yenisi gerekir.

```bash
npm ci              # ilk seferde
npm run dev         # http://127.0.0.1:4177 (değişince kendiliğinden yenilenir)
npm run build       # dist/ — web, Electron ve (ileride) Android aynı çıktıyı kullanır
npm run preview     # dist/'i http://127.0.0.1:4177'de açar
npm test            # formül motoru ve dosya biçimleri (node --test)
npm run electron    # derleyip masaüstü penceresinde açar
npm run icons       # simgeleri public/icons/app-icon.svg'den yeniden üretir (Inkscape, ImageMagick)
```

## Masaüstü paketleri

Masaüstü uygulamasının kendi başlık çubuğu vardır (drAW ailesi ve awPDF gibi). Dosya pencereleri sistemin
pencereleridir; Ctrl+S açık `.awc` dosyasının üstüne yazar. Dosya yöneticisinde `.awc` çift tıklamayla,
`.xlsx`, `.ods`, `.csv` "Birlikte aç" ile awCELL'de açılır (Windows'ta yalnız `.awc` ilişkilendirilir).

Linux `.deb` ve AppImage, Windows `.exe`; drAW ailesi ve awPDF ile aynı iş akışıyla
(`.github/workflows/release.yml`, `scripts/release-assets.mjs`; ikisi beş depoda birebir aynı) yalnız
GitHub Releases'te, sürüm numarası olmayan adlarla yayımlanır. Sürüm: `npm version patch`, ardından etiket
gönderilir. Yerelde Linux paketleri: `npm run dist:linux` → `release/`.

## Android

Capacitor ile (`android/`, `capacitor.config.json`); APK GitHub sürümünde, drAW ailesi ve awPDF ile aynı anahtarla
imzalı (secret'lar: `ANDROID_KEYSTORE_BASE64`, `ANDROID_KEYSTORE_PASSWORD`, `ANDROID_KEY_ALIAS`, `ANDROID_KEY_PASSWORD`).
Aç / Kaydet / Farklı kaydet Android'in dosya ekranlarıyla; "Birlikte aç" (.awc, .xlsx, .ods, .csv); yazdırma Android'in
yazdırma hizmetiyle. Deneme kopyası (`com.madematik.awcell.deneme`, "awCELL Deneme") Play sürümünün yanına kurulur:

```bash
npm run android:debug   # android/app/build/outputs/apk/debug/app-debug.apk
```

Google Play yol haritasında (`docs/yol-haritasi.md`).

## Yayınlama

Canlı adres: [madematik.com/awCELL/](https://madematik.com/awCELL/). Web sürümü (`dist/`) FTP ile
yüklenir:

```bash
npm run deploy -- --dry-run    # derler, yalnız ne yükleneceğini/silineceğini listeler
npm run deploy                 # derler ve yükler; index.html en son gider
```

Bağlantı bilgileri depoya girmeyen `.env` dosyasındadır: `FTP_HOST`, `FTP_PORT`, `FTP_USER`,
`FTP_PASSWORD`, `FTP_REMOTE_DIR=/public/awCELL` ve sunucuda TLS olmadığı için `FTP_SECURE=false`.
Sunucuda artık kullanılmayan dosyalar yalnız awCELL klasöründe silinir; gizli dosyalara dokunulmaz.

Derlenmiş dosyaların adında içerik özeti vardır (`assets/index-1a2b3c.js`); tarayıcı önbelleği için
elle sürüm etiketi gerekmez. `sw.js` yalnız web sürümünde çalışır: önce ağı dener, ağ yoksa önbelleği
kullanır.

## Proje yapısı

```
awCELL/
├── index.html            # Uygulama kabuğu, menüler, araç çubuğu, iletişim kutusu
├── src/
│   ├── app.js            # Arayüz: tablo çizimi, seçim, düzenleme, sayfalar, grafikler (Chart.js)
│   ├── formula.js        # Formül motoru (belirteç → ayrıştırıcı → değerlendirici), başvuru dönüşümleri
│   ├── fileio.js         # ZIP, XLSX, ODS, XLS (2003 XML), CSV, PDF; yazdırma sayfaları
│   ├── desktop.js        # Masaüstü: başlık çubuğu, dosya pencereleri, "Birlikte aç"
│   ├── android.js        # Android: dosya ekranları, "Birlikte aç", yazdırma, geri tuşu
│   └── style.css         # Tema ve yerleşim
├── public/               # Olduğu gibi kopyalanır: icons/, sw.js, manifest.webmanifest
├── android/              # Android projesi (Capacitor); AwCellNativePlugin.java
├── electron/             # Masaüstü: main.js (pencere), files.js (dosya pencereleri), preload.cjs
├── build/                # Paket simgeleri (icons/, icon.ico; npm run icons üretir)
├── tests/                # node --test testleri
├── docs/yol-haritasi.md  # İstekler ve planlar
└── scripts/              # deploy-ftp.mjs (web yayını), release-assets.mjs, icons.sh, Electron başlatma
```
