<template>
  <div v-if="Object.entries(presence).length > 0" class="flex cursor-pointer items-center gap-2 bg-theme-background-3 px-2">
    <div v-for="[index, [user]] in Object.entries(presence)" :key="index" class="p-1" :style="{ backgroundColor: user.color }">
      <img v-if="user.avatar_url" class="bg-cover w-5 h-5 rounded-full" :src="user.avatar_url">
      <p v-else class="font-bold font-raleway">{{ user.id.substring(0, 1).toUpperCase() }}</p>
    </div>
    <p>{{ Object.entries(presence).length }} / {{ LIVESHARE.presenceLimit }}</p>
  </div>
</template>

<script setup lang="ts">
  import { useLiveshareStore } from '@/store/liveshare';
import { computed } from 'vue';

  const LIVESHARE = useLiveshareStore()

  // TODO: resolve reactivity for this
  const presence = computed(() => LIVESHARE.presence)
</script>
