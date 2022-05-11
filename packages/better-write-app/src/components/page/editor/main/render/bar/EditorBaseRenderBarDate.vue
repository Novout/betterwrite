<template>
  <div class="flex">
    <p>{{ date }}</p>
  </div>
</template>

<script setup lang="ts">
  import { useFormat } from '@/use/format'
  import { useIntervalFn } from '@vueuse/core'
  import { ref } from 'vue'

  const format = useFormat()

  const date = ref(format.actually('resume'))

  useIntervalFn(() => {
    date.value = format.actually('resume')
  }, 1000)
</script>
