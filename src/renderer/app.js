/* ---------------------------------- 图标 ---------------------------------- */
const I = {
  picker: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m2 22 1-1h3l9-9"/><path d="M3 21v-3l9-9"/><path d="m15 6 3.4-3.4a2.1 2.1 0 1 1 3 3L18 9l.9.9a2.1 2.1 0 1 1-3 3l-2-2-6.5 6.5a2 2 0 0 1-2.8 0l-.1-.1a2 2 0 0 1 0-2.8L11.9 8l-2-2a2.1 2.1 0 1 1 3-3L15 6Z"/></svg>',
  qr: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3zM19 19h2v2h-2z" stroke-linecap="round"/></svg>',
  json: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H7a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2 2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h1"/><path d="M16 3h1a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2 2 2 0 0 0-2 2v4a2 2 0 0 1-2 2h-1"/></svg>',
  ts: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  base64: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m9 8-4 4 4 4M15 8l4 4-4 4"/></svg>',
  regex: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v8M8 8h8"/><circle cx="6" cy="18" r="2"/><circle cx="17" cy="17.5" r="1.5"/><path d="M4 12h4"/></svg>',
  image: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>',
  color: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.7 6.6 8.1a7.6 7.6 0 1 0 10.8 0Z"/><path d="M12 21a7.4 7.4 0 0 1-5.3-2.2"/></svg>',
  text: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7V5h16v2"/><path d="M12 5v14"/><path d="M9 19h6"/></svg>',
  gen: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="7.5" cy="15.5" r="4.5"/><path d="m10.8 12.2 8.4-8.4"/><path d="m15.5 4 4.5 4.5"/><path d="m18 6.5 2 2"/></svg>',
  hash: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9h16M4 15h16M10 3 8 21M16 3l-2 18"/></svg>',
  jwt: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><circle cx="12" cy="10.5" r="1.6"/><path d="M12 12.2V15"/></svg>',
  diff: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="16" rx="1.5"/><rect x="14" y="4" width="7" height="16" rx="1.5"/></svg>'
};

const MODULES = [
  { id: 'picker', name: 'CSS 取色器', desc: '从屏幕任意位置吸取颜色，自动生成 CSS 色值', icon: I.picker, ready: true },
  { id: 'color', name: '颜色格式互转', desc: 'HEX / RGB / HSL / HSV / CMYK 互转，附对比度检查', icon: I.color, ready: true },
  { id: 'json', name: 'JSON 格式化', desc: '美化 / 压缩 / 转义，出错直接告诉你第几行第几列', icon: I.json, ready: true },
  { id: 'regex', name: '正则测试', desc: '实时高亮匹配、查看捕获分组、替换预览', icon: I.regex, ready: true },
  { id: 'b64', name: 'Base64 编解码', desc: '文本与 Base64 互转，中文不乱码', icon: I.base64, ready: true },
  { id: 'jwt', name: 'JWT 解析', desc: '拆解 Token 的头部与载荷，自动判断是否过期', icon: I.jwt, ready: true },
  { id: 'hash', name: '哈希校验', desc: 'MD5 / SHA-1 / SHA-256 / SHA-512，文本与文件都行', icon: I.hash, ready: true },
  { id: 'gen', name: '密码与 UUID', desc: '强密码、UUID v4、随机字符串一键生成', icon: I.gen, ready: true },
  { id: 'ts', name: '时间戳转换', desc: 'Unix 时间戳与日期时间互转', icon: I.ts, ready: true },
  { id: 'qr', name: '二维码生成', desc: '文本转二维码，可存成 PNG', icon: I.qr, ready: true },
  { id: 'img', name: '图片压缩', desc: '批量压缩图片、转换格式，对比压缩前后体积', icon: I.image, ready: true },
  { id: 'text', name: '文本工具箱', desc: '大小写 / 命名风格 / 去重排序 / 字数统计', icon: I.text, ready: true },
  { id: 'diff', name: '文本对比', desc: '逐行比对两段文本，高亮增删差异', icon: I.diff, ready: true }
];

/* --------------------------------- 工具函数 -------------------------------- */

const clamp255 = (n) => Math.max(0, Math.min(255, Math.round(n)));

function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map((n) => clamp255(n).toString(16).padStart(2, '0')).join('').toUpperCase();
}

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  const d = max - min;
  if (d !== 0) {
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0));
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
  }
  return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function luminance(r, g, b) {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}

function readableText(r, g, b) {
  return luminance(r, g, b) > 0.45 ? 'rgba(0,0,0,.5)' : 'rgba(255,255,255,.75)';
}

/* ---------------------------------- 状态 ---------------------------------- */

const STORE_KEY = 'toolbox.palette.v1';
let palette = [];
try { palette = JSON.parse(localStorage.getItem(STORE_KEY) || '[]') || []; } catch (_) { palette = []; }

let current = null;        // { r,g,b,hex,hsl }
let activeId = 'picker';

function savePalette() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(palette.slice(0, 30))); } catch (_) {}
}

/* --------------------------------- Toast --------------------------------- */

let toastTimer = null;
function toast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 1600);
}

/* --------------------------------- 渲染导航 -------------------------------- */

function renderNav() {
  const nav = document.getElementById('nav');
  nav.innerHTML = MODULES.map((m) => `
    <div class="nav-item${m.id === activeId ? ' active' : ''}" data-id="${m.id}">
      ${m.icon}
      <span>${m.name}</span>
      ${m.ready ? '' : '<span class="soon">待开发</span>'}
    </div>`).join('');

  nav.querySelectorAll('.nav-item').forEach((el) => {
    el.addEventListener('click', () => selectModule(el.dataset.id));
  });
}

function selectModule(id) {
  activeId = id;
  const m = MODULES.find((x) => x.id === id);
  document.getElementById('viewTitle').textContent = m.name;
  document.getElementById('viewDesc').textContent = m.desc;
  renderNav();
  renderView(m);
}

/* --------------------------------- 渲染视图 -------------------------------- */

const VIEWS = {
  picker: () => [pickerTpl(), bindPicker],
  color: () => [colorTpl(), bindColor],
  json: () => [jsonTpl(), bindJson],
  regex: () => [regexTpl(), bindRegex],
  b64: () => [b64Tpl(), bindB64],
  jwt: () => [jwtTpl(), bindJwt],
  hash: () => [hashTpl(), bindHash],
  gen: () => [genTpl(), bindGen],
  ts: () => [tsTpl(), bindTs],
  qr: () => [qrTpl(), bindQr],
  img: () => [imgTpl(), bindImg],
  text: () => [textTpl(), bindText],
  diff: () => [diffTpl(), bindDiff]
};

function renderView(m) {
  // 上一个视图如果留了定时器/监听，先收掉，避免在后台白跑
  if (typeof window.__viewCleanup === 'function') {
    try { window.__viewCleanup(); } catch (_) {}
    window.__viewCleanup = null;
  }

  const view = document.getElementById('view');
  const maker = VIEWS[m.id];
  if (!maker) {
    view.innerHTML = `
      <div class="placeholder">
        <div class="big">${m.name} · 开发中</div>
        <div class="sm">这个模块还在路上，换个模块先玩吧。</div>
      </div>`;
    return;
  }
  const [html, bind] = maker();
  view.innerHTML = html;
  bind();
}

function pickerTpl() {
  const has = !!current;
  const swBg = has ? current.hex : '#ffffff';
  const swText = has ? '' : '尚未取色';
  const txColor = has ? readableText(current.r, current.g, current.b) : 'rgba(0,0,0,.4)';

  return `
    <div class="pick-hero">
      <button class="pick-btn" id="pickBtn">
        ${I.picker}
        <span>吸取屏幕颜色</span>
      </button>
      <div class="pick-hint">
        点击后在屏幕任意位置移动鼠标取色，<b>单击确认</b>，按 <kbd>Esc</kbd> 或右键取消。<br />
        适用于网页、设计稿、视频等任何画面。
      </div>
    </div>

    <div class="result">
      <div class="swatch" id="swatch" style="background:${swBg}">
        <span style="color:${txColor}">${swText}</span>
      </div>
      <div class="values" id="values">
        ${valueRow('HEX', has ? current.hex : '—', has)}
        ${valueRow('RGB', has ? `${current.r}, ${current.g}, ${current.b}` : '—', has)}
        ${valueRow('HSL', has ? `${current.hsl.h}, ${current.hsl.s}%, ${current.hsl.l}%` : '—', has)}
        ${valueRow('CSS', has ? `color: ${current.hex.toLowerCase()};` : '—', has)}
      </div>
    </div>

    <div class="section-title">历史色板（点击色块复制）</div>
    <div class="palette" id="palette"></div>
    <div class="palette-actions">
      <button class="ghost-btn" id="clearPalette">清空色板</button>
      <button class="ghost-btn" id="copyAll">复制全部 HEX</button>
    </div>`;
}

function valueRow(k, v, copyable) {
  return `<div class="value-row">
      <span class="k">${k}</span>
      <span class="v" data-copy="${copyable ? v : ''}">${v}</span>
      ${copyable ? `<button class="copy-btn" data-copy="${v}">复制</button>` : ''}
    </div>`;
}

function renderPalette() {
  const box = document.getElementById('palette');
  if (!box) return;
  if (palette.length === 0) {
    box.innerHTML = '<div class="empty">还没有取过颜色，取一个试试。</div>';
    return;
  }
  box.innerHTML = palette.map((c) => `<div class="chip" data-hex="${c}" style="background:${c}"></div>`).join('');
  box.querySelectorAll('.chip').forEach((el) => {
    el.addEventListener('click', () => copy(el.dataset.hex));
  });
}

/* -------------------------------- 通用小工具 ------------------------------- */

function esc(s) {
  return String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}

function setMsg(id, text, type) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = text || '';
  el.className = 'msg' + (type ? ' ' + type : '');
}

function setMeta(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

/* -------------------------------- JSON 模块 ------------------------------- */

function jsonTpl() {
  return `
    <div class="tool-row">
      <div class="pane">
        <div class="pane-head"><span>输入</span><span class="pane-meta" id="jInMeta">0 字符</span></div>
        <textarea id="jIn" class="ta" spellcheck="false"
          placeholder='贴 JSON 进来试试，例如 {"name":"东土百宝箱","modules":["取色器","JSON"]}'></textarea>
      </div>
      <div class="pane">
        <div class="pane-head"><span>输出</span><span class="pane-meta" id="jOutMeta">—</span></div>
        <textarea id="jOut" class="ta" spellcheck="false" readonly placeholder="结果会出现在这里"></textarea>
      </div>
    </div>
    <div class="btn-row">
      <button class="btn" id="jFmt2">格式化 · 2 空格</button>
      <button class="btn" id="jFmt4">格式化 · 4 空格</button>
      <button class="btn" id="jMin">压缩成一行</button>
      <button class="btn" id="jEsc">转义为字符串</button>
      <button class="btn" id="jUnesc">去转义</button>
      <button class="ghost-btn" id="jPaste">读剪贴板</button>
      <button class="ghost-btn" id="jCopy">复制结果</button>
      <button class="ghost-btn" id="jSave">保存文件</button>
      <button class="ghost-btn" id="jClear">清空</button>
    </div>
    <div class="msg" id="jMsg"></div>`;
}

/* 把位置换算成「第几行第几列」 */
function posInfo(p, text) {
  const before = text.slice(0, Math.max(0, Math.min(p, text.length)));
  const lines = before.split('\n');
  return `第 ${lines.length} 行第 ${lines[lines.length - 1].length + 1} 列：`;
}

/* 把 V8 的英文报错换成看得懂的说法 */
const JSON_MSG_CN = [
  [/^Expected ',' or '\}' after property value/i, '属性值后面缺少 , 或 }'],
  [/^Expected property name or '\}'/i, '这里应该是属性名（要用双引号包起来）或 }'],
  [/^Expected double-quoted property name/i, '属性名必须用双引号包起来'],
  [/^Expected ':' after property name/i, '属性名后面缺少冒号'],
  [/^Expected ',' or '\]' after array element/i, '数组元素后面缺少 , 或 ]'],
  [/^Unexpected non-whitespace character after JSON/i, 'JSON 已经结束了，后面还有多余内容'],
  [/^Unexpected end of JSON input/i, 'JSON 还没写完就结束了'],
  [/^Unterminated string/i, '字符串没有闭合（少了引号）'],
  [/^Bad escaped character/i, '字符串里有非法的转义字符'],
  [/^Bad control character/i, '字符串里有没转义的控制字符'],
  [/^Bad Unicode escape/i, 'Unicode 转义写错了'],
  [/^Unexpected number/i, '数字写法不对（比如 01 或 1. 这类）']
];

function jsonMsgCN(msg) {
  for (const [re, cn] of JSON_MSG_CN) if (re.test(msg)) return cn;
  return msg;
}

/* 从 JSON.parse 的报错里挖出「第几行第几列」。
   新 V8 会直接给 at position N；老格式只给一段上下文片段，就从片段反推。 */
function jsonErrText(err, text) {
  const raw = String((err && err.message) || err);
  const plain = jsonMsgCN(raw.replace(/\s*at position \d+.*$/i, '').replace(/\s*in JSON$/i, ''));

  // 1) 原生带 position，最准
  const pm = /at position (\d+)/i.exec(raw);
  if (pm) return posInfo(+pm[1], text) + plain;

  // 2) "Unexpected token 'x', \"...上下文...\" is not valid JSON"
  const tm = /Unexpected token '?([\s\S])'?/.exec(raw);
  const fm = /\s(\.\.\.)?"([\s\S]*)"\s+is not valid JSON/.exec(raw);
  if (fm) {
    const truncated = !!fm[1];
    const frag = fm[2];
    const start = text.indexOf(frag);
    if (start >= 0) {
      let off = null;
      if (truncated) {
        off = Math.min(10, frag.length - 1);          // V8 会保留出错点前 10 个字符
      } else if (tm) {
        off = frag.lastIndexOf(tm[1]);                 // 没有截断时，用出错字符反查
      }
      if (off == null || off < 0) off = 0;
      return posInfo(start + off, text) + (tm ? `这里有个多余的 '${tm[1]}'` : plain);
    }
  }
  return '解析失败：' + plain;
}

function bindJson() {
  const $in = document.getElementById('jIn');
  const $out = document.getElementById('jOut');
  const syncIn = () => setMeta('jInMeta', $in.value.length + ' 字符');
  const put = (text) => {
    $out.value = text;
    setMeta('jOutMeta', text ? text.length + ' 字符' : '—');
  };

  $in.addEventListener('input', () => { syncIn(); setMsg('jMsg', ''); });
  syncIn();

  const parse = () => {
    const raw = $in.value.trim();
    if (!raw) { setMsg('jMsg', '先贴点 JSON 进来', 'warn'); return null; }
    try { return { ok: true, data: JSON.parse(raw), raw }; }
    catch (err) { setMsg('jMsg', jsonErrText(err, $in.value), 'err'); return { ok: false }; }
  };

  const on = (id, fn) => document.getElementById(id).addEventListener('click', fn);

  on('jFmt2', () => {
    const r = parse(); if (!r.ok) return;
    put(JSON.stringify(r.data, null, 2));
    setMsg('jMsg', '格式化完成（2 空格缩进）', 'ok');
  });

  on('jFmt4', () => {
    const r = parse(); if (!r.ok) return;
    put(JSON.stringify(r.data, null, 4));
    setMsg('jMsg', '格式化完成（4 空格缩进）', 'ok');
  });

  on('jMin', () => {
    const r = parse(); if (!r.ok) return;
    const min = JSON.stringify(r.data);
    put(min);
    const saved = r.raw.length > 0 ? Math.round((1 - min.length / r.raw.length) * 100) : 0;
    setMsg('jMsg', `已压缩：${r.raw.length} → ${min.length} 字符` + (saved > 0 ? `（省 ${saved}%）` : ''), 'ok');
  });

  on('jEsc', () => {
    if (!$in.value.trim()) { setMsg('jMsg', '没有内容可转义', 'warn'); return; }
    put(JSON.stringify($in.value));
    setMsg('jMsg', '已转义为 JSON 字符串字面量', 'ok');
  });

  on('jUnesc', () => {
    const raw = $in.value.trim();
    if (!raw) { setMsg('jMsg', '没有内容可去转义', 'warn'); return; }
    try {
      // 带外层引号就直接当 JSON 字符串解析，否则补一对引号
      const data = JSON.parse(/^["']/.test(raw) ? raw : '"' + raw.replace(/"/g, '\\"') + '"');
      put(typeof data === 'string' ? data : JSON.stringify(data, null, 2));
      setMsg('jMsg', '去转义完成', 'ok');
    } catch (err) {
      setMsg('jMsg', '去转义失败：' + String(err.message || err), 'err');
    }
  });

  on('jPaste', async () => {
    const t = await window.api.readText();
    if (!t) { setMsg('jMsg', '剪贴板是空的', 'warn'); return; }
    $in.value = t; syncIn(); setMsg('jMsg', '已从剪贴板读入', 'ok');
  });

  on('jCopy', () => {
    if (!$out.value) { setMsg('jMsg', '没有可复制的结果', 'warn'); return; }
    copy($out.value);
  });

  on('jSave', async () => {
    if (!$out.value) { setMsg('jMsg', '没有可保存的结果', 'warn'); return; }
    const r = await window.api.saveText($out.value, 'data.json');
    if (r && r.ok) setMsg('jMsg', '已保存到 ' + r.path, 'ok');
    else if (r && !r.canceled) setMsg('jMsg', '保存失败：' + (r.error || '未知错误'), 'err');
  });

  on('jClear', () => { $in.value = ''; put(''); syncIn(); setMsg('jMsg', ''); });
}

/* -------------------------------- 正则模块 ------------------------------- */

function regexTpl() {
  const flags = [['g', '全局 g'], ['i', '忽略大小写 i'], ['m', '多行 m'], ['s', '点匹配换行 s'], ['u', 'Unicode u']];
  return `
    <div class="re-bar">
      <span class="slash">/</span>
      <input id="rePat" class="inp mono" spellcheck="false" placeholder="\\d{4}-\\d{2}-\\d{2}" />
      <span class="slash">/</span>
      <input id="reFlags" class="inp mono re-flags" value="g" spellcheck="false" />
      <span class="re-count" id="reCount">—</span>
    </div>
    <div class="flag-row">
      ${flags.map(([f, l]) => `<label class="flag"><input type="checkbox" data-flag="${f}"${f === 'g' ? ' checked' : ''}/><span>${l}</span></label>`).join('')}
    </div>
    <div class="tool-row">
      <div class="pane">
        <div class="pane-head"><span>测试文本</span><span class="pane-meta" id="reTextMeta">0 字符</span></div>
        <textarea id="reText" class="ta" spellcheck="false" placeholder="粘贴要匹配的文本…"></textarea>
      </div>
      <div class="pane">
        <div class="pane-head"><span>高亮</span></div>
        <div class="hl-box" id="reHl"><span class="empty">输入正则和文本后自动匹配</span></div>
      </div>
    </div>
    <div class="section-title">匹配明细</div>
    <div class="match-list" id="reList"><div class="empty">—</div></div>
    <div class="section-title">替换预览</div>
    <div class="re-bar">
      <input id="reRep" class="inp mono" style="flex:1" spellcheck="false" placeholder="替换为…（支持 $1 $2，留空则删除匹配）" />
    </div>
    <div class="hl-box" id="reRepOut"><span class="empty">—</span></div>
    <div class="msg" id="reMsg"></div>`;
}

/* 收集所有匹配；零宽匹配要手动推进 lastIndex，否则死循环 */
function collectMatches(re, text, limit) {
  const out = [];
  if (!re.global) {
    const m = re.exec(text);
    if (m) out.push(m);
    return out;
  }
  let m;
  while ((m = re.exec(text)) !== null) {
    out.push(m);
    if (m[0] === '') re.lastIndex++;
    if (out.length >= (limit || 2000)) break;
  }
  return out;
}

function bindRegex() {
  const $pat = document.getElementById('rePat');
  const $flags = document.getElementById('reFlags');
  const $text = document.getElementById('reText');
  const $hl = document.getElementById('reHl');
  const $list = document.getElementById('reList');
  const $rep = document.getElementById('reRep');
  const $repOut = document.getElementById('reRepOut');

  const flagBoxes = () => [...document.querySelectorAll('.flag [data-flag]')];

  flagBoxes().forEach((cb) => cb.addEventListener('change', () => {
    $flags.value = flagBoxes().filter((x) => x.checked).map((x) => x.dataset.flag).join('');
    update();
  }));

  $flags.addEventListener('input', () => {
    const set = new Set($flags.value.split(''));
    flagBoxes().forEach((cb) => { cb.checked = set.has(cb.dataset.flag); });
    update();
  });

  [$pat, $text].forEach((el) => el.addEventListener('input', () => {
    setMeta('reTextMeta', $text.value.length + ' 字符');
    update();
  }));
  $rep.addEventListener('input', update);

  setMeta('reTextMeta', '0 字符');

  function update() {
    const pat = $pat.value;
    const text = $text.value;
    const setMetaCount = (t) => { document.getElementById('reCount').textContent = t; };

    if (!pat || !text) {
      $hl.innerHTML = '<span class="empty">输入正则和文本后自动匹配</span>';
      $list.innerHTML = '<div class="empty">—</div>';
      $repOut.innerHTML = '<span class="empty">—</span>';
      setMeta('reMsg', '');
      setMetaCount('—');
      return;
    }

    let re;
    try {
      re = new RegExp(pat, $flags.value.replace(/[^gimsu]/g, ''));
      setMsg('reMsg', '');
    } catch (err) {
      $hl.innerHTML = '<span class="empty">正则不合法</span>';
      $list.innerHTML = '<div class="empty">—</div>';
      $repOut.innerHTML = '<span class="empty">—</span>';
      setMeta('reMsg', String(err.message || err), 'err');
      setMetaCount('—');
      return;
    }

    const matches = collectMatches(new RegExp(re.source, re.flags), text);
    setMetaCount(matches.length ? matches.length + ' 处匹配' : '没有匹配');

    /* 高亮 */
    if (matches.length === 0) {
      $hl.innerHTML = '<span class="dim">' + esc(text) + '</span>';
    } else {
      let html = '';
      let last = 0;
      matches.forEach((m) => {
        const s = m.index, e = s + m[0].length;
        html += esc(text.slice(last, s));
        html += '<mark>' + (m[0] === '' ? '<i class="zero"></i>' : esc(m[0])) + '</mark>';
        last = e;
      });
      html += esc(text.slice(last));
      $hl.innerHTML = html;
    }

    /* 明细 */
    if (matches.length === 0) {
      $list.innerHTML = '<div class="empty">没有匹配到内容</div>';
    } else {
      $list.innerHTML = matches.slice(0, 200).map((m, i) => {
        const groups = m.slice(1)
          .map((g, gi) => `<span class="grp">$${gi + 1}=${g === undefined ? '<i>未参与</i>' : esc(g)}</span>`)
          .join('');
        return `<div class="match-item">
            <span class="idx">#${i + 1}</span>
            <span class="pos">${m.index}–${m.index + m[0].length}</span>
            <code class="hit">${esc(m[0]) || '<i>空匹配</i>'}</code>
            <span class="groups">${groups}</span>
          </div>`;
      }).join('') + (matches.length > 200 ? '<div class="empty">（只显示前 200 条）</div>' : '');
    }

    /* 替换预览 */
    try {
      const out = text.replace(re, $rep.value);
      $repOut.innerHTML = out === text
        ? '<span class="dim">' + esc(out) + '</span>'
        : '<span class="dim">' + esc(out) + '</span>';
    } catch (err) {
      $repOut.innerHTML = '<span class="empty">替换失败</span>';
    }
  }

  update();
}

/* ------------------------------ Base64 模块 ------------------------------ */

function b64Tpl() {
  return `
    <div class="flag-row">
      <label class="flag"><input type="checkbox" id="b64Url"/><span>URL 安全（把 + / 换成 - _）</span></label>
      <label class="flag"><input type="checkbox" id="b64Wrap"/><span>每 76 字符换行</span></label>
    </div>
    <div class="tool-row">
      <div class="pane">
        <div class="pane-head"><span>原文</span><span class="pane-meta" id="b64InMeta">0 字符</span></div>
        <textarea id="b64In" class="ta" spellcheck="false" placeholder="要编码的文本…"></textarea>
      </div>
      <div class="pane">
        <div class="pane-head"><span>Base64</span><span class="pane-meta" id="b64OutMeta">0 字符</span></div>
        <textarea id="b64Out" class="ta mono" spellcheck="false" placeholder="SGVsbG8…"></textarea>
      </div>
    </div>
    <div class="btn-row">
      <button class="btn" id="b64Enc">编码 →</button>
      <button class="btn" id="b64Dec">← 解码</button>
      <button class="ghost-btn" id="b64Swap">左右交换</button>
      <button class="ghost-btn" id="b64Paste">读剪贴板</button>
      <button class="ghost-btn" id="b64Copy">复制 Base64</button>
      <button class="ghost-btn" id="b64Clear">清空</button>
    </div>
    <div class="msg" id="b64Msg"></div>`;
}

/* 走 TextEncoder/TextDecoder，中文、emoji 都不会乱码 */
function b64Encode(str, urlSafe, wrap) {
  const bytes = new TextEncoder().encode(str);
  let bin = '';
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  let out = btoa(bin);
  if (urlSafe) out = out.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  if (wrap) out = out.replace(/(.{76})/g, '$1\n').trim();
  return out;
}

function b64Decode(str) {
  let s = str.replace(/\s+/g, '').replace(/-/g, '+').replace(/_/g, '/');
  while (s.length % 4) s += '=';
  const bin = atob(s);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new TextDecoder('utf-8', { fatal: false }).decode(bytes);
}

function bindB64() {
  const $in = document.getElementById('b64In');
  const $out = document.getElementById('b64Out');
  const $url = document.getElementById('b64Url');
  const $wrap = document.getElementById('b64Wrap');

  const sync = () => {
    setMeta('b64InMeta', $in.value.length + ' 字符');
    setMeta('b64OutMeta', $out.value.length + ' 字符');
  };
  [$in, $out].forEach((el) => el.addEventListener('input', () => { sync(); setMsg('b64Msg', ''); }));
  sync();

  const on = (id, fn) => document.getElementById(id).addEventListener('click', fn);

  on('b64Enc', () => {
    if (!$in.value) { setMsg('b64Msg', '左边没有内容', 'warn'); return; }
    $out.value = b64Encode($in.value, $url.checked, $wrap.checked);
    sync();
    setMsg('b64Msg', '编码完成', 'ok');
  });

  on('b64Dec', () => {
    const src = $out.value.trim() || $in.value.trim();
    if (!src) { setMsg('b64Msg', '没有可解码的内容', 'warn'); return; }
    try {
      const text = b64Decode(src);
      $out.value = text;
      sync();
      setMsg('b64Msg', '解码完成', 'ok');
    } catch (err) {
      setMsg('b64Msg', '解码失败：内容不是合法的 Base64', 'err');
    }
  });

  on('b64Swap', () => {
    const t = $in.value; $in.value = $out.value; $out.value = t; sync(); setMsg('b64Msg', '');
  });

  on('b64Paste', async () => {
    const t = await window.api.readText();
    if (!t) { setMsg('b64Msg', '剪贴板是空的', 'warn'); return; }
    $in.value = t; sync(); setMsg('b64Msg', '已从剪贴板读入', 'ok');
  });

  on('b64Copy', () => {
    const t = $out.value || $in.value;
    if (!t) { setMsg('b64Msg', '没有可复制的内容', 'warn'); return; }
    copy(t);
  });

  on('b64Clear', () => { $in.value = ''; $out.value = ''; sync(); setMsg('b64Msg', ''); });
}

/* ------------------------------ 时间戳模块 ------------------------------ */

const p2 = (n) => String(n).padStart(2, '0');

function fmtLocal(d) {
  return `${d.getFullYear()}-${p2(d.getMonth() + 1)}-${p2(d.getDate())} ${p2(d.getHours())}:${p2(d.getMinutes())}:${p2(d.getSeconds())}`;
}

function fmtUTC(d) {
  return `${d.getUTCFullYear()}-${p2(d.getUTCMonth() + 1)}-${p2(d.getUTCDate())} ${p2(d.getUTCHours())}:${p2(d.getUTCMinutes())}:${p2(d.getUTCSeconds())} UTC`;
}

function relTime(ms) {
  const diff = Date.now() - ms;
  const abs = Math.abs(diff);
  const unit = abs < 60000 ? [Math.round(abs / 1000), '秒']
    : abs < 3600000 ? [Math.round(abs / 60000), '分钟']
      : abs < 86400000 ? [Math.round(abs / 3600000), '小时']
        : [Math.round(abs / 86400000), '天'];
  return diff >= 0 ? `${unit[0]} ${unit[1]}前` : `${unit[0]} ${unit[1]}后`;
}

/* 自己解析，避免各引擎对 "YYYY-MM-DD HH:mm:ss" 的解析差异 */
function parseDateStr(s) {
  s = String(s).trim();
  if (!s) return null;
  const m = /^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})(?:[ T](\d{1,2}):(\d{1,2})(?::(\d{1,2}))?)?$/.exec(s);
  if (m) {
    const d = new Date(+m[1], +m[2] - 1, +m[3], +(m[4] || 0), +(m[5] || 0), +(m[6] || 0));
    return isNaN(d.getTime()) ? null : d;
  }
  const d = new Date(s);
  return isNaN(d.getTime()) ? null : d;
}

function kvRows(pairs) {
  return pairs.map(([k, v, c]) => `<div class="kv"><span class="k">${k}</span><span class="v mono"${c ? ` data-copy="${esc(v)}"` : ''}>${esc(v)}</span></div>`).join('');
}

function tsTpl() {
  return `
    <div class="now-card">
      <div class="now-main">
        <div class="now-label">当前时间戳</div>
        <div class="now-val mono" id="tsNow">—</div>
      </div>
      <div class="now-side">
        <div class="now-label">当前时间</div>
        <div class="mono" id="tsNowDate">—</div>
      </div>
      <div class="now-btns">
        <button class="ghost-btn" id="tsCopyNow">复制时间戳</button>
        <label class="flag"><input type="checkbox" id="tsMs"/><span>显示毫秒</span></label>
      </div>
    </div>

    <div class="section-title">时间戳 → 日期</div>
    <div class="tool-row two">
      <div class="pane">
        <div class="pane-head"><span>时间戳</span><button class="mini-btn" id="tsFillNow">填当前</button></div>
        <input id="tsInput" class="inp mono" spellcheck="false" placeholder="1730000000（10 位自动按秒，13 位按毫秒）" />
      </div>
      <div class="pane">
        <div class="pane-head"><span>结果</span></div>
        <div class="kv-list" id="tsOut"><div class="empty">—</div></div>
      </div>
    </div>

    <div class="section-title">日期 → 时间戳</div>
    <div class="tool-row two">
      <div class="pane">
        <div class="pane-head"><span>日期时间</span><button class="mini-btn" id="tsFillToday">填今天 0 点</button></div>
        <input id="tsDate" class="inp" spellcheck="false" placeholder="2026-10-12 11:39:50" />
      </div>
      <div class="pane">
        <div class="pane-head"><span>结果</span></div>
        <div class="kv-list" id="tsOut2"><div class="empty">—</div></div>
      </div>
    </div>
    <div class="msg" id="tsMsg"></div>`;
}

function bindTs() {
  const $now = document.getElementById('tsNow');
  const $nowDate = document.getElementById('tsNowDate');
  const $ms = document.getElementById('tsMs');
  const $in = document.getElementById('tsInput');
  const $out = document.getElementById('tsOut');
  const $date = document.getElementById('tsDate');
  const $out2 = document.getElementById('tsOut2');

  let timer = null;
  function tick() {
    const d = new Date();
    const ms = d.getTime();
    $now.textContent = $ms.checked ? String(ms) : String(Math.floor(ms / 1000));
    $nowDate.textContent = fmtLocal(d);
  }
  tick();
  timer = setInterval(tick, 1000);

  // 切换模块时把定时器清掉，别在后台白跑
  window.__viewCleanup = () => { if (timer) clearInterval(timer); timer = null; };

  $ms.addEventListener('change', tick);
  document.getElementById('tsCopyNow').addEventListener('click', () => copy($now.textContent));

  $in.addEventListener('input', () => {
    const raw = $in.value.trim();
    if (!raw) { $out.innerHTML = '<div class="empty">—</div>'; return; }
    if (!/^-?\d+$/.test(raw)) { $out.innerHTML = '<div class="empty">请输入纯数字时间戳</div>'; return; }
    const n = Number(raw);
    const isMs = raw.replace('-', '').length >= 12;
    const ms = isMs ? n : n * 1000;
    const d = new Date(ms);
    if (isNaN(d.getTime())) { $out.innerHTML = '<div class="empty">超出可表示范围</div>'; return; }
    $out.innerHTML = kvRows([
      ['识别为', isMs ? '毫秒' : '秒'],
      ['本地时间', fmtLocal(d)],
      ['UTC', fmtUTC(d)],
      ['ISO 8601', d.toISOString()],
      ['相对现在', relTime(ms)]
    ]);
    $out.querySelectorAll('[data-copy]').forEach((el) => el.addEventListener('click', () => copy(el.dataset.copy)));
  });

  $date.addEventListener('input', () => {
    const raw = $date.value.trim();
    if (!raw) { $out2.innerHTML = '<div class="empty">—</div>'; return; }
    const d = parseDateStr(raw);
    if (!d) { $out2.innerHTML = '<div class="empty">认不出这个日期格式</div>'; return; }
    const ms = d.getTime();
    $out2.innerHTML = kvRows([
      ['秒', String(Math.floor(ms / 1000))],
      ['毫秒', String(ms)],
      ['ISO 8601', d.toISOString()]
    ]);
    $out2.querySelectorAll('[data-copy]').forEach((el) => el.addEventListener('click', () => copy(el.dataset.copy)));
  });

  document.getElementById('tsFillNow').addEventListener('click', () => {
    $in.value = $ms.checked ? String(Date.now()) : String(Math.floor(Date.now() / 1000));
    $in.dispatchEvent(new Event('input'));
  });

  document.getElementById('tsFillToday').addEventListener('click', () => {
    const d = new Date();
    $date.value = `${d.getFullYear()}-${p2(d.getMonth() + 1)}-${p2(d.getDate())} 00:00:00`;
    $date.dispatchEvent(new Event('input'));
  });
}

/* ------------------------------ 二维码模块 ------------------------------ */

function qrTpl() {
  return `
    <div class="tool-row">
      <div class="pane">
        <div class="pane-head"><span>内容</span><span class="pane-meta" id="qrMeta">0 字符</span></div>
        <textarea id="qrText" class="ta" spellcheck="false" placeholder="文字、网址、联系方式都可以…"></textarea>
      </div>
      <div class="pane">
        <div class="pane-head"><span>预览</span><span class="pane-meta" id="qrInfo">—</span></div>
        <div class="qr-stage"><canvas id="qrCanvas"></canvas></div>
      </div>
    </div>
    <div class="btn-row">
      <span class="ctrl-label">尺寸</span>
      <input type="range" id="qrSize" class="range" min="128" max="640" step="32" value="320" />
      <span class="mono ctrl-val" id="qrSizeVal">320 px</span>
      <span class="ctrl-label">纠错</span>
      <select id="qrLevel" class="sel">
        <option value="L">L · 7%</option>
        <option value="M" selected>M · 15%</option>
        <option value="Q">Q · 25%</option>
        <option value="H">H · 30%</option>
      </select>
      <button class="btn" id="qrSave">保存 PNG</button>
      <button class="ghost-btn" id="qrCopy">复制内容</button>
      <button class="ghost-btn" id="qrPaste">读剪贴板</button>
    </div>
    <div class="msg" id="qrMsg"></div>`;
}

function bindQr() {
  const $text = document.getElementById('qrText');
  const $canvas = document.getElementById('qrCanvas');
  const $size = document.getElementById('qrSize');
  const $sizeVal = document.getElementById('qrSizeVal');
  const $level = document.getElementById('qrLevel');

  $text.value = 'https://www.workbuddy.cn';
  setMeta('qrMeta', $text.value.length + ' 字符');

  function draw() {
    const text = $text.value.trim();
    setMeta('qrMeta', $text.value.length + ' 字符');
    const size = +$size.value;
    $sizeVal.textContent = size + ' px';

    if (!text) {
      const ctx = $canvas.getContext('2d');
      $canvas.width = $canvas.height = size;
      ctx.clearRect(0, 0, size, size);
      setMeta('qrInfo', '—');
      setMsg('qrMsg', '');
      return;
    }
    if (typeof qrcode === 'undefined') {
      setMsg('qrMsg', '二维码库没加载起来，请重新打包后再试', 'err');
      return;
    }
    try {
      // 中文必须按 UTF-8 编码进矩阵，否则扫出来是乱码
      qrcode.stringToBytes = qrcode.stringToBytesFuncs['UTF-8'];
      const qr = qrcode(0, $level.value);   // typeNumber 传 0 = 按内容长度自动选版本
      qr.addData(text);
      qr.make();

      const n = qr.getModuleCount();
      const margin = 4;                     // 静区（模块数），留太小会扫不出来
      const total = n + margin * 2;
      const scale = Math.max(1, Math.round(size / total));
      const px = total * scale;

      $canvas.width = px;
      $canvas.height = px;
      const ctx = $canvas.getContext('2d');
      ctx.imageSmoothingEnabled = false;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, px, px);
      ctx.fillStyle = '#101219';
      for (let r = 0; r < n; r++) {
        for (let c = 0; c < n; c++) {
          if (qr.isDark(r, c)) ctx.fillRect((c + margin) * scale, (r + margin) * scale, scale, scale);
        }
      }
      $canvas.style.width = px + 'px';
      $canvas.style.height = px + 'px';

      setMsg('qrMsg', '');
      setMeta('qrInfo', `${n}×${n} 模块 · ${px}px · 纠错 ${$level.value}`);
    } catch (err) {
      setMsg('qrMsg', '生成失败：' + (err.message || err), 'err');
      setMeta('qrInfo', '—');
    }
  }

  $text.addEventListener('input', draw);
  $size.addEventListener('input', draw);
  $level.addEventListener('change', draw);
  draw();

  document.getElementById('qrSave').addEventListener('click', async () => {
    if (!$text.value.trim()) { setMsg('qrMsg', '先输入内容', 'warn'); return; }
    const r = await window.api.saveImage($canvas.toDataURL('image/png'), 'qrcode.png');
    if (r && r.ok) setMsg('qrMsg', '已保存到 ' + r.path, 'ok');
    else if (r && !r.canceled) setMsg('qrMsg', '保存失败：' + (r.error || '未知错误'), 'err');
  });

  document.getElementById('qrCopy').addEventListener('click', () => {
    if (!$text.value) { setMsg('qrMsg', '没有可复制的内容', 'warn'); return; }
    copy($text.value);
  });

  document.getElementById('qrPaste').addEventListener('click', async () => {
    const t = await window.api.readText();
    if (!t) { setMsg('qrMsg', '剪贴板是空的', 'warn'); return; }
    $text.value = t; draw(); setMsg('qrMsg', '已从剪贴板读入', 'ok');
  });
}

/* ------------------------------ 颜色互转模块 ------------------------------ */

function hexToRgb(hex) {
  let h = String(hex).trim().replace(/^#/, '');
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  if (!/^[0-9a-f]{6}$/i.test(h)) return null;
  return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16) };
}

function rgbToHsv(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
  let h = 0;
  if (d !== 0) {
    if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
  }
  return { h: Math.round(h), s: Math.round((max === 0 ? 0 : d / max) * 100), v: Math.round(max * 100) };
}

function hsvToRgb(h, s, v) {
  h = (((h % 360) + 360) % 360) / 60;
  s /= 100; v /= 100;
  const i = Math.floor(h), f = h - i;
  const p = v * (1 - s), q = v * (1 - s * f), t = v * (1 - s * (1 - f));
  const m = [[v, t, p], [q, v, p], [p, v, t], [p, q, v], [t, p, v], [v, p, q]][i % 6];
  return { r: Math.round(m[0] * 255), g: Math.round(m[1] * 255), b: Math.round(m[2] * 255) };
}

function hslToRgb(h, s, l) {
  h = (((h % 360) + 360) % 360) / 360;
  s /= 100; l /= 100;
  if (s === 0) { const v = Math.round(l * 255); return { r: v, g: v, b: v }; }
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const hue = (t) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  return { r: Math.round(hue(h + 1 / 3) * 255), g: Math.round(hue(h) * 255), b: Math.round(hue(h - 1 / 3) * 255) };
}

function rgbToCmyk(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const k = 1 - Math.max(r, g, b);
  if (k === 1) return { c: 0, m: 0, y: 0, k: 100 };
  return {
    c: Math.round(((1 - r - k) / (1 - k)) * 100),
    m: Math.round(((1 - g - k) / (1 - k)) * 100),
    y: Math.round(((1 - b - k) / (1 - k)) * 100),
    k: Math.round(k * 100)
  };
}

function cmykToRgb(c, m, y, k) {
  c /= 100; m /= 100; y /= 100; k /= 100;
  return {
    r: Math.round(255 * (1 - c) * (1 - k)),
    g: Math.round(255 * (1 - m) * (1 - k)),
    b: Math.round(255 * (1 - y) * (1 - k))
  };
}

function adjustLightness(rgb, delta) {
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  return hslToRgb(hsl.h, hsl.s, Math.max(0, Math.min(100, hsl.l + delta * 100)));
}

/* 宽松识别输入的是哪种格式 */
function parseColorInput(raw) {
  const s = String(raw == null ? '' : raw).trim();
  if (!s) return null;
  if (/^#?[0-9a-f]{3}$/i.test(s) || /^#?[0-9a-f]{6}$/i.test(s)) return hexToRgb(s);
  const nums = (s.match(/-?\d*\.?\d+/g) || []).map(Number);
  if (/^rgba?\s*\(/i.test(s) && nums.length >= 3) return { r: clamp255(nums[0]), g: clamp255(nums[1]), b: clamp255(nums[2]) };
  if (/^hsla?\s*\(/i.test(s) && nums.length >= 3) return hslToRgb(nums[0], nums[1], nums[2]);
  if (/^hsv\s*\(/i.test(s) && nums.length >= 3) return hsvToRgb(nums[0], nums[1], nums[2]);
  if (/^cmyk\s*\(/i.test(s) && nums.length >= 4) return cmykToRgb(nums[0], nums[1], nums[2], nums[3]);
  return null;
}

function contrastRatio(c1, c2) {
  const a = luminance(c1.r, c1.g, c1.b), b = luminance(c2.r, c2.g, c2.b);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

function colorTpl() {
  const c = current || { r: 91, g: 140, b: 255 };
  const hex = rgbToHex(c.r, c.g, c.b);
  return `
    <div class="color-hero">
      <div class="color-preview" id="colPreview" style="background:${hex}">
        <span id="colPreviewText" style="color:${readableText(c.r, c.g, c.b)}">${hex}</span>
      </div>
      <div class="color-side">
        <div class="ctrl-label">输入任意格式，自动识别</div>
        <input id="colInput" class="inp mono" spellcheck="false" value="${hex}"
          placeholder="#5B8CFF / rgb(91,140,255) / hsl(220,100%,68%) / cmyk(64%,45%,0%,0%)" />
        <div class="btn-row" style="margin-top:12px">
          <button class="ghost-btn" id="colFromPick">用上次取的颜色</button>
          <button class="ghost-btn" id="colCopyAll">复制全部格式</button>
        </div>
      </div>
    </div>

    <div class="section-title">各种格式（点击复制）</div>
    <div class="kv-list bordered" id="colOut"></div>

    <div class="section-title">明暗色阶</div>
    <div class="tints" id="colTints"></div>

    <div class="section-title">对比度检查（WCAG）</div>
    <div class="tool-row two">
      <div class="pane">
        <div class="pane-head"><span>背景色</span><span class="pane-meta" id="colBgMeta">已识别</span></div>
        <div style="padding:12px 14px"><input id="colBg" class="inp mono" spellcheck="false" value="#101219" /></div>
      </div>
      <div class="pane">
        <div class="pane-head"><span>结果</span><span class="pane-meta" id="colRatio"></span></div>
        <div class="kv-list" id="colContrast"></div>
      </div>
    </div>
    <div class="msg" id="colMsg"></div>`;
}

function bindColor() {
  const $in = document.getElementById('colInput');
  const $prev = document.getElementById('colPreview');
  const $prevText = document.getElementById('colPreviewText');
  const $out = document.getElementById('colOut');
  const $tints = document.getElementById('colTints');
  const $bg = document.getElementById('colBg');
  const $contrast = document.getElementById('colContrast');

  let rgb = parseColorInput($in.value) || { r: 91, g: 140, b: 255 };

  function renderContrast() {
    const bg = parseColorInput($bg.value);
    setMeta('colBgMeta', bg ? '已识别' : '认不出来');
    if (!bg) {
      setMeta('colRatio', '');
      $contrast.innerHTML = '<div class="empty">背景色填个合法的颜色试试</div>';
      return;
    }
    const ratio = contrastRatio(rgb, bg);
    const r = Math.round(ratio * 100) / 100;
    const mark = (need) => (ratio >= need ? '<b class="pass">通过</b>' : '<b class="fail">不通过</b>');
    setMeta('colRatio', r + ' : 1');
    $contrast.innerHTML = kvRows([
      ['对比度', r + ' : 1'],
      ['正文 AA · 4.5', mark(4.5)],
      ['大号 AA · 3.0', mark(3)],
      ['正文 AAA · 7.0', mark(7)]
    ]);
    $contrast.querySelectorAll('.pass').forEach((el) => { el.style.color = 'var(--ok)'; });
    $contrast.querySelectorAll('.fail').forEach((el) => { el.style.color = '#ff7b7b'; });
  }

  function render() {
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
    const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);

    $prev.style.background = hex;
    $prevText.textContent = hex;
    $prevText.style.color = readableText(rgb.r, rgb.g, rgb.b);

    const rows = [
      ['HEX', hex],
      ['RGB', `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`],
      ['HSL', `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`],
      ['HSV', `hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)`],
      ['CMYK', `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`],
      ['CSS', `--color: ${hex.toLowerCase()};`]
    ];
    $out.innerHTML = rows.map(([k, v], i) => `
      <div class="kv">
        <span class="k">${k}</span>
        <span class="v mono" data-copy="${esc(v)}">${esc(v)}</span>
        <button class="mini-btn" data-copy="${esc(v)}">复制</button>
      </div>`).join('');
    bindCopy($out);

    const steps = [-40, -30, -20, -10, 0, 10, 20, 30, 40];
    $tints.innerHTML = steps.map((pct) => {
      const c = pct === 0 ? rgb : adjustLightness(rgb, pct / 100);
      const h = rgbToHex(c.r, c.g, c.b);
      return `<div class="tint" data-copy="${h}" style="background:${h}" title="${h}"></div>`;
    }).join('');
    bindCopy($tints);

    renderContrast();
  }

  $in.addEventListener('input', () => {
    const c = parseColorInput($in.value);
    if (!c) { setMsg('colMsg', '这个颜色认不出来，试试 #5B8CFF / rgb(91,140,255) / hsl(220,100%,68%)', 'err'); return; }
    rgb = c;
    setMsg('colMsg', '');
    render();
  });

  $bg.addEventListener('input', renderContrast);

  document.getElementById('colFromPick').addEventListener('click', () => {
    if (!current) { setMsg('colMsg', '还没取过色，先去「CSS 取色器」吸一个', 'warn'); return; }
    $in.value = current.hex;
    rgb = { r: current.r, g: current.g, b: current.b };
    setMsg('colMsg', '');
    render();
  });

  document.getElementById('colCopyAll').addEventListener('click', () => {
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
    const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);
    copy([
      'HEX   ' + rgbToHex(rgb.r, rgb.g, rgb.b),
      'RGB   ' + rgb.r + ', ' + rgb.g + ', ' + rgb.b,
      'HSL   ' + hsl.h + ', ' + hsl.s + '%, ' + hsl.l + '%',
      'HSV   ' + hsv.h + ', ' + hsv.s + '%, ' + hsv.v + '%',
      'CMYK  ' + cmyk.c + '%, ' + cmyk.m + '%, ' + cmyk.y + '%, ' + cmyk.k + '%'
    ].join('\n'));
  });

  render();
}

/* ------------------------------ Base64URL 工具 ----------------------------- */

function b64urlDecode(str) {
  let s = String(str).replace(/-/g, '+').replace(/_/g, '/');
  while (s.length % 4) s += '=';
  const bin = atob(s);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new TextDecoder('utf-8', { fatal: false }).decode(bytes);
}

/* -------------------------------- JWT 模块 ------------------------------- */

const JWT_TIME_CLAIMS = [['iat', '签发时间'], ['nbf', '生效时间'], ['exp', '过期时间']];

function jwtTpl() {
  return `
    <div class="pane">
      <div class="pane-head"><span>Token</span><span class="pane-meta" id="jwtMeta">0 字符</span></div>
      <textarea id="jwtIn" class="ta mono" style="min-height:110px" spellcheck="false"
        placeholder="粘贴 JWT，形如 eyJhbGciOi…​.eyJzdWIiOi…​.SflKxwRJ…"></textarea>
    </div>
    <div class="btn-row">
      <button class="btn" id="jwtParse">解析</button>
      <button class="ghost-btn" id="jwtPaste">读剪贴板</button>
      <button class="ghost-btn" id="jwtStrip">去掉 Bearer 前缀</button>
      <button class="ghost-btn" id="jwtClear">清空</button>
    </div>
    <div class="msg" id="jwtMsg"></div>
    <div id="jwtOut"></div>`;
}

function bindJwt() {
  const $in = document.getElementById('jwtIn');
  const $out = document.getElementById('jwtOut');

  $in.addEventListener('input', () => {
    setMeta('jwtMeta', $in.value.length + ' 字符');
    parse();
  });

  function parse() {
    const raw = $in.value.trim().replace(/^Bearer\s+/i, '');
    if (!raw) { $out.innerHTML = ''; setMsg('jwtMsg', ''); return; }

    const parts = raw.split('.');
    if (parts.length !== 3) {
      $out.innerHTML = '';
      setMsg('jwtMsg', `JWT 应该是「头部.载荷.签名」三段，用点隔开，现在检测到 ${parts.length} 段`, 'err');
      return;
    }

    let head, payload;
    try {
      head = JSON.parse(b64urlDecode(parts[0]));
    } catch (err) {
      $out.innerHTML = '';
      setMsg('jwtMsg', '头部解不开，可能不是合法的 JWT：' + String(err.message || err), 'err');
      return;
    }
    try {
      payload = JSON.parse(b64urlDecode(parts[1]));
    } catch (err) {
      $out.innerHTML = '';
      setMsg('jwtMsg', '载荷解不开：' + String(err.message || err), 'err');
      return;
    }

    setMsg('jwtMsg', '');

    const timeRows = JWT_TIME_CLAIMS
      .filter(([k]) => typeof payload[k] === 'number')
      .map(([k, label]) => {
        const d = new Date(payload[k] * 1000);
        let state = '';
        if (k === 'exp') state = payload[k] * 1000 < Date.now() ? '（已过期）' : '（还有 ' + relTime(payload[k] * 1000).replace('后', '') + '到期）';
        if (k === 'nbf') state = payload[k] * 1000 > Date.now() ? '（还没生效）' : '（已生效）';
        return [label + ' ' + k, fmtLocal(d) + ' ' + state];
      });

    const expired = typeof payload.exp === 'number' && payload.exp * 1000 < Date.now();

    $out.innerHTML = `
      <div class="jwt-state ${expired ? 'bad' : 'good'}">
        ${expired ? '⚠ 这个 Token 已经过期了' : (typeof payload.exp === 'number' ? '✓ Token 在有效期内' : 'ℹ 载荷里没有 exp，无法判断有效期')}
      </div>
      <div class="tool-row two" style="margin-top:16px">
        <div class="pane">
          <div class="pane-head"><span>Header · 算法与类型</span></div>
          <div class="hl-box jwt-box" id="jwtHeader">${esc(JSON.stringify(head, null, 2))}</div>
        </div>
        <div class="pane">
          <div class="pane-head"><span>Payload · 载荷</span></div>
          <div class="hl-box jwt-box" id="jwtPayload">${esc(JSON.stringify(payload, null, 2))}</div>
        </div>
      </div>
      <div class="section-title">时间声明</div>
      <div class="kv-list bordered" id="jwtTimes">${timeRows.length ? kvRows(timeRows) : '<div class="empty">载荷里没有 iat / nbf / exp</div>'}</div>
      <div class="section-title">签名（原样保留，本工具不校签）</div>
      <div class="hl-box jwt-sig" id="jwtSig">${esc(parts[2])}</div>
      <div class="btn-row">
        <button class="ghost-btn" id="jwtCopyPayload">复制载荷 JSON</button>
        <button class="ghost-btn" id="jwtCopyHeader">复制头部 JSON</button>
      </div>`;

    document.getElementById('jwtCopyPayload').addEventListener('click', () => copy(JSON.stringify(payload, null, 2)));
    document.getElementById('jwtCopyHeader').addEventListener('click', () => copy(JSON.stringify(head, null, 2)));

    const $t = document.getElementById('jwtTimes');
    $t.querySelectorAll('[data-copy]').forEach((el) => el.addEventListener('click', () => copy(el.dataset.copy)));
  }

  document.getElementById('jwtParse').addEventListener('click', parse);
  document.getElementById('jwtPaste').addEventListener('click', async () => {
    const t = await window.api.readText();
    if (!t) { setMsg('jwtMsg', '剪贴板是空的', 'warn'); return; }
    $in.value = t; $in.dispatchEvent(new Event('input'));
  });
  document.getElementById('jwtStrip').addEventListener('click', () => {
    $in.value = $in.value.replace(/^Bearer\s+/i, '');
    $in.dispatchEvent(new Event('input'));
  });
  document.getElementById('jwtClear').addEventListener('click', () => {
    $in.value = ''; $in.dispatchEvent(new Event('input'));
  });

  setMeta('jwtMeta', '0 字符');
}

/* -------------------------------- 哈希模块 ------------------------------- */

/* 纯 JS 的 MD5（浏览器没有现成的 MD5，crypto.subtle 也不支持） */
const md5Bytes = (function () {
  const S = [7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22,
    5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20,
    4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23,
    6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21];
  const K = new Uint32Array(64);
  for (let i = 0; i < 64; i++) K[i] = Math.floor(Math.abs(Math.sin(i + 1)) * 4294967296);

  const add = (a, b) => (a + b) & 0xFFFFFFFF;
  const rot = (x, c) => ((x << c) | (x >>> (32 - c))) >>> 0;

  return function md5(bytes) {
    const len = bytes.length;
    const totalLen = Math.ceil((len + 9) / 64) * 64;
    const buf = new Uint8Array(totalLen);
    buf.set(bytes);
    buf[len] = 0x80;
    const dv = new DataView(buf.buffer);
    const bits = len * 8;
    dv.setUint32(totalLen - 8, bits >>> 0, true);
    dv.setUint32(totalLen - 4, Math.floor(bits / 4294967296), true);

    let a0 = 0x67452301, b0 = 0xEFCDAB89, c0 = 0x98BADCFE, d0 = 0x10325476;

    for (let off = 0; off < totalLen; off += 64) {
      const M = new Uint32Array(16);
      for (let i = 0; i < 16; i++) M[i] = dv.getUint32(off + i * 4, true);

      let A = a0, B = b0, C = c0, D = d0;
      for (let i = 0; i < 64; i++) {
        let F, g;
        if (i < 16) { F = (B & C) | (~B & D); g = i; }
        else if (i < 32) { F = (D & B) | (~D & C); g = (5 * i + 1) % 16; }
        else if (i < 48) { F = B ^ C ^ D; g = (3 * i + 5) % 16; }
        else { F = C ^ (B | ~D); g = (7 * i) % 16; }
        F = add(add(add(F, A), K[i]), M[g]);
        A = D; D = C; C = B;
        B = add(B, rot(F, S[i]));
      }
      a0 = add(a0, A); b0 = add(b0, B); c0 = add(c0, C); d0 = add(d0, D);
    }

    const hex = (n) => {
      let s = '';
      for (let i = 0; i < 4; i++) s += ((n >>> (i * 8)) & 0xFF).toString(16).padStart(2, '0');
      return s;
    };
    return hex(a0) + hex(b0) + hex(c0) + hex(d0);
  };
})();

const HASH_ALGOS = [
  ['MD5', 'md5'],
  ['SHA-1', 'SHA-1'],
  ['SHA-256', 'SHA-256'],
  ['SHA-512', 'SHA-512']
];

async function shaHex(algo, bytes) {
  const buf = await crypto.subtle.digest(algo, bytes);
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

function hashTpl() {
  return `
    <div class="drop-zone" id="hashDrop">
      <div class="drop-icon">${I.hash}</div>
      <div class="drop-main">把文件拖进来算哈希，或 <button class="link-btn" id="hashPick">选择文件</button></div>
      <div class="drop-sub" id="hashFileInfo">也可以直接在下面输入文本，边打边算</div>
      <input type="file" id="hashFile" hidden />
    </div>
    <div class="pane" style="margin-top:16px">
      <div class="pane-head"><span>文本</span><span class="pane-meta" id="hashMeta">0 字符</span></div>
      <textarea id="hashIn" class="ta" style="min-height:110px" spellcheck="false" placeholder="输入或粘贴文本…"></textarea>
    </div>
    <div class="btn-row">
      <button class="btn" id="hashCalc">计算文本哈希</button>
      <button class="ghost-btn" id="hashPaste">读剪贴板</button>
      <button class="ghost-btn" id="hashClear">清空</button>
    </div>
    <div class="msg" id="hashMsg"></div>
    <div class="section-title">结果（点击复制）</div>
    <div class="kv-list bordered" id="hashOut"><div class="empty">还没有结果</div></div>`;
}

function bindHash() {
  const $in = document.getElementById('hashIn');
  const $out = document.getElementById('hashOut');
  const $file = document.getElementById('hashFile');
  const $drop = document.getElementById('hashDrop');
  let token = 0;

  function showResults(rows, note) {
    $out.innerHTML = rows.map(([k, v]) => `
      <div class="kv">
        <span class="k">${k}</span>
        <span class="v mono" data-copy="${esc(v)}" style="font-size:12.5px">${esc(v)}</span>
      </div>`).join('');
    $out.querySelectorAll('[data-copy]').forEach((el) => el.addEventListener('click', () => copy(el.dataset.copy)));
    setMsg('hashMsg', note || '');
  }

  async function calcBytes(bytes, prefix) {
    const my = ++token;
    const rows = [['MD5', md5Bytes(bytes)]];
    for (const [label, algo] of HASH_ALGOS.slice(1)) {
      rows.push([label, await shaHex(algo, bytes)]);
    }
    if (my !== token) return;   // 期间又算了一次，丢弃旧结果
    showResults(rows, prefix);
  }

  function calcText() {
    const text = $in.value;
    setMeta('hashMeta', text.length + ' 字符');
    if (!text) { $out.innerHTML = '<div class="empty">还没有结果</div>'; setMsg('hashMsg', ''); return; }
    calcBytes(new TextEncoder().encode(text));
  }

  async function hashFile(f) {
    setMeta('hashFileInfo', `${f.name} · ${fmtSize(f.size)} · 计算中…`);
    const my = ++token;
    const buf = await f.arrayBuffer();
    const rows = [['MD5', md5Bytes(new Uint8Array(buf))]];
    for (const [label, algo] of HASH_ALGOS.slice(1)) {
      rows.push([label, await shaHex(algo, buf)]);
    }
    if (my !== token) return;
    showResults(rows, `文件 ${f.name}（${fmtSize(f.size)}）`);
    setMeta('hashFileInfo', `${f.name} · ${fmtSize(f.size)}`);
  }

  $in.addEventListener('input', () => {
    clearTimeout(bindHash._t);
    bindHash._t = setTimeout(calcText, 220);
  });

  document.getElementById('hashCalc').addEventListener('click', calcText);
  document.getElementById('hashPaste').addEventListener('click', async () => {
    const t = await window.api.readText();
    if (!t) { setMsg('hashMsg', '剪贴板是空的', 'warn'); return; }
    $in.value = t; calcText();
  });
  document.getElementById('hashClear').addEventListener('click', () => {
    $in.value = ''; calcText(); setMeta('hashFileInfo', '也可以直接在下面输入文本，边打边算');
  });

  document.getElementById('hashPick').addEventListener('click', () => $file.click());
  $file.addEventListener('change', () => { if ($file.files[0]) hashFile($file.files[0]); });

  ['dragenter', 'dragover'].forEach((ev) => $drop.addEventListener(ev, (e) => {
    e.preventDefault(); $drop.classList.add('over');
  }));
  ['dragleave', 'drop'].forEach((ev) => $drop.addEventListener(ev, () => $drop.classList.remove('over')));
  $drop.addEventListener('drop', (e) => {
    e.preventDefault();
    const f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
    if (f) hashFile(f);
  });

  setMeta('hashMeta', '0 字符');
}

/* ------------------------------ 生成器模块 ------------------------------ */

function randInt(max) {
  if (max <= 0) return 0;
  const limit = Math.floor(0xFFFFFFFF / max) * max;
  const a = new Uint32Array(1);
  let v;
  do { crypto.getRandomValues(a); v = a[0]; } while (v >= limit);
  return v % max;
}

function uuidV4() {
  const b = new Uint8Array(16);
  crypto.getRandomValues(b);
  b[6] = (b[6] & 0x0F) | 0x40;
  b[8] = (b[8] & 0x3F) | 0x80;
  const h = [...b].map((x) => x.toString(16).padStart(2, '0')).join('');
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
}

const AMBIGUOUS = '0OoIl1|`\'"';
const PW_SETS = {
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lower: 'abcdefghijklmnopqrstuvwxyz',
  digit: '0123456789',
  symbol: '!@#$%^&*()-_=+[]{};:,.?/~'
};

function genTpl() {
  return `
    <div class="flag-row">
      <label class="flag"><span>长度</span></label>
      <input type="range" id="pwLen" class="range" min="6" max="64" value="20" />
      <span class="mono ctrl-val" id="pwLenVal">20</span>
      <label class="flag"><input type="checkbox" id="pwUpper" checked /><span>大写 A-Z</span></label>
      <label class="flag"><input type="checkbox" id="pwLower" checked /><span>小写 a-z</span></label>
      <label class="flag"><input type="checkbox" id="pwDigit" checked /><span>数字 0-9</span></label>
      <label class="flag"><input type="checkbox" id="pwSymbol" checked /><span>符号 !@#$</span></label>
      <label class="flag"><input type="checkbox" id="pwNoAmbi" checked /><span>排除易混淆 0O1lI</span></label>
    </div>

    <div class="tool-row two">
      <div class="pane">
        <div class="pane-head"><span>强密码</span><span class="pane-meta" id="pwMeta"></span></div>
        <div class="gen-body">
          <div class="pw-out mono" id="pwOut">—</div>
          <div class="pw-bar"><i id="pwBar" style="width:0"></i></div>
          <div class="gen-line" id="pwLine">点「生成」来一个</div>
          <div class="btn-row" style="margin-top:14px">
            <button class="btn" id="pwGen">生成</button>
            <button class="ghost-btn" id="pwCopy">复制</button>
          </div>
        </div>
      </div>
      <div class="pane">
        <div class="pane-head"><span>UUID v4</span><span class="pane-meta" id="uuidMeta">—</span></div>
        <div class="gen-body">
          <div class="btn-row" style="margin:0 0 12px">
            <span class="ctrl-label">数量</span>
            <input type="number" id="uuidCount" class="inp mono" style="width:84px" min="1" max="200" value="5" />
            <button class="btn" id="uuidGen">生成</button>
            <button class="ghost-btn" id="uuidCopy">复制全部</button>
          </div>
          <div class="hl-box" id="uuidOut" style="min-height:150px;max-height:250px;padding:10px 14px"><span class="empty">—</span></div>
        </div>
      </div>
    </div>
    <div class="msg" id="genMsg"></div>`;
}

function bindGen() {
  const $len = document.getElementById('pwLen');
  const $lenVal = document.getElementById('pwLenVal');
  const $out = document.getElementById('pwOut');
  const $bar = document.getElementById('pwBar');
  const $line = document.getElementById('pwLine');
  const $uuidOut = document.getElementById('uuidOut');
  const $count = document.getElementById('uuidCount');

  const boxes = () => ({
    upper: document.getElementById('pwUpper').checked,
    lower: document.getElementById('pwLower').checked,
    digit: document.getElementById('pwDigit').checked,
    symbol: document.getElementById('pwSymbol').checked,
    noAmbi: document.getElementById('pwNoAmbi').checked
  });

  function charset(o) {
    let s = '';
    Object.keys(PW_SETS).forEach((k) => { if (o[k]) s += PW_SETS[k]; });
    if (o.noAmbi) s = [...s].filter((c) => !AMBIGUOUS.includes(c)).join('');
    return s;
  }

  function makePassword() {
    const o = boxes();
    const set = charset(o);
    const len = +$len.value;
    if (!set) { setMsg('genMsg', '至少要勾一类字符', 'warn'); return; }
    let pwd = '';
    for (let i = 0; i < len; i++) pwd += set[randInt(set.length)];
    $out.textContent = pwd;

    const bits = Math.round(len * Math.log2(set.length));
    const level = bits < 45 ? ['弱', '#ff7b7b', 25] : bits < 70 ? ['中等', '#f0b657', 55] : bits < 100 ? ['强', '#5b8cff', 80] : ['极强', '#3ecf8e', 100];
    $bar.style.width = level[2] + '%';
    $bar.style.background = level[1];
    $line.textContent = `字符集 ${set.length} 个 · 熵约 ${bits} bit · 强度：${level[0]}`;
    setMsg('genMsg', '');
  }

  $len.addEventListener('input', () => { $lenVal.textContent = $len.value; });
  document.getElementById('pwGen').addEventListener('click', makePassword);
  document.getElementById('pwCopy').addEventListener('click', () => {
    if (!$out.textContent || $out.textContent === '—') { setMsg('genMsg', '还没生成密码', 'warn'); return; }
    copy($out.textContent);
  });

  function makeUuids() {
    const n = Math.max(1, Math.min(200, +$count.value || 1));
    $count.value = n;
    const list = Array.from({ length: n }, uuidV4);
    $uuidOut.innerHTML = list.map((u) => `<div class="uuid-line" data-copy="${u}">${u}</div>`).join('');
    $uuidOut.querySelectorAll('.uuid-line').forEach((el) => el.addEventListener('click', () => copy(el.dataset.copy)));
    setMeta('uuidMeta', n + ' 个');
    bindGen._list = list;
    setMsg('genMsg', '');
  }

  document.getElementById('uuidGen').addEventListener('click', makeUuids);
  document.getElementById('uuidCopy').addEventListener('click', () => {
    if (!bindGen._list || !bindGen._list.length) { setMsg('genMsg', '还没生成 UUID', 'warn'); return; }
    copy(bindGen._list.join('\n'));
  });

  makePassword();
  makeUuids();
}

/* ------------------------------ 文本工具箱 ------------------------------ */

function statsLine(text) {
  const chars = text.length;
  const noSpace = text.replace(/\s/g, '').length;
  const lines = text ? text.split('\n').length : 0;
  const nonEmpty = text ? text.split('\n').filter((l) => l.trim()).length : 0;
  const words = (text.match(/[A-Za-z0-9_'-]+/g) || []).length;
  const cn = (text.match(/[\u4e00-\u9fa5]/g) || []).length;
  const bytes = new TextEncoder().encode(text).length;
  return [
    ['字符数', chars], ['不含空白', noSpace], ['行数', lines], ['非空行', nonEmpty],
    ['英文单词', words], ['中文字', cn], ['UTF-8 字节', bytes]
  ];
}

function textTpl() {
  return `
    <div class="btn-row">
      <span class="ctrl-label">大小写</span>
      <button class="mini-btn" data-case="upper">全部大写</button>
      <button class="mini-btn" data-case="lower">全部小写</button>
      <button class="mini-btn" data-case="title">每词首字母大写</button>
      <button class="mini-btn" data-case="sentence">每句首字母大写</button>
      <button class="mini-btn" data-case="swap">大小写互换</button>
    </div>
    <div class="btn-row">
      <span class="ctrl-label">命名风格</span>
      <button class="mini-btn" data-ns="camel">camelCase</button>
      <button class="mini-btn" data-ns="pascal">PascalCase</button>
      <button class="mini-btn" data-ns="snake">snake_case</button>
      <button class="mini-btn" data-ns="kebab">kebab-case</button>
      <button class="mini-btn" data-ns="const">CONSTANT_CASE</button>
    </div>
    <div class="btn-row">
      <span class="ctrl-label">行操作</span>
      <button class="mini-btn" data-line="dedup">按行去重</button>
      <button class="mini-btn" data-line="sort">升序</button>
      <button class="mini-btn" data-line="sortDesc">降序</button>
      <button class="mini-btn" data-line="sortNum">按数字排序</button>
      <button class="mini-btn" data-line="sortLen">按长度排序</button>
      <button class="mini-btn" data-line="reverse">反转行序</button>
      <button class="mini-btn" data-line="shuffle">随机打乱</button>
      <button class="mini-btn" data-line="trim">去行首尾空白</button>
      <button class="mini-btn" data-line="dropEmpty">去空行</button>
      <button class="mini-btn" data-line="number">加行号</button>
      <button class="mini-btn" data-line="jsonArr">转 JSON 数组</button>
      <button class="mini-btn" data-line="quote">每行加引号</button>
    </div>
    <div class="btn-row">
      <span class="ctrl-label">每行加</span>
      <input class="inp mono" id="txPre" style="width:120px" placeholder="前缀" />
      <input class="inp mono" id="txSuf" style="width:120px" placeholder="后缀" />
      <button class="mini-btn" id="txAffix">批量加</button>
    </div>

    <div class="pane" style="margin-top:16px">
      <div class="pane-head"><span>文本</span><span class="pane-meta" id="txMeta"></span></div>
      <textarea id="txArea" class="ta" style="min-height:230px" spellcheck="false" placeholder="在这里输入或粘贴文本…"></textarea>
    </div>
    <div class="btn-row">
      <button class="ghost-btn" id="txPaste">读剪贴板</button>
      <button class="ghost-btn" id="txCopy">复制全部</button>
      <button class="ghost-btn" id="txUndo">撤销上一步</button>
      <button class="ghost-btn" id="txClear">清空</button>
    </div>
    <div class="section-title">统计</div>
    <div class="stats" id="txStats"></div>
    <div class="msg" id="txMsg"></div>`;
}

function splitWords(s) {
  return String(s)
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .split(/[^A-Za-z0-9\u4e00-\u9fa5]+/)
    .filter(Boolean);
}

function toNamingStyle(s, style) {
  const words = splitWords(s);
  if (!words.length) return s;
  const lower = words.map((w) => w.toLowerCase());
  const cap = (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
  switch (style) {
    case 'camel': return lower.map((w, i) => (i === 0 ? w : cap(w))).join('');
    case 'pascal': return lower.map(cap).join('');
    case 'snake': return lower.join('_');
    case 'kebab': return lower.join('-');
    case 'const': return lower.join('_').toUpperCase();
    default: return s;
  }
}

function bindText() {
  const $ta = document.getElementById('txArea');
  const $stats = document.getElementById('txStats');
  const history = [];

  function renderStats() {
    const text = $ta.value;
    setMeta('txMeta', text.length + ' 字符 · ' + (text ? text.split('\n').length : 0) + ' 行');
    $stats.innerHTML = statsLine(text).map(([k, v]) => `
      <div class="stat"><span class="sk">${k}</span><span class="sv mono">${v}</span></div>`).join('');
  }

  function pushHistory() {
    history.push($ta.value);
    if (history.length > 50) history.shift();
  }

  function setText(t) {
    pushHistory();
    $ta.value = t;
    renderStats();
    setMsg('txMsg', '');
  }

  const lines = () => $ta.value.split('\n');

  $ta.addEventListener('input', renderStats);

  document.querySelectorAll('[data-case]').forEach((b) => b.addEventListener('click', () => {
    const t = $ta.value;
    if (!t) { setMsg('txMsg', '先输入点文本', 'warn'); return; }
    const map = {
      upper: () => t.toUpperCase(),
      lower: () => t.toLowerCase(),
      title: () => t.replace(/\b([a-zA-Z])([a-zA-Z']*)/g, (m, a, b2) => a.toUpperCase() + b2.toLowerCase()),
      sentence: () => t.replace(/(^\s*[a-zA-Z])|([.!?]\s+[a-zA-Z])/g, (m) => m.toUpperCase()),
      swap: () => [...t].map((c) => (c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase())).join('')
    };
    setText(map[b.dataset.case]());
  }));

  document.querySelectorAll('[data-ns]').forEach((b) => b.addEventListener('click', () => {
    const t = $ta.value;
    if (!t) { setMsg('txMsg', '先输入点文本', 'warn'); return; }
    setText(t.split('\n').map((l) => (l.trim() ? toNamingStyle(l.trim(), b.dataset.ns) : l)).join('\n'));
  }));

  document.querySelectorAll('[data-line]').forEach((b) => b.addEventListener('click', () => {
    const raw = $ta.value;
    if (!raw) { setMsg('txMsg', '先输入点文本', 'warn'); return; }
    const arr = lines();
    let out = arr;
    switch (b.dataset.line) {
      case 'dedup': { const seen = new Set(); out = arr.filter((l) => !seen.has(l) && seen.add(l)); break; }
      case 'sort': out = [...arr].sort((x, y) => x.localeCompare(y, 'zh')); break;
      case 'sortDesc': out = [...arr].sort((x, y) => y.localeCompare(x, 'zh')); break;
      case 'sortNum': out = [...arr].sort((x, y) => (parseFloat(x) || 0) - (parseFloat(y) || 0)); break;
      case 'sortLen': out = [...arr].sort((x, y) => x.length - y.length); break;
      case 'reverse': out = [...arr].reverse(); break;
      case 'shuffle': {
        out = [...arr];
        for (let i = out.length - 1; i > 0; i--) {
          const j = randInt(i + 1);
          [out[i], out[j]] = [out[j], out[i]];
        }
        break;
      }
      case 'trim': out = arr.map((l) => l.trim()); break;
      case 'dropEmpty': out = arr.filter((l) => l.trim()); break;
      case 'number': out = arr.map((l, i) => `${i + 1}. ${l}`); break;
      case 'jsonArr': out = [JSON.stringify(arr, null, 2)]; break;
      case 'quote': out = arr.map((l) => '"' + l.replace(/"/g, '\\"') + '"'); break;
      default: break;
    }
    setText(out.join('\n'));
  }));

  document.getElementById('txAffix').addEventListener('click', () => {
    const pre = document.getElementById('txPre').value;
    const suf = document.getElementById('txSuf').value;
    if (!pre && !suf) { setMsg('txMsg', '前缀和后缀至少填一个', 'warn'); return; }
    if (!$ta.value) { setMsg('txMsg', '先输入点文本', 'warn'); return; }
    setText(lines().map((l) => pre + l + suf).join('\n'));
  });

  document.getElementById('txPaste').addEventListener('click', async () => {
    const t = await window.api.readText();
    if (!t) { setMsg('txMsg', '剪贴板是空的', 'warn'); return; }
    setText(t);
  });
  document.getElementById('txCopy').addEventListener('click', () => {
    if (!$ta.value) { setMsg('txMsg', '没有可复制的内容', 'warn'); return; }
    copy($ta.value);
  });
  document.getElementById('txUndo').addEventListener('click', () => {
    if (!history.length) { setMsg('txMsg', '没有可撤销的步骤', 'warn'); return; }
    $ta.value = history.pop();
    renderStats();
    setMsg('txMsg', '已撤销', 'ok');
  });
  document.getElementById('txClear').addEventListener('click', () => { setText(''); });

  renderStats();
}

/* -------------------------------- 文本对比 ------------------------------- */

function diffLines(a, b, norm) {
  const na = a.map(norm), nb = b.map(norm);
  const n = a.length, m = b.length;
  const w = m + 1;
  const dp = new Uint32Array((n + 1) * w);
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      dp[i * w + j] = na[i] === nb[j]
        ? dp[(i + 1) * w + j + 1] + 1
        : Math.max(dp[(i + 1) * w + j], dp[i * w + j + 1]);
    }
  }
  const ops = [];
  let i = 0, j = 0;
  while (i < n && j < m) {
    if (na[i] === nb[j]) { ops.push({ t: 'same', a: i, b: j }); i++; j++; }
    else if (dp[(i + 1) * w + j] >= dp[i * w + j + 1]) { ops.push({ t: 'del', a: i }); i++; }
    else { ops.push({ t: 'add', b: j }); j++; }
  }
  while (i < n) { ops.push({ t: 'del', a: i++ }); }
  while (j < m) { ops.push({ t: 'add', b: j++ }); }
  return ops;
}

function diffTpl() {
  return `
    <div class="flag-row">
      <label class="flag"><input type="checkbox" id="dfIgnoreCase" /><span>忽略大小写</span></label>
      <label class="flag"><input type="checkbox" id="dfIgnoreWs" /><span>忽略行首尾空白</span></label>
      <label class="flag"><input type="checkbox" id="dfDropEmpty" /><span>忽略空行</span></label>
      <button class="btn" id="dfRun" style="margin-left:auto">开始对比</button>
    </div>
    <div class="tool-row">
      <div class="pane">
        <div class="pane-head"><span>原文本</span><span class="pane-meta" id="dfLeftMeta">0 行</span></div>
        <textarea id="dfLeft" class="ta" style="min-height:180px" spellcheck="false" placeholder="粘贴旧版本…"></textarea>
      </div>
      <div class="pane">
        <div class="pane-head"><span>新文本</span><span class="pane-meta" id="dfRightMeta">0 行</span></div>
        <textarea id="dfRight" class="ta" style="min-height:180px" spellcheck="false" placeholder="粘贴新版本…"></textarea>
      </div>
    </div>
    <div class="btn-row">
      <button class="ghost-btn" id="dfSwap">左右交换</button>
      <button class="ghost-btn" id="dfCopyPatch">复制差异清单</button>
      <button class="ghost-btn" id="dfClear">清空</button>
    </div>
    <div class="msg" id="dfMsg"></div>
    <div class="section-title">对比结果</div>
    <div class="diff-stat" id="dfStat"></div>
    <div class="diff-view" id="dfView"><div class="empty">左右都填上内容，再点「开始对比」</div></div>`;
}

function bindDiff() {
  const $left = document.getElementById('dfLeft');
  const $right = document.getElementById('dfRight');
  const $view = document.getElementById('dfView');
  const $stat = document.getElementById('dfStat');
  const $ic = document.getElementById('dfIgnoreCase');
  const $iw = document.getElementById('dfIgnoreWs');
  const $de = document.getElementById('dfDropEmpty');
  let lastPatch = '';

  function syncMeta() {
    setMeta('dfLeftMeta', ($left.value ? $left.value.split('\n').length : 0) + ' 行');
    setMeta('dfRightMeta', ($right.value ? $right.value.split('\n').length : 0) + ' 行');
  }

  function run() {
    syncMeta();
    let a = $left.value ? $left.value.split('\n') : [];
    let b = $right.value ? $right.value.split('\n') : [];
    if ($iw.checked) { a = a.map((l) => l.trim()); b = b.map((l) => l.trim()); }
    if ($de.checked) { a = a.filter((l) => l); b = b.filter((l) => l); }

    if (!a.length && !b.length) {
      $view.innerHTML = '<div class="empty">两边都是空的</div>';
      $stat.innerHTML = '';
      setMsg('dfMsg', '');
      return;
    }
    if (a.length * b.length > 4000000) {
      $view.innerHTML = '<div class="empty">文本太长了（超过 2000 行 × 2000 行），先拆小一点再对比</div>';
      setMsg('dfMsg', '内容过大，已跳过计算', 'warn');
      return;
    }

    const norm = (s) => ($ic.checked ? s.toLowerCase() : s);
    const ops = diffLines(a, b, norm);

    let add = 0, del = 0, same = 0;
    const patch = [];
    ops.forEach((op) => {
      if (op.t === 'add') { add++; patch.push('+ ' + b[op.b]); }
      else if (op.t === 'del') { del++; patch.push('- ' + a[op.a]); }
      else { same++; patch.push('  ' + a[op.a]); }
    });
    lastPatch = patch.join('\n');

    $stat.innerHTML = `
      <span class="pill add">新增 ${add} 行</span>
      <span class="pill del">删除 ${del} 行</span>
      <span class="pill same">未变 ${same} 行</span>`;

    if (!add && !del) {
      $view.innerHTML = '<div class="empty">两边内容完全一样 ✓</div>';
      setMsg('dfMsg', '');
      return;
    }

    /* 把连续未变的行折叠起来，中间太长就只留首尾 */
    const rows = [];
    let k = 0;
    const MAX_SAME = 4;
    while (k < ops.length) {
      if (ops[k].t === 'same') {
        let e = k;
        while (e < ops.length && ops[e].t === 'same') e++;
        const run = ops.slice(k, e);
        if (run.length <= MAX_SAME * 2) {
          run.forEach((op) => rows.push({ t: 'same', a: op.a, b: op.b }));
        } else {
          run.slice(0, MAX_SAME).forEach((op) => rows.push({ t: 'same', a: op.a, b: op.b }));
          rows.push({ t: 'fold', n: run.length - MAX_SAME * 2 });
          run.slice(-MAX_SAME).forEach((op) => rows.push({ t: 'same', a: op.a, b: op.b }));
        }
        k = e;
      } else {
        rows.push(ops[k]);
        k++;
      }
    }

    $view.innerHTML = rows.map((op) => {
      if (op.t === 'fold') return `<div class="diff-row fold"><span class="cell" style="grid-column:1/-1">⋯ 中间 ${op.n} 行未变 ⋯</span></div>`;
      const aTxt = op.a != null ? a[op.a] : null;
      const bTxt = op.b != null ? b[op.b] : null;
      const cls = op.t === 'add' ? 'add' : op.t === 'del' ? 'del' : '';
      const sign = op.t === 'add' ? '+' : op.t === 'del' ? '−' : ' ';
      return `<div class="diff-row ${cls}">
          <span class="ln">${op.a != null ? op.a + 1 : ''}</span>
          <span class="cell">${op.t === 'add' ? '' : esc(sign + ' ' + aTxt)}</span>
          <span class="ln">${op.b != null ? op.b + 1 : ''}</span>
          <span class="cell">${op.t === 'del' ? '' : esc(op.t === 'add' ? sign + ' ' + bTxt : '  ' + bTxt)}</span>
        </div>`;
    }).join('');

    setMsg('dfMsg', '');
  }

  $left.addEventListener('input', syncMeta);
  $right.addEventListener('input', syncMeta);
  document.getElementById('dfRun').addEventListener('click', run);
  document.getElementById('dfSwap').addEventListener('click', () => {
    const t = $left.value; $left.value = $right.value; $right.value = t;
    run();
  });
  document.getElementById('dfCopyPatch').addEventListener('click', () => {
    if (!lastPatch) { setMsg('dfMsg', '还没对比过', 'warn'); return; }
    copy(lastPatch);
  });
  document.getElementById('dfClear').addEventListener('click', () => {
    $left.value = ''; $right.value = ''; lastPatch = '';
    $view.innerHTML = '<div class="empty">左右都填上内容，再点「开始对比」</div>';
    $stat.innerHTML = ''; syncMeta(); setMsg('dfMsg', '');
  });

  syncMeta();
}

/* ------------------------------ 图片压缩模块 ----------------------------- */

function dataURLBytes(durl) {
  const i = String(durl).indexOf(',');
  const b64 = i >= 0 ? durl.slice(i + 1) : '';
  const pad = b64.endsWith('==') ? 2 : b64.endsWith('=') ? 1 : 0;
  return Math.max(0, Math.floor(b64.length * 3 / 4) - pad);
}

function fmtSize(n) {
  if (n == null || isNaN(n)) return '—';
  if (n < 1024) return n + ' B';
  if (n < 1024 * 1024) return (n / 1024).toFixed(1) + ' KB';
  return (n / 1024 / 1024).toFixed(2) + ' MB';
}

/* 优先用 createImageBitmap，解不开再退回 <img> */
async function decodeImage(file) {
  if (typeof createImageBitmap === 'function') {
    try { return await createImageBitmap(file); } catch (_) { /* 回退 */ }
  }
  return await new Promise((res, rej) => {
    const url = URL.createObjectURL(file);
    const im = new Image();
    im.onload = () => { URL.revokeObjectURL(url); res(im); };
    im.onerror = () => { URL.revokeObjectURL(url); rej(new Error('无法解码')); };
    im.src = url;
  });
}

function imgTpl() {
  return `
    <div class="drop-zone" id="imgDrop">
      <div class="drop-icon">${I.image}</div>
      <div class="drop-main">把图片拖到这里，或 <button class="link-btn" id="imgPick">选择文件</button></div>
      <div class="drop-sub">支持 PNG / JPG / WebP / GIF / BMP，可多选；全部在本机处理，不会上传</div>
      <input type="file" id="imgFile" accept="image/*" multiple hidden />
    </div>
    <div class="btn-row">
      <span class="ctrl-label">输出格式</span>
      <select id="imgFmt" class="sel">
        <option value="image/jpeg">JPG · 体积最小</option>
        <option value="image/webp">WebP · 兼顾质量与体积</option>
        <option value="image/png">PNG · 无损</option>
      </select>
      <span class="ctrl-label">质量</span>
      <input type="range" id="imgQ" class="range" min="10" max="100" step="5" value="80" />
      <span class="mono ctrl-val" id="imgQVal">80</span>
      <span class="ctrl-label">最大边</span>
      <select id="imgMax" class="sel">
        <option value="0">不限制</option>
        <option value="2560">2560 px</option>
        <option value="1920" selected>1920 px</option>
        <option value="1280">1280 px</option>
        <option value="960">960 px</option>
      </select>
      <button class="ghost-btn" id="imgReload">按当前设置重压</button>
      <button class="btn" id="imgSaveAll">全部导出</button>
      <button class="ghost-btn" id="imgClear">清空</button>
    </div>
    <div class="msg" id="imgMsg"></div>
    <div class="section-title">压缩清单</div>
    <div class="img-list" id="imgList"><div class="empty">还没有图片</div></div>`;
}

function bindImg() {
  const $drop = document.getElementById('imgDrop');
  const $file = document.getElementById('imgFile');
  const $list = document.getElementById('imgList');
  const $fmt = document.getElementById('imgFmt');
  const $q = document.getElementById('imgQ');
  const $qVal = document.getElementById('imgQVal');
  const $max = document.getElementById('imgMax');

  let jobs = [];
  let seq = 0;
  window.__viewCleanup = () => { jobs = []; };

  function extOf(mime) {
    return mime === 'image/png' ? 'png' : mime === 'image/webp' ? 'webp' : 'jpg';
  }

  function renderList() {
    if (!jobs.length) { $list.innerHTML = '<div class="empty">还没有图片</div>'; return; }
    $list.innerHTML = jobs.map((j) => {
      const ratio = j.origSize ? Math.round((1 - j.outSize / j.origSize) * 100) : 0;
      const cls = ratio >= 0 ? 'good' : 'bad';
      const label = ratio >= 0 ? `减小 ${ratio}%` : `反而大 ${-ratio}%`;
      return `<div class="img-item">
          <div class="img-thumb"><img src="${j.outURL}" alt="" /></div>
          <div class="img-info">
            <div class="img-name" title="${esc(j.name)}">${esc(j.name)}</div>
            <div class="img-sizes">
              <span class="mono">${j.w}×${j.h}</span>
              <span class="arrow">→</span>
              <span class="mono">${j.outW}×${j.outH}</span>
              <span class="dot">·</span>
              <span class="mono">${fmtSize(j.origSize)} → ${fmtSize(j.outSize)}</span>
              <span class="badge ${cls}">${label}</span>
            </div>
            <div class="img-acts">
              <button class="mini-btn" data-save="${j.id}">保存这张</button>
              <button class="mini-btn" data-drop="${j.id}">移除</button>
            </div>
          </div>
        </div>`;
    }).join('');

    $list.querySelectorAll('[data-save]').forEach((b) => b.addEventListener('click', async () => {
      const j = jobs.find((x) => x.id === +b.dataset.save);
      if (!j) return;
      const name = j.name.replace(/\.[^.]+$/, '') + '.' + j.ext;
      const r = await window.api.saveImage(j.outURL, name);
      if (r && r.ok) setMsg('imgMsg', '已保存到 ' + r.path, 'ok');
      else if (r && !r.canceled) setMsg('imgMsg', '保存失败：' + (r.error || '未知错误'), 'err');
    }));
    $list.querySelectorAll('[data-drop]').forEach((b) => b.addEventListener('click', () => {
      jobs = jobs.filter((x) => x.id !== +b.dataset.drop);
      renderList();
    }));
  }

  async function compressAll() {
    const mime = $fmt.value;
    const quality = +$q.value / 100;
    const maxEdge = +$max.value;

    for (const j of jobs) {
      const src = j.src;
      let tw = src.width, th = src.height;
      if (maxEdge > 0 && Math.max(tw, th) > maxEdge) {
        const k = maxEdge / Math.max(tw, th);
        tw = Math.max(1, Math.round(tw * k));
        th = Math.max(1, Math.round(th * k));
      }
      const cv = document.createElement('canvas');
      cv.width = tw; cv.height = th;
      const ctx = cv.getContext('2d');
      // JPG 没有透明通道，透明区域要先铺白，否则会变黑
      if (mime === 'image/jpeg') { ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, tw, th); }
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(src, 0, 0, tw, th);

      const outURL = cv.toDataURL(mime, quality);
      j.outURL = outURL;
      j.outSize = dataURLBytes(outURL);
      j.outW = tw; j.outH = th;
      j.ext = extOf(mime);
    }

    renderList();
    if (jobs.length) {
      const saved = jobs.reduce((s, j) => s + Math.max(0, j.origSize - j.outSize), 0);
      setMsg('imgMsg', `已处理 ${jobs.length} 张，合计节省约 ${fmtSize(saved)}`, 'ok');
    } else {
      setMsg('imgMsg', '');
    }
  }

  async function addFiles(fileList) {
    const imgs = [...fileList].filter((f) => /^image\//.test(f.type) || /\.(png|jpe?g|webp|gif|bmp)$/i.test(f.name));
    if (!imgs.length) { setMsg('imgMsg', '没找到可识别的图片', 'warn'); return; }
    setMsg('imgMsg', `正在读取 ${imgs.length} 张图片…`);
    for (const f of imgs) {
      try {
        const bmp = await decodeImage(f);
        jobs.push({ id: ++seq, name: f.name, origSize: f.size, w: bmp.width, h: bmp.height, src: bmp });
      } catch (_) { /* 解不开的跳过 */ }
    }
    await compressAll();
  }

  $q.addEventListener('input', () => { $qVal.textContent = $q.value; });
  $fmt.addEventListener('change', compressAll);
  $max.addEventListener('change', compressAll);
  $q.addEventListener('change', compressAll);
  document.getElementById('imgReload').addEventListener('click', compressAll);

  document.getElementById('imgPick').addEventListener('click', () => $file.click());
  $file.addEventListener('change', () => {
    if ($file.files.length) addFiles($file.files);
    $file.value = '';
  });

  ['dragenter', 'dragover'].forEach((ev) => $drop.addEventListener(ev, (e) => {
    e.preventDefault(); $drop.classList.add('over');
  }));
  ['dragleave', 'drop'].forEach((ev) => $drop.addEventListener(ev, () => $drop.classList.remove('over')));
  $drop.addEventListener('drop', (e) => {
    e.preventDefault();
    if (e.dataTransfer && e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
  });

  document.getElementById('imgSaveAll').addEventListener('click', async () => {
    if (!jobs.length) { setMsg('imgMsg', '还没有可导出的图片', 'warn'); return; }
    const items = jobs.map((j) => ({ name: j.name.replace(/\.[^.]+$/, '') + '.' + j.ext, dataURL: j.outURL }));
    const r = await window.api.saveBatch(items);
    if (r && r.ok) setMsg('imgMsg', `已导出 ${r.count} 张到 ${r.dir}` + (r.failed && r.failed.length ? `（${r.failed.length} 张失败）` : ''), 'ok');
    else if (r && !r.canceled) setMsg('imgMsg', '导出失败：' + (r.error || '未知错误'), 'err');
  });

  document.getElementById('imgClear').addEventListener('click', () => {
    jobs = []; renderList(); setMsg('imgMsg', '');
  });

  renderList();
}

/* --------------------------------- 取色流程 -------------------------------- */

function setPicking(on) {
  const btn = document.getElementById('pickBtn');
  if (!btn) return;
  btn.disabled = on;
  btn.querySelector('span').textContent = on ? '正在取色…' : '吸取屏幕颜色';
}

async function doPick() {
  setPicking(true);
  try {
    const res = await window.api.startPicker();
    if (!res || !res.ok) {
      setPicking(false);
      toast((res && res.error) || '取色失败，请重试');
    }
  } catch (err) {
    setPicking(false);
    toast('取色失败：' + err.message);
  }
}

function applyColor(data) {
  const r = clamp255(data.r), g = clamp255(data.g), b = clamp255(data.b);
  const hex = rgbToHex(r, g, b);
  current = { r, g, b, hex, hsl: rgbToHsl(r, g, b) };

  // 更新色块
  const sw = document.getElementById('swatch');
  if (sw) {
    sw.style.background = hex;
    const span = sw.querySelector('span');
    if (span) { span.textContent = hex; span.style.color = readableText(r, g, b); }
  }
  // 更新色值行
  const vals = document.getElementById('values');
  if (vals) {
    vals.innerHTML =
      valueRow('HEX', hex, true) +
      valueRow('RGB', `${r}, ${g}, ${b}`, true) +
      valueRow('HSL', `${current.hsl.h}, ${current.hsl.s}%, ${current.hsl.l}%`, true) +
      valueRow('CSS', `color: ${hex.toLowerCase()};`, true);
    bindCopy(vals);
  }

  // 写入色板（去重，最新的放前面）
  palette = [hex, ...palette.filter((c) => c !== hex)].slice(0, 30);
  savePalette();
  renderPalette();
}

async function copy(text) {
  if (!text || text === '—') return;
  await window.api.copyText(text);
  toast('已复制 ' + text);
}

function bindCopy(scope) {
  scope.querySelectorAll('[data-copy]').forEach((el) => {
    const val = el.dataset.copy;
    if (!val) return;
    el.addEventListener('click', () => copy(val));
  });
}

function bindPicker() {
  const btn = document.getElementById('pickBtn');
  btn.addEventListener('click', doPick);
  bindCopy(document.getElementById('values'));
  renderPalette();

  document.getElementById('clearPalette').addEventListener('click', () => {
    palette = []; savePalette(); renderPalette(); toast('色板已清空');
  });
  document.getElementById('copyAll').addEventListener('click', () => {
    if (palette.length === 0) return toast('色板是空的');
    copy(palette.join('\n'));
  });
}

/* ---------------------------------- 启动 ---------------------------------- */

window.api.onPickerResult((data) => {
  setPicking(false);
  if (data && typeof data.r === 'number') applyColor(data);
});

window.api.onPickerCancel(() => setPicking(false));

/* 把文件拖到窗口空白处时，Electron 默认会直接打开它，这里统一拦掉 */
['dragover', 'drop'].forEach((ev) => window.addEventListener(ev, (e) => e.preventDefault()));

selectModule('picker');
