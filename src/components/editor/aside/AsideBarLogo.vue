<template>
  <div
    v-cloak
    class="
      flex
      bg-theme-aside-logo-background
      justify-around
      sm:justify-between
      items-center
      w-full
      p-2
    "
  >
    <img
      class="object-contain cursor-pointer"
      width="60"
      src="/logo.svg"
      @click.stop.prevent="onClick"
    />
    <p class="font-bold text-3xl sm:text-xl text-theme-aside-logo-text">
      Better Write
    </p>
  </div>
</template>

<script setup lang="ts">
  import { useLocalStorage } from '@/use/storage/local'
  import { useRouter } from 'vue-router'

  const router = useRouter()
  const local = useLocalStorage()

  const onClick = () => {
    local.onSaveProject().then(() => {
      router.push('/landing')
    })
  }
</script>
