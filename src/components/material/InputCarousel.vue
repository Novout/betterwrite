<template>
  <div class="flex flex-row items-center justify-center wb-text p-1 shadow-lg">
    <HeroIcon
      class="bg-theme-background-4 active:bg-theme-background-2"
      @click.prevent="onNegative"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
          clip-rule="evenodd"
        />
      </svg>
    </HeroIcon>
    <input
      ref="inp"
      v-model="cmp"
      type="text"
      class="bg-theme-transparent text-center pointer-events-none w-14"
    />
    <HeroIcon
      class="bg-theme-background-4 active:bg-theme-background-2"
      @click.prevent="onPositive"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
          clip-rule="evenodd"
        />
      </svg>
    </HeroIcon>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, WritableComputedRef } from 'vue'

  const props = defineProps({
    modelValue: {
      required: true,
      type: String,
    },
    css: {
      required: false,
      type: String,
    },
    arr: {
      required: true,
      type: Array,
    },
  })

  const pos = ref<number>(props.arr.indexOf(props.modelValue))

  const onNegative = () => {
    pos.value === 0 ? (pos.value = props.arr.length - 1) : pos.value--

    cmp.value = props.arr[pos.value] as string
  }

  const onPositive = () => {
    pos.value === props.arr.length - 1 ? (pos.value = 0) : pos.value++

    cmp.value = props.arr[pos.value] as string
  }

  const emit = defineEmits(['update:modelValue'])
  const inp = ref<HTMLElement | null>(null as any)
  const cmp: WritableComputedRef<string> = computed({
    get() {
      return props.modelValue
    },
    set(val: any) {
      emit('update:modelValue', val)
    },
  })
</script>
