<template>
  <div class="flex flex-col mt-5 w-full p-1 wb-text">
    <p>{{ t('editor.aside.graph.projectPages') }}</p>
    <div
      v-for="entity in store.state.context.entity"
      :id="`graph-${entity.id}`"
      :key="entity.id"
      @click="useScroll().to(`#${entity.type + '-' + entity.id}`)"
    >
      <AsideGraphItem :raw="entity.raw" :type="entity.type" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import { useStore } from 'vuex'
  import { useScroll } from '@/use/scroll'

  const store = useStore()
  const { t } = useI18n()
</script>
