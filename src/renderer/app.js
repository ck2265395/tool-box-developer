/* ---------------------------------- 图标 ---------------------------------- */
const I = {
  picker: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m2 22 1-1h3l9-9"/><path d="M3 21v-3l9-9"/><path d="m15 6 3.4-3.4a2.1 2.1 0 1 1 3 3L18 9l.9.9a2.1 2.1 0 1 1-3 3l-2-2-6.5 6.5a2 2 0 0 1-2.8 0l-.1-.1a2 2 0 0 1 0-2.8L11.9 8l-2-2a2.1 2.1 0 1 1 3-3L15 6Z"/></svg>',
  qr: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3zM19 19h2v2h-2z" stroke-linecap="round"/></svg>',
  json: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H7a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2 2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h1"/><path d="M16 3h1a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2 2 2 0 0 0-2 2v4a2 2 0 0 1-2 2h-1"/></svg>',
  ts: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  base64: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m9 8-4 4 4 4M15 8l4 4-4 4"/></svg>',
  regex: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v8M8 8h8"/><circle cx="6" cy="18" r="2"/><circle cx="17" cy="17.5" r="1.5"/><path d="M4 12h4"/></svg>',
  image: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>'
};

const MODULES = [
  { id: 'picker', name: 'CSS 取色器', desc: '从屏幕任意位置吸取颜色，自动生成 CSS 色值', icon: I.picker, ready: true },
  { id: 'json', name: 'JSON 格式化', desc: '美化 / 压缩 / 转义，出错直接告诉你第几行第几列', icon: I.json, ready: true },
  { id: 'regex', name: '正则测试', desc: '实时高亮匹配、查看捕获分组、替换预览', icon: I.regex, ready: true },
  { id: 'b64', name: 'Base64 编解码', desc: '文本与 Base64 互转，中文不乱码', icon: I.base64, ready: true },
  { id: 'ts', name: '时间戳转换', desc: 'Unix 时间戳与日期时间互转', icon: I.ts, ready: true },
  { id: 'qr', name: '二维码生成', desc: '文本转二维码，可存成 PNG', icon: I.qr, ready: true },
  { id: 'img', name: '图片压缩', desc: '本地压缩图片体积', icon: I.image, ready: false }
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
  json: () => [jsonTpl(), bindJson],
  regex: () => [regexTpl(), bindRegex],
  b64: () => [b64Tpl(), bindB64],
  ts: () => [tsTpl(), bindTs],
  qr: () => [qrTpl(), bindQr]
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
        <div class="sm">
          这个模块还在路上。<br />
          已经能用的是取色器、JSON、正则、Base64、时间戳和二维码。
        </div>
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

selectModule('picker');
