<template>
  <Switch
    v-model="cmp"
    :class="cmp ? 'bg-gray-900' : 'bg-gray-500'"
    class="
      relative
      inline-flex
      items-center
      h-6
      transition-colors
      rounded-full
      w-11
      focus:outline-none
    "
  >
    <span
      :class="cmp ? 'translate-x-6' : 'translate-x-1'"
      class="
        inline-block
        w-4
        h-4
        transition-transform
        transform
        bg-white
        rounded-full
      "
    />
  </Switch>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'

  const props = defineProps({
    modelValue: {
      required: true,
      type: Boolean,
    },
    css: {
      required: false,
      type: String,
    },
  })

  const emit = defineEmits(['update:modelValue'])
  const inp = ref<HTMLElement | null>(null as any)
  const cmp = computed({
    get() {
      return props.modelValue
    },
    set(val: any) {
      emit('update:modelValue', val)
    },
  })
</script>
