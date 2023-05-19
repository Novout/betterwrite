<template>
  <section v-if="HISTORY.bar.length !== 0" class="flex wb-text overflow-x-auto overflow-y-scroll wb-scroll items-center bg-theme-background-opacity-1 justify-between w-full">
    <button v-for="(item, index) in HISTORY.bar" :key="index" class="flex-1 font-bold flex justify-around items-center hover:bg-theme-background-opacity-1 font-raleway min-w-12 h-10">
      <p class="truncate">{{ item.name || item.id }}</p>
      <button @click.prevent.stop="HISTORY.deleteBar(item)">
        <IconClose class="w-6 h-6 wb-icon"/>
      </button>
    </button>
  </section>
</template>

<script setup lang="ts">
import { useHistoryStore } from '@/store/history';

const HISTORY = useHistoryStore()
</script>