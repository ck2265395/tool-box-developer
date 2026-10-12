/* 纯逻辑自测：把 app.js 里的算法抠出来在 Node 里跑一遍 */
const fs = require('fs');

/* ---------- 1. 二维码矩阵 ---------- */
(0, eval)(fs.readFileSync(__dirname + '/../src/renderer/vendor/qrcode.js', 'utf8'));
console.log('qrcode 全局可用:', typeof qrcode === 'function');

qrcode.stringToBytes = qrcode.stringToBytesFuncs['UTF-8'];
const qr = qrcode(0, 'M');
qr.addData('东土百宝箱 https://www.workbuddy.cn');
qr.make();
const n = qr.getModuleCount();
let dark = 0;
for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (qr.isDark(r, c)) dark++;
console.log(`QR 模块数: ${n}x${n}, 暗块: ${dark} (${Math.round(dark / (n * n) * 100)}%)`);

/* 三种长度的内容都要能自动选版本 */
[['a', '短'], ['中文测试内容' + 'x'.repeat(50), '中'], ['https://example.com/' + 'p'.repeat(200), '长']].forEach(([t, label]) => {
  const q = qrcode(0, 'M'); q.addData(t); q.make();
  console.log(`  ${label}内容 -> 版本 ${q.getModuleCount()}x${q.getModuleCount()}`);
});

/* ---------- 2. Base64（UTF-8 安全） ---------- */
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
const samples = ['Hello World', '东土百宝箱', '中文 + emoji 🐕🚀', '', 'a'.repeat(120)];
samples.forEach((s) => {
  const e = b64Encode(s, false, false);
  const back = b64Decode(e);
  const ok = back === s;
  console.log(`Base64 ${JSON.stringify(s.slice(0, 14))} -> ${e.slice(0, 24)}${e.length > 24 ? '…' : ''} 往返${ok ? 'OK' : '失败!'}`);
});
console.log('Base64 无 BOM 纯 ASCII 对照:', b64Encode('Hello', false, false) === 'SGVsbG8=');

/* ---------- 3. 时间戳 ---------- */
function parseDateStr(s) {
  s = String(s).trim();
  const m = /^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})(?:[ T](\d{1,2}):(\d{1,2})(?::(\d{1,2}))?)?$/.exec(s);
  if (m) {
    const d = new Date(+m[1], +m[2] - 1, +m[3], +(m[4] || 0), +(m[5] || 0), +(m[6] || 0));
    return isNaN(d.getTime()) ? null : d;
  }
  const d = new Date(s);
  return isNaN(d.getTime()) ? null : d;
}
[['2026-10-12 11:39:50', '标准'], ['2026/10/12', '斜杠'], ['2026-10-12T03:39:50Z', 'ISO'], ['瞎写的内容', '非法']].forEach(([s, label]) => {
  const d = parseDateStr(s);
  console.log(`日期解析 ${label}: ${s} -> ${d ? d.toISOString() + ' | 秒=' + Math.floor(d.getTime() / 1000) : 'null'}`);
});
/* 秒/毫秒识别 */
[1730000000, 1730000000000].forEach((v) => {
  const raw = String(v);
  const isMs = raw.replace('-', '').length >= 12;
  console.log(`时间戳 ${raw} -> 识别为${isMs ? '毫秒' : '秒'}, 日期 ${new Date(isMs ? v : v * 1000).toISOString()}`);
});

/* ---------- 4. JSON 报错定位（与 app.js 保持一致） ---------- */
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
function posInfo(p, text) {
  const before = text.slice(0, Math.max(0, Math.min(p, text.length)));
  const lines = before.split('\n');
  return `第 ${lines.length} 行第 ${lines[lines.length - 1].length + 1} 列：`;
}
function jsonErrText(err, text) {
  const raw = String((err && err.message) || err);
  const plain = jsonMsgCN(raw.replace(/\s*at position \d+.*$/i, '').replace(/\s*in JSON$/i, ''));
  const pm = /at position (\d+)/i.exec(raw);
  if (pm) return posInfo(+pm[1], text) + plain;
  const tm = /Unexpected token '?([\s\S])'?/.exec(raw);
  const fm = /\s(\.\.\.)?"([\s\S]*)"\s+is not valid JSON/.exec(raw);
  if (fm) {
    const truncated = !!fm[1];
    const frag = fm[2];
    const start = text.indexOf(frag);
    if (start >= 0) {
      let off = null;
      if (truncated) off = Math.min(10, frag.length - 1);
      else if (tm) off = frag.lastIndexOf(tm[1]);
      if (off == null || off < 0) off = 0;
      return posInfo(start + off, text) + (tm ? `这里有个多余的 '${tm[1]}'` : plain);
    }
  }
  return '解析失败：' + plain;
}
const jsonCases = [
  ['{\n  "a": 1,\n  "b": ,\n}', '多余逗号（第 3 行）'],
  ['{"a": 1', '缺右括号'],
  ['{a: 1}', 'key 没引号'],
  ['[1, 2,]', '数组尾逗号'],
  ['{"a": 1}extra', '尾部多余内容'],
  ['{"a": tru}', '非法字面量'],
  ['{"a": 1,\n"b": 2,\n"c": [1,2,]}', '嵌套数组尾逗号']
];
jsonCases.forEach(([t, label]) => {
  try { JSON.parse(t); console.log(`JSON ${label}: 居然通过了!`); }
  catch (e) { console.log(`JSON ${label}: ${jsonErrText(e, t)}`); }
});
try { JSON.parse('{"a": 1}'); console.log('JSON 正常解析: OK'); } catch (e) { console.log('JSON 正常解析失败!'); }

/* ---------- 5. 正则收集（含零宽匹配防死循环） ---------- */
function collectMatches(re, text, limit) {
  const out = [];
  if (!re.global) { const m = re.exec(text); if (m) out.push(m); return out; }
  let m;
  while ((m = re.exec(text)) !== null) {
    out.push(m);
    if (m[0] === '') re.lastIndex++;
    if (out.length >= (limit || 2000)) break;
  }
  return out;
}
const t = '2026-10-12 和 2027-01-05 是日期';
const ms = collectMatches(/(\d{4})-(\d{2})-(\d{2})/g, t);
console.log(`正则匹配: 找到 ${ms.length} 处 ->`, ms.map((m) => m[0] + '(' + m.index + ')').join(', '));
const zero = collectMatches(/(?=(\d))/g, 'ab1cd2');
console.log(`零宽匹配: ${zero.length} 处（不死循环）`, zero.map((m) => m.index).join(','));
const noG = collectMatches(/\d+/g, 'a1b2c3');
console.log(`全局匹配数字: ${noG.length} 处`, noG.map((m) => m[0]).join(','));
