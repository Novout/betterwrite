<template>
  <div
    class="w-full relative px-4 md:px-14 text-justify text-theme-editor-entity-text hover:text-theme-editor-entity-text-hover active:text-theme-editor-entity-text-active"
    :style="{
      whiteSpace: 'pre-line',
      textIndent: '2rem',
    }"
    v-html="raw.v2().purge().finder(entity)"
  />
</template>

<script setup lang="ts">
  import { useRaw } from '@/use/raw'
  import { Entity } from 'better-write-types'

  const { entity } = defineProps<{
    entity: Entity
  }>()

  const raw = useRaw()
</script>
