const { BrowserWindow, app } = require("electron");
const path = require("path")

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 300,
    height: 200,
    minWidth: 300,
    minHeight: 200,
    x: 1200,
    y: 100,
    resizable: false,
    frame: false,
    backgroundColor: 'rgba(255, 255, 255, 0)',
  });
  mainWindow.loadFile(path.resolve(__dirname, "index.html"));
  // mainWindow.webContents.openDevTools();
  mainWindow.setAlwaysOnTop("torn-off-menu")
}

app.whenReady().then(() => {
  createWindow()
});