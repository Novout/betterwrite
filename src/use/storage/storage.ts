import isElectron from 'is-electron'
import { useEnv } from '../env'
import { useProjectStore } from '@/store/project'
import { useEditorStore } from '@/store/editor'
import { useLoggerStore } from '@/store/logger'
import { usePDFStore } from '@/store/pdf'
import { ProjectObject } from '@/types/project'
import { nextTick } from 'vue'
import useEmitter from '../emitter'
import { useDefines } from '../defines'

export const useStorage = () => {
  const PROJECT = useProjectStore()
  const EDITOR = useEditorStore()
  const LOGGER = useLoggerStore()
  const PDF = usePDFStore()

  const env = useEnv()
  const emitter = useEmitter()
  const defines = useDefines()

  const support = (project: any) => {
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
        platform: isElectron() ? 'desktop' : 'web',
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
    // force last input in emit content
    emitter.emit('entity-input-force-enter')

    await nextTick
    // close all entities for not breaking same index in next page
    emitter.emit('entity-edit-reset')

    await nextTick
  }

  return { support, getProjectObject, normalize }
}
