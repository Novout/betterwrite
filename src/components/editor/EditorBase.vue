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
        bg-gray-700
        overflow-y-auto
        rounded-sm
        shadow-lg
      "
    >
      <EditorHeader />
      <TextShow
        v-for="page in store.state.context.page"
        :id="page.type + '-' + page.id"
        :key="page.id"
        :type="page.type"
      >
        {{ page.raw }}
      </TextShow>
      <TextInput v-model="entry" @enter="enterListener" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { useStore } from 'vuex'
  import { ContextStatePageContent } from '@/types/context'

  const store = useStore()

  const entry = ref('')

  const enterListener = (content: ContextStatePageContent) => {
    store.commit('context/addInPage', content)

    entry.value = ''
  }
</script>
