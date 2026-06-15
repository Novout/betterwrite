<template>
  <main
    class="wb-screen font-raleway w-full"
    :style="{ backgroundColor: '#1c2434' }"
  >
    <section
      id="landing-base"
      class="relative flex flex-col z-max text-white items-center justify-between min-h-screen w-full overflow-x-hidden"
    >
      <div class="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div
          v-for="col in bookColumns"
          :key="col.id"
          :class="col.responsiveClass"
          class="absolute top-0 flex-col justife- gap-3"
          :style="col.style"
        >
          <div
            v-for="(block, bi) in col.blocks"
            :key="bi"
            class="flex flex-col gap-1.5"
            :style="block.style"
          >
            <div
              v-for="(line, li) in block.lines"
              :key="li"
              class="rounded-full bg-white opacity-20"
              :style="{ width: line.width, height: line.height }"
            />
          </div>
        </div>
      </div>
      <div
        v-if="isLoaded"
        class="relative flex-1 container mx-auto flex px-5 py-24 flex-col justify-center items-center z-10"
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
              class="font-poppins font-bold ml-5 relative top-3 sm:top-4 lg:top-6 md:ml-10 text-3xl sm:text-4xl lg:text-5xl"
            >
              Better Write.
            </h1>
          </div>
          <v-typical
            v-motion
            :initial="{ opacity: 0, y: 50 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 200 } }"
            class="mt-8 font-raleway leading-relaxed text-lg blink max-w-11/12"
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
            class="flex items-center justify-center gap-3 w-1/2 lg:w-5/12 xl:w-1/3 mt-24 md:(mt-32)"
            :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 400 } }"
          >
            <button
              class="flex text-gray-200 items-center text-lg rounded-full gap-2 transition-colors bg-gradient-to-br from-gray-300 to-gray-400 hover:from-gray-400 hover:to-gray-300 text-black px-7 py-3.5 md:(px-8 py-4) shadow-xl transition-colors font-bold"
              @click.prevent.stop="router.push('/about')"
            >
              <p class="hidden md:inline-block">
                {{ t('landing.first.editor.about') }}
              </p>
              <IconHelp class="w-6 h-6" />
            </button>
            <button
              class="flex text-gray-200 items-center text-lg rounded-full gap-2 transition-colors bg-gradient-to-br from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-900 px-7 py-3.5 md:(px-8 py-4) shadow-xl transition-colors font-bold"
              @click.prevent.stop="onClick"
            >
              {{ t('landing.first.editor.website') }}
              <IconAccess class="w-6 h-6" />
            </button>
          </div>
          <a
            v-motion
            :initial="{ opacity: 0 }"
            :enter="{ opacity: 1, transition: { delay: 500 } }"
            class="absolute bottom-0 right-35"
            href="https://play.google.com/store/apps/details?id=io.betterwrite.twa&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"
            ><img
              alt="Get it on Google Play"
              width="200"
              height="100"
              src="/google-play-badge.png"
          /></a>
          <a
            v-motion
            :initial="{ opacity: 0 }"
            :enter="{ opacity: 1, transition: { delay: 500 } }"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/Novout/betterwrite"
            class="flex font-raleway items-center gap-3 absolute bottom-0 right-0 p-5 cursor-pointer"
          >
            <IconGithub class="text-gray-200 w-9 h-9" />
          </a>
          <a
            v-motion
            :initial="{ opacity: 0 }"
            :enter="{ opacity: 1, transition: { delay: 500 } }"
            target="_blank"
            rel="noopener noreferrer"
            href="https://twitter.com/betterwriteio"
            class="flex font-raleway items-center gap-3 absolute bottom-0 right-15 p-5 cursor-pointer"
          >
            <IconTwitter class="text-gray-200 w-9 h-9" />
          </a>
        </div>
        <AuthMain v-else @close="isNecessaryLogin = false" />
      </div>
      <LoadingScreen v-else />
    </section>
  </main>
</template>

<script setup lang="ts">
  import VTypical from 'vue-typical'
  import { useLanding } from '@/use/landing'
  import { useI18n } from 'vue-i18n'
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { tryOnMounted, tryOnUnmounted } from '@vueuse/core'
  import { usePlugin } from 'better-write-plugin-core'

  const isLoaded = ref(true)
  const { onClick, isNecessaryLogin } = useLanding()
  const { t } = useI18n()
  const router = useRouter()
  const plugin = usePlugin()

  plugin.emit('call-landing-created')

  tryOnMounted(() => {
    plugin.emit('call-landing-mounted')
  })

  tryOnUnmounted(() => {
    plugin.emit('call-landing-unmounted')
  })

  const rand = (min: number, max: number) =>
    Math.random() * (max - min) + min

  interface BookBlock {
    lines: { width: string; height: string }[]
    style: string
  }

  interface BookColumn {
    id: number
    blocks: BookBlock[]
    style: string
    responsiveClass: string
  }

  const NUM_COLUMNS = 9

  const bookColumns = Array.from({ length: NUM_COLUMNS }, (_, i): BookColumn => {
    const leftPct = (i / NUM_COLUMNS) * 100 + rand(-2, 2)
    const duration = rand(18, 32)
    const delay = rand(-duration, 0)
    const maxOpacity = rand(0.07, 0.16)

    const blocks: BookBlock[] = Array.from({ length: rand(5, 15) | 0 }, () => {
      const lineCount = (rand(2, 7) | 0)
      const blockDelay = rand(0, 8)
      const blockFadeDuration = rand(3, 6)

      return {
        lines: Array.from({ length: lineCount }, (_, li) => {
          const isLast = li === lineCount - 1
          return {
            width: isLast ? `${rand(40, 75)}%` : `${rand(85, 100)}%`,
            height: '2px',
          }
        }),
        style: [
          `animation: bookFadeInOut ${blockFadeDuration}s ${blockDelay}s ease-in-out infinite alternate`,
          `--max-op: ${maxOpacity}`,
        ].join(';'),
      }
    })

    // mobile: 3 cols, sm: 5 cols, lg: all 9
    const responsiveClass =
      i < 3 ? 'flex' : i < 5 ? 'hidden sm:flex' : 'hidden lg:flex'

    return {
      id: i,
      blocks,
      responsiveClass,
      style: [
        `left: ${leftPct}%`,
        `width: ${rand(60, 110)}px`,
        `animation: bookDrift ${duration}s ${delay}s linear infinite`,
      ].join(';'),
    }
  })
</script>

<style scoped>
@keyframes bookDrift {
  from {
    transform: translateY(110vh) rotate(-1.5deg);
  }
  to {
    transform: translateY(-20vh) rotate(1.5deg);
  }
}

@keyframes bookFadeInOut {
  from {
    opacity: 0;
  }
  to {
    opacity: var(--max-op, 0.12);
  }
}
</style>
