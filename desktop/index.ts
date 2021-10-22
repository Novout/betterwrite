const { app, BrowserWindow, protocol, globalShortcut } = require('electron')
const { autoUpdater } = require('electron-updater')
const { join } = require('path')

const isDev = process.env.NODE_ENV === 'development'
const WinURL = isDev
  ? `http://localhost:3000`
  : 'file://' + join(__dirname, '../render/index.html')

let mainWindow: any = null
let willQuitApp = false

protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

function createWindow () {
  mainWindow = new BrowserWindow({
    minWidth: 900,
    minHeight: 700,
    width: 1240,
    height: 700,
    center: true,
    titleBarStyle: 'hidden',
    webPreferences: {
      contextIsolation: false,
      enableRemoteModule: false,
      webSecurity: false,
      nodeIntegration: true
    },
    icon: join(__dirname, '../render/logo-desktop.png')
  })

  mainWindow.loadURL(WinURL)
  mainWindow.on('close', function (event: any) {
    if (!willQuitApp && !isDev) {
      event.preventDefault()
      mainWindow?.hide()
    }
  })

  mainWindow.on('closed', function () {
    mainWindow = null
  })
  mainWindow.once('ready-to-show', () => {
    autoUpdater.checkForUpdatesAndNotify()
    mainWindow?.show()
  })

  mainWindow.on('update-downloaded', () => {
    autoUpdater.quitAndInstall()
  })
  /*
  mainWindow.webContents.on('will-navigate', function (event: any, newUrl: string) {
    console.log(newUrl);
    // More complex code to handle tokens goes here
  });

  mainWindow.webContents.on('did-get-redirect-request', function(
    event: any,
    oldUrl: string,
    newUrl: string
  ) {
    console.log(newUrl);
  });
  */
}


app.on('ready', createWindow)

app.on("ready", () => {
  globalShortcut.register("CmdOrCtrl+D", () => {
    mainWindow.webContents.openDevTools();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (!mainWindow) {
    createWindow()
  } else {
    mainWindow.show()
  }
})
app.on('before-quit', () => willQuitApp = true)