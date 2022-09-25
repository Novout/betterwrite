import { PluginTypes } from 'better-write-types'
import { useLanguageInitializer } from './initializer/language'
import { useHeadInitializer } from './initializer/head'
import { useDBInitializer } from './initializer/db'
import { usePluginInitializer } from './initializer/plugin'
import { useGlobalInitializer } from './initializer/global'
import { usePDFInitializer } from './initializer/theme'

export const useStart = (plugins: PluginTypes.Plugins) => {
  const language = useLanguageInitializer()
  const head = useHeadInitializer()
  const db = useDBInitializer()
  const plugin = usePluginInitializer()
  const global = useGlobalInitializer()
  const pdf = usePDFInitializer()

  const init = () => {
    global.init()
    language.init()
    head.init()
    db.init()
    plugin.init(plugins)
    pdf.init()
  }

  return { init }
}
