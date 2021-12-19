import { Callback } from 'better-write-types'
import { usePDF } from './pdf'
import { useFormat } from './format'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useEnv } from './env'
import { useLoggerStore } from '@/store/logger'
import { useAuthStore } from '@/store/auth'
import { useAbsoluteStore } from '@/store/absolute'
import { useContextStore } from '@/store/context'
import { useEditorStore } from '@/store/editor'
import { usePDFStore } from '@/store/pdf'
import { useProjectStore } from '@/store/project'
import { useShortcutsStore } from '@/store/shortcuts'
import { useCore } from 'better-write-plugin-core'
import { PluginTypes } from 'better-write-types'
import { useFonts } from './google/fonts'
import { useDropbox } from './storage/dropbox'
import { useLocalStorage } from './storage/local'
import { useStorage } from './storage/storage'
import { useCreativeType } from './type/creative'
import { useDefines } from './defines'
import { useDestroy } from './destroy'
import { useDocx } from './docx'
import { useEditor } from './editor'
import { useEntity } from './entity'
import { useFactory } from './factory'
import { useGraph } from './graph'
import { useInput } from './input'
import { useKeyboard } from './keyboard'
import { usePage } from './page'
import { usePopulate } from './populate'
import { useProject } from './project'
import { useRaw } from './raw'
import { useScroll } from './scroll'
import { useUtils } from './utils'
import i18n from '@/lang'
import { useI18n } from 'vue-i18n'

export const useStart: Callback<void> = () => {
  const LOGGER = useLoggerStore()
  const AUTH = useAuthStore()

  const route = useRoute()
  const router = useRouter()
  const toast = useToast()
  const pdf = usePDF()
  const env = useEnv()
  const format = useFormat()
  const plugin = useCore()
  const { t } = i18n.global

  const global = () => {
    let _log = console.log,
      _warn = console.warn,
      _error = console.error,
      _info = console.info

    console.log = function () {
      LOGGER.add({
        type: 'system',
        method: 'log',
        arguments,
        createdAt: format.actually(),
      })

      return _log.apply(console, arguments as any)
    }

    console.warn = function () {
      LOGGER.add({
        type: 'system',
        method: 'warn',
        arguments,
        createdAt: format.actually(),
      })

      return _warn.apply(console, arguments as any)
    }

    console.error = function () {
      LOGGER.add({
        type: 'system',
        method: 'error',
        arguments,
        createdAt: format.actually(),
      })

      return _error.apply(console, arguments as any)
    }

    console.info = function () {
      LOGGER.add({
        type: 'system',
        method: 'info',
        arguments,
        createdAt: format.actually(),
      })

      return _info.apply(console, arguments as any)
    }
  }

  const auth = () => {
    if (route.fullPath.includes('access_token')) {
      let str = ''
      let firstQuery = false
      let finish = false
      let intersection = 0

      for (let i = 0; i < route.fullPath.length; i++) {
        const letter = route.fullPath.charAt(i)

        if (finish) {
          AUTH.dropbox.accessToken = str

          toast.success(t('toast.dropbox.load'))

          return
        }

        if (letter === '&' && intersection === 1) {
          firstQuery = false
          finish = true
        }

        if (firstQuery) {
          str += letter
        }

        if (letter === '=') intersection++

        if (letter === '=' && intersection === 1) {
          firstQuery = true
        }
      }
    }
  }

  const lang = () => {
    const { locale } = useI18n()
    const lang = localStorage.getItem('lang')

    if (!lang) return

    locale.value = lang

    const iso =
      {
        en: 'en-US',
        br: 'pt-BR',
      }[lang] || 'en-US'

    ;(document.querySelector('html') as HTMLElement).lang = iso
  }

  const initial = () => {
    if (!localStorage.getItem(env.initialLoad())) {
      localStorage.setItem(env.initialLoad(), env.initialLoad())

      router.push('/landing')
    }
  }

  const init = (plugins: PluginTypes.Plugins) => {
    lang()
    auth()
    initial()
    pdf.init()
    plugin.start(
      {
        ABSOLUTE: useAbsoluteStore(),
        AUTH: useAuthStore(),
        CONTEXT: useContextStore(),
        EDITOR: useEditorStore(),
        LOGGER: useLoggerStore(),
        PDF: usePDFStore(),
        PROJECT: useProjectStore(),
        SHORTCUTS: useShortcutsStore(),
      },
      plugins,
      {
        googleFonts: useFonts(),
        dropbox: useDropbox(),
        local: useLocalStorage(),
        storage: useStorage(),
        creative: useCreativeType(),
        defines: useDefines(),
        destroy: useDestroy(),
        docx: useDocx(),
        editor: useEditor(),
        entity: useEntity(),
        env: useEnv(),
        factory: useFactory(),
        format: useFormat(),
        graph: useGraph(),
        input: useInput(),
        keyboard: useKeyboard(),
        page: usePage(),
        pdf: usePDF(),
        populate: usePopulate(),
        project: useProject(),
        raw: useRaw(),
        scroll: useScroll(),
        start: useStart(),
        utils: useUtils(),
        i18n: i18n.global,
      }
    )

    if (!env.isDev()) global()
  }

  return { init }
}
