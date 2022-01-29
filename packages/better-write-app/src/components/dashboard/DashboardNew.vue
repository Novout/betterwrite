<template>
  <div class="flex flex-wrap w-full min-h-60">
    <DashboardNewProject
      :img="show.img"
      :title="show.title"
      :description="show.description"
      :type="show.type"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()

  const list = ref([
    {
      img: '/logo.png',
      title: t('dashboard.new[0].title'),
      description: t('dashboard.new[0].description'),
      type: 'blank',
    },
    {
      img: '/logo.png',
      title: t('dashboard.new[1].title'),
      description: t('dashboard.new[1].description'),
      type: 'creative',
    },
  ])

  const show = ref<{
    img: string
    title: string
    description: string
    type: string
  }>(list.value[0])
</script>
