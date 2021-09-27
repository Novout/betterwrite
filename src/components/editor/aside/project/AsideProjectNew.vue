<template>
  <AsideModal
    :title="t('editor.aside.project.new.title')"
    :button="t('editor.aside.project.new.title')"
    :confirm="t('editor.aside.project.new.confirm')"
    :complete="onCreateProject"
    :shortcut="store.state.shortcuts.newProject[0]"
  >
    <div class="w-full flex flex-col">
      <div class="flex flex-col pt-3">
        <label>{{ t('editor.aside.project.new.name') }}</label>
        <input
          v-model="name"
          class="
            wp-shadow
            bg-gray-200
            focus:bg-gray-400
            dark:bg-gray-600 dark:focus:bg-gray-800
            p-1
          "
        />
      </div>
      <div class="flex flex-col pt-3">
        <label>{{ t('editor.aside.project.new.version') }}</label>
        <input
          v-model="version"
          class="
            wp-shadow
            bg-gray-200
            focus:bg-gray-400
            dark:bg-gray-600 dark:focus:bg-gray-800
            p-1
          "
        />
      </div>
    </div>
  </AsideModal>
</template>

<script setup lang="ts">
  import { useProject } from '@/use/project'
  import { ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useStore } from 'vuex'

  const { t } = useI18n()
  const store = useStore()

  const name = ref(t('editor.aside.project.new.content.name'))
  const version = ref(t('editor.aside.project.new.content.version'))

  const onCreateProject = async () => {
    useProject(store).onCreateProject({
      name: name.value,
      version: version.value,
    })
  }
</script>
