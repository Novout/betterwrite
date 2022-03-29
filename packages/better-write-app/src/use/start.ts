import { useFormat } from './format'
import { useRoute } from 'vue-router'
import { useEnv } from './env'
import { useLoggerStore } from '@/store/logger'
import { useAuthStore } from '@/store/auth'
import { useAbsoluteStore } from '@/store/absolute'
import { useContextStore } from '@/store/context'
import { useEditorStore } from '@/store/editor'
import { usePDFStore } from '@/store/pdf'
import { useProjectStore } from '@/store/project'
import { useCore, usePlugin } from 'better-write-plugin-core'
import { PluginTypes } from 'better-write-types'
import { useFonts } from './google/fonts'
import { useDropbox } from './storage/dropbox'
import { useLocalStorage } from './storage/local'
import { useStorage } from './storage/storage'
import { useCreativeType } from './type/creative'
import { useDefines } from './defines'
import { useDestroy } from './destroy'
import { useEditor } from './editor'
import { useEntity } from './entity'
import { useFactory } from './factory'
import { useGraph } from './graph'
import { useInput } from './input'
import { usePage } from './page'
import { usePopulate } from './populate'
import { useProject } from './project'
import { useRaw } from './raw'
import { useScroll } from './scroll'
import { useUtils } from './utils'
import { VueI18nSEO } from 'better-write-localisation'
import { useI18n } from 'vue-i18n'
import useEmitter from './emitter'
import {
  useMouse,
  useNavigatorLanguage,
  usePageLeave,
  useTextSelection,
} from '@vueuse/core'
import { s } from '@/use/storage/supabase'
import { Session } from '@supabase/supabase-js'
import { computed, watch } from 'vue'
import { useHead } from '@vueuse/head'

export const useStart = () => {
  const ABSOLUTE = useAbsoluteStore()
  const EDITOR = useEditorStore()
  const AUTH = useAuthStore()

  const route = useRoute()
  const core = useCore()
  const plugin = usePlugin()
  const { x, y } = useMouse({ type: 'page' })
  const selection = useTextSelection()
  const isLeft = usePageLeave()
  const utils = useUtils()
  const nav = useNavigatorLanguage()
  const { t } = useI18n()
  const env = useEnv()

  // set global mouse tracking
  watch([x, y], ([_x, _y]) => {
    // @ts-ignore
    EDITOR.actives.global.mouse.x = _x
    // @ts-ignore
    EDITOR.actives.global.mouse.y = _y
    // @ts-ignore
    EDITOR.actives.global.mouse.vertical =
      // @ts-ignore
      window.innerHeight / 2 >= _y ? 'top' : 'bottom'

    EDITOR.actives.global.mouse.horizontal =
      // @ts-ignore
      window.innerWidth / 2 >= _x ? 'left' : 'right'
  })

  // for stop propagation problems in auto reset selection (contextmenu i.e)
  watch(selection.text, (_selection) => {
    // @ts-ignore
    if (!_selection) return

    EDITOR.actives.global.mouse.validLastSelection = true
  })

  // reset absolute variables in external case
  watch(isLeft, (_left) => {
    ABSOLUTE.entity.menu = false
  })

  const dropbox = () => {
    if (route.fullPath.includes('access_token')) {
      let str = ''
      let firstQuery = false
      let finish = false
      let intersection = 0

      for (let i = 0; i < route.fullPath.length; i++) {
        const letter = route.fullPath.charAt(i)

        if (finish) {
          AUTH.dropbox.accessToken = str

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

    const lang =
      localStorage.getItem('lang') ||
      utils.language().isoToCode(nav.language.value || 'en-US')

    if (!lang) return

    locale.value = lang
    ;(document.querySelector('html') as HTMLElement).lang = utils
      .language()
      .codeToIso(lang)
  }

  const head = () => {
    useHead({
      title: computed(() => t('seo.editor.title')),
      meta: [
        {
          name: 'description',
          content: computed(() => t('seo.editor.description')),
        },
        ...VueI18nSEO,
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@betterwriteio' },
        {
          name: 'twitter:title',
          content: computed(() => t('seo.editor.title')),
        },
        {
          name: 'twitter:description',
          content: computed(() => t('seo.editor.description')),
        },
        { name: 'twitter:image', content: env.getProdUrl() + '/logo.png' },
        {
          name: 'twitter:image:alt',
          content: computed(() => t('seo.editor.alt')),
        },
        {
          property: 'og:title',
          content: computed(() => t('seo.editor.title')),
        },
        {
          property: 'og:description',
          content: computed(() => t('seo.editor.description')),
        },
        { property: 'og:url', content: env.getProdUrl() },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: env.getProdUrl() + '/logo.png' },
        {
          property: 'og:image:alt',
          content: computed(() => t('seo.editor.alt')),
        },
        { property: 'og:image:width', content: '500' },
        { property: 'og:image:height', content: '500' },
      ],
    })
  }

  const supabase = () => {
    AUTH.account.user = s.auth.user()

    s.auth.onAuthStateChange((_, session) => {
      AUTH.account.user = (session as Session)?.user || null
    })
  }

  const init = async (plugins: PluginTypes.Plugins) => {
    lang()
    dropbox()
    head()
    supabase()
    await core.start(
      {
        ABSOLUTE: useAbsoluteStore(),
        AUTH: useAuthStore(),
        CONTEXT: useContextStore(),
        EDITOR: useEditorStore(),
        LOGGER: useLoggerStore(),
        PDF: usePDFStore(),
        PROJECT: useProjectStore(),
      } as any,
      plugins,
      {
        googleFonts: useFonts(),
        dropbox: useDropbox(),
        local: useLocalStorage(),
        storage: useStorage(),
        creative: useCreativeType(),
        defines: useDefines(),
        destroy: useDestroy(),
        editor: useEditor(),
        entity: useEntity(),
        env: useEnv(),
        factory: useFactory(),
        format: useFormat(),
        graph: useGraph(),
        input: useInput(),
        page: usePage(),
        populate: usePopulate(),
        project: useProject(),
        raw: useRaw(),
        scroll: useScroll(),
        start: useStart(),
        utils: useUtils(),
        i18n: useI18n(),
        emitter: useEmitter(),
      }
    )
    plugin.emit('plugin-pdf-init')
  }

  return { init }
}
