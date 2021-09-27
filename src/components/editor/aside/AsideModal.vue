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
  import { computed } from 'vue'
  import { useStore } from 'vuex'

  const store = useStore()

  const show = computed(() => store.state.absolute.modal.newProject)

  const onShowModal = () => {
    store.commit('absolute/switchProjectModal', true)
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

    store.commit('absolute/switchProjectModal', false)
  }
</script>
