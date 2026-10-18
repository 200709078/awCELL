# awCELL

Tarayıcıda çalışan, kurulum gerektirmeyen, çevrimdışı çalışabilen elektronik tablo (spreadsheet) uygulaması.

made by **mADEMatik** — [madematik.com](https://www.madematik.com)

## Özellikler

- **Satır / sütun yönetimi**: üstte, altta, solda, sağa satır-sütun ekleme; seçili satır/sütunu silme
- **Hücre biçimi**: kalın, italik, altı çizili, üstü çizili, yazı rengi, yazı boyutu, dolgu rengi
- **Hizalama**: sola, ortaya, sağa, iki yana yasla; üste, dikey ortala, alta hizala
- **Kenarlıklar**: tüm, iç, dış, tekil kenarlıklar ve temizleme
- **Birleştirme**: hücreleri birleştirme / ayırma
- **Sayı biçimleri**: para birimi, yüzde, ondalık basamak artır/azalt
- **Sayfalar (sheets)**: sayfa ekleme, çoğaltma, yeniden adlandırma, silme, sürükle-bırak sıralama
- **Veri araçları**: A-Z / Z-A sıralama, filtre oluşturma, gizli satır/sütunları gösterme
- **Dondurma**: seçili satır/sütunu dondurma (freeze pane)
- **Grafikler**: çizgi, alan, çubuk, yatay çubuk, pasta, halka, radar, saçılım (Chart.js)
- **Arama ve değiştirme**: Ctrl+F ile arama, tekil/toplu değiştirme
- **Geri al / yinele**: Ctrl+Z / Ctrl+Y
- **Kes, kopyala, yapıştır, sil**: menü ve sağ tık bağlam menüsü ile
- **Yakınlaştırma**
- **Otomatik kayıt**: tarayıcı deposunda (localStorage) sessiz yedekleme

## Dosya biçimleri

| İşlem | Biçimler |
| --- | --- |
| Kaydet / Aç | `.awc` (awCELL'in kendi JSON biçimi) |
| Farklı Kaydet / Dışa Aktar | `.awc`, `.xls`, `.xlsx`, `.ods`, `.pdf` |

> `.xlsx`, `.xls`, `.ods` ve `.pdf` çıktıları uygulama içinde üretilir; harici bir sunucu veya kütüphane kullanılmaz.

## Çalıştırma

Uygulama saf HTML/CSS/JS'tir; derleme adımı yoktur.

```bash
# basit bir yerel sunucu ile
python3 -m http.server 8080
# veya
npx serve .
```

Sonra tarayıcıda `http://localhost:8080` adresini açın.

`index.html` dosyasını doğrudan açmak da çalışır; ancak dosya seçici/save picker özelliklerinin tamamı için yerel bir sunucu önerilir.

## Yayınlama

Canlı adres: [madematik.com/public/awCELL](https://madematik.com/public/awCELL/). Uygulama dosyaları
(`index.html`, `app.js`, `style.css`, `icons/`, `vendor/`) FTP ile yüklenir:

```bash
npm ci                         # yalnız ilk seferde (basic-ftp, dotenv)
npm run deploy -- --dry-run    # yalnız ne yükleneceğini/silineceğini listeler
npm run deploy                 # yükler; index.html en son gider
```

Bağlantı bilgileri depoya girmeyen `.env` dosyasındadır: `FTP_HOST`, `FTP_PORT`, `FTP_USER`,
`FTP_PASSWORD`, `FTP_REMOTE_DIR=/public/awCELL` ve sunucuda TLS olmadığı için `FTP_SECURE=false`.
Sunucuda artık kullanılmayan dosyalar yalnız awCELL klasöründe silinir; gizli dosyalara dokunulmaz.

## Klavye kısayolları

| Kısayol | İşlem |
| --- | --- |
| `Ctrl+Z` | Geri al |
| `Ctrl+Y` | Yinele |
| `Ctrl+F` | Arama |

## Proje yapısı

```
awCELL/
├── index.html      # Uygulama kabuğu, menü ve araç çubuğu
├── app.js          # Tüm uygulama mantığı (~8.800 satır)
├── style.css       # Tema ve yerleşim
├── icons/          # SVG arayüz simgeleri
├── vendor/         # Chart.js (yerel kopya)
└── scripts/        # deploy-ftp.mjs: madematik.com'a yayın (uygulamaya dahil değil)
```

## Teknoloji

- Vanilla JavaScript (bağımlılık yok; `package.json` yalnız yayın betiği içindir)
- Chart.js (grafikler için yerel kopya, `vendor/chart.js`)
- File System Access API (destekleyen tarayıcılarda) ve indirme yedeği
