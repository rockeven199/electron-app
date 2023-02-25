const { ipcRenderer, contextBridge } = require("electron");

window.addEventListener('DOMContentLoaded', () => {
  const closeSettingWindow = document.querySelector("#close-setting-window");
  closeSettingWindow.addEventListener("click", () => {
    ipcRenderer.send('close-setting-window');
  });
});

contextBridge.exposeInMainWorld('api', {
  get: (newMottom) => {
    ipcRenderer.send('update-motto', newMottom)
  }
})