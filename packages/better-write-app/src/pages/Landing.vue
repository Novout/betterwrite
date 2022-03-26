<template>
  <main class="min-h-screen w-full">
    <section
      id="landing-base"
      :style="{ backgroundColor: '#1e293b' }"
      class="flex flex-col bg-theme-background-2 z-max text-white items-center justify-between min-h-screen w-full overflow-x-hidden"
    >
      <div
        v-if="webgl.isLoaded.value"
        class="flex-1 bg-theme-background-2 container mx-auto flex px-5 py-24 flex-col justify-center items-center z-50"
      >
        <div
          v-if="!isNecessaryLogin"
          class="lg:flex-grow w-full flex flex-col items-center text-center"
        >
          <div class="flex justify-start items-end">
            <img
              class="shadow-lg rounded-xs w-12 md:w-18"
              alt="Better Write Logo"
              src="/logo_default.svg"
            />
            <span
              class="ml-5 relative top-3 sm:top-4 lg:top-6 md:ml-10 text-3xl sm:text-4xl lg:text-5xl font-bold"
              >Better Write.</span
            >
          </div>
          <v-typical
            v-motion
            :initial="{ opacity: 0, y: 50 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 300 } }"
            class="mt-8 underline leading-relaxed text-lg blink max-w-11/12"
            :steps="[
              t('landing.first.typical.1'),
              2000,
              t('landing.first.typical.2'),
              150,
              t('landing.first.typical.3'),
              2000,
              t('landing.first.typical.3'),
              2000,
            ]"
            :loop="Infinity"
            :wrapper="'p'"
          ></v-typical>
          <div
            v-motion
            class="flex flex-col items-center justify-between w-1/2 lg:w-5/12 xl:w-1/3 mt-32"
            :initial="{ opacity: 0 }"
            :enter="{ opacity: 1, transition: { delay: 300 } }"
          >
            <button
              class="flex items-center justify-center font-bold transition-colors shadow-xl w-full text-base md:text-lg px-6 py-3 md:px-5 md:py-5 border border-gray-800 bg-black-opacity hover:bg-gray-900 text-gray-200 flex flex-col"
              @click.prevent.stop="onClick"
            >
              <div>
                {{ t('landing.first.editor.website') }}
              </div>
              <div class="text-xs">
                {{ version }}
              </div>
            </button>
          </div>
        </div>
        <AuthMain v-else />
      </div>
      <div
        v-else
        class="flex justify-center items-center h-screen w-full z-umax"
        :style="{ backgroundColor: '#1e293b' }"
      >
        <img
          class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg rounded-xs w-32 md:w-60 opacity-30"
          alt="Better Write Logo"
          src="/logo_default.svg"
        />
        <Spinner :width="100" :height="100" />
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
  import VTypical from 'vue-typical'
  import { useLanding } from '@/use/landing'
  import { useWebGL } from '@/use/webgl'
  import { useI18n } from 'vue-i18n'

  const { version, onClick, isNecessaryLogin } = useLanding()
  const { t } = useI18n()
  const webgl = useWebGL()

  webgl.init()
</script>
