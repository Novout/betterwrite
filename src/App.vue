<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
  import { onBeforeUnmount } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useStore } from 'vuex'
  import { useStart } from '@/use/start'
  import { useDestroy } from '@/use/destroy'

  const { t } = useI18n()
  const store = useStore()

  useStart().init()

  onBeforeUnmount(async () => {
    await useDestroy(store).init()
  })
</script>
