<template>
  <div
    ref="sw"
    v-provider-close
    v-provider-arrows
    :esc="onClose"
    :up="switcher.onUp"
    :down="switcher.onDown"
    class="fixed bg-rgba-blur z-50 w-60 text-theme-editor-extras-switcher-text hover:text-theme-editor-extras-switcher-text-hover active:text-theme-editor-extras-switcher-text-active bg-theme-editor-extras-switcher-background hover:bg-theme-editor-extras-switcher-background-hover active:bg-theme-editor-extras-switcher-background-active p-2 rounded shadow-2xl"
    :style="style"
  >
    <div
      class="flex flex-col w-full"
      @keypress.enter.prevent="switcher.onSwitcherAll"
    >
      <div class="flex items-center justify-between w-full mb-1 cursor-pointer">
        <div class="flex items-center">
          <div class="font-poppins">
            {{ switcher.state.actuallyLetterCounter }} /
            {{ switcher.state.maxLetterCounter }}
          </div>
          <IconUp
            class="text-2xs ml-2 wb-icon h-5 w-5"
            @click="switcher.onUp"
          />
          <IconDown class="text-2xs wb-icon h-5 w-5" @click="switcher.onDown" />
        </div>
        <div>
          <IconClose
            class="text-2xs wb-icon h-5 w-5"
            @click.prevent="onClose"
          />
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
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useAbsoluteStore } from '@/store/absolute'
  import { useDraggable } from '@vueuse/core'
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
</script>
