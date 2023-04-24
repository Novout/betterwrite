<template>
  <div
    id="about-0"
    class="flex min-h-screen flex-col justify-between items-center py-10 bg-cover"
  >
    <div
      class="flex gap-20 items-center flex-col justify-start h-full md:w-3/4 lg:w-3/5 w-10/12"
    >
      <div class="flex items-center flex-col gap-5 w-full">
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
          class="text-white pt-25 text-center font-bold text-xl md:text-3xl font-poppins mt-5"
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
          class="text-white font-bold text-base md:text-lg text-center w-full md:w-150"
          :steps="[
            t('about.initial.description'),
            10000,
            t('about.initial.description'),
          ]"
          :loop="Infinity"
          :wrapper="'p'"
        />
      </div>
      <ul
v-motion
          :initial="{
            opacity: 0,
            x: 150,
          }"
          :enter="{
            opacity: 1,
            x: 0,
            transition: {
              duration: 1500,
            },
          }"
          :delay="1000" class="flex flex-col gap-10 w-full">
        <li class="wb-landing-list">{{ t('about.initial.list.1') }}</li>
        <li class="wb-landing-list">{{ t('about.initial.list.2') }}</li>
        <li class="wb-landing-list">{{ t('about.initial.list.3') }}</li>
        <li class="wb-landing-list">{{ t('about.initial.list.4') }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import VTypical from 'vue-typical'

  const { t } = useI18n()
</script>
