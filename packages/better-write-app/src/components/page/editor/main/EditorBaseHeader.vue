<template>
  <header
    v-motion
    :initial="{ opacity: 0 }"
    :enter="{ opacity: 1 }"
    :delay="100"
    class="flex z-150 h-12 justify-between items-center w-full z-30 shadow-lg bg-theme-editor-background hover:bg-theme-editor-background-hover active:bg-theme-editor-background-active"
  >
    <div class="flex gap-1 sm:gap-2 lg:gap-5 items-center justify-start">
      <Logo class="ml-3" :back="false" :width="19" />
      <div class="flex font-raleway items-center justify-between">
        <EditorBaseHeaderProject />
        <EditorBaseHeaderCreate />
        <EditorBaseHeaderExternals />
        <EditorBaseHeaderHelp />
      </div>
    </div>
    <div v-if="AUTH.account.user" class="flex items-center gap-2">
      <EditorBaseHeaderLogin />
    </div>
  </header>
</template>

<script setup lang="ts">
  import { useAuthStore } from '@/store/auth'

  const AUTH = useAuthStore()
</script>
