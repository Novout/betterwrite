<template>
  <section class="my-25 z-9999999 flex flex-col justify-around items-center w-full min-h-screen">
    <div class="flex flex-col items-center">
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
        class="text-white text-center font-bold text-2xl md:text-3xl lg:text-4xl font-poppins"
      >
        {{ t('about.powered.title') }}
      </h2>
    </div>
    <div
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
        }" :delay="500" class="flex gap-10 flex-wrap bg-cover justify-evenly items-center flex-row w-full p-5 pointer-events-none">
      
      <AboutPoweredItem bg="#6BD6A4" text="black" name="Vue" link="https://vuejs.org/">
        <IconVue class="w-9 h-9" />
      </AboutPoweredItem>
      <AboutPoweredItem bg="#A0E58C" text="black" name="Vite" link="https://vitejs.dev/">
        <IconVite class="w-9 h-9" />
      </AboutPoweredItem>
      <AboutPoweredItem bg="#111111" text="white" name="WindiCSS" link="https://windicss.org/">
        <IconWindicss class="w-11 h-11" />
      </AboutPoweredItem>
      <AboutPoweredItem bg="#DEDEDE" text="black" name="Vercel" link="https://vercel.com">
        <IconVercel class="w-9 h-9" />
      </AboutPoweredItem>
      <AboutPoweredItem bg="#2C8526" text="white" name="Supabase" link="https://supabase.com/">
        <IconSupabase class="w-9 h-9" />
      </AboutPoweredItem>
      <AboutPoweredItem bg="#FBA7FF" text="black" name="Lerna" link="https://lerna.js.org/">
        <IconLerna class="w-10 h-10" />
      </AboutPoweredItem>
      <AboutPoweredItem bg="#333333" text="white" name="Milkdown" link="https://github.com/Milkdown">
        <IconMilkdown class="w-10 h-10" />
      </AboutPoweredItem>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n()
</script>