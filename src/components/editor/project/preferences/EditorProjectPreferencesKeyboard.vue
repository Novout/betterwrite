<template>
  <div class="flex flex-col w-full p-1 my-8">
    <h3 class="text-2xl font-bold dark:text-gray-300 text-black">
      {{ t('editor.preferences.shortcuts.title') }}
    </h3>
    <div
      class="
        dark:text-gray-300
        text-black text-base
        shadow-lg
        w-full
        lg:w-1/2
        py-1
        my-2
      "
    >
      <h3 class="text-lg my-1 font-bold dark:text-gray-300 text-black">
        {{ t('editor.preferences.shortcuts.editor.title') }}
      </h3>
      <PreferencesKeyboardItem
        :title="t('editor.preferences.shortcuts.editor.delete')"
        shortcut="CTRL + D"
      />
      <PreferencesKeyboardItem
        :title="t('editor.preferences.shortcuts.editor.to')"
        shortcut="CTRL + ↑ / ↓"
      />
      <PreferencesKeyboardItem
        :title="t('editor.preferences.shortcuts.editor.swap')"
        shortcut="Shift + ↑ / ↓"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()
</script>
