import { computed } from 'vue';
<template>
  <p
    v-once
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
  import { LoggerContent } from '@/types/logger'

  const props = defineProps({
    log: {
      required: true,
      type: Object as () => LoggerContent,
    },
  })

  watchEffect(() => {
    useScroll().force('#logger-absolute')
  })

  const type = (): string => {
    if (typeof props.log.arguments === 'string') {
      return props.log.arguments + ' | ' + props.log.createdAt
    }

    return props.log.arguments[0] + ' | ' + props.log.createdAt
  }

  const render = computed(
    () =>
      '[ ' +
      props.log.method.toUpperCase() +
      ' | ' +
      props.log.type.toUpperCase() +
      ` ]: ${type()}`
  )
</script>
