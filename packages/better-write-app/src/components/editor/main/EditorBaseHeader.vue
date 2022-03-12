<template>
  <header
    v-motion
    :initial="{ opacity: 0 }"
    :enter="{ opacity: 1 }"
    :delay="100"
    class="flex justify-between items-center w-full bg-theme-editor-header-background hover:bg-theme-editor-header-background-hover active:bg-theme-editor-header-background-active z-50 pt-0.5"
  >
    <div class="flex items-center justify-between">
      <EditorBaseHeaderAside />
      <EditorBaseHeaderProject />
      <EditorBaseHeaderCreate />
      <EditorBaseHeaderChapters />
      <EditorBaseHeaderExternals />
    </div>
    <div class="flex items-center">
      <EditorBaseHeaderLogin />
      <EditorBaseHeaderFullscreen />
    </div>
  </header>
</template>
