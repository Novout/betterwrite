<template>
  <div
    class="
      flex flex-col
      border
      rounded
      p-2
      my-3
      border-theme-editor-pdf-configuration-border
      bg-theme-editor-pdf-configuration-container-background
      hover:bg-theme-editor-pdf-configuration-container-background-hover
      active:bg-theme-editor-pdf-configuration-container-background-active
      w-full
      shadow-lg
    "
  >
    <div
      class="
        text-theme-editor-pdf-configuration-container-text
        hover:text-theme-editor-pdf-configuration-container-text-hover
        active:text-theme-editor-pdf-configuration-container-text-active
      "
    >
      <slot name="title"></slot>
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts"></script>
