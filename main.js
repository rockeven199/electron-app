const { BrowserWindow, app, Tray, ipcMain, Menu } = require("electron");
const path = require('path');
const fs = require('fs');

// 主窗口
const createMainWindow = () => {
  let result = fs.readFileSync(path.resolve(__dirname, 'config.ini'), 'utf-8');
  let config = JSON.parse(result);
  var bgConfig = "";
  if (config.usrDefindBgColor == "" || config.usrDefindBgColor == null) {
    if (config.bgColorMode === "dark") {
      bgConfig = "rgba(0,0,0,0.2)";
    } else {
      bgConfig = "rgba(225,225,225,0.2)";
    }
  } else {
    bgConfig = config.usrDefindBgColor;
  }

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
  mainWindow.setAlwaysOnTop(false, "torn-off-menu");
  // mainWindow.webContents.openDevTools();
}

// 设置窗口
const createSettingWindow = () => {
  const settingWindow = new BrowserWindow({
    width: 300,
    height: 400,
    x: 1200,
    y: 300,
    frame: false,
    transparent: false,
    resizable: false,
    webPreferences: {
      preload: path.resolve(__dirname, "./js/preload.js")
    }
  });
  Menu.setApplicationMenu(null);
  settingWindow.loadFile(path.resolve(__dirname, "./setting.html"));
  settingWindow.webContents.openDevTools();
  let resultContext = fs.readFileSync(path.resolve(__dirname, 'config.ini'), 'utf-8');
  let config = JSON.parse(resultContext);
  return settingWindow;
}

// 托盘
const trayMenu = (Tray, Menu) => {
  const menuTemplate = [
    {
      label: "设置",
      click: () => {
        let resultContext = fs.readFileSync(path.resolve(__dirname, 'config.ini'), 'utf-8');
        let config = JSON.parse(resultContext);
        createSettingWindow(Menu, path).webContents.send('sendConfig', config)
      }
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

// 关闭设置页面
ipcMain.on('closeSettingWindow', (settingWindow) => {
  settingWindow.sender.close()
});

ipcMain.on('reSend', () => {
  console.log("first")
})

ipcMain.on('defindBgColor',(event,value)=>{
  console.log(value)
})