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
          class="shadow-winset dark:shadow-binset bg-transparent p-1"
        />
      </div>
      <div class="flex flex-col pt-3">
        <label>{{ t('editor.aside.project.new.creator') }}</label>
        <input
          v-model="creator"
          class="shadow-winset dark:shadow-binset bg-transparent p-1"
        />
      </div>
      <div class="flex flex-col pt-3">
        <label>{{ t('editor.aside.project.new.subject') }}</label>
        <input
          v-model="subject"
          class="shadow-winset dark:shadow-binset bg-transparent p-1"
        />
      </div>
      <div class="flex flex-col pt-3">
        <label>{{ t('editor.aside.project.new.version') }}</label>
        <input
          v-model="version"
          class="shadow-winset dark:shadow-binset bg-transparent p-1"
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
  const project = useProject()

  const name = ref(t('editor.aside.project.new.content.name'))
  const version = ref(t('editor.aside.project.new.content.version'))
  const creator = ref(t('editor.aside.project.new.content.creator'))
  const subject = ref(t('editor.aside.project.new.content.subject'))

  const onCreateProject = async () => {
    project.create({
      name: name.value,
      version: version.value,
      creator: creator.value,
      subject: subject.value,
    })
  }
</script>
