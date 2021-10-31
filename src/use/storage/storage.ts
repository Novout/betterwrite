import isElectron from 'is-electron'
import { useEnv } from '../env'
import { useProjectStore } from '@/store/project'
import { useEditorStore } from '@/store/editor'
import { useLoggerStore } from '@/store/logger'
import { usePDFStore } from '@/store/pdf'
import { ProjectObject } from '@/types/project'

export const useStorage = () => {
  const PROJECT = useProjectStore()
  const EDITOR = useEditorStore()
  const LOGGER = useLoggerStore()
  const PDF = usePDFStore()

  const env = useEnv()

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

  return { support, getProjectObject }
}
