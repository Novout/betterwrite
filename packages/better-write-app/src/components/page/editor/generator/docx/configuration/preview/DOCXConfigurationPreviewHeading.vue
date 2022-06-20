<template>
  <div
    :class="[
      transformer.docx().entityAlignment(generator.alignment, 'setter') ===
      'both'
        ? 'justify-center'
        : '',
      transformer.docx().entityAlignment(generator.alignment, 'setter') ===
      'center'
        ? 'justify-center'
        : '',
      transformer.docx().entityAlignment(generator.alignment, 'setter') ===
      'left'
        ? 'justify-start'
        : '',
      transformer.docx().entityAlignment(generator.alignment, 'setter') ===
      'right'
        ? 'justify-end'
        : '',
    ]"
    class="flex bg-white h-60 max-h-60 items-center w-full overflow-hidden p-1 md:p-5 bg-theme-background-opacity-1"
  >
    <p
      :style="{
        fontSize: `${generator.size}px`,
        fontWeight: generator.bold ? 'bold' : 'normal',
        fontStyle: generator.italics ? 'italic' : 'normal',
        color: generator.color,
        padding: '2rem',
      }"
    >
      Lorem
    </p>
  </div>
</template>

<script setup lang="ts">
  import { useTransformer } from '@/use/generator/transformer'
  import { DOCXStateStylesHeading } from 'better-write-types'

  const transformer = useTransformer()

  defineProps<{
    generator: DOCXStateStylesHeading
  }>()
</script>
