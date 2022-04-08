<template>
  <p
    v-once
    class="w-full p-1 break-all pointer-events-none"
    :class="[
      log.method === 'log'
        ? 'bg-theme-logger-log-background text-theme-logger-log-text'
        : '',
      log.method === 'warn'
        ? 'bg-theme-logger-warn-background text-theme-logger-warn-text'
        : '',
      log.method === 'error'
        ? 'bg-theme-logger-error-background text-theme-logger-error-text'
        : '',
      log.method === 'info'
        ? 'bg-theme-logger-info-background text-theme-logger-info-text'
        : '',
    ]"
  >
    {{ render }}
  </p>
</template>

<script setup lang="ts">
  import { computed, watchEffect } from 'vue'
  import { useScroll } from '@/use/scroll'
  import { LoggerContent } from 'better-write-types'

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
