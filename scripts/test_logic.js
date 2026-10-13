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

/* ==========================================================================
   以下为 v1.1.0 新增模块的算法自测
   ========================================================================== */

/* ---------- 6. app.js 语法自检 ---------- */
try {
  new Function(fs.readFileSync(__dirname + '/../src/renderer/app.js', 'utf8'));
  console.log('app.js 语法检查: OK');
} catch (e) {
  console.log('app.js 语法错误:', e.message);
  process.exitCode = 1;
}

/* ---------- 7. MD5（与 Node 内置 crypto 对拍） ---------- */
const nodeCrypto = require('crypto');

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

/* RFC 1321 官方测试向量 */
const md5Vectors = [
  ['', 'd41d8cd98f00b204e9800998ecf8427e'],
  ['a', '0cc175b9c0f1b6a831c399e269772661'],
  ['abc', '900150983cd24fb0d6963f7d28e17f72'],
  ['message digest', 'f96b697d7cb7938d525a2f31aaf161d0'],
  ['abcdefghijklmnopqrstuvwxyz', 'c3fcd3d76192e4007dfb496cca67e13b'],
  ['ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', 'd174ab98d277d9f5a5611c2c9f419d9f'],
  ['12345678901234567890123456789012345678901234567890123456789012345678901234567890', '57edf4a22be3c955ac49da2e2107b67a']
];
let md5bad = 0;
md5Vectors.forEach(([input, want]) => {
  const got = md5Bytes(new TextEncoder().encode(input));
  const ok = got === want;
  if (!ok) md5bad++;
  console.log(`MD5 RFC向量 ${JSON.stringify(input.slice(0, 18))}${input.length > 18 ? '…' : ''} -> ${got} ${ok ? 'OK' : '期望 ' + want}`);
});

/* 各种长度（含 55/56/57/63/64/65 补齐边界）与随机内容，跟 Node 内置对拍 */
let md5fails = 0;
for (let len = 0; len <= 200; len++) {
  const bytes = new Uint8Array(len);
  nodeCrypto.randomFillSync(bytes);
  const got = md5Bytes(bytes);
  const want = nodeCrypto.createHash('md5').update(Buffer.from(bytes)).digest('hex');
  if (got !== want) { md5fails++; if (md5fails < 4) console.log(`  MD5 长度 ${len} 不一致: ${got} != ${want}`); }
}
console.log(`MD5 与 Node crypto 对拍 0~200 字节: ${md5fails === 0 ? '全部一致 OK' : md5fails + ' 个不一致'}`);
if (md5bad || md5fails) process.exitCode = 1;

/* ---------- 8. SHA-1/256/512（WebCrypto = Node webcrypto） ---------- */
async function shaHex(algo, bytes) {
  const buf = await nodeCrypto.webcrypto.subtle.digest(algo, bytes);
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}
(async () => {
  const known = [
    ['SHA-1', 'abc', 'a9993e364706816aba3e25717850c26c9cd0d89d'],
    ['SHA-256', 'abc', 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad'],
    ['SHA-512', 'abc', 'ddaf35a193617abacc417349ae20413112e6fa4e89a97ea20a9eeee64b55d39a2192992a274fc1a836ba3c23a3feebbd454d4423643ce80e2a9ac94fa54ca49f']
  ];
  for (const [algo, input, want] of known) {
    const got = await shaHex(algo, new TextEncoder().encode(input));
    console.log(`${algo}("abc") -> ${got.slice(0, 32)}… ${got === want ? 'OK' : '不符!'}`);
    if (got !== want) process.exitCode = 1;
  }

  /* ---------- 9. 颜色互转往返 ----------
     HSL/HSV/CMYK 只保留整数百分比，往返必然有少量舍入误差，
     容差取 4（单通道），超过才算 bug。 */
  const TOL = 4;
  let colorBad = 0;
  for (let i = 0; i < 3000; i++) {
    const r = (i * 37) % 256, g = (i * 91 + 17) % 256, b = (i * 53 + 200) % 256;

    const hsl = rgbToHsl(r, g, b);
    const back1 = hslToRgb(hsl.h, hsl.s, hsl.l);
    if (Math.abs(back1.r - r) > TOL || Math.abs(back1.g - g) > TOL || Math.abs(back1.b - b) > TOL) {
      colorBad++; if (colorBad < 4) console.log(`  HSL 往返偏差: rgb(${r},${g},${b}) -> ${JSON.stringify(back1)}`);
    }

    const hsv = rgbToHsv(r, g, b);
    const back2 = hsvToRgb(hsv.h, hsv.s, hsv.v);
    if (Math.abs(back2.r - r) > TOL || Math.abs(back2.g - g) > TOL || Math.abs(back2.b - b) > TOL) {
      colorBad++; if (colorBad < 4) console.log(`  HSV 往返偏差: rgb(${r},${g},${b}) -> ${JSON.stringify(back2)}`);
    }

    const cmyk = rgbToCmyk(r, g, b);
    const back3 = cmykToRgb(cmyk.c, cmyk.m, cmyk.y, cmyk.k);
    if (Math.abs(back3.r - r) > TOL || Math.abs(back3.g - g) > TOL || Math.abs(back3.b - b) > TOL) {
      colorBad++; if (colorBad < 4) console.log(`  CMYK 往返偏差: rgb(${r},${g},${b}) -> ${JSON.stringify(back3)}`);
    }

    /* HEX 是精确的，必须完全一致 */
    const hx = rgbToHex(r, g, b);
    const back4 = hexToRgb(hx);
    if (back4.r !== r || back4.g !== g || back4.b !== b) { colorBad++; console.log(`  HEX 往返失败: ${hx}`); }
  }
  console.log(`颜色互转往返 3000 组（容差 ${TOL}）: ${colorBad === 0 ? '全部通过 OK' : colorBad + ' 处超差'}`);
  if (colorBad) process.exitCode = 1;

  console.log('对比度 黑/白:', contrastRatio(hexToRgb('#000000'), hexToRgb('#ffffff')).toFixed(2), '(应为 21.00)');
  console.log('对比度 白/白:', contrastRatio(hexToRgb('#ffffff'), hexToRgb('#ffffff')).toFixed(2), '(应为 1.00)');

  /* 宽松解析 */
  [['#5B8CFF', 'hex6'], ['#abc', 'hex3'], ['5B8CFF', '无井号'], ['rgb(91, 140, 255)', 'rgb'],
    ['hsl(220, 100%, 68%)', 'hsl'], ['hsv(220, 64%, 100%)', 'hsv'],
    ['cmyk(64%, 45%, 0%, 0%)', 'cmyk'], ['乱七八糟', '非法']].forEach(([s, label]) => {
    const c = parseColorInput(s);
    console.log(`颜色解析 ${label.padEnd(6)} ${s.padEnd(22)} -> ${c ? rgbToHex(c.r, c.g, c.b) : 'null'}`);
  });
  if (!parseColorInput('乱七八糟')) console.log('颜色解析非法输入正确返回 null: OK');

  /* ---------- 10. 命名风格与文本处理 ---------- */
  const naming = [
    ['hello world', 'camel', 'helloWorld'],
    ['hello world', 'pascal', 'HelloWorld'],
    ['HelloWorld', 'snake', 'hello_world'],
    ['hello-world', 'camel', 'helloWorld'],
    ['hello_world', 'kebab', 'hello-kebab'.replace('kebab', 'world')],
    ['HTTPServer', 'snake', 'http_server'],
    ['user name', 'const', 'USER_NAME'],
    ['some-file_name Here', 'kebab', 'some-file-name-here']
  ];
  let namingBad = 0;
  naming.forEach(([input, style, want]) => {
    const got = toNamingStyle(input, style);
    const ok = got === want;
    if (!ok) namingBad++;
    console.log(`命名 ${style.padEnd(6)} ${input.padEnd(20)} -> ${got.padEnd(22)} ${ok ? 'OK' : '期望 ' + want}`);
  });
  if (namingBad) process.exitCode = 1;

  const cnt = statsLine('Hello 世界\n第二行\n\nfoo bar');
  console.log('文本统计:', cnt.map(([k, v]) => k + '=' + v).join(' '));

  /* ---------- 11. 逐行 diff ---------- */
  const dl = (a, b) => diffLines(a, b, (s) => s);
  const d1 = dl(['a', 'b', 'c'], ['a', 'x', 'c']);
  console.log('diff 简单替换:', d1.map((o) => o.t).join(','));
  const d2 = dl(['same', 'old', 'same2'], ['same', 'same2', 'new']);
  console.log('diff 混合:', d2.map((o) => o.t).join(','));
  const d3 = dl([], ['a', 'b']);
  console.log('diff 全新增:', d3.map((o) => o.t).join(','));
  const d4 = dl(['a', 'b'], ['a', 'b']);
  console.log('diff 完全相同:', d4.every((o) => o.t === 'same') ? 'OK' : '错误!');

  /* ---------- 12. Base64URL 与 JWT ---------- */
  const payload = { sub: '1234567890', name: '东土百宝箱', iat: 1700000000, exp: 1900000000 };
  const jwtSeg = Buffer.from(JSON.stringify(payload), 'utf8').toString('base64url');
  console.log('测试 JWT 载荷段:', jwtSeg.slice(0, 40) + '…');
  const decoded = b64urlDecode(jwtSeg);
  console.log('base64url 解码(含中文):', decoded);
  try {
    const obj = JSON.parse(decoded);
    const ok = obj.name === payload.name && obj.sub === payload.sub;
    console.log('  -> name =', obj.name, ok ? '| 中文往返 OK' : '| 中文乱码!');
    if (!ok) process.exitCode = 1;
  } catch (e) { console.log('  -> 解析失败!'); process.exitCode = 1; }

  /* 补位边界 */
  ['QQ', 'QUI', 'QUJD', 'QUJDRA'].forEach((s) => {
    console.log(`  base64url "${s}" -> ${JSON.stringify(b64urlDecode(s))}`);
  });

  /* ---------- 13. 生成器与体积换算 ---------- */
  const uuidRe = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
  let uuidBad = 0;
  for (let i = 0; i < 500; i++) if (!uuidRe.test(uuidV4())) uuidBad++;
  console.log(`UUID v4 格式 500 次: ${uuidBad === 0 ? '全部合规 OK' : uuidBad + ' 个不合规'}`);
  if (uuidBad) process.exitCode = 1;

  const seen = new Set();
  for (let i = 0; i < 5000; i++) seen.add(uuidV4());
  console.log('UUID v4 唯一性 5000 次:', seen.size === 5000 ? '无重复 OK' : `重复了 ${5000 - seen.size} 个`);

  let rangeBad = 0;
  for (let i = 0; i < 20000; i++) { const v = randInt(10); if (v < 0 || v > 9) rangeBad++; }
  console.log(`randInt(10) 取值范围 20000 次: ${rangeBad === 0 ? '全部在 0~9 OK' : rangeBad + ' 个越界'}`);

  const ambi = '0OoIl1|`\'"';
  const set = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{};:,.?/~';
  const filtered = [...set].filter((c) => !ambi.includes(c)).join('');
  console.log(`排除易混淆后字符集: ${set.length} -> ${filtered.length} 个`);

  const b64s = (s) => Buffer.from(s).toString('base64');
  const d1u = 'data:image/png;base64,' + b64s('hello');
  console.log('dataURL 体积换算:', dataURLBytes(d1u), '(应为 5)');
  console.log('体积格式化:', [0, 512, 2048, 1048576, 5347737].map(fmtSize).join(' / '));

  console.log('\n=== 全部新增模块自测结束 ===');
})().catch((e) => { console.log('自测异常:', e); process.exitCode = 1; });

/* ==========================================================================
   下面这些是从 app.js 原样搬过来的纯函数（浏览器侧不依赖 DOM 的部分）
   ========================================================================== */

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

function luminance(r, g, b) {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}

function contrastRatio(c1, c2) {
  const a = luminance(c1.r, c1.g, c1.b), b = luminance(c2.r, c2.g, c2.b);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
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

function b64urlDecode(str) {
  let s = String(str).replace(/-/g, '+').replace(/_/g, '/');
  while (s.length % 4) s += '=';
  const bin = atob(s);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new TextDecoder('utf-8', { fatal: false }).decode(bytes);
}

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
