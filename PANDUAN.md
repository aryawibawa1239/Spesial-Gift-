# Website Hadiah Spesial 💝

Website pribadi berisi ucapan dan foto, bisa dibagikan lewat **QR Code**.

## Cara mengedit ucapan & gambar

1. Buka file **`config.js`**
2. Ubah teks di bagian:
   - `untuk` — nama penerima
   - `judul` — judul halaman
   - `ucapan` — array paragraf pesan Anda
   - `dari` / `namaPengirim` — tanda tangan
   - `gambar` — daftar path foto, contoh: `"images/foto-kamu.jpg"`
   - `tema` — `"pink"` | `"purple"` | `"gold"` | `"blue"`

3. Simpan foto di folder **`images/`**, lalu tulis nama filenya di `gambar`.

## Cara melihat di komputer

Double-click **`index.html`** atau jalankan server lokal:

```bash
npx serve .
```

Buka alamat yang muncul di browser.

## Agar QR bisa discan dari HP (wajib)

QR **tidak berfungsi** jika hanya file lokal (`file://`). Website harus di-**upload** ke internet.

### Opsi gratis — Netlify Drop

1. Buka https://app.netlify.com/drop
2. Tarik seluruh folder proyek ke halaman tersebut
3. Netlify memberi URL, misalnya: `https://nama-acak.netlify.app`
4. Buka **`config.js`**, isi:
   ```js
   urlWebsite: "https://nama-acak.netlify.app",
   ```
5. Upload ulang folder (atau edit di Netlify) — QR di halaman akan mengarah ke URL itu
6. Unduh QR lewat tombol **"Unduh QR Code"** — cetak atau kirim gambar QR ke orang tersebut

### Opsi lain — Vercel

1. Buat akun di https://vercel.com (bisa login dengan GitHub)
2. Upload proyek ke GitHub (repo baru → upload file `index.html`, `config.js`, `app.js`, `style.css`, `qr.html`, `vercel.json`, folder `images`, dll.)
3. Di Vercel: **Add New** → **Project** → pilih repo tersebut
4. Pengaturan deploy:
   - **Framework Preset:** Other
   - **Build Command:** kosongkan
   - **Output Directory:** `.` (titik = folder utama)
5. Klik **Deploy** — tunggu sampai selesai
6. Salin URL, misalnya `https://spesial-gift.vercel.app`
7. Isi di **`config.js`**:
   ```js
   urlWebsite: "https://spesial-gift.vercel.app",
   ```
8. Deploy ulang sekali (push ke GitHub atau **Redeploy** di Vercel) agar QR mengarah ke URL yang benar

**Tanpa GitHub (perlu Node.js):** instal dari https://nodejs.org, lalu di folder proyek jalankan:

```bash
npx vercel
```

Ikuti login di browser, lalu `npx vercel --prod` untuk versi online.

### Opsi lain

- **GitHub Pages** — push repo, aktifkan Pages

## Fitur

- Animasi amplop (ketuk untuk membuka)
- Ucapan multi-paragraf
- Galeri foto
- QR otomatis + unduh PNG
- 4 tema warna

Selamat berbagi hadiah! ✨
