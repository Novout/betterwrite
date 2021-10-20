<template>
  <WBModal
    v-model="show"
    @complete="onComplete"
    @keypress.enter.prevent="onComplete"
  >
    <template #title>{{ props.title }}</template>
    <template #confirm>{{ props.confirm }}</template>
    <slot></slot>
  </WBModal>

  <AsideText
    :shortcuts="props.shortcut"
    :text="props.button"
    @click="onShowModal"
  ></AsideText>
</template>

<script setup lang="ts">
  import { useAbsoluteStore } from '@/store/absolute'
  import { computed } from 'vue'

  const ABSOLUTE = useAbsoluteStore()

  const show = computed(() => ABSOLUTE.modal.newProject)

  const onShowModal = () => {
    ABSOLUTE.modal.newProject = !ABSOLUTE.modal.newProject
  }

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
    shortcut: {
      required: false,
      type: String,
    },
  })

  const onComplete = () => {
    props.complete()

    ABSOLUTE.modal.newProject = false
  }
</script>
