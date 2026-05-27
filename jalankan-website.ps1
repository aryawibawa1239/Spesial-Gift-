# Menjalankan website + membuat QR yang bisa discan dari HP (WiFi sama)
$Port = 8765
$Root = $PSScriptRoot

function Get-LanIp {
    try {
        $addrs = Get-NetIPAddress -AddressFamily IPv4 -ErrorAction SilentlyContinue
        foreach ($a in $addrs) {
            $ip = $a.IPAddress
            if ($ip -like "127.*") { continue }
            if ($ip -like "192.168.*" -or $ip -like "10.*" -or $ip -like "172.*") {
                return $ip
            }
        }
    } catch { }
    return $null
}

$LanIp = Get-LanIp
if (-not $LanIp) { $LanIp = "127.0.0.1" }

$shareUrl = "http://${LanIp}:${Port}/index.html"
$qrPageUrl = "http://${LanIp}:${Port}/qr.html"

@{
    url       = $shareUrl
    qrPage    = $qrPageUrl
    ip        = $LanIp
    port      = $Port
    generated = (Get-Date -Format "yyyy-MM-dd HH:mm:ss")
} | ConvertTo-Json | Set-Content (Join-Path $Root "share-url.json") -Encoding UTF8

try {
    $qrApi = "https://api.qrserver.com/v1/create-qr-code/?size=400x400&margin=10&data=" + [uri]::EscapeDataString($shareUrl)
    Invoke-WebRequest -Uri $qrApi -OutFile (Join-Path $Root "qr-hadiah-spesial.png") -UseBasicParsing
    Write-Host "[OK] QR disimpan: qr-hadiah-spesial.png" -ForegroundColor Green
} catch {
    Write-Host "[!] Gagal unduh PNG QR (perlu internet)." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Magenta
Write-Host "  WEBSITE HADIAH - SIAP DISCAN" -ForegroundColor Magenta
Write-Host "========================================" -ForegroundColor Magenta
Write-Host ""
Write-Host "Di komputer Anda:" -ForegroundColor Cyan
Write-Host "  http://127.0.0.1:${Port}/index.html"
Write-Host ""
if ($LanIp -ne "127.0.0.1") {
    Write-Host "Scan dari HP (WiFi harus sama):" -ForegroundColor Cyan
    Write-Host "  $shareUrl" -ForegroundColor White
    Write-Host "  atau file: qr-hadiah-spesial.png" -ForegroundColor White
} else {
    Write-Host "WiFi tidak terdeteksi - hubungkan WiFi lalu jalankan ulang." -ForegroundColor Yellow
}
Write-Host ""
Write-Host "Scan dari mana saja: upload folder ke https://app.netlify.com/drop" -ForegroundColor Cyan
Write-Host "Tekan Ctrl+C untuk stop server." -ForegroundColor DarkGray
Write-Host ""

$mime = @{
    ".html" = "text/html; charset=utf-8"
    ".htm"  = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".gif"  = "image/gif"
    ".webp" = "image/webp"
    ".svg"  = "image/svg+xml"
    ".ico"  = "image/x-icon"
}

function Send-HttpResponse($stream, $status, $contentType, $bodyBytes) {
    $statusText = if ($status -eq 200) { "OK" } else { "Not Found" }
    $header = "HTTP/1.1 $status $statusText`r`n"
    $header += "Content-Type: $contentType`r`n"
    $header += "Content-Length: $($bodyBytes.Length)`r`n"
    $header += "Connection: close`r`n"
    $header += "`r`n"
    $headerBytes = [Text.Encoding]::ASCII.GetBytes($header)
    $stream.Write($headerBytes, 0, $headerBytes.Length)
    if ($bodyBytes.Length -gt 0) {
        $stream.Write($bodyBytes, 0, $bodyBytes.Length)
    }
}

function Handle-Request($ctx) {
    $reader = New-Object System.IO.StreamReader($ctx.Request.InputStream)
    $requestLine = $reader.ReadLine()
    $reader.Close()

    if (-not $requestLine) { $ctx.Response.Close(); return }

    $parts = $requestLine -split " "
    $path = "/"
    if ($parts.Length -ge 2) { $path = $parts[1] }
    if ($path -eq "/") { $path = "/index.html" }

    $relative = $path.TrimStart("/") -replace "/", "\"
    $filePath = Join-Path $Root $relative

    if (Test-Path $filePath -PathType Leaf) {
        $bytes = [System.IO.File]::ReadAllBytes($filePath)
        $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
        $ct = "application/octet-stream"
        if ($mime.ContainsKey($ext)) { $ct = $mime[$ext] }
        Send-HttpResponse $ctx.Response.OutputStream 200 $ct $bytes
    } else {
        $body = [Text.Encoding]::UTF8.GetBytes("404 Not Found")
        Send-HttpResponse $ctx.Response.OutputStream 404 "text/plain" $body
    }
    $ctx.Response.Close()
}

$tcp = New-Object System.Net.Sockets.TcpListener ([System.Net.IPAddress]::Any, $Port)

try {
    $tcp.Start()
} catch {
    Write-Host "Gagal memulai server di port $Port. Tutup program lain." -ForegroundColor Red
    exit 1
}

Start-Process "http://127.0.0.1:${Port}/qr.html"

while ($true) {
    $client = $tcp.AcceptTcpClient()
    $stream = $client.GetStream()
    try {
        Handle-Request @{ Request = @{ InputStream = $stream }; Response = @{ OutputStream = $stream; Close = { $client.Close() } } }
    } catch {
        $client.Close()
    }
}
