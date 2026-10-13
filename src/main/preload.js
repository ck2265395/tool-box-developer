const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  /* 主面板用 */
  startPicker: () => ipcRenderer.invoke('picker:start'),
  copyText: (text) => ipcRenderer.invoke('clipboard:write', text),
  readText: () => ipcRenderer.invoke('clipboard:read'),
  saveImage: (dataURL, defaultName) => ipcRenderer.invoke('file:saveImage', dataURL, defaultName),
  saveBatch: (items, defaultDir) => ipcRenderer.invoke('file:saveBatch', items, defaultDir),
  saveText: (text, defaultName) => ipcRenderer.invoke('file:saveText', text, defaultName),
  onPickerResult: (cb) => ipcRenderer.on('picker:result', (_e, data) => cb(data)),
  onPickerCancel: (cb) => ipcRenderer.on('picker:cancel', () => cb()),

  /* 取色覆盖层用 */
  onPickerInit: (cb) => ipcRenderer.on('picker:init', (_e, data) => cb(data)),
  finishPick: (payload) => ipcRenderer.send('picker:done', payload),
  cancelPick: () => ipcRenderer.send('picker:cancel')
});
