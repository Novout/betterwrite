<template>
  <div
    class="w-full h-96 p-1 overflow-y-auto break-all"
    v-html="raw.v1().landingConvert(props.data)"
  />
</template>

<script setup lang="ts">
  import { useRaw } from '@/use/raw'

  const props = defineProps({
    data: {
      required: true,
      type: String,
    },
  })

  const raw = useRaw()
</script>
