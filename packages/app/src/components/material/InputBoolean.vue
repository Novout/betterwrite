<template>
  <Switch
    ref="switcher"
    v-model="cmp"
    :class="[
      props.specific
        ? 'bg-theme-editor-material-boolean-background'
        : cmp
        ? 'bg-theme-background-1'
        : 'bg-theme-background-4',
    ]"
    class="relative inline-flex items-center h-6 transition-colors rounded-full min-w-11 focus:outline-none shadow-xl"
  >
    <span
      :class="[
        isHovered && cmp ? 'translate-x-5' : isHovered && !cmp ? 'translate-x-2' : cmp ? 'translate-x-6' : 'translate-x-1',
        props.specific
          ? 'bg-theme-editor-material-boolean-rounded-background'
          : 'bg-white',
      ]"
      class="flex items-center justify-center inline-block w-4 h-4 transition-transform transform rounded-full"
    >
      <IconMaterialYes v-if="props.modelValue" class="filter invert w-2.5 h-2.5" />
      <IconMaterialNo v-else class="filter invert w-2.5 h-2.5" />
    </span>
  </Switch>
</template>

<script setup lang="ts">
  import { useElementHover } from '@vueuse/core'
import { computed, ref } from 'vue'

  const props = defineProps({
    modelValue: {
      required: true,
      type: Boolean,
    },
    css: {
      required: false,
      type: String,
    },
    specific: {
      required: false,
      type: Boolean,
      default: false,
    },
  })

  const emit = defineEmits(['update:modelValue'])
  const cmp = computed({
    get() {
      return props.modelValue
    },
    set(val: any) {
      emit('update:modelValue', val)
    },
  })

  const switcher = ref<HTMLElement | null>(null)

  const isHovered = useElementHover(switcher)
</script>
