<template>
  <div
    class="
      md:px-20
      sm:px-0
      px-0
      bg-gray-600
      h-screen
      flex
      justify-center
      items-center
    "
  >
    <div
      class="
        w-11/12
        md:h-editor
        h-screen
        md:p-5
        p-0
        bg-gray-700
        overflow-y-auto
        rounded-sm
        shadow-lg
      "
    >
      <TextInput v-model="entry" @enter="enterListener" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'

  const entry = ref('')

  const enterListener = () => {
    entry.value = ''
  }
</script>
