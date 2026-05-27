@echo off
title Hubungkan ke GitHub
cd /d "%~dp0"
set "PATH=C:\Program Files\Git\cmd;C:\Program Files\Git\bin;%PATH%"
set "GIT_EXE=C:\Program Files\Git\cmd\git.exe"
if not exist "%GIT_EXE%" set "GIT_EXE=C:\Program Files\Git\bin\git.exe"

echo.
echo === Website Hadiah - Hubungkan GitHub ===
echo.

git --version >nul 2>&1
if errorlevel 1 (
  echo Git belum terpasang. Jalankan di PowerShell Admin:
  echo   winget install Git.Git
  pause
  exit /b 1
)

echo [1] Pastikan Anda sudah menjalankan:
echo     git config --global user.name "Nama Anda"
echo     git config --global user.email "email@github.com"
echo.
pause

git commit -m "Initial commit: website hadiah spesial" 2>nul
if errorlevel 1 (
  echo Commit gagal. Atur nama/email dulu ^(lihat HUBUNGKAN-GITHUB.md^).
  pause
  exit /b 1
)

git branch -M main 2>nul

echo.
echo [2] Buat repo kosong di https://github.com/new
echo.
set /p REPO_URL=Tempel URL repo GitHub (contoh https://github.com/user/spesial-gift.git): 

if "%REPO_URL%"=="" (
  echo URL kosong. Batal.
  pause
  exit /b 1
)

git remote remove origin 2>nul
git remote add origin "%REPO_URL%"
git push -u origin main

if errorlevel 1 (
  echo.
  echo Push gagal. Gunakan Personal Access Token sebagai password:
  echo https://github.com/settings/tokens
) else (
  echo.
  echo Berhasil! Repo sudah di GitHub.
)

pause
