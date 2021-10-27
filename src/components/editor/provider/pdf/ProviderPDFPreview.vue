<template>
  <div
    id="pdf-absolute"
    class="
      absolute
      top-1/2
      left-1/2
      transform
      -translate-x-1/2 -translate-y-1/2
      overflow-y-auto
      duration-700
      bg-white
      dark:bg-gray-800
      transition
      flex flex-col
      z-preview
    "
  >
    <PDFPreview />
  </div>
</template>
