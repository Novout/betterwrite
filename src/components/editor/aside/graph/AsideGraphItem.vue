<template>
  <div
    v-if="
      props.type !== 'paragraph' &&
      props.type !== 'page-break' &&
      props.type !== 'line-break'
    "
    class="
      dark:hover:bg-gray-800
      hover:bg-gray-200
      active:bg-gray-700
      dark:active:bg-black
      cursor-pointer
      transition
    "
    :class="[
      props.type === 'heading-one'
        ? 'border-l border-black dark:border-gray-500 ml-1'
        : '',
      props.type === 'heading-two' || props.type === 'heading-three'
        ? 'flex items-end border-l border-black dark:border-gray-500 ml-1'
        : '',
    ]"
  >
    <div
      v-if="props.type === 'heading-two' || props.type === 'heading-three'"
      :class="[props.type === 'heading-two' ? 'w-6' : 'w-12']"
      class="border-b mb-2 h-1 border-black dark:border-gray-500"
    ></div>
    <p
      class="ml-2 truncate"
      :class="[
        props.type === 'heading-one' ? 'text-tiny py-2 font-bold' : '',
        props.type === 'heading-two' ? 'text-sm' : '',
        props.type === 'heading-three' ? 'text-xs' : '',
      ]"
    >
      {{ props.raw }}
    </p>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    raw: String,
    type: String,
  })
</script>
