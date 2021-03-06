import { nextTick } from 'vue'
import { useToast } from 'vue-toastification'
import { saveAs } from 'file-saver'
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
  Entities,
  ProjectStateOptions,
} from 'better-write-types'
import { useStorage } from './storage/storage'
import { useEnv } from './env'
import { useEntity } from './entity'
import { usePlugin } from 'better-write-plugin-core'
import { useBreakpoint } from './breakpoint'
import { useRaw } from './raw'
import { useFileSystemAccess } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import { read } from 'better-write-plugin-importer'
import useEmitter from './emitter'
import { useNProgress } from '@vueuse/integrations/useNProgress'
import { useAuthStore } from '@/store/auth'
import { useDOCXStore } from '@/store/docx'

export const useProject = () => {
  const PROJECT = useProjectStore()
  const CONTEXT = useContextStore()
  const EDITOR = useEditorStore()
  const LOGGER = useLoggerStore()
  const PDF = usePDFStore()
  const DOCX = useDOCXStore()
  const ABSOLUTE = useAbsoluteStore()
  const AUTH = useAuthStore()

  const toast = useToast()
  const storage = useStorage()
  const local = useLocalStorage()
  const entity = useEntity()
  const env = useEnv()
  const raw = useRaw()
  const plugin = usePlugin()
  const breakpoints = useBreakpoint()
  const { isLoading } = useNProgress()
  const emitter = useEmitter()
  const { t } = useI18n()

  const external = () => {
    const n = async (type: ProjectType, skipAlert: boolean = false) => {
      if (!skipAlert && !confirm(t('toast.project.createAlert'))) return

      PROJECT.new(
        {
          name: t('editor.aside.project.new.content.name'),
          version: t('editor.aside.project.new.content.version'),
          creator: t('editor.aside.project.new.content.creator'),
          subject: t('editor.aside.project.new.content.subject'),
          type,
        },
        t('editor.project.control.title', { suffix: 1 })
      )

      await nextTick

      AUTH.account.project_id_activity = null

      CONTEXT.load()

      ABSOLUTE.project.blocked = false

      if (!breakpoints.isMobile().value && type === 'creative')
        ABSOLUTE.aside = true

      if (!skipAlert) toast.success(t('toast.project.create'))

      await nextTick

      emitter.emit('entity-text-focus', {
        target: type === 'creative' ? 1 : 0,
        position: 'start',
      })
    }

    return { new: n }
  }

  const create = (project: ProjectStateOptions) => {
    storage.normalize().then(async () => {
      PROJECT.new(project, t('editor.project.control.title', { suffix: 1 }))

      await nextTick

      CONTEXT.load(PROJECT.pages[0])

      AUTH.account.project_id_activity = null

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

    if (context.id) AUTH.account.project_id_activity = context.id

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

    if (context.docx) DOCX.load(context.docx)

    await nextTick

    plugin.emit('plugin-theme-set')

    await nextTick

    if (!breakpoints.isMobile().value) ABSOLUTE.aside = true

    ABSOLUTE.project.blocked = false

    const editor = document.querySelector('#edit')

    if (editor) editor.scrollTop = PROJECT.scrollLoaded

    if (notification) toast.success(t('toast.project.load'))

    utils().resetAllVisual()
  }

  const onExportProject = () => {
    isLoading.value = true

    storage
      .normalize()
      .then(async () => {
        await saveAs(
          new Blob([JSON.stringify(storage.getProjectObject())], {
            type: 'application/json',
          }),
          utils().exportName('bw')
        )

        toast.success(t('toast.project.export'))
      })
      .catch(() => {
        toast.error(t('toast.generics.error'))
      })
      .finally(() => {
        isLoading.value = false
      })
  }

  const onExportProjectAs = () => {
    storage
      .normalize()
      .then(async () => {
        isLoading.value = true

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

        await res.saveAs()

        toast.success(t('toast.project.export'))
      })
      .catch(() => {
        toast.warning(t('toast.generics.cancel'))
      })
      .finally(() => {
        isLoading.value = false
      })
  }

  const onImportProject = () => {
    const _ = document.createElement('input')
    _.type = 'file'
    _.accept = '.doc,.docx,.bw,.txt'
    _.addEventListener('change', function () {
      const file: File = (this.files as any)[0]

      if (!file) return

      const isDoc = file.name.endsWith('.doc') || file.name.endsWith('.docx')
      const isBW = file.name.endsWith('.bw')
      const isTXT = file.name.endsWith('.txt')

      if (!isDoc && !isBW && !isTXT)
        toast.warning(t('toast.project.unsupportedExtension'))

      read(file, isDoc ? 'data' : 'text')
        .then((data) => {
          const filename = file.name
            .replace('.bw', '')
            .replace('.docx', '')
            .replace('.doc', '')
            .replace('.txt', '')

          if (isBW) {
            plugin.emit('plugin-importer-bw', {
              data,
              fileName: filename,
            })

            return
          }

          if (isDoc) {
            plugin.emit('plugin-importer-docx', {
              data,
              fileName: filename,
            })

            return
          }

          if (isTXT) {
            plugin.emit('plugin-importer-txt', {
              data,
              fileName: filename,
            })

            return
          }
        })
        .catch(() => {
          toast.error(t('toast.project.error'))
        })
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
    const getAllEntities = (cb: (...a: any) => void) => {
      PROJECT.pages.forEach((page) => {
        page.entities.forEach((entity) => {
          if (utils().isValidType(entity)) cb && cb(entity)
        })
      })
    }

    const getParagraphEntities = (cb: (...a: any) => void) => {
      PROJECT.pages.forEach((page) => {
        page.entities.forEach((entity) => {
          if (utils().isValidType(entity) && entity.type === 'paragraph')
            cb && cb(entity)
        })
      })
    }

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

    const getEntities = () => {
      return PROJECT.pages.reduce((sum, val) => {
        sum.push(...val.entities)

        return sum
      }, [] as Entities)
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
              .replace(/[~`!\???\???@#$%^&*()+={}\[\];:\'\"<>.,\/\\\?-_]/g, '')
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

    const getOnlyRaw = () => {
      const arr: string[] = []

      PROJECT.pages.forEach((page) => {
        const value = page.entities
          .filter((ent) => isValidType(ent))
          .reduce((conc, ent) => {
            const nm = raw
              .v2()
              .block()
              .text()
              .parse(ent.raw)
              .reduce((acc, value) => {
                return (acc += value + '\n')
              }, '')

            return (
              conc +
              raw.v2().normalize(nm) +
              (entity.utils().isHeading(ent.type) ? '\n\n' : '\n')
            )
          }, '')

        arr.push(value)
        arr.push('\n')
      })

      return arr
    }

    const getChaptersSelection = () => {
      return PROJECT.pages.map((page) => {
        return {
          page,
          select: true,
        }
      })
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
      getAllEntities,
      getEntities,
      getParagraphEntities,
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
