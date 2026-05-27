(function () {
  const cfg = typeof GIFT_CONFIG !== "undefined" ? GIFT_CONFIG : {};

  document.documentElement.setAttribute("data-theme", cfg.tema || "pink");

  document.getElementById("badgeUntuk").textContent =
    "Untuk: " + (cfg.untuk || "Kamu");
  document.getElementById("judul").textContent =
    cfg.judul || "Hadiah Spesial Untukmu 💝";
  document.getElementById("dari").textContent = cfg.dari || "Dengan cinta,";
  document.getElementById("namaPengirim").textContent =
    cfg.namaPengirim || "";

  const ucapanEl = document.getElementById("ucapanContainer");
  const ucapan = cfg.ucapan || ["Selamat! Ini hadiah spesial untukmu."];
  ucapan.forEach(function (teks) {
    const p = document.createElement("p");
    p.textContent = teks;
    ucapanEl.appendChild(p);
  });

  const gallery = document.getElementById("gallery");
  const gambar = (cfg.gambar || []).filter(Boolean);

  if (gambar.length === 0) {
    gallery.innerHTML =
      '<p class="gallery-empty">Belum ada gambar. Tambahkan foto di folder <strong>images</strong> dan daftarkan di <strong>config.js</strong>.</p>';
  } else {
    gambar.forEach(function (src, i) {
      const item = document.createElement("div");
      item.className = "gallery-item";
      item.style.animationDelay = i * 0.15 + "s";
      const img = document.createElement("img");
      img.src = src;
      img.alt = "Kenangan " + (i + 1);
      img.onerror = function () {
        item.innerHTML =
          '<p class="gallery-empty" style="padding:1rem">Gambar tidak ditemukan:<br>' +
          src +
          "</p>";
      };
      item.appendChild(img);
      gallery.appendChild(item);
    });
  }

  function isScannable(url) {
    return /^https?:\/\/.+/i.test(url);
  }

  function getShareUrl() {
    if (cfg.urlWebsite && cfg.urlWebsite.trim()) {
      return cfg.urlWebsite.trim();
    }
    var href = window.location.href.split("#")[0];
    if (isScannable(href)) {
      return href.replace(/qr\.html$/i, "index.html");
    }
    return href;
  }

  function qrImageUrl(target) {
    return (
      "https://api.qrserver.com/v1/create-qr-code/?size=300x300&margin=10&data=" +
      encodeURIComponent(target)
    );
  }

  function initQr() {
    const url = getShareUrl();
    const urlDisplay = document.getElementById("urlDisplay");
    const qrContainer = document.getElementById("qrcode");
    const downloadBtn = document.getElementById("downloadQr");

    if (!isScannable(url)) {
      urlDisplay.innerHTML =
        '<strong>QR belum bisa discan</strong> — jangan buka lewat double-click file.<br><br>' +
        '1. Double-click <strong>JALANKAN.bat</strong> di folder ini<br>' +
        '2. Scan QR di halaman <a href="qr.html" style="color:var(--accent);font-weight:700">qr.html</a><br><br>' +
        'Atau upload ke <a href="https://app.netlify.com/drop" target="_blank" rel="noopener" style="color:var(--accent)">Netlify Drop</a>, ' +
        'lalu isi <code>urlWebsite</code> di config.js';
      downloadBtn.textContent = "Buka Pembuat QR";
      downloadBtn.onclick = function () {
        window.location.href = "qr.html";
      };
      return;
    }

    urlDisplay.textContent = url;

    const img = document.createElement("img");
    img.width = 220;
    img.height = 220;
    img.alt = "QR Code";
    img.src = qrImageUrl(url);
    qrContainer.appendChild(img);

    downloadBtn.onclick = function () {
      const link = document.createElement("a");
      link.download = "qr-hadiah-spesial.png";
      link.href = qrImageUrl(url);
      link.click();
    };
  }

  function createFloatingHearts() {
    const bg = document.getElementById("heartsBg");
    const symbols = ["💕", "💖", "✨", "💗", "🌸"];
    for (let i = 0; i < 18; i++) {
      const span = document.createElement("span");
      span.className = "heart-float";
      span.textContent = symbols[i % symbols.length];
      span.style.left = Math.random() * 100 + "%";
      span.style.animationDuration = 8 + Math.random() * 12 + "s";
      span.style.animationDelay = Math.random() * 10 + "s";
      bg.appendChild(span);
    }
  }

  const envelopeScreen = document.getElementById("envelopeScreen");
  const envelopeWrap = document.getElementById("envelopeWrap");
  const mainContent = document.getElementById("mainContent");
  const navQr = document.getElementById("navQr");

  function openGift() {
    envelopeWrap.classList.add("opened");
    setTimeout(function () {
      envelopeScreen.classList.add("hidden");
      mainContent.style.opacity = "1";
      mainContent.style.transition = "opacity 0.8s ease";
      navQr.style.display = "flex";
    }, 600);
  }

  envelopeWrap.addEventListener("click", openGift);

  createFloatingHearts();
  initQr();
})();
