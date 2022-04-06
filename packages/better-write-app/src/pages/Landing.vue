<template>
  <main class="min-h-screen w-full">
    <section
      id="landing-base"
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
          <div
            v-motion
            :initial="{ opacity: 0, y: -50 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 50 } }"
            class="flex justify-start items-end"
          >
            <img
              class="shadow-lg rounded-xs w-12 md:w-18"
              alt="Better Write Logo"
              src="/logo_default.svg"
            />
            <h1
              class="ml-5 relative top-3 sm:top-4 lg:top-6 md:ml-10 text-3xl sm:text-4xl lg:text-5xl font-bold"
            >
              Better Write.
            </h1>
          </div>
          <v-typical
            v-motion
            :initial="{ opacity: 0, y: 50 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 200 } }"
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
            :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 400 } }"
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
          <a
            v-motion
            :initial="{ opacity: 0 }"
            :enter="{ opacity: 1, transition: { delay: 500 } }"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/betterwrite"
            class="flex items-center gap-3 absolute bottom-0 right-0 p-5 cursor-pointer"
          >
            <HeroIcon class="text-gray-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                aria-hidden="true"
                role="img"
                class="iconify iconify--uiw"
                width="36"
                height="36"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 20 20"
              >
                <path
                  fill="currentColor"
                  d="M20 10.25c0 2.234-.636 4.243-1.908 6.027c-1.271 1.784-2.914 3.018-4.928 3.703c-.234.045-.406.014-.514-.093a.539.539 0 0 1-.163-.4V16.67c0-.863-.226-1.495-.677-1.895a8.72 8.72 0 0 0 1.335-.24c.394-.107.802-.28 1.223-.52a3.66 3.66 0 0 0 1.055-.888c.282-.352.512-.819.69-1.402c.178-.583.267-1.252.267-2.008c0-1.077-.343-1.994-1.028-2.75c.32-.81.286-1.717-.105-2.723c-.243-.08-.594-.03-1.054.147a6.94 6.94 0 0 0-1.198.587l-.495.32a9.03 9.03 0 0 0-2.5-.346a9.03 9.03 0 0 0-2.5.347a11.52 11.52 0 0 0-.553-.36c-.23-.143-.593-.314-1.088-.514c-.494-.2-.868-.26-1.12-.18c-.381 1.005-.412 1.912-.09 2.722c-.686.756-1.03 1.673-1.03 2.75c0 .756.09 1.423.268 2.002c.178.578.406 1.045.683 1.401a3.53 3.53 0 0 0 1.048.894c.421.24.83.414 1.224.52c.395.108.84.188 1.335.241c-.347.32-.56.779-.638 1.375a2.539 2.539 0 0 1-.586.2a3.597 3.597 0 0 1-.742.067c-.287 0-.57-.096-.853-.287c-.282-.192-.523-.47-.723-.834a2.133 2.133 0 0 0-.631-.694c-.256-.178-.471-.285-.645-.32l-.26-.04c-.182 0-.308.02-.378.06c-.07.04-.09.09-.065.153a.738.738 0 0 0 .117.187a.961.961 0 0 0 .17.16l.09.066c.192.09.38.259.567.508c.187.249.324.476.41.68l.13.307c.113.338.304.612.574.821c.269.21.56.343.872.4c.312.058.614.09.905.094c.29.004.532-.011.723-.047l.299-.053c0 .338.002.734.007 1.188l.006.72c0 .16-.056.294-.17.4c-.112.108-.286.139-.52.094c-2.014-.685-3.657-1.92-4.928-3.703C.636 14.493 0 12.484 0 10.25c0-1.86.447-3.574 1.341-5.145a10.083 10.083 0 0 1 3.64-3.73A9.6 9.6 0 0 1 10 0a9.6 9.6 0 0 1 5.02 1.375a10.083 10.083 0 0 1 3.639 3.73C19.553 6.675 20 8.391 20 10.25Z"
                ></path>
              </svg>
            </HeroIcon>
            <v-typical
              class="tracking-wide text-center text-sm md:text-lg blink"
              :steps="[
                t('landing.first.support'),
                10000,
                t('landing.first.support'),
              ]"
              :loop="Infinity"
              :wrapper="'p'"
            ></v-typical>
          </a>
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
  import { watch } from 'vue'

  const { version, onClick, isNecessaryLogin } = useLanding()
  const { t } = useI18n()
  const webgl = useWebGL()

  webgl.init()

  watch(isNecessaryLogin, (login) => {
    if (login) {
      setTimeout(() => {
        webgl.setCamera()
      }, 0)
    }
  })
</script>
