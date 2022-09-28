<template>
  <div
    v-motion
    :initial="{ opacity: 0, y: 10 }"
    :enter="{
      opacity: 1,
      y: 0,
      transition: {
        delay: 0,
        duration: 150,
      },
    }"
    class="absolute bg-rgba-blur shadow-xl rounded top-10 md:top-9 flex flex-col w-48 md:w-52 lg:w-72 bg-theme-editor-header-list-background"
  >
    <slot />
  </div>
</template>
