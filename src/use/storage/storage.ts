import isElectron from 'is-electron'
import { useEnv } from '../env'
import { useProjectStore } from '@/store/project'
import { useEditorStore } from '@/store/editor'
import { useLoggerStore } from '@/store/logger'
import { usePDFStore } from '@/store/pdf'
import { ProjectObject } from '@/types/project'
import { nextTick } from 'vue'
import useEmitter from '../emitter'

export const useStorage = () => {
  const PROJECT = useProjectStore()
  const EDITOR = useEditorStore()
  const LOGGER = useLoggerStore()
  const PDF = usePDFStore()

  const env = useEnv()
  const emitter = useEmitter()

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
