<template>
  <div
    class="flex items-center justify-center w-full bg-gray-900 text-gray-200 py-2 px-5 my-2"
  >
    <p v-if="type === 'paragraph'" :contenteditable="true" :spellcheck="true">
      {{ content }}
    </p>
    <h1
      v-if="type === 'heading-one'"
      class="font-bold text-lg md:text-2xl"
      :contenteditable="true"
      :spellcheck="true"
    >
      {{ content }}
    </h1>
    <img v-if="type === 'image'" :src="content" width="30" />
  </div>
</template>

<script setup lang="ts">
  import { EntityType } from 'better-write-types'

  defineProps<{
    type: EntityType
    content: string
  }>()
</script>
