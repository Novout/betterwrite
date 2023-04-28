<template>
  <div>
    {{ version }}
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useEnv } from '@/use/env'

  const env = useEnv()

  const version = computed(() => `v${env.packageVersion()}`)
</script>
