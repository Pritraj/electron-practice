// Modules
const {app, BrowserWindow, session, ipcMain} = require('electron');
const url = require("url");
const path = require("path");

let mainWindow

ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg) // prints "ping"
  event.reply('asynchronous-reply', 'pong')
})

function createWindow () {

  let ses = session.defaultSession;

  mainWindow = new BrowserWindow({
    width: 1000, height: 800,
    webPreferences: { nodeIntegration: true }
  });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `/dist/index.html`),
      protocol: "file:",
      slashes: true
    })
  );

  mainWindow.webContents.openDevTools();

  ses.on("will-download", (e, downloadItem, webContents) =>{
    
    let fileName = downloadItem.getFilename();
    console.log(path.join(app.getPath("desktop") , `${fileName}`));
    downloadItem.setSavePath(path.join(app.getPath("desktop") , `${fileName}`))
  })

  // Listen for window being closed
  mainWindow.on('closed',  () => {
    mainWindow = null
  })
}

// Electron `app` is ready
app.on('ready', createWindow)

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
  if (mainWindow === null) createWindow()
})
