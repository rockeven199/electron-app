const { ipcRenderer, contextBridge } = require("electron");


window.addEventListener('DOMContentLoaded', () => {
  try {
    const closeSettingWindow = document.querySelector("#closeSettingWindow");
    closeSettingWindow.addEventListener("click", () => {
      ipcRenderer.send('closeSettingWindow');
    });
  } catch (error) {
    console.warn(error)
  }
});


contextBridge.exposeInMainWorld('api', {
  getConfigIni: (callback) => {
    ipcRenderer.on('sendConfig', (event, value) => {
      if (value === '' || value === undefined || value === null) {
        ipcRenderer.on('sendConfig', (event, value) => {
          callback(value);
        })
      } else {
        callback(value);
      }
    })
  },
  defindBgColor: (data) => {
    ipcRenderer.sendSync('defindBgColor',data)
  }
});
