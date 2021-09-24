<template>
  <router-view></router-view>
  <EditorCommands v-if="store.state.absolute.commands" />
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import { useStart } from '@/use/start'
  import { useStore } from 'vuex'

  const store = useStore()
  const { t } = useI18n()

  useStart().init()
</script>

<style>
  #app {
    min-height: 100vh;
    width: 100%;
  }
</style>
