<template>
  <div id="about-0" class="flex flex-col items-center py-10">
    <div class="flex gap-10 items-center flex-col md:w-2/4 lg:w-3/5 w-full">
      <h1
        v-motion
        :initial="{
          opacity: 0,
          x: 150,
        }"
        :enter="{
          opacity: 1,
          x: 0,
          transition: {
            duration: 1000,
          },
        }"
        class="text-white text-center font-bold text-xl md:text-3xl font-poppins mt-5"
      >
        {{ t('about.initial.title') }}
      </h1>
      <v-typical
        v-motion
        :initial="{
          opacity: 0,
          x: -150,
        }"
        :enter="{
          opacity: 1,
          x: 0,
          transition: {
            duration: 1000,
          },
        }"
        :delay="350"
        class="text-white font-thin text-base md:text-lg text-center"
        :steps="[
          t('about.initial.description'),
          10000,
          t('about.initial.description'),
        ]"
        :loop="Infinity"
        :wrapper="'p'"
      />
      <img
        v-motion
        :initial="{
          opacity: 0,
          x: 150,
        }"
        :enter="{
          opacity: 1,
          x: 0,
          transition: {
            duration: 1000,
          },
        }"
        :delay="700"
        class="bg-cover"
        alt="betterwrite.io landing image"
        src="@/assets/png/about1.png"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import VTypical from 'vue-typical'

  const { t } = useI18n()
</script>
