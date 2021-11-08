<template>
  <div class="fixed left-0 top-0 w-full h-screen bg-modal z-max">
    <div
      ref="switcher"
      class="fixed w-60 bg-white dark:bg-gray-800 p-2 rounded shadow-2xl"
      :style="style"
    >
      <div
        class="flex flex-col w-full"
        @keypress.enter.prevent="entity.swapper().onSwitcherAll"
      >
        <div
          class="flex items-center justify-between w-full mb-1 cursor-pointer"
        >
          <div>
            <HeroIcon
              :class="[
                entity.sstate.equal
                  ? 'border border-black dark:border-white'
                  : '',
              ]"
              class="text-2xs wb-icon"
              @click.prevent="entity.sstate.equal = !entity.sstate.equal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"
                />
                <path
                  d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"
                />
              </svg>
            </HeroIcon>
            <HeroIcon
              class="text-2xs wb-icon mx-1"
              @click.prevent="entity.swapper().onSwitcherAll"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                  clip-rule="evenodd"
                />
              </svg>
            </HeroIcon>
          </div>
          <div>
            <HeroIcon class="text-2xs wb-icon" @click.prevent="onClose">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </HeroIcon>
          </div>
        </div>
        <input
          ref="entry"
          v-model="entity.sstate.entry"
          class="bg-transparent border border-gray-900 px-1 mb-1 wb-text"
          :placeholder="t('editor.text.placeholder.shortcuts.switcherEntry')"
        />
        <input
          v-model="entity.sstate.output"
          class="bg-transparent border border-gray-900 px-1 wb-text"
          :placeholder="t('editor.text.placeholder.shortcuts.switcherOutput')"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useEntity } from '@/use/entity'
  import { onMounted, ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useAbsoluteStore } from '@/store/absolute'
  import { useDraggable } from '@vueuse/core'

  const ABSOLUTE = useAbsoluteStore()

  const { t } = useI18n()
  const entity = useEntity()

  const switcher = ref<HTMLElement | null>(null)
  const entry = ref<HTMLElement | null>(null)

  const { style } = useDraggable(switcher as any, {
    initialValue: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
  })

  const onClose = () => {
    ABSOLUTE.shortcuts.switcher = false
  }

  onMounted(() => {
    entry.value?.focus()
  })
</script>
