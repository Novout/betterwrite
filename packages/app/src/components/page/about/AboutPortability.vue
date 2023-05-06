<template>
  <div
    id="about-2"
    class="flex bg-cover py-20 gap-10 justify-evenly items-center flex-col w-full px-5 pointer-events-none"
  >
    <h2
      v-motion
      :initial="{
        opacity: 0,
        y: -50,
      }"
      :visible="{
        opacity: 1,
        y: 0,
        transition: {
          duration: 800,
        },
      }"
      class="text-white text-center font-bold text-xl md:text-2xl lg:text-3xl font-poppins"
    >
      {{ t('about.portability.title') }}
    </h2>
    <p
      v-motion
      :initial="{
        opacity: 0,
        y: -50,
      }"
      :visible="{
        opacity: 1,
        y: 0,
        transition: {
          duration: 800,
        },
      }"
      class="text-white font-bold mt-5 text-base lg:text-lg"
    >
      {{ t('about.portability.description') }}
    </p>
    <div
      v-motion
      :initial="{
        opacity: 0,
      }"
      :visible="{
        opacity: 1,
        transition: {
          duration: 800,
        },
      }"
      :delay="500"
      class="flex items-center justify-center w-full px-1 sm:w-3/4 py-5"
    >
      <div
        v-motion
        :initial="{
          y: -10,
        }"
        :visible="{
          y: 0,
          transition: {
            duration: 1200,
            repeat: Infinity,
            repeatType: 'mirror',
          },
        }"
        class="flex flex-col gap-5"
      >
        <AboutPortabilityItem color="blue"> .DOCX </AboutPortabilityItem>
        <AboutPortabilityItem color="white"> .TXT </AboutPortabilityItem>
        <AboutPortabilityItem color="orange"> .BW </AboutPortabilityItem>
      </div>
      <div
        v-motion
        :initial="{
          y: 10,
        }"
        :visible="{
          y: 0,
          transition: {
            duration: 1200,
            repeat: Infinity,
            repeatType: 'mirror',
          },
        }"
        :delay="500"
        class="flex justify-center gap-5 md:gap-20 items-center w-full"
      >
        <IconArrowTo
          class="text-white h-8 w-8 md:(h-12 w-12) transform -rotate-90"
        />
        <img alt="BW Logo" src="/logo.png" width="100" />
        <IconArrowTo
          class="text-white h-8 w-8 md:(h-12 w-12) transform -rotate-90"
        />
      </div>
      <div
        v-motion
        :initial="{
          y: 10,
        }"
        :visible="{
          y: 0,
          transition: {
            duration: 1200,
            repeat: Infinity,
            repeatType: 'mirror',
          },
        }"
        class="flex flex-col gap-5"
      >
        <AboutPortabilityItem color="blue"> .DOCX </AboutPortabilityItem>
        <AboutPortabilityItem color="green"> .EPUB </AboutPortabilityItem>
        <AboutPortabilityItem color="white"> .TXT </AboutPortabilityItem>
        <AboutPortabilityItem color="red"> .PDF </AboutPortabilityItem>
        <AboutPortabilityItem color="orange"> .BW </AboutPortabilityItem>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()
</script>
