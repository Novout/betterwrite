import { On } from 'better-write-plugin-core'
import { PluginTypes } from 'better-write-types'
import { computed, ref, watch } from 'vue-demi'

export const CollectorSet = (
  emitter: PluginTypes.PluginEmitter,
  stores: PluginTypes.PluginStores,
  hooks: PluginTypes.PluginHooks
) => {
  const instance = ref<any>(null)

  On.externals().PluginVoiceStart(emitter, [
    (lang: string) => {
      const speech = hooks.vueuse.core.useSpeechRecognition({
        lang,
        continuous: true,
      })
      const { audioInputs: microphones } = hooks.vueuse.core.useDevicesList()

      const id = computed(() => stores.EDITOR.actives.entity.index)

      const { isListening, isSupported, stop, result, start } = speech

      const onStop = () => {
        stop()

        hooks.project.utils().resetAllVisual()
      }

      if (!isSupported.value) {
        hooks.toast(hooks.i18n.t('toast.generics.supported'))
        return
      }

      if (microphones.value.length === 0) {
        hooks.toast(hooks.i18n.t('toast.speech.microphone'))
        return
      }

      hooks.vueuse.core.tryOnMounted(() => {
        if (stores.CONTEXT.entities[id.value])
          stores.CONTEXT.entities[id.value].visual.warning = true
      })

      hooks.vueuse.core.tryOnUnmounted(() => {
        hooks.project.utils().resetAllVisual()
      })

      watch(isListening, () => {
        emitter.emit('plugin-voice-is-listening', isListening.value)
      })

      watch(result, (_result) => {
        emitter.emit('plugin-voice-mutate', { id: id.value, result: _result })
      })

      if (!isListening.value) {
        result.value = ''
        start()

        hooks.project.utils().resetAllVisual()

        stores.CONTEXT.entities[id.value].visual.warning = true

        return
      }

      onStop()
    },
    () => {},
  ])

  On.externals().PluginVoiceStop(emitter, [
    () => {
      instance.value?.stop()

      hooks.project.utils().resetAllVisual()

      stores.ABSOLUTE.tools.speechRecognition = false
    },
    () => {},
  ])
}
