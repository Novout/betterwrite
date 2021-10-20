<template>
  <AsideText
    class="wb-aside-button"
    :text="t('editor.aside.pdf.configuration')"
    :shortcuts="SHORTCUTS.configurationPDF[0]"
    :icon="true"
    @click.prevent="onConfiguration"
  >
    <img width="20" class="mr-2" src="@/assets/editor/pdf.png" />
  </AsideText>
</template>

<script setup lang="ts">
  import { useAbsoluteStore } from '@/store/absolute'
  import { useShortcutsStore } from '@/store/shortcuts'
  import { useI18n } from 'vue-i18n'

  const SHORTCUTS = useShortcutsStore()
  const ABSOLUTE = useAbsoluteStore()

  const { t } = useI18n()

  const onConfiguration = () => {
    ABSOLUTE.pdf.configuration = true
  }
</script>
