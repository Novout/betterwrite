<template>
  <div
    ref="f"
    v-provider-arrows
    v-provider-close
    :up="finder.onUp"
    :down="finder.onDown"
    :esc="onClose"
    class="fixed bg-rgba-blur z-50 w-60 text-theme-editor-extras-finder-text hover:text-theme-editor-extras-finder-text-hover active:text-theme-editor-extras-finder-text-active bg-theme-editor-extras-finder-background hover:bg-theme-editor-extras-finder-background-hover active:bg-theme-editor-extras-finder-background-active p-2 rounded shadow-2xl"
    :style="style"
  >
    <div class="flex flex-col w-full">
      <div class="flex items-center justify-between w-full mb-1 cursor-pointer">
        <div class="flex items-center">
          <div class="font-poppins">
            {{ finder.state.actuallyLetterCounter }} /
            {{ finder.state.maxLetterCounter }}
          </div>
          <IconUp class="text-2xs ml-2 wb-icon h-5 w-5" @click="finder.onUp" />
          <IconDown class="text-2xs wb-icon h-5 w-5" @click="finder.onDown" />
        </div>
        <div>
          <IconClose
            class="text-2xs wb-icon h-5 w-5"
            @click.prevent="onClose"
          />
        </div>
      </div>
      <input
        ref="search"
        v-model="finder.state.entry"
        class="bg-transparent border border-theme-editor-extras-finder-border px-1 mb-1 placeholder-theme-editor-extras-finder-text"
        :placeholder="t('editor.text.placeholder.shortcuts.finderEntry')"
        @input="finder.onFinder"
        @keypress.enter.prevent="finder.onUp"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useAbsoluteStore } from '@/store/absolute'
  import { useDraggable } from '@vueuse/core'
  import { useExternalsStore } from '@/store/externals'
  import { useFinder } from '@/use/tools/finder'

  const ABSOLUTE = useAbsoluteStore()
  const EXTERNALS = useExternalsStore()

  const { t } = useI18n()
  const finder = useFinder()

  const f = ref<HTMLElement | null>(null)
  const search = ref<HTMLElement | null>(null)

  const { style } = useDraggable(f, {
    initialValue: { x: window.innerWidth / 2 - 120, y: window.innerHeight / 2 },
  })

  const onClose = () => {
    EXTERNALS.finder.close = true

    ABSOLUTE.shortcuts.finder = false
  }

  onMounted(() => {
    EXTERNALS.finder.value = ''

    search.value?.focus()
  })
</script>
