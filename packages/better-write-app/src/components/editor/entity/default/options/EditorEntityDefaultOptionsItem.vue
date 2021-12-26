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
      class="absolute flex left-full bg-theme-background-2"
      :class="[
        mouse.horizontal === 'right' ? 'flex-col' : 'flex-row',
        mouse.vertical === 'bottom' ? 'flex-row' : 'flex-row md:flex-col',
      ]"
    >
      <slot name="overflow" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useAbsoluteStore } from '@/store/absolute'
  import { useEditorStore } from '@/store/editor'
  import useEmitter from '@/use/emitter'
  import { ref, nextTick, computed } from 'vue'

  const props = defineProps({
    off: {
      default: false,
      required: false,
      type: Boolean,
    },
  })

  const ABSOLUTE = useAbsoluteStore()
  const EDITOR = useEditorStore()

  const emit = defineEmits(['action'])
  const emitter = useEmitter()
  const hover = ref<boolean>(false)
  const mouse = computed(() => EDITOR.actives.global.mouse)

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
