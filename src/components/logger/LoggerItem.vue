import { computed } from 'vue';
<template>
  <p
    class="w-full p-1 break-all pointer-events-none"
    :class="[
      log.method === 'log' ? 'logger-log' : '',
      log.method === 'warn' ? 'logger-warn' : '',
      log.method === 'error' ? 'logger-error' : '',
      log.method === 'info' ? 'logger-info' : '',
    ]"
  >
    {{ render }}
  </p>
</template>

<script setup lang="ts">
  import { computed, watchEffect } from 'vue'
  import { useScroll } from '@/use/scroll'

  const props = defineProps({
    log: {
      required: true,
      type: Object,
    },
  })

  watchEffect(() => {
    useScroll().force('#logger-absolute')
  })

  const render = computed(() =>
    '[ ' + props.log.method.toUpperCase() + ' ]: ' + props.log.arguments !==
    typeof String
      ? props.log.arguments[0]
      : props.log.arguments + ' | ' + props.log.createdAt
  )
</script>
