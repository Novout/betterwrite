<template>
  <div
    v-motion
    :initial="{ opacity: 0 }"
    :enter="{ opacity: 1 }"
    :delay="0"
    class="wb-configuration-absolute"
  >
    <EditorProjectPreferencesHeader
      v-motion
      :initial="{ opacity: 0, y: 30 }"
      :enter="{ opacity: 1, y: 0 }"
      :delay="50"
    />
    <EditorProjectPreferencesConfiguration
      v-motion
      :initial="{ opacity: 0, y: 30 }"
      :enter="{ opacity: 1, y: 0 }"
      :delay="150"
    />
    <EditorProjectPreferencesKeyboard
      v-motion
      :initial="{ opacity: 0, y: 30 }"
      :enter="{ opacity: 1, y: 0 }"
      :delay="250"
    />
    <EditorProjectPreferencesDropbox
      v-if="AUTH.dropbox.accessToken"
      v-motion
      :initial="{ opacity: 0, y: 30 }"
      :enter="{ opacity: 1, y: 0 }"
      :delay="350"
    />
    <EditorProjectPreferencesEntity
      v-motion
      :initial="{ opacity: 0, y: 30 }"
      :enter="{ opacity: 1, y: 0 }"
      :delay="450"
    />
    <EditorProjectPreferencesGraph
      v-motion
      :initial="{ opacity: 0, y: 30 }"
      :enter="{ opacity: 1, y: 0 }"
      :delay="550"
    />
    <EditorProjectPreferencesCommands
      v-motion
      :initial="{ opacity: 0, y: 30 }"
      :enter="{ opacity: 1, y: 0 }"
      :delay="650"
    />
  </div>
</template>

<script setup lang="ts">
  import { useAuthStore } from '@/store/auth'

  const AUTH = useAuthStore()
</script>
