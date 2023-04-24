<template>
  <div class="flex items-center w-full gap-5 wb-text my-6 wb-text">
    <InputText
      v-model="state.data"
      class="flex-1 p-2 shadow-lg bg-theme-background-2 rounded-xl tracking-wider placeholder-theme-text-1"
      :placeholder="t('editor.addons.substitutions.from')"
      @keyup.enter="add"
    />
    <IconAdd class="w-7 h-7 wb-icon" @click.prevent.stop="add" />
  </div>
</template>

<script setup lang="ts">
  import { reactive } from 'vue'
  import { useProjectStore } from '@/store/project'
  import { useI18n } from 'vue-i18n'

  const PROJECT = useProjectStore()

  const { t } = useI18n()

  const state = reactive({
    data: '',
  })

  const add = () => {
    if (!state.data) return

    PROJECT.templates.substitutions.italic.unshift({
      active: true,
      data: state.data,
    })

    state.data = ''
  }
</script>
