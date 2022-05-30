<template>
  <div>
    {{ version }}
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useEnv } from '@/use/env'

  const env = useEnv()

  const version = computed(
    () =>
      `v${env.packageVersion()}${
        Number(env.packageVersion().charAt(0)) === 0 ? ' BETA' : ''
      }`
  )
</script>
