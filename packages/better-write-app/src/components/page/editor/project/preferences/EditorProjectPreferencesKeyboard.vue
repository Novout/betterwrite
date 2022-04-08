<template>
  <div class="flex flex-col w-full p-1 my-8 shadow-lg lg:w-1/2">
    <h3 class="text-2xl font-bold text-theme-text-2">
      {{ t('editor.preferences.shortcuts.title') }}
    </h3>
    <div class="flex flex-col gap-2 w-full px-2">
      <EditorProjectPreferencesKeyboardItem
        :title="t('editor.preferences.shortcuts.editor.italic')"
        shortcut="CTRL + I"
      />
      <EditorProjectPreferencesKeyboardItem
        :title="t('editor.preferences.shortcuts.editor.bold')"
        shortcut="CTRL + B"
      />
      <EditorProjectPreferencesKeyboardItem
        :title="t('editor.preferences.shortcuts.editor.delete')"
        shortcut="CTRL + D"
      />
      <EditorProjectPreferencesKeyboardItem
        :title="t('editor.preferences.shortcuts.editor.swap')"
        shortcut="Alt + ↥ ↧"
      />
      <EditorProjectPreferencesKeyboardItem
        :title="t('editor.preferences.shortcuts.editor.to')"
        shortcut="CTRL + ↥ ↧"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()
</script>
