<template>
  <div class="flex items-center w-full gap-5 wb-text wb-text my-2">
    <p
      class="px-3 py-1 rounded-full font-bold bg-theme-background-2 text-theme-text-2 shadow-lg w-24"
    >
      Alt
    </p>
    <p class="text-2xl">+</p>
    <InputText
      v-model="props.insert.key"
      class="p-2 shadow-lg bg-theme-background-2 rounded-xl tracking-wider placeholder-theme-text-1 w-full"
      :placeholder="t('editor.preferences.shortcuts.inserts.key')"
      @keydown="onInputKey"
    />
    <p class="text-2xl">=</p>
    <InputText
      v-model="props.insert.value"
      class="p-2 shadow-lg bg-theme-background-2 rounded-xl tracking-wider placeholder-theme-text-1 w-full"
      :placeholder="t('editor.preferences.shortcuts.inserts.value')"
    />
    <div class="flex items-center gap-0 md:gap-2">
      <IconDelete
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :enter="{ opacity: 1, y: 0 }"
        :delay="50"
        class="w-7 h-7 wb-icon"
        @click.prevent.stop="remove"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useProjectStore } from '@/store/project'
  import { ProjectStateShortcutsInserts } from 'better-write-types'
  import { useI18n } from 'vue-i18n'

  const props = defineProps<{
    insert: ProjectStateShortcutsInserts
  }>()

  const PROJECT = useProjectStore()

  const { t } = useI18n()

  const remove = () => {
    PROJECT.shortcuts.inserts = PROJECT.shortcuts.inserts.filter(
      (t) => t !== props.insert
    )
  }

  const onInputKey = (e: KeyboardEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.key) props.insert.key = e.key
  }
</script>
