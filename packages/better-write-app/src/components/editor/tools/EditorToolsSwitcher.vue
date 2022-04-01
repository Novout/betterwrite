<template>
  <Modal @close="onClose">
    <div
      ref="sw"
      class="fixed w-60 text-theme-editor-extras-switcher-text hover:text-theme-editor-extras-switcher-text-hover active:text-theme-editor-extras-switcher-text-active bg-theme-editor-extras-switcher-background hover:bg-theme-editor-extras-switcher-background-hover active:bg-theme-editor-extras-switcher-background-active p-2 rounded shadow-2xl"
      :style="style"
    >
      <div
        class="flex flex-col w-full"
        @keypress.enter.prevent="switcher.onSwitcherAll"
      >
        <div
          class="flex items-center justify-between w-full mb-1 cursor-pointer"
        >
          <div>
            <HeroIcon
              :class="[
                switcher.state.equal
                  ? 'border border-theme-editor-extras-switcher-border'
                  : '',
              ]"
              class="text-2xs wb-icon"
              @click.prevent="switcher.state.equal = !switcher.state.equal"
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
              @click="switcher.onSwitcherAll"
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
          <div class="flex items-center">
            <div class="font-poppins">
              {{ switcher.state.actuallyLetterCounter }} /
              {{ switcher.state.maxLetterCounter }}
            </div>
            <HeroIcon
              class="text-2xs ml-2 wb-icon"
              @click="switcher.onUp"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </HeroIcon>
            <HeroIcon
              class="text-2xs wb-icon"
              @click="switcher.onDown"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z"
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
          v-model="switcher.state.entry"
          class="bg-transparent border border-theme-editor-extras-switcher-border px-1 mb-1 placeholder-theme-editor-extras-switcher-text"
          :placeholder="t('editor.text.placeholder.shortcuts.switcherEntry')"
          @input="switcher.onSwitcher"
          @keypress.enter.prevent="switcher.onUp"
        />
        <input
          v-model="switcher.state.output"
          class="bg-transparent border border-theme-editor-extras-switcher-border px-1 placeholder-theme-editor-extras-switcher-text"
          :placeholder="t('editor.text.placeholder.shortcuts.switcherOutput')"
        />
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useAbsoluteStore } from '@/store/absolute'
  import { onClickOutside, useDraggable } from '@vueuse/core'
import { useExternalsStore } from '@/store/externals'
import { useSwitcher } from '@/use/tools/switcher'

  const ABSOLUTE = useAbsoluteStore()
  const EXTERNALS = useExternalsStore()

  const { t } = useI18n()
  const switcher = useSwitcher()

  const sw = ref<HTMLElement | null>(null)
  const entry = ref<HTMLElement | null>(null)

  const { style } = useDraggable(sw, {
    initialValue: { x: window.innerWidth / 2 - 120, y: window.innerHeight / 2 },
  })

  const onClose = () => {
    EXTERNALS.switcher.close = true

    ABSOLUTE.shortcuts.switcher = false
  }

  onMounted(() => {
    EXTERNALS.switcher.value = ''

    entry.value?.focus()
  })

  onClickOutside(sw, () => {
    onClose()
  })
</script>
