<template>
  <button
    class="
      text-2xs
      w-full
      p-2
      font-bold
      dark:text-gray-300
      hover:border-b
      border-black
      dark:border-gray-300
      rounded-none
      flex
    "
    @click="onCreateNewPage"
  >
    {{ t('editor.aside.project.page.new.title') }}
  </button>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import { useStore } from 'vuex'

  const store = useStore()
  const { t } = useI18n()

  const onCreateNewPage = async () => {
    store.commit('project/newPage')

    const arr = store.state.project.pages
    const obj = arr[arr.length - 1]

    store.commit('context/load', obj)
  }
</script>
