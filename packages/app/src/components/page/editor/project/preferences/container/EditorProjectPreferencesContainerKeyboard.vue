<template>
  <EditorProjectPreferencesContainerSlot>
    <PreferencesContainerTitle>
      {{ t('editor.preferences.shortcuts.title') }}
    </PreferencesContainerTitle>
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
        :title="t('editor.preferences.shortcuts.editor.underline')"
        shortcut="CTRL + U"
      />
      <EditorProjectPreferencesKeyboardItem
        :title="t('editor.preferences.shortcuts.editor.delete')"
        shortcut="CTRL + D"
      />
      <EditorProjectPreferencesKeyboardItem
        :title="t('editor.preferences.shortcuts.editor.undo')"
        shortcut="CTRL + Z"
      />
      <EditorProjectPreferencesKeyboardItem
        :title="t('editor.preferences.shortcuts.editor.undoEvent')"
        shortcut="CTRL + SHIFT + Z"
      />
      <EditorProjectPreferencesKeyboardItem
        :title="t('editor.preferences.shortcuts.editor.swap')"
        shortcut="Alt + ↥ ↧"
      />
      <EditorProjectPreferencesKeyboardItem
        :title="t('editor.preferences.shortcuts.editor.to')"
        shortcut="CTRL + ↥ ↧"
      />
      <EditorProjectPreferencesKeyboardItem
        :title="t('editor.preferences.commands.1')"
        shortcut="CTRL + 1"
      />
      <EditorProjectPreferencesKeyboardItem
        :title="t('editor.preferences.commands.2')"
        shortcut="CTRL + 2"
      />
      <EditorProjectPreferencesKeyboardItem
        :title="t('editor.preferences.commands.3')"
        shortcut="CTRL + 3"
      />
      <EditorProjectPreferencesKeyboardItem
        :title="t('editor.preferences.commands.4')"
        shortcut="CTRL + 4"
      />
      <EditorProjectPreferencesKeyboardItem
        :title="t('editor.preferences.commands.5')"
        shortcut="CTRL + 5"
      />
      <EditorProjectPreferencesKeyboardItem
        :title="t('editor.preferences.commands.6')"
        shortcut="CTRL + 6"
      />
      <EditorProjectPreferencesKeyboardItem
        :title="t('editor.preferences.commands.7')"
        shortcut="CTRL + 7"
      />
      <EditorProjectPreferencesKeyboardItem
        :title="t('editor.preferences.commands.8')"
        shortcut="CTRL + 8"
      />
      <EditorProjectPreferencesKeyboardItem
        :title="t('editor.preferences.commands.9')"
        shortcut="CTRL + 9"
      />
      <EditorProjectPreferencesKeyboardItem
        :title="t('editor.aside.configuration.autosave')"
        shortcut="CTRL + S"
      />
      <EditorProjectPreferencesKeyboardItem
        :title="t('editor.aside.configuration.cloudAutosave')"
        shortcut="CTRL + SHIFT + S"
      />
      <EditorProjectPreferencesKeyboardItem
        :title="t('editor.bar.pdf.generate')"
        shortcut="CTRL + SHIFT + P"
      />
      <EditorProjectPreferencesKeyboardItem
        :title="t('editor.bar.epub.generate')"
        shortcut="CTRL + SHIFT + E"
      />
      <EditorProjectPreferencesKeyboardItem
        :title="t('editor.bar.html.generate')"
        shortcut="CTRL + SHIFT + H"
      />
      <EditorProjectPreferencesKeyboardItem
        :title="t('editor.bar.txt.generate')"
        shortcut="CTRL + SHIFT + T"
      />
    </div>
  </EditorProjectPreferencesContainerSlot>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()
</script>
