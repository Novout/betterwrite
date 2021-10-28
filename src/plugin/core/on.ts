import { PluginEmitter } from '@/types/plugin/core'
import {
  PluginLoggerDefault,
  PluginLoggerEntitySwapper,
  PluginContentOn,
  PluginCode,
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

export const PluginEntityCreate = (
  emitter: PluginEmitter,
  content: PluginContentOn
) => {
  emitter.on('plugin-entity-create', (obj: PluginLoggerDefault) => {
    if (!obj) return

    const created = content[0]

    created && created(obj)
  })
}

export const PluginProjectPageNew = (
  emitter: PluginEmitter,
  content: PluginContentOn
) => {
  emitter.on('plugin-project-page-new', (index: number) => {
    if (!index) return

    const created = content[0]

    created && created(index)
  })
}

export const PluginProjectPageDelete = (
  emitter: PluginEmitter,
  content: PluginContentOn
) => {
  emitter.on('plugin-project-page-delete', (name: string) => {
    if (!name) return

    const created = content[0]

    created && created(name)
  })
}

export const PluginProjectPageSwap = (
  emitter: PluginEmitter,
  content: PluginContentOn
) => {
  emitter.on('plugin-project-page-swap', (item: PluginLoggerEntitySwapper) => {
    if (item.index === -1) return

    const created = content[0]

    created && created(item)
  })
}

export const PluginAutoSave = (
  emitter: PluginEmitter,
  content: PluginContentOn
) => {
  emitter.on('plugin-auto-save', () => {
    const created = content[0]

    created && created()
  })
}

export const PluginDropboxSave = (
  emitter: PluginEmitter,
  content: PluginContentOn
) => {
  emitter.on('plugin-dropbox-save', (type: PluginCode) => {
    const created = content[0]
    const err = content[1]

    if (type === 'success') created && created()
    if (type === 'error') err && err()
  })
}
