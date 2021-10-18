<template>
  <AsideModal
    :title="t('editor.aside.project.new.title')"
    :button="t('editor.aside.project.new.title')"
    :confirm="t('editor.aside.project.new.confirm')"
    :complete="onCreateProject"
    :shortcut="store.state.shortcuts.newProject[0]"
  >
    <div class="w-96 h-96 flex flex-col overflow-y-auto">
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
      <div class="flex flex-col pt-3">
        <label>{{ t('editor.aside.project.new.type') }}</label>
        <div class="break-words">
          {{ typeDescription }}
        </div>
        <div class="flex flex-row flex-wrap items-center py-1 w-full">
          <AsideProjectNewType
            :is="type"
            :title="t('editor.aside.project.new.types.blank.title')"
            @click="onTypeClick('blank')"
          />
          <AsideProjectNewType
            :is="type"
            :title="t('editor.aside.project.new.types.creative.title')"
            @click="onTypeClick('creative')"
          />
        </div>
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

  const type = ref(t('editor.aside.project.new.types.blank.title'))
  const typeDescription = ref(t('editor.aside.project.new.types.blank.title'))

  const onTypeClick = (define: string) => {
    type.value = t(`editor.aside.project.new.types.${define}.title`)
    typeDescription.value = t(
      `editor.aside.project.new.types.${define}.description`
    )
  }

  const onCreateProject = async () => {
    const _type =
      {
        Blank: 'blank',
        'Em Branco': 'blank',
        Creative: 'creative',
        Criativo: 'creative',
      }[type.value] || 'blank'

    project.create({
      name: name.value,
      version: version.value,
      creator: creator.value,
      subject: subject.value,
      type: _type,
    })
  }
</script>
