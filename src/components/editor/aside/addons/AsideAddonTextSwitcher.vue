<template>
  <AsideText
    class="wb-aside-button"
    :text="t('editor.aside.project.addons.textSwitcher.title')"
    :shortcuts="SHORTCUTS.switcherRawText[0]"
    @click.prevent="onClick"
  >
  </AsideText>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import { useAbsoluteStore } from '@/store/absolute'
  import { useShortcutsStore } from '@/store/shortcuts'

  const SHORTCUTS = useShortcutsStore()
  const ABSOLUTE = useAbsoluteStore()

  const { t } = useI18n()

  const onClick = () => {
    ABSOLUTE.shortcuts.switcher = !ABSOLUTE.shortcuts.switcher
  }
</script>
