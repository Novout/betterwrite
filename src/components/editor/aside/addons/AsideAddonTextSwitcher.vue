<template>
  <AsideText
    class="wb-aside-button"
    :text="t('editor.aside.project.addons.textSwitcher.title')"
    :shortcuts="store.state.shortcuts.switcherRawText[0]"
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
    store.commit(
      'absolute/switchShortcutSwitcher',
      !store.state.absolute.shortcuts.switcher
    )
  }
</script>
