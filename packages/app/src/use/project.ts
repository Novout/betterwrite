import { nextTick } from 'vue'
import { useToast } from 'vue-toastification'
import { saveAs } from 'file-saver'
import { useProjectStore } from '@/store/project'
import { useContextStore } from '@/store/context'
import { useLocalStorage } from './storage/local'
import { useEditorStore } from '@/store/editor'
import { usePDFStore } from '@/store/pdf'
import { useAbsoluteStore } from '@/store/absolute'
import {
  ProjectObject,
  ProjectType,
  ContextState,
  Entity,
  Entities,
  ProjectStateOptions,
  Maybe,
} from 'better-write-types'
import { useStorage } from './storage/storage'
import { useEnv } from './env'
import { useEntity } from './entity'
import { usePlugin } from 'better-write-plugin-core'
import { getRows } from 'better-write-contenteditable-ast'
import { useBreakpoint } from './breakpoint'
import { useFileSystemAccess } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import { read } from 'better-write-plugin-importer'
import useEmitter from './emitter'
import { writeBW } from 'better-write-extension'
import { useAuthStore } from '@/store/auth'
import { useDOCXStore } from '@/store/docx'
import { useGlobalStore } from '@/store/global'
import { ASTUtils } from 'better-write-contenteditable-ast'

export const useProject = () => {
  const PROJECT = useProjectStore()
  const CONTEXT = useContextStore()
  const EDITOR = useEditorStore()
  const PDF = usePDFStore()
  const DOCX = useDOCXStore()
  const ABSOLUTE = useAbsoluteStore()
  const AUTH = useAuthStore()

  const toast = useToast()
  const storage = useStorage()
  const local = useLocalStorage()
  const entity = useEntity()
  const env = useEnv()
  const plugin = usePlugin()
  const breakpoints = useBreakpoint()
  const emitter = useEmitter()
  const global = useGlobalStore()
  const { t } = useI18n()

  const external = () => {
    const n = async (type: ProjectType, skipAlert: boolean = false) => {
      if (CONTEXT.entities.length > 0) {
        if (!skipAlert && !confirm(t('toast.project.createAlert'))) return
      }

      PROJECT.new(
        {
          name: t('editor.aside.project.new.content.name'),
          version: t('editor.aside.project.new.content.version'),
          creator: t('editor.aside.project.new.content.creator'),
          subject: t('editor.aside.project.new.content.subject'),
          type,
          base: type === 'only-annotations' ? 'annotations' : 'chapter',
        },
        t('editor.project.control.title', { suffix: 1 }),
      )

      await nextTick

      AUTH.account.project_id_activity = null

      CONTEXT.load()

      if (!breakpoints.isMobile().value && type !== 'blank')
        ABSOLUTE.aside = true

      if (!skipAlert) toast.success(t('toast.project.create'))

      await nextTick

      plugin.emit('plugin-theme-set')

      if (type === 'only-annotations') {
        // plugin.emit('plugin-schemas-folder-create')

        return
      }

      emitter.emit('entity-text-focus', {
        target: type === 'creative' ? 1 : 0,
        position: 'start',
      })

      if (type === 'creative') ABSOLUTE.schemas.template = true
    }

    return { new: n }
  }

  const create = (project: ProjectStateOptions) => {
    storage.normalize().then(async () => {
      PROJECT.new(project, t('editor.project.control.title', { suffix: 1 }))

      await nextTick

      CONTEXT.load(PROJECT.chapters[0])

      AUTH.account.project_id_activity = null

      await nextTick

      toast.success(t('toast.project.create'))
    })
  }

  const onLoadProject = async (
    context: Maybe<ProjectObject>,
    notification: boolean = true,
    reset?: boolean,
  ) => {
    if (reset) global.reset()

    if (context) context = await local.getProject(context)

    if (!context) context = await local.getProject()

    if (!context) {
      ABSOLUTE.project.new = true

      return
    }

    if (context.id) AUTH.account.project_id_activity = context.id

    PROJECT.load(context.project)

    await nextTick

    CONTEXT.load(
      PROJECT.chapters.filter(
        (page: ContextState) => page.id === context?.project.pageLoaded,
      )[0],
    )

    await nextTick

    EDITOR.load(context.editor)

    PDF.load(context.pdf)

    if (context.docx) DOCX.load(context.docx)

    await nextTick

    plugin.emit(
      'plugin-theme-set',
      EDITOR.styles.base.backgroundData ? 'BetterWrite - Custom' : undefined,
    )

    await nextTick

    if (!breakpoints.isMobile().value) ABSOLUTE.aside = true

    const editor = document.querySelector('#edit')

    if (editor) editor.scrollTop = PROJECT.scrollLoaded

    if (notification) toast.success(t('toast.project.load'))

    utils().resetAllVisual()

    if (PROJECT.type === 'only-annotations') {
      plugin.emit('plugin-schemas-start', {
        target: PROJECT.schemas[0].folders[0].files[0],
      })
    }

    ABSOLUTE.project.tutorial = !localStorage.getItem('tutorial')
  }

  const onExportProject = () => {
    storage
      .normalize()
      .then(async () => {
        const target = JSON.stringify(storage.getProjectObject())
        const zip = await writeBW(target)

        await saveAs(zip, utils().exportName('bw'))

        toast.success(t('toast.project.export'))
      })
      .catch(() => {
        toast.error(t('toast.generics.error'))
      })
  }

  const onExportProjectAs = () => {
    storage
      .normalize()
      .then(async () => {
        const res = useFileSystemAccess({
          dataType: 'Blob',
          types: [
            {
              description: 'Better Write',
              accept: {
                'application/xml': ['.bw'],
              },
            },
          ],
          excludeAcceptAllOption: true,
        })

        if (!res.isSupported.value) return

        const target = JSON.stringify(storage.getProjectObject())
        const zip = await writeBW(target)

        res.data.value = zip
        res.fileName.value = utils().exportName('bw')

        await res.saveAs()

        toast.success(t('toast.project.export'))
      })
      .catch(() => {
        toast.warning(t('toast.generics.cancel'))
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

      if (!isDoc && !isBW && !isTXT) {
        toast.warning(t('toast.project.unsupportedExtension'))

        return
      }

      let type: 'data' | 'raw' | 'text' = 'text'

      if (isDoc) type = 'data'
      if (isBW) type = 'raw'
      if (isTXT) type = 'text'

      read(file, type)
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
      PROJECT.chapters.forEach((page) => {
        page.entities.forEach((entity) => {
          if (utils().isValidType(entity)) cb && cb(entity)
        })
      })
    }

    const getParagraphEntities = (cb: (...a: any) => void) => {
      PROJECT.chapters.forEach((page) => {
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
      return PROJECT.chapters.reduce((sum, val) => {
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
          (isValidType(val) && ASTUtils.normalize(val.raw, { type: 'inserts' })
            ? ASTUtils.normalize(val.raw, { type: 'inserts' })!.length
            : 0),
        0,
      )
    }

    const getChapterAllSentences = (page: ContextState): number => {
      return page.entities.reduce(
        (sum, val) =>
          sum +
          (isValidType(val) && ASTUtils.normalize(val.raw, { type: 'inserts' })
            ? ASTUtils.normalize(val.raw, { type: 'inserts' })?.match(
                /[\w|\)][.?!](\s|$)/g,
              )?.length || 0
            : 0),
        0,
      )
    }

    const getChapterImpact = (b1: ContextState) => {
      const a1: ContextState = PROJECT.chapters.reduce((r, val) => {
        if (!r || getChapterAllCharacters(val) > getChapterAllCharacters(r)) {
          return val
        }

        return r
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
        0,
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

    const getWordOccurrences = (
      page: ContextState,
      min: number = 0,
    ): Map<string, string> => {
      const map = page.entities
        .filter((entity) => isValidType(entity))
        .reduce((map, value) => {
          const normalize = ASTUtils.normalize(value.raw, {
            type: 'all',
            whitespace: true,
          }) as string

          if (!normalize) return map

          normalize
            .trim()
            .toLowerCase()
            .replace(/[^\w\p{Letter}\s]/gu, '')
            .split(/\s/)
            .forEach((replaces) => {
              if (!replaces) return

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
        }),
      )
    }

    const getOnlyRaw = () => {
      const arr: string[] = []

      PROJECT.chapters.forEach((page) => {
        const value = page.entities
          .filter((ent) => isValidType(ent))
          .reduce((conc, ent) => {
            const nm = getRows(ent.raw).reduce((acc, value) => {
              return (acc += value + '\n')
            }, '')

            return (
              conc +
              ASTUtils.normalize(nm, { type: 'inserts' }) +
              (entity.utils().isHeading(ent.type) ? '\n\n' : '')
            )
          }, '')

        arr.push(value)
        arr.push('\n')
      })

      return arr
    }

    const getChaptersSelection = () => {
      return PROJECT.chapters.map((page) => {
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
      getChapterAllSentences,
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
