const { BrowserWindow, app, Tray, ipcMain, Menu } = require("electron");
const path = require('path');
const fs = require('fs');

// 主窗口
const createMainWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 300,
    height: 200,
    x: 1200,
    y: 100,
    resizable: false,
    frame: false,
    transparent: true,
    skipTaskbar:true,
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
    height: 200,
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
  // settingWindow.webContents.openDevTools();


  // 获取配置文件
  let configContext = fs.readFileSync(path.resolve(__dirname, './config.ini'), { encoding: 'utf-8' });
  // settingWindow.webContents.send('get-clock-config', '123123132');
}

// 托盘
const trayMenu = (Tray, Menu) => {
  const menuTemplate = [
    {
      label: "设置",
      click: () => {
        createSettingWindow(Menu, path);
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
  } else {
    createMainWindow();
    trayMenu(Tray, Menu);
  }
});

// 关闭设置页面
ipcMain.on('close-setting-window', (settingWindow) => {
  settingWindow.sender.destroy();
});

// 标语更新
ipcMain.on('update-motto', (event, value) => {
  console.log(value)
});