import { PluginTypes } from 'better-write-types'
import { useLanguageInitializer } from './initializer/language'
import { useHeadInitializer } from './initializer/head'
import { useDBInitializer } from './initializer/db'
import { usePluginInitializer } from './initializer/plugin'
import { useGlobalInitializer } from './initializer/global'
import { useI18n } from 'vue-i18n'
import { useEnv } from './env'

export const useStart = (plugins: PluginTypes.Plugins) => {
  const language = useLanguageInitializer()
  const head = useHeadInitializer()
  const db = useDBInitializer()
  const plugin = usePluginInitializer()
  const global = useGlobalInitializer()
  const { t } = useI18n()
  const env = useEnv()

  const init = () => {
    global.init()
    language.init()
    head.init()
    db.init()
    plugin.init(plugins)

    if (!env.isDev()) {
      console.log(
        `%c ${t('plugin.logger.console.start')} github.com/Novout/betterwrite`,
        'padding: 0.75rem; text-align: center; font-size: 0.9rem; font-weight: 600; border-radius: 0.5rem; background: #eeeeee; color: #374151',
      )
    }
  }

  return { init }
}
