<template>
  <div
    class="
      flex flex-col
      border
      rounded
      dark:border-gray-500
      border-gray-800
      p-2
      bg-gray-200
      dark:bg-gray-700
      wb-text
      w-full
    "
  >
    <slot name="title"></slot>
    <slot></slot>
  </div>
</template>

<script setup lang="ts"></script>
