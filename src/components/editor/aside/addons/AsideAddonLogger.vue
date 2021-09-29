<template>
  <AsideText
    class="wb-aside-button"
    :text="t('editor.aside.project.addons.logger.title')"
    :shortcuts="store.state.shortcuts.logger[0]"
    @click.prevent="onClick"
  >
  </AsideText>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import { useStore } from 'vuex'

  const store = useStore()
  const { t } = useI18n()

  const onClick = () => {
    store.commit('absolute/switchLogger', !store.state.absolute.logger)
  }
</script>
