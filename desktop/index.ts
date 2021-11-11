

const { app, BrowserWindow, protocol, globalShortcut } = require('electron')
const { autoUpdater } = require('electron-updater')
const { join } = require('path')
const log = require('electron-log')
const electronDl = require('electron-dl')

const isDev = process.env.NODE_ENV === 'development'
const WinURL = isDev
  ? `http://localhost:3000`
  : 'file://' + join(__dirname, '../render/index.html')

electronDl();

let mainWindow: any = null

protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';

log.info('App starting...');

const createWindow = () => {
  mainWindow = new BrowserWindow({
    minWidth: 900,
    minHeight: 700,
    width: 1240,
    height: 700,
    center: true,
    titleBarStyle: 'hidden',
    webPreferences: {
      webSecurity: true,
      nodeIntegration: true
    }
  })

  mainWindow.loadURL(WinURL)
  mainWindow.on('closed', function () {
    mainWindow = null
  })

  mainWindow.once('ready-to-show', () => {
    log.info('App rendering...');

    mainWindow?.show()
  })
  
  autoUpdater.checkForUpdatesAndNotify()
}

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', createWindow)

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