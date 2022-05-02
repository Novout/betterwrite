<template>
  <EditorEntityDefaultContainer :entity="props.entity">
    <div
      class="flex w-full"
      :class="[
        `justify-${props.entity.external?.image?.alignment}`,
        props.entity.external?.image?.alignment === 'right'
          ? 'justify-end'
          : '',
      ]"
    >
      <img
        class="shadow-xl"
        :src="props.entity.raw"
        :style="
          props.entity.external?.image?.alignment === 'full'
            ? {
                width: '100%',
              }
            : {
                width: `${props.entity.external?.image?.size.width}px`,
                height: `${props.entity.external?.image?.size.height}px`,
              }
        "
        :alt="props.entity.external?.image?.name"
      />
    </div>
  </EditorEntityDefaultContainer>
</template>

<script setup lang="ts">
  import { Entity } from 'better-write-types'

  const props = defineProps<{
    entity: Entity
  }>()
</script>
