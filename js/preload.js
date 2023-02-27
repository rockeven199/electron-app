const { ipcRenderer, contextBridge } = require("electron");

window.addEventListener('DOMContentLoaded', () => {
  const closeSettingWindow = document.querySelector("#close-setting-window");
  closeSettingWindow.addEventListener("click", () => {
    ipcRenderer.send('closeSettingWindow');
  });
});

contextBridge.exposeInMainWorld('api', {
  getConfigIni: (callback) => {
    ipcRenderer.on('sendConfig', (event, value) => {
      callback(value)
    })
  }
});
