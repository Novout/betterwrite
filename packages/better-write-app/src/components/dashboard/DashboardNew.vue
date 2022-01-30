<template>
  <div
    v-motion
    :initial="{ opacity: 0 }"
    :enter="{ opacity: 1 }"
    :delay="200"
    class="flex justify-around items-center mt-16 bg-theme-background-1 w-full min-h-60 p-5"
  >
    <HeroIcon
      class="wb-icon transform rotate-180"
      @click.prevent.stop="onLeftIndex"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        aria-hidden="true"
        role="img"
        class="w-8 h-8 md:w-10 md:h-10"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 24 24"
      >
        <path
          d="M4 15V9h8V4.16L19.84 12L12 19.84V15H4z"
          fill="currentColor"
        ></path>
      </svg>
    </HeroIcon>
    <DashboardNewProject
      :img="show.img"
      :title="show.title"
      :description="show.description"
      :type="show.type"
    />
    <HeroIcon class="wb-icon" @click.prevent.stop="onRightIndex">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        aria-hidden="true"
        role="img"
        class="w-8 h-8 md:w-10 md:h-10"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 24 24"
      >
        <path
          d="M4 15V9h8V4.16L19.84 12L12 19.84V15H4z"
          fill="currentColor"
        ></path>
      </svg>
    </HeroIcon>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue'
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

  const index = ref(0)

  const onRightIndex = () => {
    if (list.value.length - 1 === index.value) {
      index.value = 0
      return
    }

    index.value++
  }

  const onLeftIndex = () => {
    if (index.value <= 0) {
      index.value = list.value.length - 1
      return
    }

    index.value--
  }

  watch(index, (_index) => {
    show.value = list.value[_index]
  })
</script>
