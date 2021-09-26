<template>
  <AsideText
    class="wb-aside-button"
    :text="t('editor.aside.project.load.title')"
    @click.prevent="onLoadProject"
  >
  </AsideText>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import { useLocalStorage } from '@/use/storage/local'
  import { useStore } from 'vuex'
  import { nextTick } from 'vue'

  const store = useStore()

  const onLoadProject = async () => {
    const context = useLocalStorage().getProject()

    if (!context) return

    store.commit('project/load', context.project)
    await nextTick

    store.commit('context/load', store.state.project.pages[0])
  }

  const { t } = useI18n()
</script>
