const { ipcRenderer, contextBridge } = require("electron");


window.addEventListener('DOMContentLoaded', () => {
  const closeSettingWindow = document.querySelector("#closeSettingWindow");
  closeSettingWindow.addEventListener("click", () => {
    ipcRenderer.send('closeSettingWindow');
  });
});


contextBridge.exposeInMainWorld('api', {
  getConfigIni: (callback) => {
    ipcRenderer.on('sendConfig', (event, value) => {
      if (value === '' || value === undefined ||value === null) {
        ipcRenderer.on('sendConfig', (event, value) => {
          callback(value);
        })
      } else {
        callback(value);
      }
    })
  }
});
