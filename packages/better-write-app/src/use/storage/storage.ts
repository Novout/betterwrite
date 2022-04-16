import { useEnv } from '../env'
import { useProjectStore } from '@/store/project'
import { useEditorStore } from '@/store/editor'
import { useLoggerStore } from '@/store/logger'
import { usePDFStore } from '@/store/pdf'
import { ProjectObject } from 'better-write-types'
import { nextTick } from 'vue'
import useEmitter from '../emitter'
import { useDefines } from '../defines'
import { useFormat } from '../format'
import { useContextStore } from '@/store/context'
import { useAuthStore } from '@/store/auth'

export const useStorage = () => {
  const PROJECT = useProjectStore()
  const CONTEXT = useContextStore()
  const EDITOR = useEditorStore()
  const LOGGER = useLoggerStore()
  const PDF = usePDFStore()
  const AUTH = useAuthStore()

  const env = useEnv()
  const emitter = useEmitter()
  const defines = useDefines()

  const support = (project: any) => {
    if (!project) return

    let _ = project

    return _
  }

  const getProjectObject = (): ProjectObject => {
    return {
      id: CONTEXT.id || AUTH.account.project_id_activity || undefined,
      project: PROJECT.$state,
      editor: EDITOR.$state,
      logger: LOGGER.$state,
      pdf: {
        styles: PDF.styles,
        fonts: [],
        normalize: {},
      },
    }
  }

  const purge = () => {
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
          /* dynamic paragraph generator */
          if (
            !entity.external?.paragraph?.active &&
            entity.external?.paragraph?.generator
          ) {
            delete entity.external.paragraph
          }

          /* dynamic paragraph comment */
          if (entity.external && !entity.external?.comment?.raw) {
            delete entity.external.comment
          }
        }
      })
    })
  }

  const normalize = async (force: boolean = false) => {
    // close open entities contents
    emitter.emit('entity-edit-save')
    // force entity paragraph comment a save / close comment modal
    emitter.emit('entity-external-comment-save')

    await nextTick

    // Generators render in only PROJECT contents, context is unique for editor show
    PROJECT.updateContext(CONTEXT.$state)

    await nextTick

    // remove unused entity external
    await purge()

    // for lose ticket ms
    await nextTick
  }

  return { support, getProjectObject, normalize }
}
