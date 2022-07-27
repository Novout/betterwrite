import { useEnv } from '../env'
import { useProjectStore } from '@/store/project'
import { useEditorStore } from '@/store/editor'
import { useLoggerStore } from '@/store/logger'
import { usePDFStore } from '@/store/pdf'
import { ProjectObject } from 'better-write-types'
import { nextTick } from 'vue'
import useEmitter from '../emitter'
import { useContextStore } from '@/store/context'
import { useAuthStore } from '@/store/auth'
import { useDefines } from '../defines'
import { useDOCXStore } from '@/store/docx'

export const useStorage = () => {
  const PROJECT = useProjectStore()
  const CONTEXT = useContextStore()
  const EDITOR = useEditorStore()
  const LOGGER = useLoggerStore()
  const PDF = usePDFStore()
  const DOCX = useDOCXStore()
  const AUTH = useAuthStore()

  const env = useEnv()
  const emitter = useEmitter()
  const defines = useDefines()

  const support = (project: any) => {
    if (!project) return

    let _ = project

    if (!_.project.templates.substitutions) {
      _.project.templates = {
        ..._.project.templates,
        substitutions: {
          text: defines.generator().substitutions().text(),
        },
      }
    }

    if (!_.project.templates.substitutions.italic) {
      _.project.templates.substitutions = {
        ..._.project.templates.substitutions,
        italic: defines.generator().substitutions().italic(),
        bold: defines.generator().substitutions().bold(),
      }
    }

    if (!_.editor.configuration.hasOwnProperty('transition')) {
      _.editor.configuration = {
        ..._.editor.configuration,
        transition: true,
      }
    }

    if (!_.editor.configuration.hasOwnProperty('autosave')) {
      _.editor.configuration = {
        ..._.editor.configuration,
        autosave: true,
      }
    }

    if (!_.editor.configuration.hasOwnProperty('blocked')) {
      _.editor.configuration = {
        ..._.editor.configuration,
        blocked: true,
      }
    }

    if (!_.editor.configuration.hasOwnProperty('bottomBar')) {
      _.editor.configuration = {
        ..._.editor.configuration,
        bottomBar: true,
      }
    }

    if (
      !_.editor.configuration.entity.hasOwnProperty(
        'insertEntityInParagraphBreakLine'
      )
    ) {
      _.editor.configuration.entity = {
        ..._.editor.configuration.entity,
        insertEntityInParagraphBreakLine: false,
      }
    }

    if (!_.pdf.styles.base.note) {
      _.pdf.styles.base = {
        ..._.pdf.styles.base,
        note: {
          text: '',
          bw: true,
        },
      }
    }

    if (!_.project.shortcuts) {
      _.project = {
        ..._.project,
        shortcuts: {
          inserts: [
            {
              key: 'D',
              value: '— ',
            },
          ],
        },
      }
    }

    return _
  }

  const getProjectObject = (): ProjectObject => {
    return {
      id: AUTH.account.project_id_activity || undefined,
      project: PROJECT.$state,
      editor: EDITOR.$state,
      logger: LOGGER.$state,
      pdf: {
        styles: PDF.styles,
        fonts: [],
        normalize: {},
      },
      docx: DOCX.$state,
    }
  }

  const purge = () => {
    LOGGER.content = LOGGER.content.slice(-1 * 100)

    PROJECT.pages.forEach((page) => {
      page.entities.forEach((entity) => {
        if (
          (entity.type === 'paragraph' ||
            entity.type === 'list' ||
            entity.type === 'checkbox') &&
          !(
            entity.raw === env.emptyLine() ||
            entity.raw === env.pageBreak() ||
            entity.raw === env.lineBreak()
          )
        ) {
          /* dynamic paragraph comment */
          if (entity.external && !entity.external?.comment?.raw) {
            delete entity.external.comment
          }
        }
      })

      /* exclude broken image */
      page.entities = page.entities.filter((entity) => {
        if (
          entity.type === 'image' &&
          (!entity.raw || entity.raw === env.emptyLine())
        ) {
          return false
        }

        return true
      })
    })
  }

  const normalize = async () => {
    // text block saver
    emitter.emit('entity-text-force-save')
    // force entity paragraph comment a save / close comment modal
    emitter.emit('entity-external-comment-save')

    await nextTick

    // Generators render in only PROJECT contents, context is unique for editor show
    PROJECT.updateContext(CONTEXT.$state)

    // for lose ticket ms
    await nextTick
  }

  return { support, getProjectObject, normalize, purge }
}
