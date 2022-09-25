<template>
  <div
    ref="absolute"
    v-motion
    :initial="{ opacity: 0, y: 10 }"
    :enter="{ opacity: 1, y: 0 }"
    class="overflow-y-auto font-raleway wb-scroll wb-text p-6 fixed top-0 left-0 h-screen w-full bg-theme-background-1 wb-text z-max"
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
  import { useLocalStorage } from '@/use/storage/local'
  import { useMagicKeys } from '@vueuse/core'
  import { ref, watch } from 'vue'

  const props = defineProps<{
    title?: string
    forceSave?: boolean
  }>()

  const absolute = ref<HTMLElement | null>(null)

  const { escape } = useMagicKeys()
  const local = useLocalStorage()

  const emit = defineEmits(['close'])

  watch(escape, (v) => {
    if (v) emit('close')
  })

  if (props.forceSave) local.onSaveProject(false)
</script>
