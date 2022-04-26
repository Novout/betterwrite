<template>
  <div class="flex items-center w-full gap-5 wb-text my-6">
    <InputText
      v-model="state.old"
      class="flex-1 p-2 shadow-lg bg-theme-background-2 rounded-xl tracking-wider"
      :placeholder="t('editor.addons.substitutions.from')"
    />
    <InputText
      v-model="state.new"
      class="flex-1 p-2 shadow-lg bg-theme-background-2 rounded-xl tracking-wider"
      :placeholder="t('editor.addons.substitutions.to')"
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
    old: '',
    new: '',
  })

  const add = () => {
    if (!state.new || !state.old) return

    PROJECT.templates.substitutions.text.unshift({
      active: true,
      old: state.old,
      new: state.new,
    })

    state.new = ''
    state.old = ''
  }
</script>
