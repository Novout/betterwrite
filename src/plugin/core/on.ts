import { PluginEmitter } from '@/types/plugin/core'
import { PluginContentOn } from '@/types/plugin/on'

export const EntityInputInitial = (
  emitter: PluginEmitter,
  content: PluginContentOn
) => {
  emitter.on('plugin-input-watch-initial', (input: string) => {
    const created = content[0]

    created && created(input)
  })
}
