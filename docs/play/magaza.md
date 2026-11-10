# awCELL — Google Play mağaza kaydı

Play Console'a girilecek metinler ve görseller. Görseller `npm run play:gorseller` ile yeniden üretilir
(uygulamanın görünüşü değişince). Sınırlar Play'in sınırlarıdır; `node scripts/play/sinirlar.mjs` metinlerin
sığdığını denetler.

## Ayrıntılar

- **Uygulama adı** (en çok 30 karakter):

<!-- ad -->
awCELL: Elektronik Tablo
<!-- /ad -->

- **Kısa açıklama** (en çok 80 karakter):

<!-- kisa -->
Türkçe formüllü, reklamsız elektronik tablo. Excel ve LibreOffice ile uyumlu.
<!-- /kisa -->

- **Tam açıklama** (en çok 4000 karakter):

<!-- tam -->
awCELL, telefonda, tablette ve sınıftaki akıllı tahtada rahatça kullanılmak için tasarlanmış sade bir elektronik tablo uygulamasıdır. Reklam yoktur, hesap istemez, hiçbir veri toplamaz.

• Türkçe formüller: TOPLA, ORTALAMA, EĞER, EĞERSAY, ETOPLA, DÜŞEYARA, YUVARLA ve 60'a yakın işlev. Türkçe Excel'deki gibi ";" ayırıcı ve virgüllü ondalık kullanılır (=YUVARLA(2,345;2)); İngilizce adlar da geçer.
• Excel ve LibreOffice ile uyumlu: .xlsx, .ods ve .csv dosyalarını açar; .xlsx, .ods, .csv ve PDF olarak kaydeder. Kaydederken biçimler, birleştirilmiş hücreler ve formüller korunur.
• Grafikler: sütun, çubuk, çizgi, alan, pasta, halka, radar ve saçılım.
• Biçimlendirme: kalın, italik, yazı ve dolgu rengi, kenarlıklar, hizalama, hücre birleştirme; para, yüzde, tarih ve saat biçimleri; hücre notları.
• Türkçe alfabeye göre sıralama, filtre, bul ve değiştir, satır ve sütun dondurma.
• Birden çok sayfa ve sayfalar arası formüller.
• Dokunmatik için tasarlandı: dokunarak seçin, köşedeki tutamaçla aralık seçin, uzun basarak menüyü açın.
• Uzun tablolar: binlerce satırda bile kaydırma hızlıdır.
• Çalışmanız kendiliğinden saklanır; uygulamayı kapatsanız da kaldığınız yerden devam edersiniz.
• Yazdırma ve "Birlikte aç": başka uygulamalardan gelen Excel, LibreOffice ve CSV dosyalarını doğrudan açar.

Gizliliğiniz önce gelir
Tablolarınız yalnızca cihazınızda işlenir; hiçbir dosya internete ya da bir sunucuya gönderilmez. Uygulama hiçbir izin istemez, internet izni bile yoktur.

Her yerde aynı uygulama
awCELL'in Linux (Pardus dahil) ve Windows sürümleri ile tarayıcıda çalışan web sürümü de vardır: madematik.com/awCELL

awCELL ücretsizdir. Öneri ve sorunlar için: destek@madematik.com
<!-- /tam -->

## Kategori ve iletişim

- **Uygulama mı, oyun mu:** Uygulama
- **Ücretli mi, ücretsiz mi:** Ücretsiz
- **Kategori:** Verimlilik
- **Etiketler (öneri):** Verimlilik, Eğitim, İş, Araçlar (Play'in listesinden en yakınları seçilir).
- **E-posta (herkese açık):** destek@madematik.com
- **Web sitesi:** https://madematik.com
- **Telefon:** boş bırakılır (isteğe bağlı).
- **Gizlilik politikası:** https://madematik.com/awCELL/gizlilik.html (kaynağı `public/gizlilik.html`)

## Uygulama içeriği beyanları (öneri; awPDF'te verilen cevaplarla aynı mantık)

- **Veri güvenliği:** Veri toplanmıyor, paylaşılmıyor. Uygulama izin istemez, internet izni yoktur.
- **Reklam:** Reklam yok.
- **Uygulama erişimi:** Bütün işlevler herhangi bir giriş olmadan kullanılabilir.
- **İçerik derecelendirmesi:** Anket "araç / verimlilik" uygulaması olarak doldurulur; şiddet, kumar, kullanıcılar arası
  iletişim yok.
- **Hedef kitle:** awPDF'te seçilenle aynı yaş grupları.
- **Satıcı statüsü:** Hesap düzeyinde "tacir değil" olarak zaten beyan edildi (2026-11-07, awPDF).
- **Yapay zekâ beyanı:** awPDF'te seçilenle aynı.

## Sürüm notları ("Bu sürümdeki yenilikler", en çok 500 karakter)

Play Console'da sürüm oluşturulurken `<tr-TR>` ile `</tr-TR>` arasına yazılır. En yenisi üstte.

### 1.1.1

<!-- not-1.1.1 -->
İlk sürüm. Türkçe formüllü elektronik tablo: Excel ve LibreOffice dosyalarını açar ve kaydeder, grafik çizer, PDF olarak kaydeder ve yazdırır. Dokunmatik için tasarlandı; binlerce satırlık tablolarda bile hızlıdır. Reklam yok, hiçbir veri toplanmaz.
<!-- /not-1.1.1 -->

## Görseller (`docs/play/`)

| Play alanı | Dosya | Ölçü |
|---|---|---|
| Uygulama simgesi | `simge-512.png` | 512×512 |
| Öne çıkan görsel | `one-cikan-1024x500.png` | 1024×500 |
| Telefon ekran görüntüleri | `ekran/telefon-1…4-*.png` | 1080×2160 |
| 7 inç tablet ekran görüntüleri | `ekran/tablet7-1…3-*.png` | 1200×1920 |
| 10 inç tablet ekran görüntüleri | `ekran/tablet10-1…3-*.png` | 2560×1600 |

Ekran görüntülerindeki tablo bizim yazdığımız uydurma bir not çizelgesidir (`scripts/play/gorseller.mjs`); gerçek
öğrenci verisi ya da başkasına ait içerik yoktur.
