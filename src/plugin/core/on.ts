import { PluginEmitter } from '@/types/plugin/core'
import { PluginContentOn } from '@/types/plugin/on'
import { PluginContentOnEntityInputLastOptions } from '@/types/plugin/on'

export const PluginEntityInputInitial = (
  emitter: PluginEmitter,
  content: PluginContentOn
) => {
  emitter.on(
    'plugin-input-watch-initial',
    (item: PluginContentOnEntityInputLastOptions) => {
      if (!item.data) return

      const created = content[0]

      created && created(item)
    }
  )
}

export const PluginEntityInputLast = (
  emitter: PluginEmitter,
  content: PluginContentOn
) => {
  emitter.on(
    'plugin-input-watch-last',
    (item: PluginContentOnEntityInputLastOptions) => {
      if (!item.data) return

      const created = content[0]

      created && created(item)
    }
  )
}
