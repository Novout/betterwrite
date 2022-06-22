<template>
  <header class="flex items-center justify-between">
    <MHeading>{{ props.title }}</MHeading>
    <IconClose class="wb-icon h-8 w-8" @click.prevent.stop="onClick" />
  </header>
</template>

<script setup lang="ts">
  import { useLocalStorage } from '@/use/storage/local'

  const local = useLocalStorage()

  const emit = defineEmits(['close'])

  const props = defineProps({
    title: {
      required: true,
      type: String,
    },
    force: {
      required: false,
      type: Boolean,
      default: false,
    },
  })

  const onClick = () => {
    if (props.force) local.onSaveProject(false)

    emit('close')
  }
</script>
