import { PluginEmitter } from './core'
import mitt from 'mitt'

export const plugin = (): PluginEmitter => {
  return mitt() as PluginEmitter
}
