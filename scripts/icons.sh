#!/usr/bin/env bash
# Bütün uygulama simgelerini public/icons/app-icon.svg'den üretir (Inkscape ve ImageMagick 7):
# web (app-icon.png, app-icon-192.png, favicon.svg, logo.svg), Linux (build/icons) ve Windows
# (build/icon.ico) paketleri. Çıktılar depoya girer; simge değişince yeniden çalıştırın:
#   npm run icons
set -euo pipefail
cd "$(dirname "$0")/.."
source=public/icons/app-icon.svg

render() { inkscape "$source" -o "$2" -w "$1" -h "$1" > /dev/null 2>&1; }

render 512 public/icons/app-icon.png
render 192 public/icons/app-icon-192.png
cp "$source" public/icons/favicon.svg
cp "$source" public/icons/logo.svg
mkdir -p build/icons
for size in 16 24 32 48 64 128 256 512; do render "$size" "build/icons/${size}x${size}.png"; done
magick build/icons/256x256.png build/icons/128x128.png build/icons/64x64.png build/icons/48x48.png \
  build/icons/32x32.png build/icons/16x16.png build/icon.ico
echo "Simgeler public/icons/app-icon.svg'den üretildi."
