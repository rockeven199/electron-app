const { BrowserWindow, app, Tray, ipcMain, Menu } = require("electron");
const path = require("path");
const menuTemplate = require("./js/menu");

const createWindow = (Tray) => {
  const mainWindow = new BrowserWindow({
    width: 300,
    height: 200,
    // height:600,
    x: 1200,
    y: 100,
    resizable: false,
    frame: false,
    backgroundColor: 'rgba(0,0,0,0)',
    icon: path.resolve(__dirname, "logo.png"),
    webPreferences: {
      preload: path.resolve(__dirname, "./js/preload.js")
    }
  });
  mainWindow.loadFile(path.resolve(__dirname, "index.html"));
  mainWindow.setAlwaysOnTop(false, "normal");
  // mainWindow.webContents.openDevTools();

  const tray = new Tray('./logo.png');
  tray.setContextMenu(menuTemplate);
}

app.whenReady().then(() => {
  createWindow(Tray)
});