import { PluginEmitter } from '@/types/plugin/core'
import {
  PluginLoggerDefault,
  PluginLoggerEntitySwapper,
  PluginContentOn,
} from '@/types/plugin/on'

export const PluginEntityInputInitial = (
  emitter: PluginEmitter,
  content: PluginContentOn
) => {
  emitter.on('plugin-input-watch-initial', (item: PluginLoggerDefault) => {
    if (!item.data) return

    const created = content[0]

    created && created(item)
  })
}

export const PluginEntityInputLast = (
  emitter: PluginEmitter,
  content: PluginContentOn
) => {
  emitter.on('plugin-input-watch-last', (item: PluginLoggerDefault) => {
    if (!item.data) return

    const created = content[0]

    created && created(item)
  })
}

export const PluginEntityDelete = (
  emitter: PluginEmitter,
  content: PluginContentOn
) => {
  emitter.on('plugin-entity-delete', (index: number) => {
    if (!index) return

    const created = content[0]

    created && created(index)
  })
}

export const PluginEntitySwapper = (
  emitter: PluginEmitter,
  content: PluginContentOn
) => {
  emitter.on('plugin-entity-swap', (index: PluginLoggerEntitySwapper) => {
    if (!index) return

    const created = content[0]

    created && created(index)
  })
}
