import { usePlugin } from 'better-write-plugin-core'
import {
  ProjectStateSchema,
  ProjectStateSchemaCreate,
  ProjectStateSchemaFile,
  ProjectStateSchemaFolder,
} from 'better-write-types'
import { useI18n } from 'vue-i18n'
import { useGraph } from '@/use/graph'

export const useSchemas = () => {
  const plugin = usePlugin()
  const { t } = useI18n()
  const graph = useGraph()

  const onStart = (file: ProjectStateSchemaFile) => {
    graph.utils().mobile()

    plugin.emit('plugin-schemas-start', file)
  }

  const onFileCreate = (folder: ProjectStateSchemaFolder) => {
    plugin.emit('plugin-schemas-file-create', folder)
  }

  const onFileDelete = (obj: {
    file: ProjectStateSchemaFile
    folder: ProjectStateSchemaFolder
  }) => {
    if (confirm(t('toast.project.schemas.fileDelete')))
      plugin.emit('plugin-schemas-file-delete', obj)
  }

  const onFolderCreate = (schema: ProjectStateSchema) => {
    plugin.emit('plugin-schemas-folder-create', schema)
  }

  const onFolderDelete = (folder: ProjectStateSchemaFolder) => {
    if (confirm(t('toast.project.schemas.folderDelete')))
      plugin.emit('plugin-schemas-folder-delete', folder)
  }

  const onSchemaCreate = (options: ProjectStateSchemaCreate) => {
    plugin.emit('plugin-schemas-create', options)
  }

  const onSchemaDelete = (schema: ProjectStateSchemaCreate) => {
    plugin.emit('plugin-schemas-delete', schema)
  }

  return {
    onStart,
    onFileCreate,
    onFileDelete,
    onFolderCreate,
    onFolderDelete,
    onSchemaCreate,
    onSchemaDelete,
  }
}
