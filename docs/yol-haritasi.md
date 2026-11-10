# awCELL yol haritası

Kullanıcının istekleri ve öneriler tarihiyle buraya yazılır; kullanıcı açıkça istemeden uygulanmaz.

## Araç çubuğunu gruplama (2026-11-10, kullanıcı isteği)

**Uygulandı (2026-11-10).** Çubukta 13 öğe (bölünmüş düğmelerle 15 düğme). Kod: `index.html` `#control-panel`,
`app.js` "ARAÇ ÇUBUĞU GRUPLARI" (`setupToolbarGroups`, `fitToolbar`, `updateToolbarGroupState`), `style.css`
"Araç çubuğu grupları". Eski kaydırma okları, ayrı kenarlık penceresi ve "Diğer biçimler" penceresi kalktı;
renkler Yazı grubunda kutucuk, sayı biçimleri Sayı biçimi grubunda liste oldu (iç içe pencere yok).
Varsayılan seçenek (sola hizala, dikey orta) ana düğmeyi basılı göstermez. Satır/Sütun grubunda seçim
yokken "Önce satır numarasına dokunun" ipucu çıkar. Tarayıcıda 1400, 520 ve 380 piksel genişlikte denendi;
gerçek tahtada denenmedi.

**Sorun:** Araç çubuğunda 13 kümede 39 düğme var. Dar ekranda çubuk kayıyor; soldaki "‹" kaydırma düğmesi Geri Al
simgesinin üstüne biniyor. Bu işlevlerin hepsi üstteki Biçim, Veri ve Ekle menülerinde de var.

**Kullanıcı kararı:** drAW2D'deki gibi açılır gruplar olsun. Kalın / İtalik / Altı çizili ve iki renk de Yazı grubuna
girsin. Taşma düğmesi "⋯" değil, awPDF'teki gibi üç çizgi (☰) olsun ve açıkken ✕'e dönsün. ☰ menüsünün içi aşağıdaki
"karışık" düzende olsun. Bu stil awPDF ve drAW kardeşlerde de uygulanacak (aşağıdaki "Ortak araç çubuğu stili").

### Çubukta kalacak 13 düğme

| Düğme | İçindekiler |
|---|---|
| Geri Al, Yinele | — |
| Yakınlaştırma (%100) | — |
| **Satır ▾** | Üste ekle, alta ekle, sil |
| **Sütun ▾** | Sola ekle, sağa ekle, sil |
| **Yazı ▾** | Kalın, İtalik, Altı çizili, Üstü çizili, büyüt, küçült, yazı rengi, dolgu rengi |
| **Hizalama ▾** | Üst sırada 4 yatay, alt sırada 3 dikey seçenek |
| **Kenarlık ▾**, Birleştir | — |
| **Sayı biçimi ▾** | Para, yüzde, ondalık azalt/artır, diğer |
| **Sırala ve süz ▾** | A-Z, Z-A, filtre |
| **Satır/Sütun görünümü ▾** | Gizle, göster, dondur |
| Grafik | — |
| **☰ / ✕** | Ekran darsa sığmayan gruplar |

### Ayrıntılar

- **Bölünmüş düğme (öneri):** Hizalama, Kenarlık ve renklerde düğmenin büyük kısmı son seçilen işi doğrudan yapar,
  yanındaki ▾ grubu açar. Düğmenin simgesi son seçimi gösterir.
- **Yazı grubu açık kalır:** Kalın'a basınca pencere kapanmaz; kalın, italik ve renk art arda seçilebilir. Hücreye
  dokununca, ✕'e basınca ya da Esc ile kapanır.
- **Renkler:** Pencerede hazır renk kutucukları; sistemin renk seçicisi yalnız "Diğer renk…" ile açılır (tahtada
  sistem seçicisi kullanışsız).
- **Durum gösterimi:** Seçili hücre kalınsa ya da renkliyse Yazı düğmesinde küçük bir işaret; hizalama düğmesi
  hücrenin hizasını gösterir.
- Ctrl+B/I/U ve öteki kısayollar aynen kalır. Üstteki Dosya, Düzenle, Görünüm, Ekle, Veri, Biçim, Yardım menüleri
  değişmez.
- "‹" / "›" kaydırma düğmeleri kalkar; yerine ☰ gelir.
- **☰'ye geçiş sırası (öneri, açık soru):** düğmeler sondan başlayarak menüye geçer. Önerilen çubuk sırası: Geri Al,
  Yinele, Yakınlaştırma, Yazı, Hizalama, Kenarlık, Birleştir, Sayı biçimi, Satır, Sütun, Sırala ve süz, Satır/Sütun
  görünümü, Grafik. Yani dar ekranda önce Grafik, sonra görünüm ve sıralama menüye geçer.

## Ortak araç çubuğu stili (2026-11-10, kullanıcı isteği; awCELL, awPDF, drAW, drAW2D, drAW3D)

Kullanıcı: "Bu menü sistemini awPDF ve drAW kardeşlerde de uygulayabileceğimiz bir şey olmalı. Aynı stile
çekebilmek için." Kurallar beş projenin yol haritasında aynıdır; birinde değişirse ötekiler de güncellenir.

1. **Taşma menüsü ☰ / ✕:** Sığmayan düğmeler sondan başlayarak ☰ menüsüne geçer. Menü açıkken düğme ✕ olur, adı
   "Menüyü aç" / "Menüyü kapat" diye değişir. "⋯" ve kaydırma okları kullanılmaz. Pencere boyutu değişince yeniden
   hesaplanır. Örnek uygulama: awPDF `src/ui/toolbar.ts` (`mountOverflowMenu`).
2. **Kapanma:** ✕, dışarıya dokunma, Esc, Android geri düğmesi, menüden bir iş seçme. İstisna: art arda seçim
   yapılan gruplar (awCELL'de Yazı) iş seçilince açık kalır.
3. **Gruplar:** Çubukta grup başına tek düğme ve ▾. Tıklayınca açılır, üstüne gelince açılmaz (tahtada fare yok).
   Aynı anda tek pencere açık olur.
4. **Son kullanılan:** Grup düğmesi son seçilen aracı ya da işi gösterir (drAW2D'deki gibi).
5. **Durum gösterimi:** Grubun içindeki seçimin etkin olduğu (kalın yazı, açık mıknatıs…) grup düğmesinden de anlaşılır.
6. **☰ menüsünün içi:**
   - Grup başlıkları her zaman simge ve etiketle görünür ve yerinde (akordeon gibi) açılır, yana yeni pencere açmaz.
     Aynı anda tek grup açık olur.
   - Herkesin tanıdığı simgeler (K/İ/A, hizalama okları, kenarlık çizgileri, renk kutucukları) grup açılınca yalnız
     simge olarak yan yana dizilir.
   - Yanlış anlaşılabilecek simgeler (üste/alta ekle, gizle/göster/dondur, para/yüzde…) simge ve etiketle durur.
   - Tek düğmeler (Grafik, Birleştir…) awPDF'teki gibi simge ve etiketle durur ve doğrudan iş yapar.
   - Gerekçe: dokunmatikte ipucu (`title`) çıkmaz; anlamı belirsiz bir düğme etiketsiz bırakılmaz. Yalnız simge
     düzeninin tek kazancı menünün kısalması, o da yalnız yatay telefonda önemli.
7. Dokunma alanları çubukta ve menüde aynı büyüklükte kalır.

Ortak kod (tek paket) şimdilik yok; her proje kendi kopyasını yazar, davranış aynı tutulur. awCELL'de
uygulandı (2026-11-10); ötekiler sonra, kullanıcı onayıyla.

## Dört paket ve Google Play (2026-11-10, kullanıcı isteği)

Kullanıcı: awCELL de kardeşleri gibi dört paketle (Linux .deb ve AppImage, Windows .exe, Android .apk)
çıksın ve ileride Play Store'da yayımlanabilsin. Değerlendirme: düz HTML/JavaScript engel değil; Electron ve
Capacitor web sayfasını paketler. Önce altyapı, sonra uyarlamalar gerekir.

**Sıra (kullanıcı onayı 2026-11-10):**

1. **Vite ve paketleme altyapısı:** `npm run build` → `dist/`; kod JavaScript kalır (TypeScript sonraya).
   `release.yml` ve `scripts/release-assets.mjs` drAW ailesi ve awPDF ile birebir aynı (beşi birlikte değişir).
   `electron/` (pencere, dosya pencereleri), `capacitor.config.json`, `android/`, `build/icons` (logodan),
   `appId` `com.madematik.awcell` (öneri). Canlıya yükleme `dist/`'ten. Android imza secret'ları awCELL
   deposuna da eklenmeli.
   **Yapıldı (2026-11-10):** kaynaklar `src/` (ES modülleri), `public/` (simgeler, `sw.js`, manifest); Chart.js
   npm paketi (4.5.1), `vendor/` kalktı; `?v=` etiketleri yerine içerik özetli dosya adları. `electron/main.js`:
   `awcell://app/` adresi, CSP, sandbox, tek pencere, F11, bağlantılar sistem tarayıcısında, sistem başlık
   çubuğu (kardeşlerdeki kendi başlık çubuğu sonraya). `package.json` sürüm 0.0.1, `appId`
   `com.madematik.awcell`. `release.yml` ve `release-assets.mjs` awPDF'tekinin birebir kopyası (yorumdaki
   "drAW, drAW2D, drAW3D ve awPDF" listesine awCELL, beş dosya birlikte değişirken eklenecek). Service worker
   yalnız web'de (`https:` ve Capacitor değil). Satır içi `onsubmit` CSP yüzünden `app.js`'e taşındı.
   Denendi: 22 birim testi, tarayıcıda (vite preview) ve Electron'da arayüz denemesi, Linux paketleri.
   **Ertelendi:** `capacitor.config.json` ve `android/` 4. adıma kaldı: `release.yml`, `android/` klasörü
   görünce APK'yı da yayımlıyor; dosya kaydetme Android'e uyarlanmadan yarım bir APK çıkmasın.
2. **Masaüstü paketleri:** .deb, AppImage, .exe; GitHub Releases, sürüm numarasız adlar.
   **Yapıldı (2026-11-10), sürüm bekliyor:** kendi başlık çubuğu (kullanıcı isteği; drAW ailesi ve awPDF ile aynı
   görünüm, açık dosyanın adını gösterir), çerçevesiz pencere. Dosya pencereleri Electron'dan (`electron/files.js`):
   sayfa yolu hiç görmez, yalnız kullanıcının seçtiği dosyaya numarayla okur/yazar; `src/desktop.js` tarayıcının
   dosya erişim arayüzünü bunlarla sağlar, uygulamanın açma/kaydetme kodu tek kaldı. Ctrl+S açık `.awc`'nin
   üstüne yazar. Masaüstünde "Farklı kaydet" önce biçimi sorar (sistem penceresi seçilen filtreyi bildirmez).
   "Birlikte aç": Linux'ta `.awc` kendi türü (`application/x-awcell`), `.xlsx`/`.ods`/`.csv` yalnız "Birlikte aç"
   listesinde (sistem türlerinin tanımı değişmez); Windows'ta yalnız `.awc` (kurulum ilişkilendirdiği uzantının
   varsayılanı olur). İkinci açılış dosyayı var olan pencereye verir. GitHub Actions'ta yalnız paket üreten
   çalıştırmada Linux ve Windows paketleri üretildi (2026-11-10). Denendi: Electron'da ve paketlenmiş Linux
   uygulamasında (pencere gizli; sistem dosya pencereleri betikle yanıtlandı). Denenmedi: yazdırma (sistem
   penceresi), gerçek kurulum (.deb, .exe), Windows'ta çalıştırma.
3. **Dokunmatik uyarlama:** tablo fare olaylarıyla çalışıyor; telefonda ve tahtada sürükleyerek aralık seçme,
   sütun/satır boyutlandırma, doldurma tutamacı ve sağ tık menüsü (uzun basma) çalışmıyor. Bugün web
   sürümünde tahtada da geçerli.
   **Yapıldı (2026-11-10):** dokunmak seçer, çift dokunmak düzenler, parmakla sürüklemek kaydırır; seçimin köşesindeki
   yuvarlak tutamaçla aralık seçilir (kenara gelince tablo kayar); satır numarası / sütun harfi üzerinde sürüklemek
   birden çok satır/sütun seçer; boyutlandırma tutamacı dokunmada yalnız seçili satırın/sütunun başlığında, geniş;
   uzun basmak sağ tık menüsünü açar; formül yazarken dokunulan hücre başvuru olur; dondurma çizgisi ve grafik
   penceresi parmakla taşınır. Pencere düzeyindeki sürüklemeler pointer olaylarına geçti (fare aynı).
   Dar ekran (telefon): üst çubuk sığar (küçük logo, menü şeridi yana kayar, menüler düğmenin altına), yükseklik
   `100dvh` (adres çubuğu yüzünden sayfa sekmeleri görünmüyordu). Farede de bir hata düzeltildi: formülde
   tıklanan başvuru, fare üstünden geçen hücrelerle değişmeye devam ediyordu.
   Denendi: masaüstü Chromium'da dokunma taklidiyle ve telefonda (Xiaomi, Chrome 156) adb ile gerçek dokunuşla.
   Denenmedi: akıllı tahta (ETAP). Yapılmadı: sayfa sekmelerini dokunarak sürükleyip sıralama, seçimi kenarından
   tutup taşıma (ikisi farede var).
4. **Android (.apk):** dosya kaydetme/açma (indirme bağlantısı Android'de çalışmaz; awPDF'teki gibi dosya ve
   paylaşma eklentisi), yazdırma, "Birlikte aç".
   **Yapıldı (2026-11-10):** Capacitor 8.5.3, `android/` (sürüm `package.json`'dan, imza secret'lardan, deneme kopyası
   `.deneme` / "awCELL Deneme"), internet izni yok. `AwCellNativePlugin.java` + `src/android.js`: Aç ve Farklı kaydet
   Android'in dosya ekranlarıyla (Farklı kaydet önce biçimi sorar), Kaydet açık dosyanın üstüne yazar (izin yoksa
   kaydet ekranı), "Birlikte aç" (.xlsx/.ods/.csv türleriyle, .awc adıyla), yazdırma Android'in yazdırma hizmetiyle
   (sayfa görüntüleri), geri tuşu önce açık menü/pencere/düzenlemeyi kapatır, yoksa uygulamayı arka plana alır.
   Android simgeleri `npm run icons` ile. Telefonda (Xiaomi, Android 13) gerçek dokunuşla denendi: veri ve formül,
   .awc kaydetme, Kaydet, Aç, geri tuşu, yazdırma önizlemesi, "Birlikte aç" (.xlsx). Son tam denemede kaydetme
   ekranında zaman aşımı oldu (önceki iki tam deneme geçmişti; telefon kullanıcıya geri verildi) — gerçek
   kullanımda kaydetme bir kez daha denenmeli. Paylaş (başka uygulamaya gönder) yok.
5. **Play Store:** imzalı .aab (`play-Android` artifact'ı), gizlilik politikası (awPDF `gizlilik.html` örnek),
   mağaza simgesi ve ekran görüntüleri.
   **Hazırlandı (2026-11-10):** `public/gizlilik.html` (canlıda madematik.com/awCELL/gizlilik.html),
   `docs/play/magaza.md` (ad, kısa ve tam açıklama, kategori, beyan önerileri, 1.1.0 sürüm notu; `node
   scripts/play/sinirlar.mjs` sınırları denetler), `docs/play/` simge, öne çıkan görsel ve telefon / 7" / 10" tablet
   ekran görüntüleri (`npm run play:gorseller`; uydurma not çizelgesi). İmzalı AAB: son sürüm iş akışının
   `play-Android` artifact'ı (yerelde `release/awCELL-android.aab`, depoya girmez).
   Görsellerde bulunan hata düzeltildi: yeni grafik penceresi dar ekranda taşıyor, kaydırılmış tabloda görünmeyen
   yere açılıyordu.
   **Kullanıcının Play Console'da yapacakları** (awPDF'teki sırayla, bir seferde bir adım):
   1. Uygulama oluştur: ad "awCELL: Elektronik Tablo", dil Türkçe, Uygulama, Ücretsiz.
   2. Uygulama bütünlüğü → Uygulama imzalama → "Anahtarı değiştir" → "Bu geliştirici hesabındaki başka bir uygulamayla
      aynı anahtarı kullan" → awPDF (PEPK gerekmez). Doğrulama: SHA-256 `84:F7:8D:F0:…`.
   3. Mağaza kaydı ve uygulama içeriği beyanları (`docs/play/magaza.md`).
   4. Dahili test: AAB'yi yükle, telefonda Play'den kurup dene.
   5. Kapalı test: en az 12 testçi, kesintisiz 14 gün (awPDF'teki testçi listesi kullanılabilir).
   6. Üretim erişimi başvurusu ve yayın.
   Kapalı test awPDF'inkiyle aynı anda yürüyebilir (her uygulamanın 14 günü ayrı sayılır).
   **Kullanıcı kararı (2026-11-10):** awCELL şimdilik Play'e yüklenmiyor; awPDF Play'de yayına girdikten sonra
   kullanıcı duruma göre karar verecek. Hazırlık bitti; o gün yeni bir sürüm çıkmışsa AAB son sürümün
   `play-Android` artifact'ından alınır (artifact 30 gün saklanır; süresi geçmişse iş akışı `yayinla=false` ile
   yeniden çalıştırılır) ve `magaza.md`'deki sürüm notu güncellenir.

**Kullanıcı kararı (2026-11-10):** APK de GitHub sürümünde, kardeşlerle aynı imzayla yayımlanır; bütün
paketler (deb, AppImage, exe, apk) GitHub sürümünde. Sürüm 1.0.0'dan başlar (yalnız awCELL), gerekli
değişiklikler (Android uyarlaması) bittikten sonra. İmza: `ANDROID_KEYSTORE_BASE64` ve `ANDROID_KEY_ALIAS`
secret'ları Claude yükleyebilir; iki parola (`ANDROID_KEYSTORE_PASSWORD`, `ANDROID_KEY_PASSWORD`) kullanıcı
tarafından `gh secret set` ile girilir.

**v1.0.0 yayımlandı (2026-11-10, kullanıcı yetkisiyle):** https://github.com/200709078/awCELL/releases/tag/v1.0.0 —
`awCELL-android.apk` (3 MB), `awCELL-linux-amd64.deb`, `awCELL-linux-x86_64.AppImage`, `awCELL-win-x64.exe`,
`SHA256SUMS.txt`. APK imzası kardeşlerle aynı (sertifika SHA-256 `84f78df0…b856f1fa96`, iş akışı kaydında doğrulandı).
Play için imzalı AAB `play-Android` artifact'ı olarak 30 gün saklanır (`gh run download --name play-Android`).
Web sürümü aynı gün canlıda. Sıradaki: 5. adım (Play Store) ve "Daha çok satır ve sütun".

**Ayrıntılar ve açık sorular:**
- "Birlikte aç": `.awc` awCELL'in kendi dosyası. `.xlsx`, `.ods`, `.csv` yalnız "Birlikte aç" listesine girsin,
  varsayılan program olmasın (LibreOffice'in yerini almasın) — öneri.
- Çevrimdışı önbellek (`sw.js`) yalnız web sürümünde; paketli uygulamada kayıt edilmez.
- Tahtada çok yazı yazılacağı için awPDF / drAW'daki ekran klavyesi awCELL'e de alınmalı.
- Play: awPDF yayına girdikten sonra kullanıcı karar verecek (2026-11-10).

## Daha çok satır ve sütun (2026-11-10, kullanıcı isteği)

Kullanıcı: varsayılan 100 satır; mümkün olduğunca satır ve sütun sayısı artırılsın.

- Bugün: varsayılan 100 satır × 26 sütun; içe aktarımda en çok 5000 satır × 200 sütun. Tablo bütün hücreleriyle
  DOM'a çiziliyor; 2000 satırda tam yeniden çizim ~0,5 sn (masaüstü). Telefonda/tahtada birkaç kat yavaş (tahmin).
- **Seçenek 1 (küçük):** varsayılan 200 × 52 (A–AZ); kaydırarak sona yaklaşınca 100 satır / 26 sütun kendiliğinden eklenir.
- **Seçenek 2 (büyük, öneri):** yalnız görünen hücreleri çizmek (sanal kaydırma). 10.000 × 200 bile hızlı olur; çizim,
  birleştirme, dondurma, seçim ve satır yükseklikleri yeniden yazılır, kapsamlı test gerekir.
- Önerilen sıra: Android ve v1.0.0 şimdiki sayılarla; ardından seçenek 2 ayrı adım. Karar kullanıcıda.
- Ölçüm (2026-11-10): asıl darboğaz bellek — her boş hücre ayrı nesne (biçim ve kenarlık nesneleriyle) ve geri alma
  her işlemde bütün tablonun kopyasını saklar (60 adım). Aşamalar: (1) varsayılan 200 × 52, kaydırdıkça büyüme,
  geri alma kopyalarında boş hücreler saklanmaz; (2) yalnız görünen satırları çizmek; (3) seyrek veri ve farkla
  geri alma (100.000+ satır).
- **Kullanıcı kararı (2026-11-10):** 1 ve 2 yeterli; ardından Play Store.
- **1 ve 2 yapıldı (2026-11-10):** varsayılan 200 × 52 (A–AZ); kaydırarak sona yaklaşınca 100 satır / 26 sütun eklenir
  (en çok 5000 satır, 200 sütun, 300.000 hücre). Geri alma kopyalarında boş hücreler saklanmaz. 300 satırı geçen
  tabloda yalnız ekrandaki satırlar ve 30'ar satır pay çizilir (20'lik dilimler; aradaki satırların yerini aynı
  yükseklikte boş satır tutar); dondurulmuş satırlar hep çizilir, pencere kenarındaki birleştirmeler bütünüyle
  içeride kalır; uzak hücreye gidince (ok tuşları, Ad kutusu, Bul, düzenleme) önce oraya kaydırılır; düzenleme
  sürerken kaydırma yeniden çizmez. 3000 satırda kaydırma başına çizim ~13 ms (masaüstü). Denendi: 3000 satırlık CSV
  ile fare, klavye, Ad kutusu, geri alma, tümünü seç, dondurma, birleştirme ve dokunma taklidi. Bu sırada eskiden
  beri olan bir hata düzeltildi: Ad kutusuna "C5" yazıp Enter'a basınca C6 seçiliyordu.

## Hakkında penceresi (2026-11-10, kullanıcı kararı; drAW2D'de uygulandı; bu projede kodlanmadı)

Kullanıcı: "Hakkında yardım gibi ayrı pencerede açılsa nasıl olur?" → "tamam öyle yapalım. Diğer kardeşlere de bunu not et
(özellikle hakkında kısmı hepsinde olmalı)." Aile kuralı: drAW, drAW2D, drAW3D, awPDF ve awCELL'in **hepsinde** Hakkında olur.

- **Ayrı küçük pencere:** uygulamanın yardım/diyalog pencereleriyle aynı görünüş (başlık şeridi, ×). Kapanma: ×, dışarıya
  dokunma, Esc, Android geri tuşu.
- **İçerik:** uygulamanın simgesi, adı ve sürümü (`package.json`'dan otomatik), bir satırlık açıklama; mADEMatik Solutions ve
  madematik.com bağlantısı; indirme bağlantısı (GitHub sürümleri: Linux, Windows, Android); lisans MIT; "Öneri ve sorunlar:
  ademvarol@madematik.com" (seçilebilir düz yazı; e-posta bağlantıları tahtada ve telefonda çoğu zaman bir şey açmaz).
- **Bağlantılar** sistemin tarayıcısında açılır (Electron: `shell.openExternal`; Android: uygulamanın içinde değil, tarayıcıda).
- **Yer:** Dosya menüsünün en altı (drAW2D kararı); Yardım da hem çubukta hem Dosya menüsünde kalır.
- **awCELL'e uyarlama (öneri):** awCELL'in üst menüsünde "Yardım" menüsü var; Hakkında onun en altına girer. Sağ alttaki
  "mADEMatik Solutions" imzası kalabilir ya da Hakkında'ya taşınabilir; gizlilik politikası bağlantısı da Hakkında'ya eklenir.

