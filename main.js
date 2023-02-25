const { BrowserWindow, app, Tray, ipcMain, Menu } = require("electron");
const path = require("path");

// 主窗口
const createMainWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 300,
    height: 200,
    // height:600,
    x: 1200,
    y: 100,
    resizable: false,
    frame: false,
    transparent: true,
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
  const createSettingWindow = new BrowserWindow({
    width: 300,
    height: 200,
    x: 1200,
    y: 300,
    frame: false,
    transparent: false,
    resizable: false
  });
  Menu.setApplicationMenu(null);
  createSettingWindow.loadFile(path.resolve(__dirname, "./setting.html"));
  createSettingWindow.webContents.openDevTools();
}

// 托盘
const trayMenu = (Tray, Menu, createSettingWindow) => {
  const menuTemplate = [
    {
      label: "设置",
      click: () => {
        createSettingWindow
      }
    },
    {
      label: '退出',
      click: () => {
        app.exit()
      }
    }
  ]

  const tray = new Tray('./logo.png');
  tray.setToolTip("桌面时钟");
  const trayMenu = tray.setContextMenu(Menu.buildFromTemplate(menuTemplate))

  tray.on('right-click', () => {
    tray.popUpContextMenu(trayMenu);
  });
}

// 加载
app.whenReady().then(() => {
  createMainWindow();
  trayMenu(Tray, Menu, createSettingWindow(Menu, path));
});