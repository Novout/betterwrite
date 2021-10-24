import { useAuthStore } from '@/store/auth'
import { useEditorStore } from '@/store/editor'
import { useLoggerStore } from '@/store/logger'
import { usePDFStore } from '@/store/pdf'
import { useProjectStore } from '@/store/project'
import { useShortcutsStore } from '@/store/shortcuts'
import { PluginCore, Plugins } from '@/types/plugin/core'
import { Plugin } from '@/types/plugin/core'
import { useAbsoluteStore } from '@/store/absolute'
import { useContextStore } from '@/store/context'
import usePlugin from '@/use/plugin/core'

export const PluginRegister = (): PluginCore => {
  const ABSOLUTE = useAbsoluteStore()
  const AUTH = useAuthStore()
  const CONTEXT = useContextStore()
  const EDITOR = useEditorStore()
  const LOGGER = useLoggerStore()
  const PDF = usePDFStore()
  const PROJECT = useProjectStore()
  const SHORTCUTS = useShortcutsStore()

  const emitter = usePlugin()

  const start = (plugins?: Plugins) => {
    plugins?.forEach((plugin: Plugin) => {
      plugin.init(emitter, {
        ABSOLUTE,
        AUTH,
        CONTEXT,
        EDITOR,
        LOGGER,
        PDF,
        PROJECT,
        SHORTCUTS,
      })
    })
  }

  return { start }
}
