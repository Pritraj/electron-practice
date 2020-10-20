// Modules
const {app, BrowserWindow} = require('electron');
const url = require("url");
const path = require("path");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// Create a new BrowserWindow when `app` is ready
function createWindow () {
  
  mainWindow = new BrowserWindow({
    width: 1000, height: 800,
    x:100, y:100,
    webPreferences: { nodeIntegration: true }
  });

  // Load index.html into the new BrowserWindow
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `/dist/index.html`),
      protocol: "file:",
      slashes: true
    })
  );

  // Open DevTools - Remove for PRODUCTION!
  mainWindow.webContents.openDevTools();

  // Listen for window being closed
  mainWindow.on('closed',  () => {
    mainWindow = null
  });

  /*

  //-------------------*****************----------------------------
  // Open Secondary window of less size
  sideWindow = new BrowserWindow({
    width: 600, height: 400,
    webPreferences: { nodeIntegration: true }
  });

  // Load index.html into the new BrowserWindow
  sideWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `/dist/index.html`),
      protocol: "file:",
      slashes: true
    })
  );

  */
 //-------------------*****************----------------------------
  let wc = mainWindow.webContents;
  
  wc.on("context-menu", (e,params)=>{
    console.log(params.selectionText);
  });


  let session = mainWindow.webContents.session;
  console.log(session);
}

// Electron `app` is ready
app.on('ready', createWindow);

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
});

app.on('before-quit', () => {
    console.log("App is quitting!!!");
});

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
  if (mainWindow === null) createWindow()
});