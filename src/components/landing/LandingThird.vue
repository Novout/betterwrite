<template>
  <section
    class="flex flex-col justify-evenly items-center min-h-screen w-full bg-gray-900 bg-wb-landing-third"
  >
    <section class="flex flex-col">
      <h2 class="font-bold text-xl md:text-3xl text-gray-300 py-10 text-center">
        {{ t('landing.third.title') }}
      </h2>
      <p class="font-tiny text-base md:text-lg text-gray-300 pb-3 text-center">
        {{ t('landing.third.description') }}
      </p>
    </section>
    <div
      class="flex flex-row justify-center md:justify-between flex-wrap mt-20 p-2 w-3/4"
    >
      <LandingThirdCard title="Vue">
        <img class="bg-cover" src="../../assets/landing/vue.png" />
      </LandingThirdCard>
      <LandingThirdCard title="Vite">
        <img class="bg-cover" src="../../assets/landing/vite.png" />
      </LandingThirdCard>
      <LandingThirdCard title="TailwindCSS">
        <img class="bg-cover" src="../../assets/landing/tailwindcss.png" />
      </LandingThirdCard>
      <LandingThirdCard title="HeadlessUI">
        <img class="bg-cover" src="../../assets/landing/headlessui.svg" />
      </LandingThirdCard>
      <LandingThirdCard title="PDFMake">
        <img class="bg-cover" src="../../assets/landing/pdfmake.png" />
      </LandingThirdCard>
      <LandingThirdCard title="Dropbox">
        <img class="bg-cover" src="../../assets/landing/dropbox.png" />
      </LandingThirdCard>
      <LandingThirdCard title="FontsAPI">
        <img class="bg-cover" src="../../assets/landing/google.png" />
      </LandingThirdCard>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()
</script>
