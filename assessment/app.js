const answers = {};
let submitted = false;
let usingTitleKeyed = false;

const screens = {
  title: document.getElementById("screen-title"),
  part1: document.getElementById("screen-part1"),
  part2: document.getElementById("screen-part2"),
};

function show(name) {
  Object.entries(screens).forEach(([key, el]) => {
    el.hidden = key !== name;
    el.classList.toggle("is-on", key === name);
  });
  window.scrollTo(0, 0);
}

function isRight(q, i) {
  return Array.isArray(q.answer) ? q.answer.includes(i) : q.answer === i;
}

function allAnswered() {
  return QUESTIONS.every((q) => answers[q.id] !== undefined);
}

function syncSubmit() {
  document.getElementById("submit").disabled = submitted || !allAnswered();
}

function toBlobUrl(canvas) {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(URL.createObjectURL(blob)), "image/png");
  });
}

function keyLettersOnly(img) {
  const canvas = document.createElement("canvas");
  const w = img.naturalWidth;
  const h = img.naturalHeight;
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  ctx.drawImage(img, 0, 0);
  const image = ctx.getImageData(0, 0, w, h);
  const d = image.data;
  let minX = w;
  let minY = h;
  let maxX = 0;
  let maxY = 0;

  for (let p = 0; p < w * h; p += 1) {
    const i = p * 4;
    const r = d[i];
    const g = d[i + 1];
    const b = d[i + 2];
    const a = d[i + 3];
    const max = Math.max(r, g, b);
    const sat = max - Math.min(r, g, b);
    const keep = a > 8 && ((sat > 32 && max > 60) || max > 210);
    if (!keep) {
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
  const pad = 8;
  minX = Math.max(0, minX - pad);
  minY = Math.max(0, minY - pad);
  maxX = Math.min(w - 1, maxX + pad);
  maxY = Math.min(h - 1, maxY + pad);
  const cropped = document.createElement("canvas");
  cropped.width = maxX - minX + 1;
  cropped.height = maxY - minY + 1;
  cropped.getContext("2d").drawImage(
    canvas,
    minX,
    minY,
    cropped.width,
    cropped.height,
    0,
    0,
    cropped.width,
    cropped.height
  );
  return toBlobUrl(cropped);
}

function renderCard(q) {
  const letters = ["A", "B", "C", "D"];
  const picked = answers[q.id];
  const formula = q.formula
    ? `<div class="formula">${q.formula}</div>`
    : "";
  const extra = q.extra ? `<p class="story">${q.extra}</p>` : "";
  const formula2 = q.formula2 ? `<div class="formula">${q.formula2}</div>` : "";
  const choices = q.choices
    .map((label, i) => {
      let cls = "choice";
      if (picked === i) cls += " picked";
      if (submitted) {
        if (isRight(q, i)) cls += " right";
        else if (picked === i) cls += " wrong";
      }
      return `<button class="${cls}" data-q="${q.id}" data-i="${i}" type="button" ${
        submitted ? "disabled" : ""
      }>${letters[i]}) ${label}</button>`;
    })
    .join("");
  return `
    <article class="q-card ${submitted ? "revealed" : ""}" data-id="${q.id}">
      <span class="badge">Q${q.id}</span>
      <h2 class="q-title">${q.title}</h2>
      <p class="story">${q.story}</p>
      ${formula}
      ${extra}
      ${formula2}
      <p class="ask">${q.ask}</p>
      <div class="choices">${choices}</div>
      <p class="explain">${q.explain}</p>
    </article>
  `;
}

function paint() {
  document.getElementById("grid-1").innerHTML = QUESTIONS.filter((q) => q.part === 1)
    .map(renderCard)
    .join("");
  document.getElementById("grid-2").innerHTML = QUESTIONS.filter((q) => q.part === 2)
    .map(renderCard)
    .join("");
  bindChoices();
  syncSubmit();
}

function bindChoices() {
  document.querySelectorAll(".choice").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (submitted) return;
      answers[Number(btn.dataset.q)] = Number(btn.dataset.i);
      paint();
    });
  });
}

function score() {
  return QUESTIONS.filter((q) => isRight(q, answers[q.id])).length;
}

function spark(x, y) {
  const canvas = document.getElementById("burst");
  const ctx = canvas.getContext("2d");
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  const bits = Array.from({ length: 36 }, (_, i) => {
    const a = (Math.PI * 2 * i) / 36;
    return { x, y, vx: Math.cos(a) * 5, vy: Math.sin(a) * 5, life: 1 };
  });
  function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bits.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.life -= 0.03;
      ctx.globalAlpha = Math.max(p.life, 0);
      ctx.fillStyle = "#ffe27a";
      ctx.fillRect(p.x, p.y, 4, 4);
    });
    if (bits.some((p) => p.life > 0)) requestAnimationFrame(tick);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  tick();
}

function twinkle() {
  const box = document.getElementById("stars");
  for (let i = 0; i < 28; i += 1) {
    const s = document.createElement("i");
    s.style.cssText = `
      position:absolute;width:4px;height:4px;background:#fff7c2;
      left:${Math.random() * 100}%;top:${Math.random() * 100}%;
      opacity:${0.2 + Math.random() * 0.8};
      animation: blink ${0.8 + Math.random()}s steps(2) infinite;
    `;
    box.appendChild(s);
  }
}

function fadeTo(url) {
  const veil = document.getElementById("veil");
  veil.classList.add("on");
  setTimeout(() => {
    window.location.href = url;
  }, 480);
}

function liftVeil() {
  const veil = document.getElementById("veil");
  requestAnimationFrame(() => {
    requestAnimationFrame(() => veil.classList.remove("on"));
  });
}

document.getElementById("back-lessons").addEventListener("click", () => {
  fadeTo("../index.html");
});

document.getElementById("begin").addEventListener("click", (e) => {
  spark(e.clientX, e.clientY);
  show("part1");
});

document.getElementById("back-1").addEventListener("click", () => show("title"));
document.getElementById("next-1").addEventListener("click", () => show("part2"));
document.getElementById("back-2").addEventListener("click", () => {
  if (submitted) return;
  show("part1");
});

document.getElementById("submit").addEventListener("click", () => {
  if (!allAnswered()) return;
  submitted = true;
  paint();
  const el = document.getElementById("score");
  el.hidden = false;
  el.textContent = `You got ${score()} / 10 correct`;
  document.getElementById("after").hidden = false;
  document.getElementById("submit").hidden = true;
  document.getElementById("back-2").hidden = true;
});

document.getElementById("retry").addEventListener("click", () => {
  Object.keys(answers).forEach((k) => delete answers[k]);
  submitted = false;
  document.getElementById("score").hidden = true;
  document.getElementById("after").hidden = true;
  document.getElementById("submit").hidden = false;
  document.getElementById("back-2").hidden = false;
  paint();
  show("part1");
});

document.getElementById("to-title").addEventListener("click", () => {
  Object.keys(answers).forEach((k) => delete answers[k]);
  submitted = false;
  document.getElementById("score").hidden = true;
  document.getElementById("after").hidden = true;
  document.getElementById("submit").hidden = false;
  document.getElementById("back-2").hidden = false;
  paint();
  show("title");
});

function bootTitle() {
  const el = document.getElementById("title-png");
  const img = new Image();
  img.onload = () => {
    keyLettersOnly(img).then((url) => {
      el.src = url;
      usingTitleKeyed = true;
    });
  };
  img.onerror = () => {
    el.src = "assets/title.png";
  };
  img.src = "assets/title.png";
}

twinkle();
bootTitle();
paint();
show("title");
liftVeil();
