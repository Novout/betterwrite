import { nextTick } from 'vue'
import { useToast } from 'vue-toastification'
import { saveAs } from 'file-saver'
import i18n from '@/lang'
import { useProjectStore } from '@/store/project'
import { useContextStore } from '@/store/context'
import { useLocalStorage } from './storage/local'
import { useEditorStore } from '@/store/editor'
import { useLoggerStore } from '@/store/logger'
import { usePDFStore } from '@/store/pdf'
import { useAbsoluteStore } from '@/store/absolute'
import {
  ProjectObject,
  ProjectState,
  ContextState,
  Entity,
} from 'better-write-types'
import { useStorage } from './storage/storage'
import { useNProgress } from '@vueuse/integrations'
import { useEnv } from './env'
import { useEntity } from './entity'
import { usePlugin } from 'better-write-plugin-core'
import { useBreakpoint } from './breakpoint'
import { useFileSystemAccess } from '@vueuse/core'

export const useProject = () => {
  const PROJECT = useProjectStore()
  const CONTEXT = useContextStore()
  const EDITOR = useEditorStore()
  const LOGGER = useLoggerStore()
  const PDF = usePDFStore()
  const ABSOLUTE = useAbsoluteStore()

  const toast = useToast()
  const storage = useStorage()
  const local = useLocalStorage()
  const entity = useEntity()
  const { isLoading } = useNProgress()
  const env = useEnv()
  const plugin = usePlugin()
  const breakpoints = useBreakpoint()
  const { t } = i18n.global

  let timer: any

  const init = () => {
    timer = local.onAutoSave(EDITOR.configuration.auto)
  }

  const destroy = () => {
    clearInterval(timer as any)
  }

  const create = (project: ProjectState) => {
    storage.normalize().then(async () => {
      PROJECT.create(project)

      await nextTick

      CONTEXT.load(PROJECT.pages[0])

      await nextTick

      destroy()
      init()

      await nextTick

      plugin.emit('plugin-theme-set')

      await nextTick

      toast.success(t('toast.project.create'))
    })
  }

  const onLoadProject = async (
    context?: ProjectObject,
    notification: boolean = true
  ) => {
    if (!context) context = local.getProject()

    if (!context) return

    isLoading.value = true

    PROJECT.load(context.project)

    await nextTick

    CONTEXT.load(
      PROJECT.pages.filter(
        (page: ContextState) => page.id === context?.project.pageLoaded
      )[0]
    )

    await nextTick

    LOGGER.load(context.logger)

    await nextTick

    EDITOR.load(context.editor)

    PDF.load(context.pdf)

    await nextTick

    init()

    await nextTick

    plugin.emit('plugin-theme-set')

    await nextTick

    if (!breakpoints.isMobile().value) ABSOLUTE.aside = true

    const editor = document.querySelector('#edit')

    if (editor) editor.scrollTop = PROJECT.scrollLoaded

    if (notification) toast.success(t('toast.project.load'))

    isLoading.value = false
  }

  const onExportProject = () => {
    isLoading.value = true

    storage
      .normalize()
      .then(() => {
        saveAs(
          new Blob([JSON.stringify(storage.getProjectObject())], {
            type: 'application/json',
          }),
          utils().exportName('bw')
        )
      })
      .finally(() => {
        isLoading.value = false
      })
  }

  const onExportProjectAs = () => {
    isLoading.value = true

    storage
      .normalize()
      .then(() => {
        const res = useFileSystemAccess({
          dataType: 'Blob',
          types: [
            {
              description: 'Better Write',
              accept: {
                'application/json': ['.bw'],
              },
            },
          ],
          excludeAcceptAllOption: true,
        })

        if (!res.isSupported) return

        res.data.value = new Blob(
          [JSON.stringify(storage.getProjectObject())],
          {
            type: 'application/json',
          }
        )
        res.fileName.value = utils().exportName('bw')

        res.saveAs()
      })
      .finally(() => {
        isLoading.value = false
      })
  }

  const onImportProject = () => {
    const _ = document.createElement('input')
    _.type = 'file'
    _.addEventListener('change', function () {
      const file = (this.files as any)[0]

      if (!file) return

      const reader = new FileReader()
      reader.readAsText(file)

      reader.onload = function () {
        if (!file.name.includes('.bw')) {
          toast.error(t('toast.generics.error'))
          return
        }

        const content = JSON.parse(reader.result as string)

        onLoadProject(content)
      }
      reader.onerror = function (err) {}
    })
    _.click()
  }

  const isBlankProject = () => {
    return PROJECT.type === 'blank'
  }

  const isCreativeProject = () => {
    return PROJECT.type === 'creative'
  }

  const utils = () => {
    const isValidType = (val: Entity) => {
      return !entity.utils().isFixedRaw(val.raw) && val.type !== 'image'
    }

    const getChapterLetters = (page: ContextState) => {
      return page.entities
        .filter((val) => isValidType(val))
        .map((val) => val.raw.replace(/\s/g, ''))
        .reduce((sum, val) => sum + val.length, 0)
    }

    const getChapterAllCharacters = (page: ContextState): number => {
      return page.entities.reduce(
        (sum, val) => sum + (isValidType(val) ? val.raw.length : 0),
        0
      )
    }

    const getChapterImpact = (b1: ContextState) => {
      const a1: ContextState = PROJECT.pages.reduce((r, val) => {
        if (!r || getChapterAllCharacters(val) > getChapterAllCharacters(r)) {
          return val
        }

        return r
        {
        }
      })

      const a2 = 100

      const x1 = a2 * getChapterAllCharacters(b1)

      const b2 = x1 / getChapterAllCharacters(a1)

      return b2
    }

    const getWords = (entity: Entity) => {
      return entity.raw.trim().split(' ')
    }

    const getChapterWords = (page: ContextState) => {
      return page.entities.reduce(
        (sum, val) =>
          sum +
          (isValidType(val) ? getWords(val).reduce((sum) => sum + 1, 0) : 0),
        0
      )
    }

    const getChapterParagraphs = (page: ContextState) => {
      return page.entities.reduce((sum, val) => {
        if (val.type === 'paragraph' && val.raw !== env.emptyLine())
          return sum + 1

        return sum
      }, 0)
    }

    const getChapterHeadings = (page: ContextState) => {
      return page.entities.reduce((sum, val) => {
        if (val.type.includes('heading')) return sum + 1

        return sum
      }, 0)
    }

    const getChapterFixed = (page: ContextState) => {
      return page.entities.reduce((sum, val) => {
        if (
          val.type === 'image' ||
          val.type === 'line-break' ||
          val.type === 'page-break'
        )
          return sum + 1

        return sum
      }, 0)
    }

    const getParagraphLongest = (page: ContextState) => {
      let length = 0
      let longest = ''

      for (let i = 0; i < page.entities.length; i++) {
        const entity = page.entities[i]

        if (isValidType(entity)) {
          if (entity.raw.length > length) {
            length = entity.raw.length
            longest = entity.raw
          }
        }
      }

      return longest
    }

    const getWordOccurrences = (page: ContextState, min: number = 0) => {
      const map = page.entities
        .filter((entity) => isValidType(entity))
        .reduce((map, value) => {
          value.raw.split(' ').forEach((raw) => {
            const normalize = raw
              .trim()
              .toLowerCase()
              .replace(/[~`!\“\”@#$%^&*()+={}\[\];:\'\"<>.,\/\\\?-_]/g, '')
              .replaceAll('...', '')

            if (normalize.length <= min) return

            map.set(normalize, (map.get(normalize) || 0) + 1)
          })

          return map
        }, new Map())

      map.delete('')

      return new Map(
        [...map].sort((a, b) => {
          if (a[1] < b[1]) {
            return 1
          }
          if (a[1] > b[1]) {
            return -1
          }

          return 0
        })
      )
    }

    const exportName = (extension: string) => {
      return `${PROJECT.name}.${extension}`
    }

    const exportFullName = (extension: string) => {
      return `${PROJECT.nameRaw}.${extension}`
    }

    return {
      isValidType,
      getWords,
      getChapterLetters,
      getChapterAllCharacters,
      getChapterImpact,
      getChapterWords,
      getChapterParagraphs,
      getChapterHeadings,
      getChapterFixed,
      getParagraphLongest,
      getWordOccurrences,
      exportName,
      exportFullName,
    }
  }

  return {
    init,
    destroy,
    create,
    onLoadProject,
    onImportProject,
    onExportProject,
    onExportProjectAs,
    isBlankProject,
    isCreativeProject,
    utils,
  }
}
