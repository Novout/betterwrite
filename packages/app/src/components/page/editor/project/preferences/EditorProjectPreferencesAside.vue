<template>
  <aside
    class="flex wb-text items-center justify-between flex-col w-full sm:w-40 shadow-xl"
  >
    <div
      class="flex shadow transition-colors flex-1 gap-2 justify-between px-3 items-center w-full cursor-pointer hover:bg-theme-background-opacity-1"
      @click="emit('section', 0)"
    >
      <div>
        <IconFile class="w-7 h-7" />
      </div>
      <p>{{ t('editor.preferences.project.title') }}</p>
    </div>
    <div
      class="flex shadow transition-colors flex-1 gap-2 justify-between px-3 items-center w-full cursor-pointer hover:bg-theme-background-opacity-1"
      @click="emit('section', 1)"
    >
      <div>
        <IconGear class="w-7 h-7" />
      </div>
      <p>{{ t('editor.preferences.configuration.title') }}</p>
    </div>
    <div
      class="flex shadow transition-colors flex-1 gap-2 justify-between px-3 items-center w-full cursor-pointer hover:bg-theme-background-opacity-1"
      @click="emit('section', 2)"
    >
      <div>
        <IconDraw class="w-7 h-7" />
      </div>
      <p>{{ t('editor.preferences.styles.title') }}</p>
    </div>
    <div
      class="flex shadow transition-colors flex-1 gap-2 justify-between px-3 items-center w-full cursor-pointer hover:bg-theme-background-opacity-1"
      @click="emit('section', 3)"
    >
      <div>
        <IconKeyboard class="w-7 h-7" />
      </div>
      <p>{{ t('editor.preferences.keyboard.title') }}</p>
    </div>
  </aside>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n'

  const emit = defineEmits(['section'])

  const { t } = useI18n()
</script>
