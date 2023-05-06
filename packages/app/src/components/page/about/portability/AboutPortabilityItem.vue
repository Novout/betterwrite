<template>
  <div
    :class="[
      color === 'red' ? 'from-red-300 to-red-400 shadow-xl shadow-red-900' : '',
      color === 'blue'
        ? 'from-blue-300 to-blue-400 shadow-xl shadow-blue-900'
        : '',
      color === 'white'
        ? 'from-gray-300 to-gray-400 shadow-lg shadow-gray-400'
        : '',
      color === 'orange'
        ? 'from-orange-300 to-orange-400 shadow-xl shadow-orange-900'
        : '',
      color === 'green'
        ? 'from-green-400 to-green-600 shadow-xl shadow-green-900'
        : '',
    ]"
    class="flex font-bold items-center justify-center p-7 md:p-9 rounded-full w-5 h-5 bg-gradient-to-br"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    color: 'red' | 'blue' | 'white' | 'orange' | 'green'
  }>()
</script>
