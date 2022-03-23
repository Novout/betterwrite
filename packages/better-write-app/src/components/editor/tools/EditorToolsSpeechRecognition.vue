<template>
  <div
    id="tools-speech-recognition"
    v-motion
    :initial="{ opacity: 0 }"
    :enter="{ opacity: 1 }"
    :delay="0"
    class="flex bg-theme-background-3 items-center justify-center absolute transform -translate-y-1/2 top-1/2 z-20 right-0 transform m-5 p-2 shadow-lg"
  >
    <div
      class="bg-theme-text-1 transition-colors hover:bg-theme-background-opacity-1 rounded-full shadow-lg"
    >
      <HeroIcon class="p-2 md:p-3">
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
          class="w-1 h-1 p-3 rounded-full"
          :style="{
            backgroundColor: speech.isListening.value ? '#E62B1C' : '#FFD935',
          }"
        />
        <HeroIcon
          class="wb-icon"
          @click.prevent.stop="ABSOLUTE.tools.speechRecognition = false"
        >
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
      <InputSelect v-model="iso" class="wb-text" :arr="VueI18nAllISO" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useAbsoluteStore } from '@/store/absolute'
  import { useSpeechRecognition } from '@vueuse/core'
  import { VueI18nAllISO } from 'better-write-localisation'
  import { ref, watch } from 'vue'

  const ABSOLUTE = useAbsoluteStore()

  const iso = ref<string>(VueI18nAllISO[0])

  let speech = useSpeechRecognition({
    lang: iso.value,
    continuous: true,
  })

  watch(iso, (_iso) => {
    speech = useSpeechRecognition({
      lang: _iso,
      continuous: true,
    })
  })
</script>
