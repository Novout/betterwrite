const { contextBridge, ipcRenderer } = require('electron')

const _setImmediate = setImmediate
const _clearImmediate = clearImmediate
process.once('loaded', () => {
  global.setImmediate = _setImmediate
  global.clearImmediate = _clearImmediate
})

contextBridge.exposeInMainWorld('ipcRenderer', {
  send: (channel: any, data: any) => {
    ipcRenderer.send(channel, data)
  },
  receive: (channel: any, func: any) => {
    ipcRenderer.on(channel, (event: any, ...args: Array<any>) => func(...args))
  },
})
