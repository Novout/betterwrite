<template>
  <section
    class="flex flex-col text-white items-center justify-between min-h-screen w-full bg-gray-900 bg-wb-landing"
  >
    <div
      class="flex-1 container mx-auto flex px-5 py-24 md:flex-row flex-col items-center"
    >
      <div class="lg:flex-grow w-full flex flex-col items-center text-center">
        <h1
          v-motion
          :initial="{ opacity: 0, y: -50 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: 300 } }"
          class="title-font font-bold md:text-5xl text-3xl mb-4"
        >
          {{ t('landing.first.title') }}
        </h1>
        <v-typical
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: 300 } }"
          class="mb-10 mt-2 leading-relaxed text-lg blink"
          :steps="[
            t('landing.first.typical.1'),
            1500,
            t('landing.first.typical.2'),
            150,
            t('landing.first.typical.3'),
            1500,
            t('landing.first.typical.3'),
            1500,
          ]"
          :loop="Infinity"
          :wrapper="'p'"
        ></v-typical>
        <div
          v-motion
          class="flex items-center justify-between w-1/2 lg:w-5/12 xl:w-1/3 mt-32"
          :initial="{ opacity: 0 }"
          :enter="{ opacity: 1, transition: { delay: 300 } }"
        >
          <router-link
            class="font-bold transition-colors shadow-xl w-full text-base md:text-lg px-6 py-3 md:px-5 md:py-5 rounded-full border border-gray-800 bg-black-opacity hover:bg-gray-900 text-gray-200 flex flex-col"
            to="/"
            ><div>
              {{ t('landing.first.editor.website') }}
            </div>
            <div class="text-xs">
              {{ version }}
            </div></router-link
          >
        </div>
      </div>
    </div>
    <LandingFooter />
  </section>
</template>

<script setup lang="ts">
  import { useEnv } from '@/use/env'
  import { computed } from 'vue'
  import { useI18n } from 'vue-i18n'
  import VTypical from 'vue-typical'

  const { t } = useI18n()
  const env = useEnv()

  const version = computed(() => `v${env.packageVersion()}`)
</script>
