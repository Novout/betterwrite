import { PluginEmitter } from '@/types/plugin/core'
import { PluginContentOn } from '@/types/plugin/on'

export const PluginEntityInputInitial = (
  emitter: PluginEmitter,
  content: PluginContentOn
) => {
  emitter.on('plugin-input-watch-initial', (input: string) => {
    if (!input) return

    const created = content[0]

    created && created(input)
  })
}

export const PluginEntityInputLast = (
  emitter: PluginEmitter,
  content: PluginContentOn
) => {
  emitter.on('plugin-input-watch-last', (input: string) => {
    if (!input) return

    const created = content[0]

    created && created(input)
  })
}
