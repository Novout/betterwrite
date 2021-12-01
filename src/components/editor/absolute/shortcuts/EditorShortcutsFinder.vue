<template>
  <Modal @close="onClose">
    <div
      ref="finder"
      class="fixed w-60 text-theme-editor-extras-finder-text hover:text-theme-editor-extras-finder-text-hover active:text-theme-editor-extras-finder-text-active bg-theme-editor-extras-finder-background hover:bg-theme-editor-extras-finder-background-hover active:bg-theme-editor-extras-finder-background-active p-2 rounded shadow-2xl"
      :style="style"
    >
      <div class="flex flex-col w-full">
        <div
          class="flex items-center justify-between w-full mb-1 cursor-pointer"
        >
          <div class="flex">
            <div class="font-poppins">
              {{ entity.fstate.actuallyLetterCounter }} /
              {{ entity.fstate.maxLetterCounter }}
            </div>
            <HeroIcon
              class="text-2xs ml-2 wb-icon"
              @click.prevent="entity.finder().onUp"
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
              @click.prevent="entity.finder().onDown"
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
          ref="search"
          v-model="entity.fstate.entry"
          class="bg-transparent border border-theme-editor-extras-finder-border px-1 mb-1 placeholder-theme-editor-extras-finder-text"
          :placeholder="t('editor.text.placeholder.shortcuts.finderEntry')"
          @input="entity.finder().onFinder"
          @keypress.enter.prevent="entity.finder().onUp"
        />
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useEntity } from '@/use/entity'
  import { useAbsoluteStore } from '@/store/absolute'
  import { MaybeElementRef, onClickOutside, useDraggable } from '@vueuse/core'

  const ABSOLUTE = useAbsoluteStore()

  const { t } = useI18n()
  const entity = useEntity()

  const finder = ref<HTMLElement | null>(null)
  const search = ref<HTMLElement | null>(null)

  const { style } = useDraggable(finder as any, {
    initialValue: { x: window.innerWidth / 2 - 120, y: window.innerHeight / 2 },
  })

  const onClose = () => {
    ABSOLUTE.shortcuts.finder = false
  }

  onMounted(() => {
    search.value?.focus()
  })

  onClickOutside(finder as MaybeElementRef, () => {
    onClose()
  })
</script>
