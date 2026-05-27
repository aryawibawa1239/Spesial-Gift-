# Hubungkan proyek ke GitHub

Git sudah terpasang. Repositori lokal sudah di-`git init` dan file sudah di-stage.

## Langkah 1 — Tutup & buka lagi terminal

Agar perintah `git` dikenali di PowerShell/Cursor, **tutup terminal lalu buka baru**, atau buka **Git Bash** dari menu Start.

## Langkah 2 — Atur nama Anda (sekali saja)

Ganti dengan nama dan email GitHub Anda:

```powershell
cd "C:\Users\USER\Downloads\spesial gift"

git config --global user.name "Aryak"
git config --global user.email "email-anda@example.com"
```

Email harus sama dengan akun GitHub (boleh email privat GitHub).

## Langkah 3 — Commit pertama

```powershell
git commit -m "Initial commit: website hadiah spesial"
git branch -M main
```

## Langkah 4 — Buat repo di GitHub

1. Buka https://github.com/new
2. **Repository name:** `spesial-gift` (atau nama lain)
3. Pilih **Private** jika hanya untuk Natasya
4. **Jangan** centang "Add a README" (repo harus kosong)
5. Klik **Create repository**

## Langkah 5 — Hubungkan & upload

Salin URL repo Anda, lalu jalankan (ganti `USERNAME` dan nama repo):

```powershell
git remote add origin https://github.com/USERNAME/spesial-gift.git
git push -u origin main
```

Saat diminta login:
- **Username:** username GitHub Anda
- **Password:** bukan password akun — pakai **Personal Access Token**
  - Buat di: https://github.com/settings/tokens → **Generate new token (classic)** → centang **repo** → Generate → salin token → paste sebagai password

## Langkah 6 — Deploy ke Vercel

1. https://vercel.com/new → Import repo `spesial-gift`
2. Framework: **Other**, Build Command: kosong, Output: `.`
3. Deploy → salin URL → isi `urlWebsite` di `config.js` → commit & push lagi

Selesai.
