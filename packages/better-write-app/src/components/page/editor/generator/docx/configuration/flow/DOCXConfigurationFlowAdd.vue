<template>
  <div class="flex w-full items-center">
    <InputText
      v-if="typeForText"
      v-model="raw"
      class="flex-1 bg-theme-background-opacity-1 px-5 py-1 rounded-full"
      @keyup.enter="onAdd"
    />
    <InputSelect
      v-model="type"
      class="flex-1 min-w-30"
      :arr="populate.docx().flowItemTypes()"
    />
    <div>
      <IconAdd class="wb-icon w-8 h-8" @click="onAdd" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useDOCXStore } from '@/store/docx'
  import { useDefines } from '@/use/defines'
  import { useTransformer } from '@/use/generator/transformer'
  import { DOCXStateFlowItem, DOCXStateFlowItemType } from 'better-write-types'
  import { ref, computed } from 'vue'

  const DOCX = useDOCXStore()

  const populate = useDefines()
  const transformer = useTransformer()

  const type = ref<DOCXStateFlowItemType>(
    populate.docx().flowItemTypes()[0] as any
  )
  const raw = ref<string>('')

  const typeForText = computed(
    () => transformer.docx().flowItem(type.value, 'setter') === 'annotation'
  )

  const onAdd = () => {
    const _type = transformer
      .docx()
      .flowItem(type.value, 'setter') as DOCXStateFlowItemType

    const item: DOCXStateFlowItem =
      _type === 'annotation' ? { raw: raw.value, type: _type } : { type: _type }

    raw.value = ''

    DOCX.flow.push(item)
  }
</script>
