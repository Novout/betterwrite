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
    <input ref="inp" v-model="cmp" type="number" class="w-6 bg-transparent" />
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
      type: Number,
    },
    css: {
      required: false,
      type: String,
    },
    step: {
      required: false,
      type: Number,
      default: 1,
    },
  })

  const onNegative = () => {
    cmp.value -= Number(props.step)
    emit('action')
  }

  const onPositive = () => {
    cmp.value += Number(props.step)
    emit('action')
  }

  const emit = defineEmits(['update:modelValue', 'action'])
  const inp = ref<HTMLElement | null>(null as any)
  const cmp: WritableComputedRef<number> = computed({
    get() {
      return props.modelValue
    },
    set(val: any) {
      emit('update:modelValue', val)
    },
  })
</script>
