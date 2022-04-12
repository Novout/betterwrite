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
  ProjectType,
  ContextState,
  Entity,
} from 'better-write-types'
import { useStorage } from './storage/storage'
import { useNProgress } from '@vueuse/integrations/useNProgress'
import { useEnv } from './env'
import { useEntity } from './entity'
import { usePlugin } from 'better-write-plugin-core'
import { useBreakpoint } from './breakpoint'
import { useRaw } from './raw'
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
  const raw = useRaw()
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

  const external = () => {
    const n = async (type: ProjectType, skipAlert: boolean = false) => {
      if (!skipAlert && !confirm(t('toast.project.createAlert'))) return

      isLoading.value = true

      PROJECT.create(
        {
          name: t('editor.aside.project.new.content.name'),
          version: t('editor.aside.project.new.content.version'),
          creator: t('editor.aside.project.new.content.creator'),
          subject: t('editor.aside.project.new.content.subject'),
          type,
        } as any,
        t('editor.project.control.title', { suffix: 1 })
      )

      await nextTick

      CONTEXT.load()

      if (!breakpoints.isMobile().value && type === 'creative')
        ABSOLUTE.aside = true

      isLoading.value = false

      await local.onSaveProject(false)

      window.location.reload()
    }

    return { new: n }
  }

  const create = (project: ProjectState) => {
    storage.normalize().then(async () => {
      PROJECT.create(project, t('editor.project.control.title', { suffix: 1 }))

      await nextTick

      CONTEXT.load(PROJECT.pages[0])

      await nextTick

      destroy()
      init()

      await nextTick

      toast.success(t('toast.project.create'))
    })
  }

  const onLoadProject = async (
    context?: ProjectObject,
    notification: boolean = true
  ) => {
    if (!context) context = local.getProject()

    if (!context) {
      await external().new('creative', true)

      return
    }

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

    utils().resetAllVisual()

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
    const resetAllVisual = () => {
      CONTEXT.entities.forEach((entity) => {
        entity.visual.info = false
        entity.visual.warning = false
        entity.visual.error = false
      })
    }

    const isValidType = (val: Entity) => {
      return (
        !entity.utils().isFixedRaw(val.raw) &&
        val.type !== 'image' &&
        val.type !== 'drau'
      )
    }

    const getChapterLetters = (page: ContextState) => {
      return page.entities
        .filter((val) => isValidType(val))
        .map((val) => val.raw.replace(/\s/g, ''))
        .reduce((sum, val) => sum + val.length, 0)
    }

    const getChapterAllCharacters = (page: ContextState): number => {
      return page.entities.reduce(
        (sum, val) =>
          sum +
          (isValidType(val) && raw.v2().normalize(val.raw)
            ? raw.v2().normalize(val.raw)!.length
            : 0),
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
        .reduce((map: any, value: any) => {
          const normalize = raw.v2().normalize(value.raw, 'full')

          if (!normalize) return map

          normalize.split(' ').forEach((r) => {
            const replaces = r
              .trim()
              .toLowerCase()
              .replace(/[~`!\“\”@#$%^&*()+={}\[\];:\'\"<>.,\/\\\?-_]/g, '')
              .replaceAll('...', '')

            if (replaces.length <= min) return

            map.set(replaces, (map.get(replaces) || 0) + 1)
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

    const getChaptersSelection = () => {
      return PROJECT.pages.map((page) => {
        return {
          page,
          select: true,
        }
      })
    }

    const getOnlyRaw = () => {
      const arr: string[] = []

      PROJECT.pages.forEach((page) => {
        const value = page.entities
          .filter((ent) => isValidType(ent))
          .reduce((conc, ent) => {
            return (
              conc +
              raw.v2().normalize(ent.raw) +
              (entity.utils().isHeading(ent.type) ? '\n\n' : '\n')
            )
          }, '')

        arr.push(value)
        arr.push('\n')
      })

      return arr
    }

    const exportName = (extension: string) => {
      return `${PROJECT.name}.${extension}`
    }

    const exportFullName = (extension: string) => {
      return `${PROJECT.nameRaw}.${extension}`
    }

    return {
      resetAllVisual,
      isValidType,
      getWords,
      getOnlyRaw,
      getChapterLetters,
      getChapterAllCharacters,
      getChapterImpact,
      getChapterWords,
      getChapterParagraphs,
      getChapterHeadings,
      getChapterFixed,
      getParagraphLongest,
      getWordOccurrences,
      getChaptersSelection,
      exportName,
      exportFullName,
    }
  }

  return {
    init,
    destroy,
    create,
    external,
    onLoadProject,
    onImportProject,
    onExportProject,
    onExportProjectAs,
    isBlankProject,
    isCreativeProject,
    utils,
  }
}
