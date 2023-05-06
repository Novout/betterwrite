<template>
  <div class="flex items-center">
    <IconSystemWindows v-if="os === 'Windows'" class="w-6 h-6 md:(w-5 h-5)" />
    <IconSystemLinux v-else-if="os === 'Linux'" class="w-6 h-6 md:(w-5 h-5)" />
    <IconSystemMac v-else-if="os === 'Mac OS'" class="w-6 h-6 md:(w-5 h-5)" />
    <IconSystemMobile
      v-else-if="os === 'Android' || os === 'iOS'"
      class="w-6 h-6 md:(w-5 h-5)"
    />
  </div>
</template>

<script setup lang="ts">
  import { useUtils } from '@/use/utils'

  const utils = useUtils()

  const os = utils.system().get()
</script>
