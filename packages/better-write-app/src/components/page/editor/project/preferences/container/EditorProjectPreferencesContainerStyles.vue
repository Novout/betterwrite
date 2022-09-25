<template>
  <EditorProjectPreferencesContainerSlot>
    <div class="flex flex-col gap-2">
      <PreferencesContainerTitle> Tema </PreferencesContainerTitle>
      <div>
        <div
          v-for="([theme, logo], index) in Themes()"
          :key="index"
          class="flex items-center w-full gap-2 cursor-pointer py-1"
          :class="[
            EDITOR.configuration.theme === theme
              ? 'bg-theme-background-opacity-1'
              : '',
          ]"
          @click.prevent.stop="onSwitchTheme(theme)"
        >
          <img width="15" :src="logo" :alt="theme" />
          <p class="truncate">
            {{ theme.replaceAll('BetterWrite -', '') }}
          </p>
        </div>
      </div>
    </div>
  </EditorProjectPreferencesContainerSlot>
</template>

<script setup lang="ts">
  import { Themes } from 'better-write-plugin-theme'
  import { BetterWriteThemes } from 'better-write-types'
  import { useEditorStore } from '@/store/editor'
  import { nextTick } from 'vue'
  import { usePlugin } from 'better-write-plugin-core'
  import { useStorage } from '@/use/storage/storage'
  import { useNProgress } from '@vueuse/integrations/useNProgress'

  const EDITOR = useEditorStore()

  const { isLoading } = useNProgress()
  const plugin = usePlugin()
  const storage = useStorage()

  const onSwitchTheme = async (theme: BetterWriteThemes) => {
    EDITOR.configuration.theme = theme

    isLoading.value = true

    await nextTick

    await storage.normalize()

    plugin.emit('plugin-theme-set')

    isLoading.value = false
  }
</script>
