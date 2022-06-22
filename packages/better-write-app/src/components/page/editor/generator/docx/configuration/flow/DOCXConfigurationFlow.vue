<template>
  <div
    class="flex flex-col bg-theme-background-opacity-1 w-full wb-scroll h-60 gap-10 mt-3"
  >
    <DOCXConfigurationFlowAdd />
    <draggable :list="DOCX.flow" item-key="id">
      <template #item="{ element, index }">
        <DOCXConfigurationFlowItem :item="element" :index="index" />
      </template>
    </draggable>
  </div>
</template>

<script setup lang="ts">
  import { useDOCXStore } from '@/store/docx'
  import draggable from 'vuedraggable'

  const DOCX = useDOCXStore()
</script>
