<template>
  <section
    ref="checkbox"
    class="flex relative py-1 gap-2 wb-text w-full px-4 md:px-14"
  >
    <div class="w-5" />
    <InputBoolean v-model="select" :specific="true" />
    <EditorEntityDefaultInput :entity="entity" />
  </section>
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
