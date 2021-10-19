import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import { Callback } from '@/types/utils'
import { usePDF } from './pdf'
import { useFormat } from './format'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useEnv } from './env'
import i18n from '@/lang'

export const useStart: Callback<void> = () => {
  const store = useStore()
  const route = useRoute()
  const router = useRouter()
  const toast = useToast()
  const pdf = usePDF()
  const env = useEnv()
  const format = useFormat()
  const { t } = i18n.global

  const global = () => {
    let _log = console.log,
      _warn = console.warn,
      _error = console.error,
      _info = console.info

    console.log = function () {
      store.commit('logger/add', {
        type: 'system',
        method: 'log',
        arguments,
        createdAt: format.actually(),
      })
      return _log.apply(console, arguments as any)
    }

    console.warn = function () {
      store.commit('logger/add', {
        type: 'system',
        method: 'warn',
        arguments,
        createdAt: format.actually(),
      })
      return _warn.apply(console, arguments as any)
    }

    console.error = function () {
      store.commit('logger/add', {
        type: 'system',
        method: 'error',
        arguments,
        createdAt: format.actually(),
      })
      return _error.apply(console, arguments as any)
    }

    console.info = function () {
      store.commit('logger/add', {
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

      for (let i = 0; i < route.fullPath.length; i++) {
        const letter = route.fullPath.charAt(i)

        if (finish) {
          store.commit('auth/setDropboxToken', str)

          toast.success(t('toast.dropbox.load'))

          return
        }

        if (letter === '&') {
          firstQuery = false
          finish = true
        }

        if (firstQuery) {
          str += letter
        }

        if (letter === '=') firstQuery = true
      }
    }
  }

  const dark = () => {
    const dark = localStorage.getItem('theme')

    dark
      ? (document.querySelector('html') as HTMLElement).classList.add('dark')
      : (document.querySelector('html') as HTMLElement).classList.remove('dark')

    store.commit('editor/switchTheme', dark ? true : false)
  }

  const lang = () => {
    const { locale } = useI18n()
    const lang = localStorage.getItem('lang')

    if (!lang) return

    locale.value = lang
    ;(document.querySelector('html') as HTMLElement).lang = lang
  }

  const initial = () => {
    if (!localStorage.getItem(env.initialLoad())) {
      localStorage.setItem(env.initialLoad(), env.initialLoad())

      router.push('/landing')
    }
  }

  const init = () => {
    initial()
    global()
    dark()
    lang()
    auth()
    pdf.init()
  }

  return { init }
}
