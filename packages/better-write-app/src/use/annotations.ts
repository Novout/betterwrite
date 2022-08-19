import { usePlugin } from 'better-write-plugin-core'
import {
  ProjectStateAnnotationFile,
  ProjectStateAnnotationFolder,
} from 'better-write-types'
import { useI18n } from 'vue-i18n'

export const useAnnotations = () => {
  const plugin = usePlugin()
  const { t } = useI18n()

  const onStart = (file: ProjectStateAnnotationFile) => {
    plugin.emit('plugin-annotations-start', file)
  }

  const onFileCreate = (folder: ProjectStateAnnotationFolder) => {
    plugin.emit('plugin-annotations-file-create', folder)
  }

  const onFileDelete = (obj: {
    file: ProjectStateAnnotationFile
    folder: ProjectStateAnnotationFolder
  }) => {
    if (confirm(t('toast.project.annotations.fileDelete')))
      plugin.emit('plugin-annotations-file-delete', obj)
  }

  const onFolderCreate = () => {
    plugin.emit('plugin-annotations-folder-create')
  }

  const onFolderDelete = (folder: ProjectStateAnnotationFolder) => {
    if (confirm(t('toast.project.annotations.folderDelete')))
      plugin.emit('plugin-annotations-folder-delete', folder)
  }

  return { onStart, onFileCreate, onFileDelete, onFolderCreate, onFolderDelete }
}
