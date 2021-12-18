<template>
  <div class="flex justify-end items-center w-full relative py-1">
    <HeroIcon class="wb-icon" @click.prevent.stop="onClear">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-7 w-7"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M6.707 4.879A3 3 0 018.828 4H15a3 3 0 013 3v6a3 3 0 01-3 3H8.828a3 3 0 01-2.12-.879l-4.415-4.414a1 1 0 010-1.414l4.414-4.414zm4 2.414a1 1 0 00-1.414 1.414L10.586 10l-1.293 1.293a1 1 0 101.414 1.414L12 11.414l1.293 1.293a1 1 0 001.414-1.414L13.414 10l1.293-1.293a1 1 0 00-1.414-1.414L12 8.586l-1.293-1.293z"
          clip-rule="evenodd"
        />
      </svg>
    </HeroIcon>
    <HeroIcon class="wb-icon" @click.prevent.stop="ABSOLUTE.logger = false">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-7 w-7"
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
</template>

<script setup lang="ts">
  import { useAbsoluteStore } from '@/store/absolute'
  import { useLoggerStore } from '@/store/logger'
  import { useI18n } from 'vue-i18n'

  const ABSOLUTE = useAbsoluteStore()
  const LOGGER = useLoggerStore()

  const { t } = useI18n()

  const onClear = () => {
    if (window.confirm(t('editor.window.confirmClearLogger'))) {
      LOGGER.reset()
    }
  }
</script>
