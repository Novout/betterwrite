import { usePlugin } from 'better-write-plugin-core'
import type { files } from 'dropbox'

export const useDropbox = () => {
  const plugin = usePlugin()

  const save = () => {
    plugin.emit('plugin-dropbox-save')
  }

  const load = () => {
    plugin.emit('plugin-dropbox-load')
  }

  const loadProject = (file: files.FileMetadataReference) => {
    plugin.emit('plugin-dropbox-set', file)
  }

  const deleteProject = (file: files.FileMetadataReference) => {
    plugin.emit('plugin-dropbox-delete', file)
  }

  const connect = () => {
    plugin.emit('plugin-dropbox-connect')
  }

  return { load, save, connect, loadProject, deleteProject }
}
