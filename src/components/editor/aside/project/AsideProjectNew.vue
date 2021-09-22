<template>
  <AsideModal
    :title="t('editor.aside.project.new.title')"
    :content="t('editor.aside.project.new.title')"
    :button="t('editor.aside.project.new.title')"
    :confirm="t('editor.aside.project.new.confirm')"
    :complete="onCreateProject"
  >
    <div class="w-full flex flex-col">
      <div class="flex flex-col pt-3">
        <label>{{ t('editor.aside.project.new.name') }}</label>
        <input v-model="name" class="bg-transparent border p-1" />
      </div>
      <div class="flex flex-col pt-3">
        <label>{{ t('editor.aside.project.new.version') }}</label>
        <input v-model="version" class="bg-transparent border p-1" />
      </div>
    </div>
  </AsideModal>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()

  const name = ref(t('editor.aside.project.new.content.name'))
  const version = ref(t('editor.aside.project.new.content.version'))

  const onCreateProject = () => {
    console.log('kekw')
  }
</script>
