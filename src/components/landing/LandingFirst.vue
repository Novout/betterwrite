<template>
  <section class="min-h-screen w-full bg-gray-900 bg-wb-landing">
    <div
      class="
        flex flex-col
        items-center
        md:items-end
        w-full
        pt-24
        pr-10
        md:pr-40
      "
    >
      <h1
        class="
          font-bold
          text-gray-300 text-xl
          md:text-2xl
          lg:text-3xl
          xl:text-4xl
          z-10
          pointer-events-none
          text-center
        "
      >
        {{ t('landing.first.title') }}
      </h1>
      <p
        class="
          font-light
          text-gray-300
          mt-1
          text-base
          md:text-lg
          lg:text-xl
          xl:text-2xl
          z-10
          pointer-events-none
          text-center
        "
      >
        {{ t('landing.first.description') }}
      </p>
      <div class="lg:w-5/12 xl:w-1/3 mt-20">
        <ul class="flex flex-col items-end">
          <LandingItems
            :title="t('landing.first.items.track.title')"
            :description="t('landing.first.items.track.description')"
          >
            <template #icon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </template>
          </LandingItems>
          <LandingItems
            :title="t('landing.first.items.pdf.title')"
            :description="t('landing.first.items.pdf.description')"
          >
            <template #icon>
              <img class="ml-1" src="../../assets/editor/pdf.png" width="30" />
            </template>
          </LandingItems>
          <LandingItems
            :title="t('landing.first.items.dropbox.title')"
            :description="t('landing.first.items.dropbox.description')"
          >
            <template #icon>
              <svg
                width="35px"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 43 40"
                version="1.1"
                height="35px"
              >
                <path
                  d="m12.5 0l-12.5 8.1 8.7 7 12.5-7.8-8.7-7.3zm-12.5 21.9l12.5 8.2 8.7-7.3-12.5-7.7-8.7 6.8zm21.2 0.9l8.8 7.3 12.4-8.1-8.6-6.9-12.6 7.7zm21.2-14.7l-12.4-8.1-8.8 7.3 12.6 7.8 8.6-7zm-21.1 16.3l-8.8 7.3-3.7-2.5v2.8l12.5 7.5 12.5-7.5v-2.8l-3.8 2.5-8.7-7.3z"
                  fill="#007EE5"
                />
              </svg>
            </template>
          </LandingItems>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()
</script>
