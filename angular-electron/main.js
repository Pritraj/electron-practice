// Modules
const {app, BrowserWindow, session} = require('electron');
const url = require("url");
const path = require("path");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// Create a new BrowserWindow when `app` is ready
function createWindow () {

  let ses = session.defaultSession;
 

  mainWindow = new BrowserWindow({
    width: 1000, height: 800,
    webPreferences: { nodeIntegration: true }
  })

  // mainWindow.loadFile('index.html')
  // mainWindow.loadURL('https://github.com')

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `/dist/index.html`),
      protocol: "file:",
      slashes: true
    })
  );


  // Open DevTools - Remove for PRODUCTION!
  mainWindow.webContents.openDevTools();

  ses.on("will-download", (e, downloadItem, webContents) =>{
    
    let fileName = downloadItem.getFilename();
    let fileSize = downloadItem.getTotalBytes();
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
