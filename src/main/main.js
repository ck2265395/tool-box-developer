const { app, BrowserWindow, ipcMain, desktopCapturer, screen, clipboard, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWin = null;
let pickerWin = null;

const RENDERER = path.join(__dirname, '..', 'renderer');
const PRELOAD = path.join(__dirname, 'preload.js');

/* ---------------------------------- 主窗口 --------------------------------- */

function createMainWindow() {
  mainWin = new BrowserWindow({
    width: 1060,
    height: 720,
    minWidth: 900,
    minHeight: 600,
    title: '东土百宝箱',
    icon: path.join(__dirname, '..', 'renderer', 'assets', 'icon.png'),
    backgroundColor: '#101219',
    autoHideMenuBar: true,
    show: false,
    webPreferences: {
      preload: PRELOAD,
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    }
  });

  mainWin.loadFile(path.join(RENDERER, 'index.html'));
  mainWin.once('ready-to-show', () => mainWin.show());
  mainWin.on('closed', () => { mainWin = null; });
}

/* --------------------------------- 取色覆盖层 -------------------------------- */

function closePicker() {
  if (pickerWin && !pickerWin.isDestroyed()) pickerWin.close();
  pickerWin = null;
}

function restoreMain() {
  if (mainWin && !mainWin.isDestroyed()) {
    if (!mainWin.isVisible()) mainWin.show();
    mainWin.focus();
  }
}

async function startPicker() {
  // 以鼠标所在的那块屏幕为准,多屏时更符合直觉
  const cursor = screen.getCursorScreenPoint();
  const display = screen.getDisplayNearestPoint(cursor) || screen.getPrimaryDisplay();
  const b = display.bounds;
  const scale = display.scaleFactor || 1;

  const sources = await desktopCapturer.getSources({
    types: ['screen'],
    thumbnailSize: {
      width: Math.round(b.width * scale),
      height: Math.round(b.height * scale)
    },
    fetchWindowIcons: false
  });

  if (!sources || sources.length === 0) {
    return { ok: false, error: '无法获取屏幕画面' };
  }

  let source = sources.find((s) => String(s.display_id) === String(display.id));
  if (!source) source = sources[0];

  const thumb = source.thumbnail;
  if (!thumb || thumb.isEmpty()) {
    return { ok: false, error: '屏幕截图失败,请重试' };
  }
  const dataURL = thumb.toDataURL();

  pickerWin = new BrowserWindow({
    x: b.x,
    y: b.y,
    width: b.width,
    height: b.height,
    frame: false,
    resizable: false,
    movable: false,
    minimizable: false,
    maximizable: false,
    fullscreenable: false,
    skipTaskbar: true,
    alwaysOnTop: true,
    show: false,
    backgroundColor: '#000000',
    webPreferences: {
      preload: PRELOAD,
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    }
  });

  pickerWin.setAlwaysOnTop(true, 'screen-saver');
  try { pickerWin.setVisibleOnAllWorkspaces(true); } catch (_) { /* 非关键 */ }

  pickerWin.loadFile(path.join(RENDERER, 'picker.html'));

  pickerWin.webContents.once('did-finish-load', () => {
    if (!pickerWin || pickerWin.isDestroyed()) return;
    pickerWin.webContents.send('picker:init', {
      dataURL,
      scale,
      viewWidth: b.width,
      viewHeight: b.height
    });
    pickerWin.show();
    pickerWin.focus();
    // 截图已经拍好,这时候再藏主窗口,画面里就不会有自己
    if (mainWin && !mainWin.isDestroyed()) mainWin.hide();
  });

  pickerWin.on('closed', () => { pickerWin = null; });

  return { ok: true };
}

/* ----------------------------------- IPC ---------------------------------- */

ipcMain.handle('picker:start', async () => {
  try {
    return await startPicker();
  } catch (err) {
    closePicker();
    restoreMain();
    return { ok: false, error: String((err && err.message) || err) };
  }
});

ipcMain.on('picker:done', (_e, payload) => {
  closePicker();
  restoreMain();
  if (mainWin && !mainWin.isDestroyed()) {
    mainWin.webContents.send('picker:result', payload);
  }
});

ipcMain.on('picker:cancel', () => {
  closePicker();
  restoreMain();
  if (mainWin && !mainWin.isDestroyed()) {
    mainWin.webContents.send('picker:cancel');
  }
});

ipcMain.handle('clipboard:write', (_e, text) => {
  clipboard.writeText(String(text == null ? '' : text));
  return true;
});

ipcMain.handle('clipboard:read', () => clipboard.readText());

/* 保存 dataURL 图片（二维码导出用） */
ipcMain.handle('file:saveImage', async (_e, dataURL, defaultName) => {
  try {
    const win = BrowserWindow.getFocusedWindow() || mainWin;
    const { canceled, filePath } = await dialog.showSaveDialog(win, {
      title: '保存图片',
      defaultPath: path.join(app.getPath('pictures'), defaultName || 'image.png'),
      filters: [{ name: 'PNG 图片', extensions: ['png'] }]
    });
    if (canceled || !filePath) return { ok: false, canceled: true };
    const base64 = String(dataURL).replace(/^data:image\/\w+;base64,/, '');
    fs.writeFileSync(filePath, Buffer.from(base64, 'base64'));
    return { ok: true, path: filePath };
  } catch (err) {
    return { ok: false, error: String((err && err.message) || err) };
  }
});

/* 保存纯文本（把格式化结果导出成文件） */
ipcMain.handle('file:saveText', async (_e, text, defaultName) => {
  try {
    const win = BrowserWindow.getFocusedWindow() || mainWin;
    const { canceled, filePath } = await dialog.showSaveDialog(win, {
      title: '保存文件',
      defaultPath: path.join(app.getPath('documents'), defaultName || 'output.txt'),
      filters: [{ name: '所有文件', extensions: ['*'] }]
    });
    if (canceled || !filePath) return { ok: false, canceled: true };
    fs.writeFileSync(filePath, String(text == null ? '' : text), 'utf8');
    return { ok: true, path: filePath };
  } catch (err) {
    return { ok: false, error: String((err && err.message) || err) };
  }
});

/* 工具类应用不需要 GPU 加速；禁用后避开各显卡驱动的黑屏/闪烁问题，截图取色也更稳 */
app.commandLine.appendSwitch('disable-gpu');
app.disableHardwareAcceleration();

/* ---------------------------------- 生命周期 --------------------------------- */

app.whenReady().then(() => {
  createMainWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
