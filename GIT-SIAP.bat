@echo off
title Git - Terminal Siap Pakai
cd /d "%~dp0"
set "PATH=C:\Program Files\Git\cmd;C:\Program Files\Git\bin;%PATH%"

echo.
echo Git siap dipakai di folder ini.
echo.

git --version
if errorlevel 1 (
  echo Git tidak ditemukan. Install ulang: winget install Git.Git
  pause
  exit /b 1
)

echo.
echo Perintah yang bisa Anda ketik di jendela ini:
echo   git status
echo   git config --global user.name "Aryak"
echo   git config --global user.email "email@github.com"
echo   git commit -m "Initial commit"
echo   git remote add origin https://github.com/USERNAME/spesial-gift.git
echo   git push -u origin main
echo.
echo Atau double-click: hubungkan-github.bat
echo.

cmd /k
