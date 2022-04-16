<template>
  <div
    class="flex items-center justify-center bg-theme-logger-entity-background text-theme-logger-entity-text h-full w-20 py-1"
  >
    <IconParagraph v-if="props.type === 'paragraph'" />
    <IconHeading v-if="props.type === 'heading-one'" />
    <IconHeadingTwo v-if="props.type === 'heading-two'" />
    <IconHeadingThree v-if="props.type === 'heading-three'" />
    <IconLineBreak v-if="props.type === 'line-break'" />
    <IconPageBreak v-if="props.type === 'page-break'" />
    <IconCheckbox v-if="props.type === 'checkbox'" />
    <IconList v-if="props.type === 'list'" />
    <IconImage v-if="props.type === 'image' || props.type === 'drau'" />
  </div>
</template>

<script setup lang="ts">
  import { EntityType } from 'better-write-types'

  const props = defineProps<{
    type: EntityType
  }>()
</script>
