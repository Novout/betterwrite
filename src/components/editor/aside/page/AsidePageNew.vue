<template>
  <button
    class="wb-aside-button hover:bg-black-opacity dark:hover:bg-white-opacity"
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
