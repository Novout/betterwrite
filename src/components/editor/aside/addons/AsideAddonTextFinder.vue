<template>
  <AsideText
    class="wb-aside-button"
    :text="t('editor.aside.project.addons.textFinder.title')"
    :shortcuts="store.state.shortcuts.finderRawText[0]"
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
      'absolute/switchShortcutFinder',
      !store.state.absolute.shortcuts.finder
    )
  }
</script>
