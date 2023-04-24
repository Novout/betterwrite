<template>
  <div
    :class="[
      transformer.docx().entityAlignment(generator.alignment, 'setter') ===
      'both'
        ? 'text-justify'
        : '',
      transformer.docx().entityAlignment(generator.alignment, 'setter') ===
      'center'
        ? 'text-center'
        : '',
      transformer.docx().entityAlignment(generator.alignment, 'setter') ===
      'left'
        ? 'text-left'
        : '',
      transformer.docx().entityAlignment(generator.alignment, 'setter') ===
      'right'
        ? 'text-right'
        : '',
    ]"
    class="flex bg-white h-60 max-h-60 items-center w-full overflow-hidden p-1 md:p-5 bg-theme-background-opacity-1"
  >
    <p
      :style="{
        textIndent: `${generator.indent}rem`,
        fontSize: `${generator.size}px`,
        fontWeight: generator.bold ? 'bold' : 'normal',
        fontStyle: generator.italics ? 'italic' : 'normal',
        color: generator.color,
        padding: '2rem',
      }"
    >
      {{ populate.debug().names().text() }}
    </p>
  </div>
</template>

<script setup lang="ts">
  import { useTransformer } from '@/use/generator/transformer'
  import { usePopulate } from '@/use/populate'
  import { DOCXStateStylesParagraph } from 'better-write-types'

  const transformer = useTransformer()
  const populate = usePopulate()

  defineProps<{
    generator: DOCXStateStylesParagraph
  }>()
</script>
