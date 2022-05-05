<template>
  <div
    ref="absolute"
    v-motion
    :initial="{ opacity: 0, y: 10 }"
    :enter="{ opacity: 1, y: 0 }"
    class="overflow-y-auto wb-scroll wb-text p-6 fixed top-0 left-0 h-screen w-full bg-theme-background-1 wb-text z-max"
  >
    <EditorAbsoluteHeader
      v-if="props.title"
      :title="props.title"
      @close="emit('close')"
    />
    <slot />
  </div>
</template>

<script setup lang="ts">
  import { useMagicKeys } from '@vueuse/core'
  import { ref, watch } from 'vue'

  const props = defineProps({
    title: {
      required: false,
      default: '',
      type: String,
    },
  })

  const absolute = ref<HTMLElement | null>(null)

  const { escape } = useMagicKeys()

  const emit = defineEmits(['close'])

  watch(escape, (v) => {
    if (v) emit('close')
  })
</script>
