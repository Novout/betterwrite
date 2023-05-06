<template>
  <div
    v-if="TUTORIAL.counter === data.target"
    v-motion
    :initial="{ opacity: 0, y: 30 }"
    :enter="{ opacity: 1, y: 0 }"
    :delay="200"
    :class="[data.position]"
    class="absolute top-12 left-4 sm:(top-10 left-10) z-tutorial p-4 wb-text flex overflow-x-hidden break-words flex-col justify-between bg-rgba-blur bg-theme-background-2 w-11/12 sm:w-100 rounded-lg shadow-xl"
  >
    <div class="flex justify-between items-start w-full">
      <h2 class="font-poppins font-bold wb-text mb-5 text-lg">{{ title }}</h2>
      <HeroIcon class="wb-icon">
        <IconClose class="w-6 h-6" @click="onClose" />
      </HeroIcon>
    </div>
    <div
      class="flex font-raleway flex-col gap-2 w-full h-60 wb-scroll overflow-y-auto"
    >
      <slot />
    </div>
    <div class="flex flex-col gap-2 mt-5 w-full mb-5">
      <slot name="bottom" />
    </div>
    <div class="flex items-center justify-between w-full">
      <EditorTutorialButton v-if="TUTORIAL.counter !== 1" @click="onPrev">{{
        t('editor.tutorial.buttons.prev')
      }}</EditorTutorialButton>
      <p>{{ TUTORIAL.counter }} / {{ TUTORIAL.maxCounter }}</p>
      <EditorTutorialButton
        v-if="TUTORIAL.maxCounter > TUTORIAL.counter"
        @click="onNext"
        >{{ t('editor.tutorial.buttons.next') }}</EditorTutorialButton
      >
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useAbsoluteStore } from '@/store/absolute'
  import { useTutorialStore } from '@/store/tutorial'
  import { usePlugin } from 'better-write-plugin-core'
  import { PluginTypes } from 'better-write-types'
  import { computed, watch } from 'vue'
  import { useI18n } from 'vue-i18n'

  const ABSOLUTE = useAbsoluteStore()
  const TUTORIAL = useTutorialStore()

  const props = defineProps<{
    title: string
    data: {
      target: number
      position: string
    }
    emitOnOpen?: PluginTypes.PluginEmitterName
    emitOnClose?: PluginTypes.PluginEmitterName
  }>()

  const { t } = useI18n()
  const plugin = usePlugin()

  const onClose = () => {
    ABSOLUTE.project.tutorial = false
    TUTORIAL.$reset()
  }

  const onPrev = () => {
    TUTORIAL.prev()
  }

  const onNext = () => {
    if (props.emitOnClose) plugin.emit(props.emitOnClose)

    TUTORIAL.next()
  }

  watch(
    computed(() => TUTORIAL.counter),
    (value) => {
      if (value === props.data.target) {
        if (props.emitOnOpen) plugin.emit(props.emitOnOpen)

        return
      }
    }
  )
</script>
