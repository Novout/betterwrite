<template>
  <div
    class="flex items-center justify-center w-full"
    @click.prevent.stop="router.push('/')"
  >
    <img
      class="object-contain cursor-pointer w-16 sm:w-32"
      alt="Better Write Logo"
      src="/logo_default.svg"
    />
    <h1 class="wb-h1">Better Write.</h1>
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router'

  const router = useRouter()
</script>
