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
      props.type === 'image'
        ? 'flex items-end border-l border-black dark:border-gray-500 ml-1'
        : '',
    ]"
  >
    <div
      v-if="
        props.type === 'heading-two' ||
        props.type === 'heading-three' ||
        props.type === 'image'
      "
      :class="[props.type === 'heading-two' ? 'w-6' : 'w-12']"
      class="border-b mb-2 h-1 border-black dark:border-gray-500"
    ></div>
    <p
      v-if="props.type !== 'image'"
      class="ml-2 truncate"
      :class="[
        props.type === 'heading-one' ? 'text-tiny py-2 font-bold' : '',
        props.type === 'heading-two' ? 'text-sm' : '',
        props.type === 'heading-three' ? 'text-xs' : '',
      ]"
    >
      {{ props.raw }}
    </p>
    <HeroIcon v-else class="ml-2 wb-text">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-7 w-7"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
          clip-rule="evenodd"
        />
      </svg>
    </HeroIcon>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    raw: String,
    type: String,
  })
</script>
