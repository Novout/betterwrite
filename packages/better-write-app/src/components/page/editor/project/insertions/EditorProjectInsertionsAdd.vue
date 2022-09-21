<template>
  <div class="flex items-center w-full gap-5 wb-text my-6 wb-text">
    <InputText
      v-model="state.key"
      class="p-2 shadow-lg bg-theme-background-2 rounded-xl tracking-wider placeholder-theme-text-1 w-full"
      :placeholder="t('editor.preferences.shortcuts.inserts.key')"
      @keydown="onInputKey"
    />
    <InputText
      v-model="state.value"
      class="p-2 shadow-lg bg-theme-background-2 rounded-xl tracking-wider placeholder-theme-text-1 w-full"
      :placeholder="t('editor.preferences.shortcuts.inserts.value')"
      @keyup.enter="add"
    />
    <IconAdd class="w-18 h-18 wb-icon" @click.prevent.stop="add" />
  </div>
</template>

<script setup lang="ts">
  import { reactive } from 'vue'
  import { useProjectStore } from '@/store/project'
  import { useI18n } from 'vue-i18n'

  const PROJECT = useProjectStore()

  const { t } = useI18n()

  const state = reactive({
    key: '',
    value: '',
  })

  const add = () => {
    if (!state.key || !state.value) return

    PROJECT.shortcuts.inserts.unshift({
      key: state.key,
      value: state.value,
    })

    state.key = ''
    state.value = ''
  }

  const onInputKey = (e: KeyboardEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.key) state.key = e.key
  }
</script>
