<template>
  <div ref="item" class="flex w-full items-center my-3">
    <div
      v-if="item.raw"
      class="flex-1 font-bold rounded-full p-2 bg-theme-background-opacity-1 active:bg-theme-background-3"
    >
      {{ item.raw }}
    </div>
    <div
      class="flex gap-2 items-center flex-1 font-bold rounded-full p-2 bg-theme-background-opacity-1 active:bg-theme-background-3"
    >
      {{ type }}
      <TooltipIcon :tooltip="t(`generator.flow.item.tooltip.${item.type}`)" />
    </div>
    <div>
      <IconDelete
        v-if="item.type !== 'content' && item.type !== 'bw'"
        class="w-6 h-6 wb-icon"
        @click="remove"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useTransformer } from '@/use/generator/transformer'
  import { computed } from 'vue'
  import { DOCXStateFlowItem } from 'better-write-types'
  import { useI18n } from 'vue-i18n'
  import { useDOCXStore } from '@/store/docx'

  const { item, index } = defineProps<{
    item: DOCXStateFlowItem
    index: number
  }>()

  const DOCX = useDOCXStore()

  const transformer = useTransformer()
  const { t } = useI18n()

  const type = computed(() => transformer.docx().flowItem(item.type, 'getter'))

  const remove = () => {
    DOCX.flow.splice(index, 1)
  }
</script>
