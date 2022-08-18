import { useNProgress } from '@vueuse/integrations/useNProgress'
import { usePlugin } from 'better-write-plugin-core'
import {
  ProjectStateAnnotationFile,
  ProjectStateAnnotationFolder,
} from 'better-write-types'
import { useUtils } from './utils'

export const useAnnotations = () => {
  const { fn } = useUtils()
  const plugin = usePlugin()
  const { isLoading } = useNProgress()

  const onStart = (file: ProjectStateAnnotationFile) => {
    fn().promisedFn(
      () => {
        plugin.emit('plugin-annotations-start', file)
      },
      {
        start: () => {
          isLoading.value = true
        },
        end: () => {
          isLoading.value = false
        },
      }
    )
  }

  const onFileCreate = (folder: ProjectStateAnnotationFolder) => {
    fn().promisedFn(
      () => {
        plugin.emit('plugin-annotations-file-create', folder)
      },
      {
        start: () => {
          isLoading.value = true
        },
        end: () => {
          isLoading.value = false
        },
      }
    )
  }

  const onFileDelete = (obj: {
    file: ProjectStateAnnotationFile
    folder: ProjectStateAnnotationFolder
  }) => {
    fn().promisedFn(
      () => {
        plugin.emit('plugin-annotations-file-delete', obj)
      },
      {
        start: () => {
          isLoading.value = true
        },
        end: () => {
          isLoading.value = false
        },
      }
    )
  }

  const onFolderCreate = () => {
    fn().promisedFn(
      () => {
        plugin.emit('plugin-annotations-folder-create')
      },
      {
        start: () => {
          isLoading.value = true
        },
        end: () => {
          isLoading.value = false
        },
      }
    )
  }

  const onFolderDelete = (folder: ProjectStateAnnotationFolder) => {
    fn().promisedFn(
      () => {
        plugin.emit('plugin-annotations-folder-delete', folder)
      },
      {
        start: () => {
          isLoading.value = true
        },
        end: () => {
          isLoading.value = false
        },
      }
    )
  }

  return { onStart, onFileCreate, onFileDelete, onFolderCreate, onFolderDelete }
}
