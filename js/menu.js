const { app, nativeTheme, ipcMain, BrowserWindow, ipcRenderer, contextBridge } = require('electron');
const fs = require('fs');
const path = require('path');

// @param {string} 获取
function setBgColor(Mode) {
  let result = fs.readFileSync(path.resolve(__dirname, '..', 'config.ini'), 'utf-8');
  let config = JSON.parse(result);
  config.bgColorMode = Mode;
  fs.writeFileSync(path.resolve(__dirname, '..', 'config.ini'), JSON.stringify(config), 'utf-8');
}

const menuTemplate = [
  {
    label: "设置颜色",
    submenu: [
      {
        label: '深色',
        click: () => {
          setBgColor("dark");
        }
      },
      {
        label: '浅色',
        click: () => {
          setBgColor("light");
        },
      },
      {
        label: '跟随系统',
        click: () => {
          setBgColor("followSystem");
        }
      }
    ]
  },
  {
    label: '退出',
    click: () => {
      app.exit()
    }
  }
]

module.exports = menuTemplate