const { BrowserWindow, app, Tray, ipcMain, Menu } = require("electron");
const path = require('path');
const fs = require('fs');

globalObj = new Object();

// 主窗口
const createMainWindow = () => {
  let result = fs.readFileSync(path.resolve(__dirname, 'config.ini'), 'utf-8');
  let config = JSON.parse(result);
  var bgConfig = "";

  config.bgColorMode === "dark" ?
    bgConfig = "rgba(0,0,0,0.2)" :
    bgConfig = "rgba(225,225,225,0.2)"


  const mainWindow = new BrowserWindow({
    minHeight: 200,
    minWidth: 300,
    width: config.windowWidth,
    height: config.windowHeight,
    x: 1200,
    y: 100,
    resizable: false,
    frame: false,
    transparent: true,
    skipTaskbar: true,
    backgroundColor: bgConfig,
    icon: path.resolve(__dirname, "logo.png"),
    webPreferences: {
      preload: path.resolve(__dirname, "./js/preload.js")
    }
  });

  mainWindow.loadFile(path.resolve(__dirname, "index.html"));

  globalObj.mainWindow = mainWindow;
  // mainWindow.webContents.openDevTools();
  return mainWindow;
}

// @param {string} 获取
function setBgColor(Mode) {
  let result = fs.readFileSync(path.resolve(__dirname, 'config.ini'), 'utf-8');
  let config = JSON.parse(result);
  config.bgColorMode = Mode;
  fs.writeFileSync('./config.ini', JSON.stringify(config), 'utf-8');
}

// 托盘
const trayMenu = (Tray, Menu) => {
  const menuTemplate = [
    {
      label: "设置",
      submenu: [
        {
          label: "颜色模式",
        submenu: [
          {
            label: '深色',
            click: () => {
              setBgColor("dark")
            }
          },
          {
            label: '浅色',
            click: () => {
              setBgColor("light")
            },
          }
        ]
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

const tray = new Tray(path.resolve(__dirname, "logo.png"));
tray.setToolTip('桌面时钟');
const trayMenu = tray.setContextMenu(Menu.buildFromTemplate(menuTemplate))

tray.on('right-click', () => {
  tray.popUpContextMenu(trayMenu);
});
}

// 加载
app.whenReady().then(() => {
  const appStartLock = app.requestSingleInstanceLock();
  if (!appStartLock) {
    app.quit();
  }
  createMainWindow();
  trayMenu(Tray, Menu);
});

app.setAppUserModelId("桌面时钟")

// 关闭设置页面
// ipcMain.on('closeSettingWindow', (settingWindow) => {
//   settingWindow.sender.close()
// });