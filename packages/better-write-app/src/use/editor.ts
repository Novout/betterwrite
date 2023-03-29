import { useContextStore } from '@/store/context'
import { useProjectStore } from '@/store/project'
import { useEntity } from '@/use/entity'
import { useEnv } from '@/use/env'
import { useProject } from '@/use/project'
import { useLocalStorage } from '@/use/storage/local'
import {
  useEventListener,
  useFullscreen,
  useOnline,
  useUrlSearchParams,
} from '@vueuse/core'
import { useHead } from '@vueuse/head'
import { Calls, usePlugin } from 'better-write-plugin-core'
import { computed, onBeforeUnmount, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { onBeforeRouteLeave } from 'vue-router'
import { useListener } from './listener'
import { useStorage } from './storage/storage'
import { useEditorStore } from '@/store/editor'
import { useAbsoluteStore } from '@/store/absolute'
import { useSupabase } from './storage/supabase'

export const useEditor = () => {
  const ABSOLUTE = useAbsoluteStore()
  const PROJECT = useProjectStore()
  const EDITOR = useEditorStore()
  const CONTEXT = useContextStore()

  const env = useEnv()
  const project = useProject()
  const entity = useEntity()
  const local = useLocalStorage()
  const plugin = usePlugin()
  const listener = useListener()
  const { t } = useI18n()
  const { toggle } = useFullscreen()
  const storage = useStorage()
  const params = useUrlSearchParams()
  const cloud = useSupabase()
  const online = useOnline()

  const init = () => {
    Calls.EditorCreated(plugin)

    onMounted(() => {
      Calls.EditorMounted(plugin)

      if (params.context !== 'force')
        project.onLoadProject(undefined, false).then(() => {})
      else params.context = 'default'

      if (params.theme === 'custom' && EDITOR.styles.base.backgroundData)
        plugin.emit('plugin-theme-set', 'BetterWrite - Custom')
    })

    onBeforeUnmount(() => {
      Calls.EditorUnmounted(plugin)
    })

    const inForceSave = async () => {
      if (EDITOR.configuration.autosave) {
        await storage.normalize()
        await local.onSaveProject(false)
      }

      if (EDITOR.configuration.cloudAutosave && online.value) {
        await storage.normalize()
        await cloud.saveProject()
      }
    }

    useEventListener('beforeunload', async () => {
      await inForceSave()
    })

    onBeforeRouteLeave(async () => {
      await inForceSave()
    })

    // tracking normalize project cases
    watch(
      ABSOLUTE.$state,
      async () => {
        await storage.normalize()
      },
      { deep: true }
    )

    // shortcuts
    listener.keyboard().start()

    // window events
    listener.window().start()

    // editor emitter and events
    listener.editor().start()

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
        : PROJECT.nameRaw +
          (CONTEXT.entities[0]?.raw ? ' - ' : '') +
          CONTEXT.entities[0]?.raw
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
