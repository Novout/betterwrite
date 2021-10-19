<template>
  <div
    v-cloak
    class="flex justify-around sm:justify-between items-center w-full p-2"
  >
    <img
      class="object-contain cursor-pointer"
      width="60"
      src="/logo.svg"
      @click.stop.prevent="onClick"
    />
    <p class="wb-text font-bold text-3xl sm:text-xl">Better Write</p>
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router'

  const router = useRouter()

  const onClick = () => {
    router.push('/landing')
  }
</script>
