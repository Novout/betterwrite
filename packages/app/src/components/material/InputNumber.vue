<template>
  <div class="flex flex-row items-center justify-center wb-text p-1 shadow-lg">
    <HeroIcon
      class="bg-theme-background-4 active:bg-theme-background-2"
      @click.prevent="onNegative"
    >
      <IconArrowSetLeft class="wb-icon h-6 w-6" />
    </HeroIcon>
    <input
      ref="inp"
      v-model="cmp"
      type="number"
      :min="props.min"
      :max="props.max"
      :step="props.step"
      class="w-6 bg-transparent font-raleway"
    />
    <HeroIcon
      class="bg-theme-background-4 active:bg-theme-background-2"
      @click.prevent="onPositive"
    >
      <IconArrowSetRight class="wb-icon h-6 w-6" />
    </HeroIcon>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, WritableComputedRef } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useToast } from 'vue-toastification'

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
      type: Number || String,
      default: 1,
    },
    min: {
      required: false,
      type: Number,
      default: 0,
    },
    max: {
      required: false,
      type: Number,
    },
  })

  const toast = useToast()
  const { t } = useI18n()

  const onNegative = () => {
    const step = Number(props.step)

    if (cmp.value - step < props.min) {
      toast.warning(t('toast.material.number.negative', { number: props.min }))

      return
    }

    cmp.value -= Number(props.step)
    emit('action')
  }

  const onPositive = () => {
    const step = Number(props.step)

    if (props.max && cmp.value >= props.max) {
      toast.warning(t('toast.material.number.positive', { number: props.max }))

      return
    }
    cmp.value += step
    emit('action')
  }

  const emit = defineEmits(['update:modelValue', 'action'])
  const inp = ref<HTMLElement | null>(null)
  const cmp: WritableComputedRef<number> = computed({
    get() {
      return props.modelValue
    },
    set(val: number) {
      emit('update:modelValue', Number(val.toFixed(2)) ?? val)
    },
  })
</script>
