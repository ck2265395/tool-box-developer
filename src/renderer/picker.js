const shotEl = document.getElementById('shot');
const mag = document.getElementById('mag');
const MCTX = mag.getContext('2d');
const hexEl = document.getElementById('loupeHex');
const swEl = document.getElementById('loupeSwatch');
const loupe = document.getElementById('loupe');
const lineH = document.getElementById('ch');
const lineV = document.getElementById('cv');

/* 放大镜参数：15×15 像素，每格 13px */
const N = 15;
const CELL = 13;
const SIZE = N * CELL;      // 195
const R = (N - 1) / 2;      // 7

mag.width = SIZE;
mag.height = SIZE;
MCTX.imageSmoothingEnabled = false;

let srcCanvas = null;
let srcCtx = null;
let IW = 0;
let IH = 0;
let lastColor = null;
let settled = false;

const toHex = (c) =>
  '#' + [c.r, c.g, c.b].map((n) => n.toString(16).padStart(2, '0')).join('').toUpperCase();

/* --------------------------------- 初始化 --------------------------------- */

window.api.onPickerInit(({ dataURL }) => {
  const img = new Image();
  img.onload = () => {
    srcCanvas = document.createElement('canvas');
    srcCanvas.width = img.naturalWidth;
    srcCanvas.height = img.naturalHeight;
    srcCtx = srcCanvas.getContext('2d', { willReadFrequently: true });
    srcCtx.drawImage(img, 0, 0);
    IW = srcCanvas.width;
    IH = srcCanvas.height;
    shotEl.style.backgroundImage = 'url("' + dataURL + '")';
    document.body.classList.add('ready');
  };
  img.src = dataURL;
});

/* --------------------------------- 取色 ---------------------------------- */

function pickAt(clientX, clientY) {
  if (!srcCtx) return;

  const px = Math.round((clientX / window.innerWidth) * IW);
  const py = Math.round((clientY / window.innerHeight) * IH);
  const cx = Math.max(0, Math.min(IW - 1, px));
  const cy = Math.max(0, Math.min(IH - 1, py));

  const d = srcCtx.getImageData(cx, cy, 1, 1).data;
  lastColor = { r: d[0], g: d[1], b: d[2] };

  drawMagnifier(cx, cy);
  updateUI(clientX, clientY, lastColor);
}

function drawMagnifier(px, py) {
  const sx = Math.max(0, Math.min(IW - N, px - R));
  const sy = Math.max(0, Math.min(IH - N, py - R));

  MCTX.clearRect(0, 0, SIZE, SIZE);
  MCTX.imageSmoothingEnabled = false;
  MCTX.drawImage(srcCanvas, sx, sy, N, N, 0, 0, SIZE, SIZE);

  MCTX.strokeStyle = 'rgba(0,0,0,.16)';
  MCTX.lineWidth = 1;
  for (let i = 1; i < N; i++) {
    const p = i * CELL + 0.5;
    MCTX.beginPath(); MCTX.moveTo(p, 0); MCTX.lineTo(p, SIZE); MCTX.stroke();
    MCTX.beginPath(); MCTX.moveTo(0, p); MCTX.lineTo(SIZE, p); MCTX.stroke();
  }

  const ox = (px - sx) * CELL;
  const oy = (py - sy) * CELL;
  MCTX.lineWidth = 3;
  MCTX.strokeStyle = 'rgba(0,0,0,.75)';
  MCTX.strokeRect(ox + 1.5, oy + 1.5, CELL - 3, CELL - 3);
  MCTX.lineWidth = 2;
  MCTX.strokeStyle = '#ffffff';
  MCTX.strokeRect(ox + 1.5, oy + 1.5, CELL - 3, CELL - 3);
}

function updateUI(x, y, c) {
  lineH.style.top = y + 'px';
  lineV.style.left = x + 'px';

  const hex = toHex(c);
  hexEl.textContent = hex;
  swEl.style.background = hex;

  const LW = loupe.offsetWidth || 213;
  const LH = loupe.offsetHeight || 252;
  const GAP = 30;

  let lx = x + GAP;
  let ly = y + GAP;
  if (lx + LW + 6 > window.innerWidth) lx = x - LW - GAP;
  if (ly + LH + 6 > window.innerHeight) ly = y - LH - GAP;

  lx = Math.max(6, Math.min(window.innerWidth - LW - 6, lx));
  ly = Math.max(6, Math.min(window.innerHeight - LH - 6, ly));

  loupe.style.left = Math.round(lx) + 'px';
  loupe.style.top = Math.round(ly) + 'px';
}

/* --------------------------------- 交互 ---------------------------------- */

function finish() {
  if (settled || !lastColor) return;
  settled = true;
  window.api.finishPick({ ...lastColor });
}

function cancel() {
  if (settled) return;
  settled = true;
  window.api.cancelPick();
}

window.addEventListener('mousemove', (e) => pickAt(e.clientX, e.clientY));

window.addEventListener('mousedown', (e) => {
  if (e.button === 0) finish();
  else cancel();
});

window.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  cancel();
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') cancel();
});
