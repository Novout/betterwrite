<template>
  <div
    class="flex items-center px-2 py-1 w-full hover:bg-theme-background-3"
    :class="[!props.off ? 'cursor-pointer' : 'cursor-default']"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
    @touchstart="hover = true"
    @touchcancel="hover = true"
    @click="onAction"
  >
    <div class="flex items-center justify-between w-full">
      <HeroIcon class="mr-3">
        <slot name="icon" />
      </HeroIcon>
      <p class="wb-text text-sm">
        <slot name="title" />
      </p>
    </div>
    <div
      v-if="hover"
      class="absolute flex flex-col md:flex-row left-full bg-theme-background-2"
    >
      <slot name="overflow" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useAbsoluteStore } from '@/store/absolute'
  import useEmitter from '@/use/emitter'
  import { ref, nextTick } from 'vue'

  const props = defineProps({
    off: {
      default: false,
      required: false,
      type: Boolean,
    },
  })

  const ABSOLUTE = useAbsoluteStore()

  const emit = defineEmits(['action'])
  const emitter = useEmitter()
  const hover = ref<boolean>(false)

  const onAction = async () => {
    if (props.off) return

    emit('action')

    emitter.emit('entity-reset')

    await nextTick

    onClose()
  }

  const onClose = () => {
    ABSOLUTE.entity.menu = false
  }
</script>
