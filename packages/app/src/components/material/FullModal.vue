<template>
  <div
    v-motion
    v-provider-close
    :initial="{ opacity: 0, y: 10 }"
    :enter="{ opacity: 1, y: 0 }"
    :esc="onClose"
    class="overflow-y-auto bg-rgba-blur font-raleway wb-scroll wb-text p-6 fixed top-0 left-0 h-screen w-full bg-theme-background-1 wb-text z-max"
  >
    <EditorAbsoluteHeader
      v-if="props.title"
      :title="props.title"
      @close="onClose"
    />
    <slot />
  </div>
</template>

<script setup lang="ts">
  import { useLocalStorage } from '@/use/storage/local'

  const props = defineProps<{
    title?: string
    forceSave?: boolean
  }>()

  const emit = defineEmits(['close'])

  const local = useLocalStorage()

  const onClose = () => {
    emit('close')
  }

  if (props.forceSave) local.onSaveProject(false)
</script>
