# TensorFlow Playground həlli

1. `HELL_VE_IZAH.md` — nəzəri sualların cavabları, izahlar, parametr hesablamaları.
2. `tecrube_paneli.html` — brauzerdə açılan, nəticələri lokal saxlayan interaktiv qeyd paneli.
3. `neticeler.csv` — təcrübələrin parametrləri və real ölçmələr üçün boş sütunlar.

**Diqqət:** PDF-də tələb olunan faktiki Playground loss/epoch ölçmələri və ekran görüntüləri icra edilmədən uydurulmayıb. Bu fayllar müəllimə təqdim ediləcək yekun PDF-i hazırlamaq üçün əsasdır.

## Kod yenilənməsi
HTML panelinin JavaScript hissəsi funksiyalara ayrılıb, CSV ixracı və lokal yaddaş saxlanılıb. Təcrübə sətirlərinin massiv formatı düzgün oxunur; bütün əvvəlki experiment ID-ləri və yaddaş açarları qorunur.


## Alternativ kod strukturu
Panel indi ayrıca `tecrube_paneli.html`, `style.css`, `experiments-data.js` və `app.js` fayllarından ibarətdir. Brauzerdə `tecrube_paneli.html` faylını açın. Əsas məntiq, localStorage açarları və CSV ixracı saxlanılıb.
