<template>
  <div
    v-motion
    :initial="{ opacity: 0, y: 30 }"
    :enter="{
      opacity: 1,
      y: 0,
    }"
    class="flex h-full flex-col w-full p-10 gap-5 wb-scroll"
  >
    <slot></slot>
  </div>
</template>
