import { useEnv } from '../env'
import { useProjectStore } from '@/store/project'
import { useEditorStore } from '@/store/editor'
import { usePDFStore } from '@/store/pdf'
import { ProjectObject, ProjectStateSchema, ProjectStateSchemaCharacterItem, ProjectStateSchemaFolder, StorageNormalizeOptions } from 'better-write-types'
import { nextTick } from 'vue'
import useEmitter from '../emitter'
import { useContextStore } from '@/store/context'
import { useAuthStore } from '@/store/auth'
import { useDefines } from '../defines'
import { useDOCXStore } from '@/store/docx'
import { useUtils } from '../utils'
import { useI18n } from 'vue-i18n'

export const useStorage = () => {
  const PROJECT = useProjectStore()
  const CONTEXT = useContextStore()
  const EDITOR = useEditorStore()
  const PDF = usePDFStore()
  const DOCX = useDOCXStore()
  const AUTH = useAuthStore()

  const env = useEnv()
  const emitter = useEmitter()
  const defines = useDefines()
  const { t } = useI18n()

  const support = (project: ProjectObject): ProjectObject => {
    let _ = project

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

    // @ts-ignore
    if (_.project.templates.generator) {
      // @ts-ignore
      _.project.templates = {
        ..._.project.templates,
        // @ts-ignore
        generators: [],
      }
    }

    if (!_.project.image) {
      _.project = {
        ..._.project,
        image: undefined,
      }
    }

    if (!_.editor.styles.header) {
      _.editor.styles = {
        ..._.editor.styles,
        header: {
          fontFamily: 'Raleway',
          fontWeight: 400,
          fontSize: 16,
        },
        graph: {
          fontFamily: 'Raleway',
          fontWeight: 400,
          fontSize: 16,
        },
      }
    }

    if (!_.editor.configuration.cloudAutosave) {
      _.editor.configuration = {
        ..._.editor.configuration,
        cloudAutosave: false,
      }
    }

    if (!_.editor.configuration.compressFiles) {
      _.editor.configuration = {
        ..._.editor.configuration,
        compressFiles: {
          value: false,
          quality: 0.8,
        },
      }
    }

    if (!_.editor.styles.base.backgroundCoverAttribute) {
      _.editor.styles.base = {
        ..._.editor.styles.base,
        backgroundCoverAttribute: true,
      }
    }

    if (!_.editor.configuration.purgeEntities) {
      _.editor.configuration = {
        ..._.editor.configuration,
        purgeEntities: false,
      }
    }

    if (!_.project.chapters) {
      // @ts-expect-error
      _.project.chapters = _.project.pages || []
    }

    if (!_.editor.configuration.trackEntities) {
      _.editor.configuration = {
        ..._.editor.configuration,
        trackEntities: false,
      }
    }

    if(!_.editor.configuration.clientStorage) {
      _.editor.configuration = {
        ..._.editor.configuration,
        clientStorage: {
          schema: 'local-storage',
          compress: true
        }
      }
    }

    if(!_.editor.configuration.topBar) {
      _.editor.configuration = {
        ..._.editor.configuration,
        topBar: true
      }
    }

    if(!_.project.schemas) {
      _.project.schemas = []
      // @ts-expect-error
      if(_.project.annotations) {
        const schemaAnnotationsId = useUtils().id().nano({ prefix: 'schema' })
        const schemaAnnotations = {
          id: schemaAnnotationsId,
          type: 'default',
          name: t('editor.schemas.create.nameItem'),
          prefix: '/',
          customIcon: '📁',
          folders: [] as ProjectStateSchemaFolder[],
        } as ProjectStateSchema

        _.project.annotations.folders.forEach(folder => {
          const folderId = useUtils().id().nano({ prefix: 'folder' }) 
  
          schemaAnnotations.folders.push({
            id: folderId,
            parentId: schemaAnnotationsId,
            folderName: folder.folderName,
            customIcon: schemaAnnotations.customIcon,
            files: [...folder.files.map(file => {
              return {
                id: useUtils().id().nano({ prefix: 'file' }),
                parentId: folderId,
                fileName: file.fileName,
                milkdownData: file.value,
                customIcon: schemaAnnotations.customIcon,
                extra: {}
              }
            })]
          })
        })

        _.project.schemas.push(schemaAnnotations)
        
        delete _.project['annotations']
      }

      if(_.project.characters) {
        const schemaCharactersId = useUtils().id().nano({ prefix: 'schema' })
        const schemaCharacters = {
          id: schemaCharactersId,
          type: 'characters',
          name: t('editor.schemas.types.characters.target'),
          prefix: '/',
          customIcon: '🐉',
          folders: [] as ProjectStateSchemaFolder[],
        } as ProjectStateSchema

        const folderId = useUtils().id().nano({ prefix: 'folder' }) 

        schemaCharacters.folders.push({
          id: folderId,
          parentId: schemaCharactersId,
          folderName: t('editor.schemas.types.characters.target'),
          customIcon: schemaCharacters.customIcon,
          files: [..._.project.characters.list.map(character => {
            return {
              id: useUtils().id().nano({ prefix: 'file' }),
              parentId: folderId,
              fileName: character.name,
              milkdownData: {},
              customIcon: schemaCharacters.customIcon,
              extra: {
                ...character,
                disabled: false
              } as ProjectStateSchemaCharacterItem
            }
          })]
        })

        _.project.schemas.push(schemaCharacters)

        delete _.project['characters']
      }
    }

    if(!_.project.externalProvider) {
      _.project = {
        ..._.project,
        externalProvider: undefined
      }
    }

    return _
  }

  const getProjectObject = (): ProjectObject => {
    return {
      id: AUTH.account.project_id_activity || undefined,
      project: PROJECT.$state,
      editor: EDITOR.$state,
      pdf: {
        styles: PDF.styles,
        fonts: [],
        normalize: {},
      },
      docx: DOCX.$state,
    }
  }

  const purge = () => {
    if (!EDITOR.configuration.purgeEntities) return

    PROJECT.chapters.forEach((page) => {
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

  const normalize = async (options?: StorageNormalizeOptions) => {
    // text block saver
    emitter.emit('entity-text-force-save')
    // force entity paragraph comment a save / close comment modal
    emitter.emit('entity-external-comment-save')

    await nextTick

    if(options?.soft) return

    // Generators render in only PROJECT contents, context is unique for editor show
    PROJECT.updateContext(CONTEXT.$state)

    // for lose ticket ms
    await nextTick
  }

  return { support, getProjectObject, normalize, purge }
}
