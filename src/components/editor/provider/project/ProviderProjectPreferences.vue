<template>
  <div
    class="
      absolute
      top-0
      left-0
      bg-theme-background-1
      flex flex-col
      h-screen
      w-full
      z-max
      px-2
      py-5
      md:px-20
      overflow-y-auto
    "
  >
    <EditorProjectPreferencesDefault />
    <EditorProjectPreferencesEntity />
    <EditorProjectPreferencesKeyboard />
  </div>
</template>

<script setup lang="ts"></script>
