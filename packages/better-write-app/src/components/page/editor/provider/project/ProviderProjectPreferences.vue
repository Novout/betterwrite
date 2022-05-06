<template>
  <div
    v-motion
    :initial="{ opacity: 0 }"
    :enter="{ opacity: 1 }"
    :delay="0"
    class="wb-configuration-absolute wb-scroll"
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
  </div>
</template>
