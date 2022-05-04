<template>
  <EditorEntityDefaultContainer :entity="props.entity">
    <section
      ref="list"
      class="flex py-1 gap-4 wb-text w-full relative"
      :class="[last ? 'items-start' : 'items-center']"
    >
      <div class="w-5" />
      <div
        class="h-1 w-1 p-1 bg-theme-background-3 rounded-full"
        :class="[last ? 'mt-2.5' : '']"
      ></div>
      <EditorEntityDefaultText :is-attached="true" :entity="props.entity" />
    </section>
  </EditorEntityDefaultContainer>
</template>

<script setup lang="ts">
  import { useContextStore } from '@/store/context'
  import { Entity } from 'better-write-types'
  import { computed, ref } from 'vue'

  const CONTEXT = useContextStore()

  const props = defineProps<{
    entity: Entity
  }>()

  const list = ref<any>()

  const _index = computed(() => CONTEXT.entities.indexOf(props.entity))
  const last = computed(() => _index.value === CONTEXT.entities.length - 1)
</script>
