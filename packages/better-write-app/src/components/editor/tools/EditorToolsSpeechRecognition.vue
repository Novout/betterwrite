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
      class="bg-theme-text-1 transition-colors hover:bg-theme-background-opacity-1 rounded-full shadow-lg"
    >
      <HeroIcon
        class="p-2 md:p-3 text-theme-background-1"
        @click.prevent.stop="onMicrophone"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          role="img"
          class="w-6 h-6 md:(w-7 h-7) lg:(w-8 h-8)"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 15 15"
        >
          <path
            fill="currentColor"
            d="M5 2.5a2.5 2.5 0 0 1 5 0v4a2.5 2.5 0 0 1-5 0v-4Z"
          ></path>
          <path
            fill="currentColor"
            d="M2 4v2.5a5.5 5.5 0 0 0 5 5.478V14H5v1h5v-1H8v-2.022A5.5 5.5 0 0 0 13 6.5V4h-1v2.5a4.5 4.5 0 0 1-9 0V4H2Z"
          ></path>
        </svg>
      </HeroIcon>
    </div>
    <div class="flex items-end justify-between flex-col ml-5">
      <div class="flex items-center justify-between w-full mb-1">
        <div
          class="w-1 h-1 p-3 rounded-full shadow-lg"
          :style="{
            backgroundColor: isListening ? '#E62B1C' : '#FFD935',
          }"
        />
        <HeroIcon class="wb-icon" @click.prevent.stop="onClose">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            class="w-8 h-8"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"
            ></path>
          </svg>
        </HeroIcon>
      </div>
      <InputSelect v-model="lang" class="wb-text" :arr="VueI18nAllISO" />
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
