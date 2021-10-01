<template>
  <label
    :for="`input-file-${props.title}`"
    :class="width"
    class="
      flex
      items-center
      p-1
      justify-center
      rounded
      cursor-pointer
      wb-text
      bg-gray-300
      dark:bg-gray-600
      block
    "
    >{{ props.title }}</label
  >
  <input
    :id="`input-file-${props.title}`"
    ref="inp"
    class="opacity-0 absolute z-min"
    type="file"
    @change.prevent="onChange"
  />
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const inp = ref<HTMLElement | null>(null as any)

  const emit = defineEmits(['load', 'error'])

  const props = defineProps({
    title: {
      required: false,
      type: String,
      default: 'Inserir Imagem',
    },
    width: {
      required: false,
      type: String,
      default: 'w-32',
    },
  })

  const onChange = () => {
    const file = (inp.value as any).files[0]

    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () {
      emit('load', reader.result)
    }
    reader.onerror = function (error) {
      emit('error', error)
    }
  }
</script>
