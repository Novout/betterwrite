<template>
  <div
    id="about-0"
    class="flex min-h-screen flex-col justify-between items-center py-10 bg-cover"
  >
    <div
      class="flex gap-10 items-center justify-around flex-col justify-start h-full md:w-3/4 lg:w-3/5 w-full"
    >
      <div class="flex flex-col gap-5">
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
      </div>
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
        class="bg-cover shadow-xl w-10/11 sm:w-full"
        alt="betterwrite.io landing image"
        src="@/assets/png/customtheme.png"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import VTypical from 'vue-typical'

  const { t } = useI18n()
</script>
