<template>
  <div
    id="tools-speech-recognition"
    ref="spc"
    v-motion
    :initial="{ opacity: 0 }"
    :enter="{ opacity: 1 }"
    :delay="0"
    class="flex bg-theme-background-3 items-center justify-center absolute z-50 right-0 transform m-5 p-2 shadow-lg w-60 absolute transform -translate-y-1/2 top-1/2"
  >
    <div
      :class="[isListening ? 'bg-theme-background-3' : 'bg-theme-text-1']"
      class="transition-colors rounded-full shadow-lg p-2 cursor-pointer"
    >
      <IconMicrophone
        class="text-theme-background-1 transition-colors w-7 h-7 md:(w-8 h-8)"
        @click.prevent.stop="onMicrophone"
      />
    </div>
    <div class="flex items-end justify-between flex-col ml-5">
      <div class="flex items-center justify-end w-full mb-1">
        <IconClose class="wb-icon w-8 h-8" @click.prevent.stop="onClose" />
      </div>
      <div class="flex w-full">
        <InputSelect v-model="lang" class="wb-text" :arr="VueI18nAllISO" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useAbsoluteStore } from '@/store/absolute'
  import { useContextStore } from '@/store/context'
  import { useEditorStore } from '@/store/editor'
  import useEmitter from '@/use/emitter'
  import { useProject } from '@/use/project'
  import {
    tryOnMounted,
    tryOnUnmounted,
    useDevicesList,
    useSpeechRecognition,
  } from '@vueuse/core'
  import { VueI18nAllISO } from 'better-write-localisation'
  import { computed, onMounted, ref, watch } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useToast } from 'vue-toastification'

  const ABSOLUTE = useAbsoluteStore()
  const CONTEXT = useContextStore()
  const EDITOR = useEditorStore()

  const spc = ref<HTMLElement | null>(null)
  const lang = ref<string>(VueI18nAllISO[0])

  const emitter = useEmitter()
  const toast = useToast()
  const { t } = useI18n()
  const project = useProject()

  const speech = useSpeechRecognition({
    lang,
    continuous: true,
  })
  const { audioInputs: microphones } = useDevicesList()

  const id = computed(() => EDITOR.actives.entity.index)

  const { isListening, isSupported, stop, result, start } = speech

  onMounted(() => {
    if (!isSupported) {
      toast(t('toast.generics.supported'))

      ABSOLUTE.tools.speechRecognition = false
    }
  })

  const onClose = () => {
    onStop()

    ABSOLUTE.tools.speechRecognition = false
  }

  const onStop = () => {
    stop()

    project.utils().resetAllVisual()
  }

  const onMicrophone = () => {
    if (!isSupported) {
      toast(t('toast.generics.supported'))
      return
    }

    if (microphones.value.length === 0) {
      toast(t('toast.speech.microphone'))
      return
    }

    if (!isListening.value) {
      result.value = ''
      start()

      project.utils().resetAllVisual()

      CONTEXT.entities[id.value].visual.warning = true

      return
    }

    onStop()
  }

  tryOnMounted(() => {
    CONTEXT.entities[id.value].visual.warning = true
  })

  tryOnUnmounted(() => {
    project.utils().resetAllVisual()
  })

  watch(lang, () => {
    if (isListening.value) stop()
  })

  watch(result, (_result) => {
    emitter.emit('entity-speech-recognition', { id: id.value, result: _result })
  })
</script>
