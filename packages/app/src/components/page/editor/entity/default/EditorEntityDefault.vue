<template>
  <EditorEntityDefaultCheckbox
    v-if="entity.type === 'checkbox'"
    :entity="entity"
  />
  <EditorEntityDefaultImage
    v-else-if="entity.type === 'image'"
    :entity="entity"
  />
  <EditorEntityDefaultList
    v-else-if="entity.type === 'list'"
    :entity="entity"
  />
  <EditorEntityDefaultDrau
    v-else-if="entity.type === 'drau'"
    :entity="entity"
  />
  <EditorEntityDefaultLineBreak
    v-else-if="entity.type === 'line-break'"
    :entity="entity"
  />
  <EditorEntityDefaultPageBreak
    v-else-if="entity.type === 'page-break'"
    :entity="entity"
  />
  <EditorEntityDefaultHeading
    v-else-if="
      entity.type === 'heading-one' ||
      entity.type === 'heading-two' ||
      entity.type === 'heading-three'
    "
    :entity="entity"
  />
  <EditorEntityDefaultParagraph
    v-else-if="entity.type === 'paragraph'"
    :entity="entity"
  />
</template>

<script setup lang="ts">
  import { Entity } from 'better-write-types'

  defineProps<{
    entity: Entity
  }>()
</script>
