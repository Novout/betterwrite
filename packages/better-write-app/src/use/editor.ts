import { useContextStore } from '@/store/context'
import { useProjectStore } from '@/store/project'
import { useEntity } from '@/use/entity'
import { useEnv } from '@/use/env'
import { useProject } from '@/use/project'
import { useLocalStorage } from '@/use/storage/local'
import { useEventListener, useFullscreen } from '@vueuse/core'
import { useHead } from '@vueuse/head'
import { usePlugin } from 'better-write-plugin-core'
import { computed, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useListener } from './listener'
import { useAuthStore } from '@/store/auth'
import { useStorage } from './storage/storage'

export const useEditor = () => {
  const PROJECT = useProjectStore()
  const CONTEXT = useContextStore()
  const AUTH = useAuthStore()

  const env = useEnv()
  const project = useProject()
  const entity = useEntity()
  const local = useLocalStorage()
  const plugin = usePlugin()
  const listener = useListener()
  const { t } = useI18n()
  const { toggle } = useFullscreen()
  const router = useRouter()
  const storage = useStorage()

  const init = () => {
    if (!AUTH.account.user) router.push('/')

    onMounted(() => {
      project.onLoadProject()
    })

    useEventListener('beforeunload', () => {
      storage.normalize()
    })

    // tracking all auto-save cases
    watch(
      PROJECT.$state,
      () => {
        local.onSaveProject(false)
      },
      { deep: true }
    )
    // shortcuts
    listener.keyboard().start()

    // window events
    listener.window().start()

    // theme loader
    plugin.emit('plugin-theme-set')

    // dynamic head title
    const title = computed(() => t('seo.editor.title'))
    const description = computed(() => t('seo.editor.description'))
    const _title = computed(() =>
      PROJECT.nameRaw === env.projectEmpty() ||
      !CONTEXT.entities[0] ||
      CONTEXT.entities[0].raw === env.emptyLine() ||
      entity.utils().isFixed(0)
        ? title.value
        : PROJECT.nameRaw + ' - ' + CONTEXT.entities[0]?.raw
    )
    useHead({
      title: _title,
      meta: [
        {
          name: `description`,
          content: description,
        },
      ],
    })
  }

  const fullScreen = (): void => {
    toggle()
  }

  return { init, fullScreen }
}
