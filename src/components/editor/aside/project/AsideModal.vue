<template>
  <WBModal v-model="show" @complete="onComplete">
    <template #title>{{ props.title }}</template>
    <template #confirm>{{ props.confirm }}</template>
    <slot></slot>
  </WBModal>

  <button
    class="
      text-xs
      w-full
      p-2
      font-bold
      dark:text-gray-300
      hover:border-b
      border-black
      dark:border-gray-300
      rounded-none
    "
    @click="show = true"
  >
    {{ props.button }}
  </button>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const show = ref(false)

  const props = defineProps({
    title: {
      required: true,
      type: String,
    },
    button: {
      required: true,
      type: String,
    },
    confirm: {
      required: true,
      type: String,
    },
    complete: {
      required: true,
      type: Function,
    },
  })

  const onComplete = () => {
    props.complete()

    show.value = false
  }
</script>
