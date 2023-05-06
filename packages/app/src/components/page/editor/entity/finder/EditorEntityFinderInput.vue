<template>
  <div class="flex flex-row justify-center px-4 md:px-14 w-full py-2 text-lg">
    <EntityTypeShow :type="entity.type" />
    <div
      class="w-full px-1 md:px-5 relative text-justify text-theme-editor-entity-text hover:text-theme-editor-entity-text-hover active:text-theme-editor-entity-text-active"
      :style="{
        whiteSpace: 'pre-line',
        textIndent: '2rem',
        fontFamily: EDITOR.styles.text.fontFamily,
        fontWeight: EDITOR.styles.text.fontWeight,
        fontSize: `${EDITOR.styles.text.fontSize}px`,
      }"
      v-html="raw.v2().purge().finder(entity)"
    />
  </div>
</template>

<script setup lang="ts">
  import { useEditorStore } from '@/store/editor'
  import { useRaw } from '@/use/raw'
  import { Entity } from 'better-write-types'

  const EDITOR = useEditorStore()

  defineProps<{
    entity: Entity
  }>()

  const raw = useRaw()
</script>
