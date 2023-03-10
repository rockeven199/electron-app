const { BrowserWindow, app, Tray, Menu, nativeTheme, ipcMain } = require("electron");
const path = require('path');
const fs = require('fs');
const menuTemplate = require('./js/menu');

globalObj = new Object();

// 主窗口
const createMainWindow = () => {
  let result = fs.readFileSync(path.resolve(__dirname, 'config.ini'), 'utf-8');
  let config = JSON.parse(result);
  var bgConfig;
  if (config.bgColorMode === "dark") {
    bgConfig = "rgba(0,0,0,0.2)"
  }
  else if (config.bgColorMode === "light") {
    bgConfig = "rgba(225,225,225,0.2)"
  }
  else if (config.bgColorMode === "followSystem") {
    setInterval(function () {
      nativeTheme.shouldUseDarkColors ? globalObj.bgConfig = "rgba(0,0,0,0.2)" : globalObj.bgConfig = "rgba(225,225,225,0.2)"
    }, 3000)
  }
  else{}

  const mainWindow = new BrowserWindow({
    minHeight: 100,
    minWidth: 200,
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
      preload: path.resolve(__dirname, "preload.js")
    }
  });

  // mainWindow.webContents.openDevTools()
  mainWindow.loadFile(path.resolve(__dirname, "index.html"));
  globalObj.mainWindow = mainWindow;
  return mainWindow;
}

const createTray = () => {
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
  !appStartLock ? app.quit() : ''
  createTray();
  createMainWindow();
  nativeTheme.on('updated', () => {
    console.log('yes')
  })
});

app.setAppUserModelId("桌面时钟");