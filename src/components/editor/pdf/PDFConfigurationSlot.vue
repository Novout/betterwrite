<template>
  <div
    class="
      flex flex-col
      border
      rounded
      border-theme-border-1
      p-2
      my-3
      bg-theme-background-1
      wb-text
      w-full
      shadow-lg
    "
  >
    <slot name="title"></slot>
    <slot></slot>
  </div>
</template>

<script setup lang="ts"></script>
