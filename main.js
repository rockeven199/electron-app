const { BrowserWindow, app } = require("electron");
const path = require("path")

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 300,
    height: 200,
    x: 1200,
    y: 100,
    resizable: false,
    frame: false,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    skipTaskbar:true,
    alwaysOnTop:true
  });
  mainWindow.loadFile(path.resolve(__dirname, "index.html"));
  mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow()
});