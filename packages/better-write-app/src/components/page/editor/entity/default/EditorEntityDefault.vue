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
  <EditorEntityDefaultParagraph v-else :entity="entity" />
</template>

<script setup lang="ts">
  import { Entity } from 'better-write-types'

  defineProps<{
    entity: Entity
  }>()
</script>
