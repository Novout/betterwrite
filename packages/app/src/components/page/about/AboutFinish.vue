<template>
  <div
    id="about-3"
    class="flex bg-cover gap-40 text-white justify-around items-center flex-col w-full py-20"
  >
    <div
      v-motion
      :initial="{
        opacity: 0,
        x: 150,
      }"
      :visible="{
        opacity: 1,
        x: 0,
        transition: {
          duration: 750,
        },
      }"
      class="mt-10"
    >
      <AboutFinishLogo />
    </div>
    <h2
      class="flex flex-col md:flex-row gap-2 font-bold text-lg md:text-3xl font-poppins text-center tracking-wide"
    >
      <span
        v-motion
        :initial="{
          opacity: 0,
          x: -150,
        }"
        :visible="{
          opacity: 1,
          x: 0,
          transition: {
            duration: 750,
          },
        }"
        :delay="750 + 500 * 0"
        >{{ t('about.finish.title1') }}</span
      >
      <span
        v-motion
        :initial="{
          opacity: 0,
          x: -150,
        }"
        :visible="{
          opacity: 1,
          x: 0,
          transition: {
            duration: 750,
          },
        }"
        :delay="750 + 500 * 1"
        >{{ t('about.finish.title2') }}</span
      >
      <span
        v-motion
        :initial="{
          opacity: 0,
          x: -150,
        }"
        :visible="{
          opacity: 1,
          x: 0,
          transition: {
            duration: 750,
          },
        }"
        :delay="750 + 500 * 2"
        >{{ t('about.finish.title3') }}</span
      >
    </h2>
    <AboutFinishTo />
  </div>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()
</script>
