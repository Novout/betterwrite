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

export const useStorage = () => {
  const PROJECT = useProjectStore()
  const EDITOR = useEditorStore()
  const LOGGER = useLoggerStore()
  const PDF = usePDFStore()

  const env = useEnv()
  const emitter = useEmitter()
  const defines = useDefines()

  const support = (project: any) => {
    if (!project) return

    let _ = project
    // <= v0.3.10
    if (_.project?.pages[0]?.entity) {
      _.project?.pages.forEach((target: any) => {
        target['entities'] = target['entity']
        delete target['entity']
      })
    }

    // <= 0.4.0
    if (!_.project.bw) {
      _.project.bw = {
        platform: 'web',
        version: env.packageVersion(),
      }
    }

    // <= 0.5.3
    if (!_.editor.configuration.auto) {
      _.editor.configuration.auto = 5
    }

    // <= 0.8.0
    if (!_.pdf.styles.base.footer) {
      _.pdf.styles.base.footer = {
        start: 3,
        alignment: 'default',
        textType: 'simple',
        textSize: 9,
        fontFamily: defines.pdf().fontFamily()[1],
      }
    }
    if (!_.pdf.styles.switcher.footer) {
      _.pdf.styles.switcher = {
        ..._.pdf.styles.switcher,
        footer: true,
      }
    }
    if (!_.pdf.styles.base.header) {
      _.pdf.styles.base.header = {
        start: 3,
        content: _.project.nameRaw,
        alignment: 'center',
        textType: 'simple',
        textSize: 12,
        fontFamily: defines.pdf().fontFamily()[1],
      }
    }
    if (!_.pdf.styles.switcher.header) {
      _.pdf.styles.switcher = {
        ..._.pdf.styles.switcher,
        header: false,
      }
    }
    if (!_.pdf.styles.base.summary) {
      _.pdf.styles.base.summary = {
        exists: true,
        type: 'default',
        fontFamily: useDefines().pdf().fontFamily()[1],
        fontSize: 20,
      }
    }
    if (!_.pdf.styles.switcher.summary) {
      _.pdf.styles.switcher = {
        ..._.pdf.styles.switcher,
        summary: true,
      }
    }
    if (!_.editor.configuration.theme) {
      _.editor.configuration = {
        ..._.editor.configuration,
        theme: useDefines().themes()[1],
      }
    }

    // <= 0.9.0
    if (!_.editor.configuration.entity) {
      _.editor.configuration.entity = {
        updateTime: true,
      }
    }
    if (!_.project.producer) {
      _.project = {
        ..._.project,
        producer: 'Untitled',
      }
    }
    if (!_.project.keywords) {
      _.project = {
        ..._.project,
        keywords: 'Untitled',
      }
    }
    if (!_.project.pdf) {
      _.project.pdf = {
        encryption: {
          userPassword: '',
          ownerPassword: '',
        },
        permissions: {
          printing: 'highResolution',
          modifying: false,
          copying: false,
          annotating: true,
          fillingForms: true,
          contentAccessibility: true,
          documentAssembly: true,
        },
      }
    }
    if (!_.pdf.styles.switcher.encryption) {
      _.pdf.styles.switcher = {
        ..._.pdf.styles.switcher,
        encryption: false,
      }
    }
    if (!_.editor.actives.entity) {
      _.editor.actives.entity = {
        index: 0,
      }
    }
    _.project?.pages.forEach((target: any) => {
      if (
        target['entities'].type === 'paragraph' &&
        !target['entities'].external &&
        !target['entities'].external.comment
      )
        return

      target['entities'].external = {
        comment: {
          raw: '',
          updatedAt: useFormat().actually(),
          createdAt: useFormat().actually(),
        },
      }
    })

    // <= 0.9.2
    if (!_.editor.configuration.entity) {
      _.editor.configuration = {
        ..._.editor.configuration,
        bars: false,
      }
    }

    // <= 0.9.3
    if (!_.editor.configuration.commands) {
      _.editor.configuration = {
        ..._.editor.configuration,
        commands: {
          prefix: '/',
          paragraph: {
            prefix: 'p',
          },
          headingTwo: {
            prefix: 'h2',
          },
          headingThree: {
            prefix: 'h3',
          },
          pageBreak: {
            prefix: 'bp',
          },
          lineBreak: {
            prefix: 'lb',
          },
          image: {
            prefix: 'im',
          },
          dialogue: {
            prefix: 'd',
            value: '— ',
          },
        },
      }
    }

    // <= 0.9.7
    if (!_.pdf.styles.paragraph.margin) {
      _.pdf.styles.paragraph.margin = {
        top: 0,
        bottom: 0,
      }
      _.pdf.styles.headingOne.margin = {
        top: 45,
        bottom: 45,
      }
      _.pdf.styles.headingTwo.margin = {
        top: 25,
        bottom: 25,
      }
      _.pdf.styles.headingThree.margin = {
        top: 15,
        bottom: 15,
      }
    }

    // <= 0.10.0
    if (!_.project.creative) {
      _.project.creative = {
        drafts: [],
      }
    }
    if (!_.project.pages[0].createdAt) {
      _.project?.pages.forEach((target: any) => {
        target['createdAt'] = useFormat().actually()
        target['updatedAt'] = useFormat().actually()
      })
    }
    if (!_.project.pages[0].title) {
      _.project?.pages.forEach((target: any) => {
        target['title'] = target.entities[0].raw
      })
    }

    // <= 0.11.7
    if (!_.editor.actives.global) {
      _.editor.actives = {
        ..._.editor.actives,
        global: {
          mouse: {
            x: 0,
            y: 0,
            vertical: 'top',
            horizontal: 'right',
            validLastSelection: false,
          },
        },
      }
    }

    // <= 0.11.8
    if (!_.project.pages[0].entities[0].visual) {
      _.project.pages.forEach((page) => {
        page.entities = page.entities.map((entity) => {
          return {
            ...entity,
            visual: {
              error: false,
              info: false,
              warning: false,
            },
          }
        })
      })
    }

    // <= 0.12.0
    if (!_.pdf.styles.switcher.theme) {
      _.pdf.styles.switcher = {
        ..._.pdf.styles.switcher,
        theme: false,
      }
    }

    return _
  }

  const getProjectObject = (): ProjectObject => {
    return {
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

  const normalize = async () => {
    // close open entities contents
    emitter.emit('entity-edit-save')
    // force entity paragraph comment a save / close comment modal
    emitter.emit('entity-external-comment-save')

    // for lose ticket ms
    await nextTick
  }

  return { support, getProjectObject, normalize }
}
