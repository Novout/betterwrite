<template>
  <AsideText
    class="wb-aside-button"
    :text="t('editor.aside.project.new.title')"
    :shortcuts="store.state.shortcuts.newProject[0]"
    @click.prevent="store.commit('absolute/switchProjectCreate', true)"
  >
  </AsideText>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import { useStore } from 'vuex'

  const store = useStore()

  const { t } = useI18n()
</script>
