# 东土百宝箱 DongtuBox

一个 Windows 桌面多模块工具面板（Electron），内置 6 个可用模块。

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

### 图片压缩（占位，待开发）

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

- `东土百宝箱 Setup 1.0.0.exe` — NSIS 安装向导（可选安装目录、创建桌面/开始菜单快捷方式）
- `win-unpacked/` — 免安装绿色版（可直接运行其中的 `东土百宝箱.exe`）

## 目录结构

```
toolbox/
├─ build/icon.ico            # 应用图标（由图标脚本生成）
├─ scripts/make_icons*.py    # 图标候选生成（PIL 程序绘制）
├─ scripts/gen_ico.py        # 候选图 → 多尺寸 icon.ico / 侧栏 logo
├─ scripts/test_logic.js     # 纯算法自测（JSON 定位 / Base64 / 时间戳 / 正则 / 二维码）
├─ src/
│  ├─ main/main.js           # 主进程：窗口管理、截屏取色、文件保存、IPC
│  ├─ main/preload.js        # 预加载桥（contextBridge）
│  └─ renderer/
│     ├─ index.html          # 主面板（多模块框架）
│     ├─ app.js              # 模块路由 + 全部六个模块的实现
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
3. 需要的样式丢进 `src/renderer/style.css`，通用类（`.tool-row` / `.pane` / `.ta` / `.btn-row` / `.msg` / `.kv-list` 等）已经备好，直接复用即可
4. 模块里如果起了定时器或全局监听，把它挂到 `window.__viewCleanup`，切换模块时会自动清理

打包：`npm run dist`
3. 如需主进程能力，在 `src/main/main.js` 注册 IPC，在 `preload.js` 暴露

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
