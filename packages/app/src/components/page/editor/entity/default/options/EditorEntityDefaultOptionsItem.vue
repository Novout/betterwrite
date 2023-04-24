<template>
  <div
    class="flex bg-rgba-blur items-end px-2 py-1 w-full hover:bg-theme-background-3"
    :class="[!props.off ? 'cursor-pointer' : 'cursor-default']"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
    @touchstart="hover = true"
    @touchcancel="hover = true"
    @click="onAction"
  >
    <div class="flex items-center justify-start w-full">
      <HeroIcon class="mr-3">
        <slot name="icon" />
      </HeroIcon>
      <p class="wb-text text-sm">
        <slot name="title" />
      </p>
    </div>
    <div
      v-if="hover"
      class="absolute wb-scroll overflow-y-auto overflow-x-hidden w-auto h-40 flex left-full bg-theme-background-2 flex-col"
    >
      <slot name="overflow" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useAbsoluteStore } from '@/store/absolute'
  import { ref, nextTick } from 'vue'

  const props = defineProps({
    off: {
      default: false,
      required: false,
      type: Boolean,
    },
    align: {
      default: false,
      required: false,
      type: Boolean,
    },
  })

  const ABSOLUTE = useAbsoluteStore()

  const emit = defineEmits(['action'])
  const hover = ref<boolean>(false)

  const onAction = async () => {
    if (props.off) return

    emit('action')

    await nextTick

    onClose()
  }

  const onClose = () => {
    ABSOLUTE.entity.menu = false
  }
</script>
