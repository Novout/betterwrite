<template>
  <div class="md:px-20 sm:px-0 px-0 h-screen flex items-center">
    <div
      class="md:w-8/12 w-full h-editor bg-gray-100 dark:bg-gray-700"
      style="
        box-shadow: rgba(50, 50, 105, 0.15) 0px 2px 5px 0px,
          rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;
      "
    >
      <section
        id="edit"
        class="flex flex-col w-full overflow-y-auto max-h-editor px-14"
      >
        <TextShow
          v-for="(page, index) in store.state.context.page"
          :id="page.type + '-' + page.id"
          :key="index"
          :page="page"
        />
      </section>
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

    setTimeout(() => {
      const scr = document.querySelector('#edit')
      ;(scr as HTMLElement).scrollTop = (scr as HTMLElement).scrollHeight
    }, 0)

    entry.value = ''
  }
</script>
