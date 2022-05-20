<template>
  <div
    id="about-3"
    alt="https://www.artstation.com/rigdhi_gamernoob"
    style="background-image: url('/src/assets/png/about2.png')"
    class="flex bg-cover text-white min-h-screen justify-center items-center gap-20 flex-col w-full pt-10 py-30"
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
    >
      <AboutFinishLogo />
    </div>
    <h2
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
      :delay="750"
      class="font-bold text-lg md:text-3xl font-poppins text-center"
    >
      {{ t('about.finish.title') }}
    </h2>
    <AboutFinishTo />
  </div>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()
</script>
