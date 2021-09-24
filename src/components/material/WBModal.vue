<template>
  <vue-final-modal
    v-slot="{ params, close }"
    v-bind="$attrs"
    classes="flex justify-center items-center"
    content-class="relative flex flex-col max-h-full mx-4 p-4 border dark:text-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-700"
  >
    <span class="mr-20 text-xl font-bold">
      <slot name="title"></slot>
    </span>
    <div class="flex-grow overflow-y-auto">
      <slot :params="params"></slot>
    </div>
    <div class="flex-shrink-0 flex justify-center items-center pt-4">
      <button
        class="
          bg-gray-300
          dark:bg-gray-600
          active:bg-gray-500
          dark:active:bg-gray-900
          py-1
          px-2
        "
        @click="$emit('complete', close)"
      >
        <slot name="confirm"></slot>
      </button>
    </div>
    <button class="absolute top-0 right-0 mt-2 mr-2" @click="close">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
        />
      </svg>
    </button>
  </vue-final-modal>
</template>

<script lang="ts">
  export default {
    name: 'VTailwindModal',
    emits: ['complete'],
  }
</script>
