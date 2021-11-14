<template>
  <div class="flex flex-col w-full min-h-screen p-1 my-8">
    <h3 class="text-2xl font-bold text-theme-text-2">
      {{ t('editor.preferences.shortcuts.title') }}
    </h3>
    <div
      class="text-theme-text-2 text-base shadow-lg w-full lg:w-1/2 py-1 my-2"
    >
      <h3 class="text-lg my-1 font-bold text-theme-text-2">
        {{ t('editor.preferences.shortcuts.editor.title') }}
      </h3>
      <PreferencesKeyboardItem
        :title="t('editor.preferences.shortcuts.editor.italic')"
        shortcut="CTRL + I"
      />
      <PreferencesKeyboardItem
        :title="t('editor.preferences.shortcuts.editor.bold')"
        shortcut="CTRL + B"
      />
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
    <div
      class="text-theme-text-2 text-base shadow-lg w-full lg:w-1/2 py-1 my-2"
    >
      <h3 class="text-lg my-1 font-bold text-theme-text-2">
        {{ t('editor.preferences.shortcuts.global.project.title') }}
      </h3>
      <PreferencesKeyboardItem
        :title="t('editor.preferences.shortcuts.global.project.save')"
        :shortcut="SHORTCUTS.localSaveProject[0]"
      />
      <PreferencesKeyboardItem
        :title="t('editor.preferences.shortcuts.global.project.load')"
        :shortcut="SHORTCUTS.localLoadProject[0]"
      />
      <PreferencesKeyboardItem
        :title="t('editor.preferences.shortcuts.global.project.new')"
        :shortcut="SHORTCUTS.newProject[0]"
      />
    </div>
    <div
      v-if="project.isCreativeProject()"
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
      <h3 class="text-lg my-1 font-bold text-theme-text-2">
        {{ t('editor.preferences.shortcuts.global.project.chapter.title') }}
      </h3>
      <PreferencesKeyboardItem
        :title="t('editor.preferences.shortcuts.global.project.chapter.new')"
        :shortcut="SHORTCUTS.newChapter[0]"
      />
      <PreferencesKeyboardItem
        :title="t('editor.preferences.shortcuts.global.project.chapter.delete')"
        :shortcut="SHORTCUTS.deleteChapter[0]"
      />
    </div>
    <div
      class="text-theme-text-1 text-base shadow-lg w-full lg:w-1/2 py-1 my-2"
    >
      <h3 class="text-lg my-1 font-bold text-theme-text-2">
        {{ t('editor.preferences.shortcuts.global.project.helpers.title') }}
      </h3>
      <PreferencesKeyboardItem
        :title="
          t('editor.preferences.shortcuts.global.project.helpers.switcher')
        "
        :shortcut="SHORTCUTS.switcherRawText[0]"
      />
      <PreferencesKeyboardItem
        :title="t('editor.preferences.shortcuts.global.project.helpers.finder')"
        :shortcut="SHORTCUTS.finderRawText[0]"
      />
      <PreferencesKeyboardItem
        :title="t('editor.preferences.shortcuts.global.project.helpers.logger')"
        :shortcut="SHORTCUTS.logger[0]"
      />
    </div>
    <div
      class="text-theme-text-1 text-base shadow-lg w-full lg:w-1/2 py-1 my-2"
    >
      <h3 class="text-lg my-1 font-bold text-theme-text-2">
        {{ t('editor.preferences.shortcuts.global.project.pdf.title') }}
      </h3>
      <PreferencesKeyboardItem
        :title="t('editor.preferences.shortcuts.global.project.pdf.generate')"
        :shortcut="SHORTCUTS.generatePDF[0]"
      />
      <PreferencesKeyboardItem
        :title="
          t('editor.preferences.shortcuts.global.project.pdf.configuration')
        "
        :shortcut="SHORTCUTS.configurationPDF[0]"
      />
      <PreferencesKeyboardItem
        :title="t('editor.preferences.shortcuts.global.project.pdf.preview')"
        :shortcut="SHORTCUTS.previewPDF[0]"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useShortcutsStore } from '@/store/shortcuts'
  import { useProject } from '@/use/project'
  import { useI18n } from 'vue-i18n'

  const SHORTCUTS = useShortcutsStore()

  const { t } = useI18n()
  const project = useProject()
</script>
