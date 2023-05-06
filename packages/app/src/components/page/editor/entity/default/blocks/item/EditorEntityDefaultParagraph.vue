<template>
  <EditorEntityDefaultContainer :entity="props.entity">
    <template #left>
      <Icon @click="entity.base().onParagraphComment(props.entity)">
        <IconComment class="w-6 h-6 sm:(w-5 h-5)" />
      </Icon>
      <Icon @click="entity.base().onParagraphCustomize(props.entity)">
        <IconEdit class="w-6 h-6 sm:(w-5 h-5)" />
      </Icon>
    </template>
    <EditorEntityDefaultText :is-attached="false" :entity="props.entity" />
  </EditorEntityDefaultContainer>
</template>

<script setup lang="ts">
  import { useEntity } from '@/use/entity'
  import { Entity } from 'better-write-types'

  const props = defineProps<{
    entity: Entity
  }>()

  const entity = useEntity()
</script>
