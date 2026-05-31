(function () {
  const cfg = typeof GIFT_CONFIG !== "undefined" ? GIFT_CONFIG : {};

  document.documentElement.setAttribute("data-theme", cfg.tema || "pink");

  document.getElementById("badgeUntuk").textContent =
    "Untuk: " + (cfg.untuk || "Kamu");
  document.getElementById("judul").textContent =
    cfg.judul || "Hadiah Spesial Untukmu 💝";
  document.getElementById("dari").textContent = cfg.dari || "";
  document.getElementById("namaPengirim").textContent =
    cfg.namaPengirim || "";

  const dariEl = document.getElementById("dari");
  if (!cfg.dari) {
    dariEl.style.display = "none";
  }

  const ucapanEl = document.getElementById("ucapanContainer");
  const ucapan = cfg.ucapan || ["Selamat! Ini hadiah spesial untukmu."];
  ucapan.forEach(function (teks, i) {
    const p = document.createElement("p");
    p.className = i === 0 ? "message-opening" : "message-body";
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
  let isOpening = false;
  const flowerImages = [
    "spider_flower.webp",
    "yellow_rose.webp",
    "guernsey_lily.webp",
    "pink_lily.webp",
    "blue_lily.webp",
    "blue_lily (1).webp",
    "yellow_lily.webp",
  ];
  flowerImages.forEach(function (src) {
    const preload = new Image();
    preload.src = src;
  });

  function createFlowerRain() {
    const burst = document.createElement("div");
    burst.className = "flower-burst";
    burst.setAttribute("aria-hidden", "true");
    document.body.appendChild(burst);

    for (let i = 0; i < 48; i++) {
      const petal = document.createElement("img");
      petal.className = "flower-petal";
      petal.src = flowerImages[Math.floor(Math.random() * flowerImages.length)];
      petal.alt = "";
      petal.style.setProperty("--x-start", Math.random() * 100 + "vw");
      petal.style.setProperty("--x-shift", Math.random() * 220 - 110 + "px");
      petal.style.setProperty("--rot-start", Math.random() * 140 - 70 + "deg");
      petal.style.setProperty("--rot-end", Math.random() * 900 - 450 + "deg");
      petal.style.setProperty("--scale", (0.95 + Math.random() * 0.9).toFixed(2));
      petal.style.setProperty("--size", 84 + Math.random() * 78 + "px");
      petal.style.animationDelay = Math.random() * 1.2 + "s";
      petal.style.animationDuration = 4.5 + Math.random() * 3.5 + "s";
      burst.appendChild(petal);
    }

    setTimeout(function () {
      burst.remove();
    }, 9000);
  }

  function openGift() {
    if (isOpening) return;
    isOpening = true;
    envelopeWrap.classList.add("opened");
    createFlowerRain();
    setTimeout(function () {
      envelopeScreen.classList.add("hidden");
      mainContent.style.opacity = "1";
      mainContent.style.transition = "opacity 0.8s ease";
    }, 600);
  }

  envelopeWrap.addEventListener("click", openGift);

  createFloatingHearts();
})();
