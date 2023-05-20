import { usePlugin } from 'better-write-plugin-core'
import {
  ID,
  Maybe,
  ProjectStateSchema,
  ProjectStateSchemaCreate,
  ProjectStateSchemaFile,
  ProjectStateSchemaFolder,
} from 'better-write-types'
import { useI18n } from 'vue-i18n'
import { useGraph } from '@/use/graph'
import { useProjectStore } from '@/store/project'

export const useSchemas = () => {
  const PROJECT = useProjectStore()

  const plugin = usePlugin()
  const { t } = useI18n()
  const graph = useGraph()

  const findFile = (id: ID<any>): Maybe<ProjectStateSchemaFile> => {
    let target: Maybe<ProjectStateSchemaFile> = undefined

    PROJECT.schemas.forEach((schema) => {
      schema.folders.forEach((folder) => {
        folder.files.forEach((file) => {
          if (file.id === id) {
            target = file
          }
        })
      })
    })

    return target
  }

  const onStart = (file: ProjectStateSchemaFile) => {
    graph.utils().mobile()

    plugin.emit('plugin-schemas-start', { target: file })
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
    if (confirm(t('toast.project.schemas.schemaDelete')))
      plugin.emit('plugin-schemas-delete', schema)
  }

  return {
    findFile,
    onStart,
    onFileCreate,
    onFileDelete,
    onFolderCreate,
    onFolderDelete,
    onSchemaCreate,
    onSchemaDelete,
  }
}
