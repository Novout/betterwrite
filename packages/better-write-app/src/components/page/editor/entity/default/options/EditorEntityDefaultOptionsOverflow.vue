<template>
  <button
    class="flex bg-rgba-blur items-center justify-between p-1 text-theme-editor-entity-popover-text hover:text-theme-editor-entity-popover-text-hover active:text-theme-editor-entity-popover-text-active w-full hover:bg-theme-editor-entity-popover-background-hover active:bg-theme-editor-entity-popover-background-active"
  >
    <slot name="icon"></slot>
    <p class="px-1 text-sm"><slot></slot></p>
  </button>
</template>
