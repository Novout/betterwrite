<template>
  <div
    v-motion
    :initial="{ opacity: 0, y: -50 }"
    :enter="{ opacity: 1, y: 0, transition: { delay: 50 } }"
    class="flex items-center justify-center w-full"
    @click.prevent.stop="router.back()"
  >
    <img
      class="object-contain cursor-pointer w-16 sm:w-32"
      alt="Better Write Logo"
      src="/logo_default.svg"
    />
    <h1 class="font-poppins wb-h1">Better Write.</h1>
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router'

  const router = useRouter()
</script>
