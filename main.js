const panel = document.querySelector("#panel");
const frameEl = document.getElementById("layer-frame");
const titleEl = document.getElementById("layer-title");
const btnEl = document.getElementById("layer-btn");
const continueBtn = document.getElementById("continue");
const quest = document.getElementById("quest");
let ready = false;

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function toBlobUrl(canvas) {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(URL.createObjectURL(blob)), "image/png");
  });
}

function read(img) {
  const canvas = document.createElement("canvas");
  const w = img.naturalWidth;
  const h = img.naturalHeight;
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  ctx.drawImage(img, 0, 0);
  return { canvas, ctx, w, h, image: ctx.getImageData(0, 0, w, h) };
}

function isBlack(r, g, b) {
  return r < 18 && g < 18 && b < 18;
}

function punchBlack(img) {
  const { canvas, ctx, w, h, image } = read(img);
  const d = image.data;
  const seen = new Uint8Array(w * h);
  const stackPts = [];

  const push = (x, y) => {
    if (x < 0 || y < 0 || x >= w || y >= h) return;
    const p = y * w + x;
    if (seen[p]) return;
    const i = p * 4;
    if (!isBlack(d[i], d[i + 1], d[i + 2])) return;
    seen[p] = 1;
    stackPts.push(p);
  };

  for (let x = 0; x < w; x += 1) {
    push(x, 0);
    push(x, h - 1);
  }
  for (let y = 0; y < h; y += 1) {
    push(0, y);
    push(w - 1, y);
  }

  while (stackPts.length) {
    const p = stackPts.pop();
    const x = p % w;
    const y = (p / w) | 0;
    d[p * 4 + 3] = 0;
    push(x + 1, y);
    push(x - 1, y);
    push(x, y + 1);
    push(x, y - 1);
  }

  ctx.putImageData(image, 0, 0);
  return { canvas, d, w, h };
}

function keyFrame(img) {
  return toBlobUrl(punchBlack(img).canvas);
}

function keyBlackAndCrop(img, pad = 8) {
  const { canvas, d, w, h } = punchBlack(img);
  let minX = w;
  let minY = h;
  let maxX = 0;
  let maxY = 0;
  for (let p = 0; p < w * h; p += 1) {
    if (d[p * 4 + 3] === 0) continue;
    const x = p % w;
    const y = (p / w) | 0;
    if (x < minX) minX = x;
    if (y < minY) minY = y;
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
  }

  minX = Math.max(0, minX - pad);
  minY = Math.max(0, minY - pad);
  maxX = Math.min(w - 1, maxX + pad);
  maxY = Math.min(h - 1, maxY + pad);
  const cw = maxX - minX + 1;
  const ch = maxY - minY + 1;
  const cropped = document.createElement("canvas");
  cropped.width = cw;
  cropped.height = ch;
  cropped.getContext("2d").drawImage(canvas, minX, minY, cw, ch, 0, 0, cw, ch);
  return toBlobUrl(cropped).then((url) => ({
    url,
    left: (minX / w) * 100,
    top: (minY / h) * 100,
    width: (cw / w) * 100,
    height: (ch / h) * 100,
  }));
}

function keyTitleKeepOutline(img) {
  const { canvas, ctx, w, h, image } = read(img);
  const d = image.data;
  const fill = new Uint8Array(w * h);

  for (let p = 0; p < w * h; p += 1) {
    const i = p * 4;
    const r = d[i];
    const g = d[i + 1];
    const b = d[i + 2];
    const max = Math.max(r, g, b);
    const sat = max - Math.min(r, g, b);
    if (sat > 22 || max > 130) fill[p] = 1;
  }

  const radius = 3;
  const keep = new Uint8Array(w * h);
  for (let y = 0; y < h; y += 1) {
    for (let x = 0; x < w; x += 1) {
      if (!fill[y * w + x]) continue;
      for (let dy = -radius; dy <= radius; dy += 1) {
        for (let dx = -radius; dx <= radius; dx += 1) {
          if (dx * dx + dy * dy > radius * radius) continue;
          const nx = x + dx;
          const ny = y + dy;
          if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
          keep[ny * w + nx] = 1;
        }
      }
    }
  }

  let minX = w;
  let minY = h;
  let maxX = 0;
  let maxY = 0;
  for (let p = 0; p < w * h; p += 1) {
    const i = p * 4;
    if (!keep[p]) {
      d[i + 3] = 0;
      continue;
    }
    const x = p % w;
    const y = (p / w) | 0;
    if (x < minX) minX = x;
    if (y < minY) minY = y;
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
  }

  ctx.putImageData(image, 0, 0);
  const pad = 4;
  minX = Math.max(0, minX - pad);
  minY = Math.max(0, minY - pad);
  maxX = Math.min(w - 1, maxX + pad);
  maxY = Math.min(h - 1, maxY + pad);
  const cw = maxX - minX + 1;
  const ch = maxY - minY + 1;
  const cropped = document.createElement("canvas");
  cropped.width = cw;
  cropped.height = ch;
  cropped.getContext("2d").drawImage(canvas, minX, minY, cw, ch, 0, 0, cw, ch);
  return toBlobUrl(cropped);
}

function beep(freq, dur) {
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return;
  if (!beep.ctx) beep.ctx = new AudioCtx();
  const a = beep.ctx;
  if (a.state === "suspended") a.resume();
  const o = a.createOscillator();
  const gain = a.createGain();
  o.type = "square";
  o.frequency.value = freq;
  gain.gain.setValueAtTime(0.04, a.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, a.currentTime + dur);
  o.connect(gain).connect(a.destination);
  o.start();
  o.stop(a.currentTime + dur);
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function intro() {
  await wait(450);
  panel.classList.add("frame-in");
  beep(196, 0.1);
  setTimeout(() => beep(294, 0.12), 90);
  await wait(500);
  panel.classList.add("title-in");
  beep(523, 0.08);
  setTimeout(() => beep(659, 0.08), 80);
  setTimeout(() => beep(784, 0.14), 160);
  await wait(450);
  unlockNav();
}

const backBtn = document.getElementById("back");
const nextBtn = document.getElementById("next");
const bgA = document.getElementById("bg-a");
const bgB = document.getElementById("bg-b");
let usingA = true;
let slideIndex = 0;
const TITLE_BG = "assets/slide-1/layer-bg.png?v=18";

function unlockNav() {
  ready = true;
  panel.classList.add("ready");
  syncNav();
}

function syncNav() {
  backBtn.disabled = slideIndex <= 0;
  nextBtn.disabled = !ready;
  nextBtn.textContent = slideIndex >= LESSONS.length ? "ASSESSMENT ▶" : "NEXT";
}

function setBackground(src) {
  const incoming = usingA ? bgB : bgA;
  const outgoing = usingA ? bgA : bgB;
  incoming.src = src;
  incoming.onload = () => {
    incoming.classList.add("on");
    outgoing.classList.remove("on");
    usingA = !usingA;
  };
  if (incoming.complete) incoming.onload();
}

function goTo(index) {
  slideIndex = Math.max(0, Math.min(index, LESSONS.length));
  if (slideIndex === 0) {
    showTitle();
  } else {
    showLesson(LESSONS[slideIndex - 1]);
  }
  syncNav();
}

function showTitle() {
  panel.classList.remove("questing");
  panel.classList.add("frame-in", "title-in", "ready");
  quest.hidden = true;
  setBackground(TITLE_BG);
}

function showLesson(lesson) {
  panel.classList.add("questing");
  panel.classList.remove("title-in");
  quest.hidden = false;
  setBackground(lesson.bg);
  document.getElementById("quest-kicker").textContent = lesson.kicker;
  document.getElementById("quest-title").textContent = lesson.title;
  document.getElementById("quest-flavor").textContent = lesson.flavor;
  document.getElementById("quest-body").innerHTML = lesson.body;
}

backBtn.addEventListener("click", () => {
  if (backBtn.disabled) return;
  beep(330, 0.08);
  goTo(slideIndex - 1);
});

nextBtn.addEventListener("click", () => {
  if (nextBtn.disabled || !ready) return;
  beep(880, 0.07);
  setTimeout(() => beep(1175, 0.11), 70);
  if (slideIndex >= LESSONS.length) {
    const veil = document.getElementById("veil");
    veil.classList.add("on");
    setTimeout(() => {
      window.location.href = "assessment/index.html";
    }, 480);
    return;
  }
  goTo(slideIndex + 1);
});

continueBtn.addEventListener("pointerdown", () => {
  if (!ready) return;
  continueBtn.classList.add("is-pressed");
});
continueBtn.addEventListener("pointerup", () => {
  continueBtn.classList.remove("is-pressed");
});
continueBtn.addEventListener("pointerleave", () => {
  continueBtn.classList.remove("is-pressed");
});
continueBtn.addEventListener("click", () => {
  if (!ready || slideIndex !== 0) return;
  beep(880, 0.07);
  setTimeout(() => beep(1175, 0.11), 70);
  goTo(1);
});

async function boot() {
  const [frameImg, titleImg, btnImg] = await Promise.all([
    loadImage("assets/slide-1/layer-frame.png?v=10"),
    loadImage("assets/slide-1/layer-title.png?v=10"),
    loadImage("assets/slide-1/btn-continue.png?v=10"),
  ]);
  const [frameUrl, titleUrl, btn] = await Promise.all([
    keyFrame(frameImg),
    keyTitleKeepOutline(titleImg),
    keyBlackAndCrop(btnImg, 10),
  ]);
  frameEl.src = frameUrl;
  titleEl.src = titleUrl;
  btnEl.src = btn.url;
  requestAnimationFrame(() => {
    requestAnimationFrame(() => document.getElementById("veil").classList.remove("on"));
  });
  intro();
}

boot().catch(() => {
  const veil = document.getElementById("veil");
  if (veil) veil.classList.remove("on");
});
