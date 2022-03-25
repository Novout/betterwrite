<template>
  <header
    v-motion
    :initial="{ opacity: 0 }"
    :enter="{ opacity: 1 }"
    :delay="100"
    class="flex h-12 justify-between items-center w-full bg-theme-editor-background hover:bg-theme-editor-background-hover active:bg-theme-editor-background-active z-30 shadow-lg"
  >
    <div class="flex items-center justify-between">
      <Logo :back="false" :width="19" />
      <EditorBaseHeaderAside />
      <EditorBaseHeaderProject />
      <EditorBaseHeaderCreate />
      <EditorBaseHeaderChapters />
      <EditorBaseHeaderExternals />
    </div>
    <EditorBaseHeaderLogin />
  </header>
</template>
