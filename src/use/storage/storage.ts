import isElectron from 'is-electron'
import { useEnv } from '../env'
export const useStorage = () => {
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

  return { support }
}
