<template>
  <div
    v-motion
    :initial="{ opacity: 0, y: 100 }"
    :enter="{ opacity: 1, y: 0 }"
    :delay="350"
    class="flex w-full px-2 gap-2 text-xs wb-text bg-theme-editor-background-bar hover:theme-editor-background-bar-hover active:theme-editor-background-bar-active"
  >
    <div class="flex pointer-events-none items-center flex-1 gap-4">
      <EditorBaseRenderBarBrowser />
      <EditorBaseRenderBarApplication />
      <EditorBaseRenderBarWifi />
    </div>
    <div class="flex items-center gap-5">
      <EditorBaseRenderBarSocials />
      <EditorBaseRenderBarLiveshare />
      <EditorBaseRenderBarDate />
      <EditorBaseRenderBarFullscreen />
    </div>
  </div>
</template>
