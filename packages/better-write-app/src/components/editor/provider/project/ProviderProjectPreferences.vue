<template>
  <div
    v-motion
    :initial="{ opacity: 0 }"
    :enter="{ opacity: 1 }"
    :delay="100"
    class="wb-configuration-absolute"
  >
    <EditorProjectPreferencesDefault />
    <EditorProjectPreferencesConfiguration />
    <EditorProjectPreferencesDropbox v-if="AUTH.dropbox.accessToken" />
    <EditorProjectPreferencesEntity />
    <EditorProjectPreferencesCommands />
    <EditorProjectPreferencesKeyboard />
  </div>
</template>

<script setup lang="ts">
  import { useAuthStore } from '@/store/auth'

  const AUTH = useAuthStore()
</script>
