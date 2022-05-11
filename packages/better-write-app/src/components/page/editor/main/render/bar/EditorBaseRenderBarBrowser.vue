<template>
  <div class="flex items-center">
    <IconSystemWindows v-if="os === 'Windows'" class="w-4 h-4" />
    <IconSystemLinux v-else-if="os === 'Linux'" class="w-4 h-4" />
    <IconSystemMac v-else-if="os === 'Mac OS'" class="w-5 h-5" />
    <IconSystemMobile
      v-else-if="os === 'Android' || os === 'iOS'"
      class="w-4 h-4"
    />
  </div>
</template>

<script setup lang="ts">
  import { useUtils } from '@/use/utils'

  const utils = useUtils()

  const os = utils.system().get()
</script>
