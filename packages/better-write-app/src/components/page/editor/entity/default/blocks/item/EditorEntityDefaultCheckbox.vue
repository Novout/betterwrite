<template>
  <EditorEntityDefaultContainer :entity="props.entity">
    <section
      ref="checkbox"
      class="flex relative py-1 gap-2 wb-text w-full px-7"
    >
      <InputBoolean v-model="select" :specific="true" />
      <EditorEntityDefaultText :is-attached="true" :entity="props.entity" />
    </section>
  </EditorEntityDefaultContainer>
</template>

<script setup lang="ts">
  import { Entity } from 'better-write-types'
  import { ref, watch } from 'vue'

  const props = defineProps<{
    entity: Entity
  }>()

  const checkbox = ref<any>()

  const select = ref<boolean>(
    props.entity.external?.checkbox?.select as boolean
  )

  watch(select, (_select) => {
    props.entity.external!.checkbox!.select = _select
  })
</script>
