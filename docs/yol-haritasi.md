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
2. **Masaüstü paketleri:** .deb, AppImage, .exe; GitHub Releases, sürüm numarasız adlar.
3. **Dokunmatik uyarlama:** tablo fare olaylarıyla çalışıyor; telefonda ve tahtada sürükleyerek aralık seçme,
   sütun/satır boyutlandırma, doldurma tutamacı ve sağ tık menüsü (uzun basma) çalışmıyor. Bugün web
   sürümünde tahtada da geçerli.
4. **Android (.apk):** dosya kaydetme/açma (indirme bağlantısı Android'de çalışmaz; awPDF'teki gibi dosya ve
   paylaşma eklentisi), yazdırma, "Birlikte aç".
5. **Play Store:** imzalı .aab (`play-Android` artifact'ı), gizlilik politikası (awPDF `gizlilik.html` örnek),
   mağaza simgesi ve ekran görüntüleri.

**Ayrıntılar ve açık sorular:**
- "Birlikte aç": `.awc` awCELL'in kendi dosyası. `.xlsx`, `.ods`, `.csv` yalnız "Birlikte aç" listesine girsin,
  varsayılan program olmasın (LibreOffice'in yerini almasın) — öneri.
- Çevrimdışı önbellek (`sw.js`) yalnız web sürümünde; paketli uygulamada kayıt edilmez.
- Tahtada çok yazı yazılacağı için awPDF / drAW'daki ekran klavyesi awCELL'e de alınmalı.
- Play sırası (awPDF → drAW → drAW2D → drAW3D) içinde awCELL'in yeri kullanıcıya sorulacak.
