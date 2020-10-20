const {app, BrowserWindow, session} = require('electron');
const url = require("url");
const path = require("path");

let mainWindow;

function createWindow () {

  
  //****************************
  // Custom Session
  //****************************
  // this session is not persisted on closure of the app/ window
  // let customSes = session.fromPartition('part1')

  // not this will persist
  // let customSes = session.fromPartition('persist:part1')
  
  mainWindow = new BrowserWindow({
    width: 1000, height: 800,
    x:100, y:100,
    webPreferences: { nodeIntegration: true}
  });

  sideWindow = new BrowserWindow({
    width: 600, height: 400,
    webPreferences: { nodeIntegration: true , partition:'persist:part1'} // { nodeIntegration: true , session: customSes}
  });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `/dist/index.html`),
      protocol: "file:",
      slashes: true
    })
  );

  sideWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `/dist/index.html`),
      protocol: "file:",
      slashes: true
    })
  );

  sideWindow.webContents.openDevTools();
  mainWindow.webContents.openDevTools();


  mainWindow.on('closed',  () => {
    mainWindow = null
  });

  sideWindow.on('closed',  () => {
    mainWindow = null
  });

 //-------------------*****************----------------------------
  let wc = mainWindow.webContents;
  wc.on("context-menu", (e,params)=>{
    console.log(params.selectionText);
  });

  let ses = mainWindow.webContents.session;
  let ses2 = sideWindow.webContents.session;

  console.log(Object.is(ses, ses2));

  

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