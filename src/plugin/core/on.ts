import { PluginEmitter } from '@/types/plugin/core'
import {
  PluginLoggerDefault,
  PluginLoggerEntitySwapper,
  PluginContentOn,
  PluginCode,
} from '@/types/plugin/on'

export const entity = () => {
  const PluginEntityInputInitial = (
    emitter: PluginEmitter,
    content: PluginContentOn
  ) => {
    emitter.on('plugin-input-watch-initial', (item: PluginLoggerDefault) => {
      if (!item.data) return

      const created = content[0]

      created && created(item)
    })
  }

  const PluginEntityInputLast = (
    emitter: PluginEmitter,
    content: PluginContentOn
  ) => {
    emitter.on('plugin-input-watch-last', (item: PluginLoggerDefault) => {
      if (!item.data) return

      const created = content[0]

      created && created(item)
    })
  }

  const PluginEntityDelete = (
    emitter: PluginEmitter,
    content: PluginContentOn
  ) => {
    emitter.on('plugin-entity-delete', (index: number) => {
      if (!index) return

      const created = content[0]

      created && created(index)
    })
  }

  const PluginEntitySwapper = (
    emitter: PluginEmitter,
    content: PluginContentOn
  ) => {
    emitter.on('plugin-entity-swap', (index: PluginLoggerEntitySwapper) => {
      if (!index) return

      const created = content[0]

      created && created(index)
    })
  }

  const PluginEntityCreate = (
    emitter: PluginEmitter,
    content: PluginContentOn
  ) => {
    emitter.on('plugin-entity-create', (obj: PluginLoggerDefault) => {
      if (!obj) return

      const created = content[0]

      created && created(obj)
    })
  }

  const PluginEntityPageBreak = (
    emitter: PluginEmitter,
    content: PluginContentOn
  ) => {
    emitter.on('plugin-entity-page-break', (obj: PluginLoggerDefault) => {
      if (!obj) return

      const created = content[0]

      created && created(obj)
    })
  }

  return {
    PluginEntityCreate,
    PluginEntityDelete,
    PluginEntityInputInitial,
    PluginEntityInputLast,
    PluginEntitySwapper,
    PluginEntityPageBreak,
  }
}

export const project = () => {
  const PluginProjectPageNew = (
    emitter: PluginEmitter,
    content: PluginContentOn
  ) => {
    emitter.on('plugin-project-page-new', (index: number) => {
      if (!index) return

      const created = content[0]

      created && created(index)
    })
  }

  const PluginProjectPageDelete = (
    emitter: PluginEmitter,
    content: PluginContentOn
  ) => {
    emitter.on('plugin-project-page-delete', (name: string) => {
      if (!name) return

      const created = content[0]

      created && created(name)
    })
  }

  const PluginProjectPageSwap = (
    emitter: PluginEmitter,
    content: PluginContentOn
  ) => {
    emitter.on(
      'plugin-project-page-swap',
      (item: PluginLoggerEntitySwapper) => {
        if (item.index === -1) return

        const created = content[0]

        created && created(item)
      }
    )
  }

  return {
    PluginProjectPageDelete,
    PluginProjectPageNew,
    PluginProjectPageSwap,
  }
}

export const save = () => {
  const PluginAutoSave = (emitter: PluginEmitter, content: PluginContentOn) => {
    emitter.on('plugin-auto-save', () => {
      const created = content[0]

      created && created()
    })
  }

  const PluginDropboxSave = (
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

  return { PluginAutoSave, PluginDropboxSave }
}
