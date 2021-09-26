<template>
  <WBModal v-model="show" @complete="onComplete">
    <template #title>{{ props.title }}</template>
    <template #confirm>{{ props.confirm }}</template>
    <slot></slot>
  </WBModal>

  <AsideText :text="props.button" @click="show = true"></AsideText>
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
