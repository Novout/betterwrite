<template>
  <div
    class="flex flex-col items-center bg-theme-background-3 shadow-binset mb-5 w-10/12 sm:w-72 wb-text rounded-t-md transition transform hover:-translate-y-5"
  >
    <div class="w-full h-2 rounded-t-md" />
    <div
      class="flex flex-col p-5 items-center bg-theme-background-3 w-full wb-text"
    >
      <h2 class="font-bold font-poppins text-lg">{{ content.plan }}</h2>
      <p class="mt-5 px-5 text-center">{{ content.description }}</p>
    </div>
    <div class="flex items-center font-poppins p-2">
      <p class="font-bold text-3xl">{{ content.price }}</p>
      <p class="ml-1">/{{ t('plans.month') }}</p>
    </div>
    <button
      class="px-5 py-2 shadow-binset transition bg-theme-background-opacity-1 hover:bg-theme-background-2 my-5"
    >
      {{ t('plans.new') }}
    </button>
    <div
      v-for="(feature, index) in content.features"
      :key="index"
      class="flex border-t border-b border-theme-background-4 items-center justify-start w-full px-5 py-2 mt-5"
    >
      <HeroIcon v-if="feature.status === 'yes'"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          role="img"
          class="w-5 h-5"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 48 48"
        >
          <g fill="none">
            <g
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="4"
              clip-path="url(#IconifyId17fa2d72a241cea5460)"
            >
              <path
                d="M42 20v19a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3h21"
              ></path>
              <path d="m16 20l10 8L41 7"></path>
            </g>
            <defs>
              <clipPath id="IconifyId17fa2d72a241cea5460">
                <path fill="currentColor" d="M0 0h48v48H0z"></path>
              </clipPath>
            </defs>
          </g></svg
      ></HeroIcon>
      <HeroIcon v-if="feature.status === 'meh'"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          role="img"
          class="w-5 h-5"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            fill-rule="evenodd"
            d="M4 11h16v2H4z"
          ></path></svg
      ></HeroIcon>
      <HeroIcon v-if="feature.status === 'no'"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          role="img"
          class="w-5 h-5"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 1024 1024"
        >
          <path
            fill="currentColor"
            d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504L738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512L828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496L285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512L195.2 285.696a64 64 0 0 1 0-90.496z"
          ></path></svg
      ></HeroIcon>
      <p class="ml-2">{{ feature.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { AccountPlan } from 'better-write-types'
  import { useI18n } from 'vue-i18n'

  defineProps<{
    content: {
      plan: AccountPlan
      description: string
      price: string
      features: {
        status: 'yes' | 'meh' | 'no'
        description: string
      }[]
    }
  }>()

  const { t } = useI18n()
</script>
