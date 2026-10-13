# 东土百宝箱 DongtuBox

一个 Windows 桌面多模块工具面板（Electron），内置 13 个可用模块，全部本地运行、不联网。

## 功能

### CSS 取色器
- 点击「吸取屏幕颜色」进入全屏取色模式
- 鼠标移动即可实时取色，带 **15×15 像素放大镜**（含像素网格与中心高亮框）与全屏十字线
- 放大镜实时显示当前颜色的 HEX 值
- 单击确认后回填主面板，自动生成：
  - `HEX`（如 `#5B8CFF`）
  - `RGB`（如 `91, 140, 255`）
  - `HSL`（如 `220, 100%, 68%`）
  - `CSS`（如 `color: #5b8cff;`）
- 每个色值可一键复制
- **历史色板**：每次取色自动入板（最多 30 个，自动去重），点击色块复制，支持清空 / 复制全部
- 按 `Esc` 或右键可随时取消取色

### JSON 格式化
- 格式化（2 / 4 空格缩进）、压缩成一行（显示省了多少字符）
- 转义为 JSON 字符串字面量、去转义
- **报错精确定位**：不是丢一句英文报错，而是「第 3 行第 8 列：这里有个多余的 ','」
- 读剪贴板 / 复制结果 / 存成 .json 文件

### 正则测试
- 实时高亮全部匹配，勾选 g i m s u 开关
- 匹配明细：序号、字符位置区间、命中内容、各捕获分组
- 替换预览（支持 `$1 $2` 反向引用）
- 零宽匹配（如 `(?=x)`）做了防死循环处理

### Base64 编解码
- 文本 ⇄ Base64 双向转换，走 TextEncoder/TextDecoder，**中文与 emoji 不乱码**
- 可选 URL 安全模式（`+ /` 换成 `- _`）、每 76 字符换行
- 左右交换、读剪贴板、一键复制

### 时间戳转换
- 顶部实时显示当前时间戳（秒 / 毫秒可切）
- 时间戳 → 日期：自动识别 10 位（秒）与 13 位（毫秒），输出本地时间、UTC、ISO 8601、相对现在
- 日期 → 时间戳：支持 `2026-10-12 11:39:50`、`2026/10/12`、ISO 等写法
- 快捷「填当前」「填今天 0 点」

### 二维码生成
- 文本转二维码，尺寸 128–640 可调，纠错等级 L/M/Q/H
- 纯 canvas 绘制（整数倍缩放，边缘不糊），保存 PNG 到本地
- 中文按 UTF-8 编码进矩阵，扫码不会乱码

### 图片压缩
- 拖拽或选择文件批量导入（PNG / JPG / WebP / GIF / BMP）
- 输出格式可切 JPG / WebP / PNG，质量 10–100 可调，最大边可选 960 / 1280 / 1920 / 2560 / 不限制
- 列表里直接对比「压缩前 → 压缩后」的尺寸与体积，并标出省了多少百分比
- 单张保存，或「全部导出」一次性铺进同一个文件夹（同名自动加序号，不覆盖）
- 全程 canvas 本地处理，图片不上传

### 颜色格式互转
- 输入 HEX / rgb() / hsl() / hsv() / cmyk() 任意一种，自动识别并列出全部格式
- 实时色块预览 + 明暗色阶（±10% ~ ±40% 共 9 档，点击即复制）
- WCAG 对比度检查：给一个背景色，直接告诉你正文 AA(4.5) / 大号 AA(3) / AAA(7) 通不通过
- 「复制全部格式」一把导出五种写法

### JWT 解析
- 粘贴 Token 自动拆出 Header 与 Payload，格式化展示（签名不校签、原样保留）
- 自动把 `iat` / `nbf` / `exp` 换算成本地时间，并判断是否已过期 / 还未生效
- 顶部直接给结论：Token 在有效期内 / 已过期 / 载荷里没有 exp
- 支持自动剥掉 `Bearer ` 前缀，中文声明不乱码

### 哈希校验
- 文本与文件都能算：**MD5 / SHA-1 / SHA-256 / SHA-512**
- 文本边打边算（防抖），文件拖进来即算，显示文件名与体积
- MD5 为纯 JS 实现（浏览器 WebCrypto 不含 MD5），已用 RFC 1321 官方测试向量 + 与 Node `crypto` 对拍 0–200 字节全量校验
- SHA 系列走 WebCrypto，结果点击即复制

### 密码与 UUID
- 强密码：长度 6–64，大写/小写/数字/符号四类可勾，可排除易混淆字符（`0OoIl1|` 等）
- 随机源用 `crypto.getRandomValues` + 拒绝采样，避免取模偏差
- 实时显示字符集大小、熵值（bit）与强度条（弱/中等/强/极强）
- UUID v4 批量生成（1–200 条，格式与唯一性已自测），支持整体复制

### 文本工具箱
- 大小写：全大写 / 全小写 / 每词首字母大写 / 每句首字母大写 / 大小写互换
- 命名风格：camelCase / PascalCase / snake_case / kebab-case / CONSTANT_CASE
- 行操作：按行去重、升序/降序/按数字/按长度排序、反转行序、随机打乱、去行首尾空白、去空行、加行号、转 JSON 数组、每行加引号、批量加前缀后缀
- 实时统计：字符数、不含空白字符数、行数、非空行、英文单词、中文字、UTF-8 字节数
- 支持撤销上一步（保留最近 50 步）

### 文本对比
- 左右两栏粘贴新旧文本，逐行 diff（LCS 算法），新增/删除行分别着色高亮
- 连续未变的行自动折叠（保留首尾各 4 行），长文本也看得清
- 可选忽略大小写 / 忽略行首尾空白 / 忽略空行
- 统计新增、删除、未变行数；可「复制差异清单」导出 `+ / -` 文本

## 取色器工作原理

点击吸管后，应用通过 Electron `desktopCapturer` 对鼠标所在屏幕截取一张原始分辨率的位图，随后创建一个全屏置顶覆盖窗口展示该截图。放大镜与色值均直接从截图位图的原始像素数据读取（`getImageData`），因此：

- 取色精度 = 屏幕物理像素（高分屏已按 `scaleFactor` 处理）
- 取的是**截图瞬间的真实画面**，不受覆盖层自身 UI 影响

## 开发

```bash
npm install        # 安装依赖
npm start          # 开发模式启动
npm run dist       # 打包 Windows NSIS 安装包（输出到 dist/）
```

> 建议使用国内镜像环境变量：
> `ELECTRON_MIRROR=https://npmmirror.com/mirrors/electron/`
> `ELECTRON_BUILDER_BINARIES_MIRROR=https://npmmirror.com/mirrors/electron-builder-binaries/`

## 打包产物

`npm run dist` 后在 `dist/` 目录生成：

- `东土百宝箱 Setup 1.1.0.exe` — NSIS 安装向导（可选安装目录、创建桌面/开始菜单快捷方式）
- `win-unpacked/` — 免安装绿色版（可直接运行其中的 `东土百宝箱.exe`）

## 目录结构

```
toolbox/
├─ build/icon.ico            # 应用图标（由图标脚本生成）
├─ scripts/make_icons*.py    # 图标候选生成（PIL 程序绘制）
├─ scripts/gen_ico.py        # 候选图 → 多尺寸 icon.ico / 侧栏 logo
├─ scripts/test_logic.js     # 纯算法自测（JSON 定位 / Base64 / 时间戳 / 正则 / 二维码 /
│                            #   MD5·SHA / 颜色互转 / 命名风格 / diff / base64url / UUID）
├─ src/
│  ├─ main/main.js           # 主进程：窗口管理、截屏取色、图片多格式保存、批量导出、IPC
│  ├─ main/preload.js        # 预加载桥（contextBridge）
│  └─ renderer/
│     ├─ index.html          # 主面板（多模块框架）
│     ├─ app.js              # 模块路由 + 全部 13 个模块的实现
│     ├─ style.css           # 深色主题
│     ├─ picker.html         # 全屏取色覆盖层
│     ├─ picker.css
│     ├─ picker.js           # 放大镜取色逻辑
│     ├─ assets/             # 侧栏 logo 与窗口图标
│     └─ vendor/qrcode.js    # 二维码编码库（qrcode-generator，MIT）
└─ dist/                     # 打包输出
```

## 新增模块的方法

1. 在 `src/renderer/app.js` 顶部的 `MODULES` 数组加一项（`id`、`name`、`desc`、`icon`、`ready: true`），并在 `I` 图标表里补一个 svg
2. 写一对 `xxxTpl()`（返回 HTML 字符串）+ `bindXxx()`（绑定事件），然后注册进 `VIEWS` 表：
   ```js
   const VIEWS = { ..., xxx: () => [xxxTpl(), bindXxx] };
   ```
3. 需要的样式丢进 `src/renderer/style.css`，通用类（`.tool-row` / `.pane` / `.ta` / `.btn-row` / `.msg` / `.kv-list` / `.drop-zone` / `.mini-btn` 等）已经备好，直接复用即可
4. 模块里如果起了定时器或全局监听，把它挂到 `window.__viewCleanup`，切换模块时会自动清理
5. 如需主进程能力（文件对话框、读写剪贴板、网络等），在 `src/main/main.js` 用 `ipcMain.handle` 注册，再在 `preload.js` 里暴露成 `window.api.xxx`

自测：`node scripts/test_logic.js`（纯算法，不依赖 Electron；`app.js` 的语法也会被顺带检查）

打包：`npm run dist`

---

## 版本控制与同步

远端仓库：<https://github.com/ck2265395/tool-box-developer>（分支 `main`）

```bash
npm run sync                      # 有改动就提交并推送，无改动静默跳过
bash scripts/git-sync.sh "提交说明"   # 自定义提交信息
```

约定：每完成一次功能开发即执行一次同步，提交信息用中文、写清做了什么。

`.gitignore` 已排除 `node_modules/`、`dist/`、`release*/`、QA 截图与日志，只提交源码与图标资源。

凭据：仓库级已配置 `credential.helper=wincred`，token 存放于 Windows 凭据管理器（不落盘为明文）。

> ⚠️ 本机环境已知问题：git **无法写入 `refs/remotes/**`**（`git fetch` / `git update-ref` 的写入被静默丢弃，`refs/heads/*`、`refs/tags/*` 均正常）。
> 症状是 `git status` 误报 `[ahead N]` / `[gone]`。
> 对策：`scripts/git-sync.sh` 会在每次执行时用直写文件的方式修复 `origin/main`，因此**不要手动跑 `git fetch`**（跑了也没关系，下次 `npm run sync` 会自愈）。
