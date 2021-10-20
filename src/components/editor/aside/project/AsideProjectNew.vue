<template>
  <AsideText
    class="wb-aside-button"
    :text="t('editor.aside.project.new.title')"
    :shortcuts="SHORTCUTS.newProject[0]"
    @click.prevent="ABSOLUTE.project.new = true"
  >
  </AsideText>
</template>

<script setup lang="ts">
  import { useAbsoluteStore } from '@/store/absolute'
  import { useShortcutsStore } from '@/store/shortcuts'
  import { useI18n } from 'vue-i18n'

  const SHORTCUTS = useShortcutsStore()
  const ABSOLUTE = useAbsoluteStore()

  const { t } = useI18n()
</script>
