<template>
  <div class="flex flex-col gap-3 w-full wb-text">
    <h2 class="font-bold text-xl font-poppins"><slot name="title" /></h2>
    <p class="text-lg mt-5"><slot name="description" /></p>
    <div class="w-full break-words">
      <slot />
    </div>
  </div>
</template>
