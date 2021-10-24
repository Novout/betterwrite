import { Plugin, PluginEmitter, PluginStores } from '@/types/plugin/core'
import { EntityInputInitial } from '../core/on'

export const LoggerPlugin = (): Plugin => {
  const init = (emitter: PluginEmitter, stores: PluginStores) => {
    /*
    EntityInputInitial(emitter, [(input: string) => {
      console.log(input)
    }])
    */
  }

  return { init }
}
