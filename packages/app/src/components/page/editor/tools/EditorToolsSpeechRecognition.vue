<template>
  <div
    id="tools-speech-recognition"
    ref="spc"
    v-motion
    :initial="{ opacity: 0 }"
    :enter="{ opacity: 1 }"
    :delay="0"
    class="flex z-50 bg-rgba-blur bg-theme-background-3 items-center justify-center absolute z-50 right-0 transform m-5 p-2 shadow-lg w-72 absolute transform -translate-y-1/2 top-1/2"
  >
    <div
      :class="[listening ? 'bg-theme-background-3' : 'bg-theme-text-1']"
      class="transition-colors rounded-full shadow-lg p-2 cursor-pointer flex-shrink-0"
    >
      <IconMicrophone
        class="text-theme-background-1 transition-colors w-7 h-7 md:(w-8 h-8)"
        @click.prevent.stop="plugin.emit('plugin-voice-start', lang, selectedDeviceId || undefined)"
      />
    </div>
    <div class="flex items-end justify-between flex-col ml-5 flex-1 gap-1">
      <div class="flex items-center justify-end w-full">
        <IconClose
          class="wb-icon w-8 h-8"
          @click.prevent.stop="plugin.emit('plugin-voice-stop')"
        />
      </div>
      <div class="flex w-full">
        <InputSelect v-model="selectedDeviceId" class="wb-text" :arr="[t('editor.tools.speechRecognition.defaultMic'), ...microphones]" />
      </div>
      <div class="flex w-full">
        <InputSelect v-model="lang" class="wb-text" :arr="VueI18nAllISO" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import useEmitter from '@/use/emitter'
  import { VueI18nAllISO } from 'better-write-languages'
  import { usePlugin } from 'better-write-plugin-core'
  import { onMounted, ref, computed } from 'vue'
  import { useDevicesList } from '@vueuse/core'
  import { useI18n } from 'vue-i18n'

  const plugin = usePlugin()
  const emitter = useEmitter()
  const { t } = useI18n()

  const { audioInputs } = useDevicesList({ requestPermissions: true })
  const microphones = computed(() =>
    audioInputs.value.filter((d) => d.deviceId && d.deviceId !== 'default'),
  )

  const lang = ref<string>(VueI18nAllISO[0])
  const selectedDeviceId = ref<string>(t('editor.tools.speechRecognition.defaultMic'))
  const listening = ref<boolean>(false)

  onMounted(() => {
    plugin.on('plugin-voice-mutate', (obj) => {
      emitter.emit('entity-speech-recognition', obj)
    })

    plugin.on('plugin-voice-is-listening', (isListening) => {
      listening.value = isListening
    })
  })
</script>
