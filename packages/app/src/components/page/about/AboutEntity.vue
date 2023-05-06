<template>
  <div
    id="about-1"
    class="flex justify-evenly py-20 md:mt-0 p-5 flex-col items-center bg-cover w-full"
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
      class="text-white text-center font-bold text-xl md:text-2xl lg:text-3xl font-poppins mt-10"
    >
      {{ t('about.entity.title') }}
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
      class="text-white font-bold mt-15 mb-30 text-base lg:text-lg text-center"
    >
      {{ t('about.entity.description') }}
    </p>
    <div class="flex w-full justify-between gap-10">
      <div class="flex flex-1 flex-col items-center w-full">
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
          class="text-white font-bold text-lg mb-1"
        >
          {{ t('about.entity.bw') }}
        </h2>
        <AboutEntityBlock
          v-motion
          :initial="{
            opacity: 0,
            y: 60,
          }"
          :visible="{
            opacity: 1,
            y: 0,
            transition: {
              duration: 500,
            },
          }"
          :delay="500"
          :content="
            t('editor.project.control.title', {
              suffix: 1,
            })
          "
          type="heading-one"
        />
        <AboutEntityBlock
          v-motion
          :initial="{
            opacity: 0,
            y: 60,
          }"
          :visible="{
            opacity: 1,
            y: 0,
            transition: {
              duration: 500,
            },
          }"
          :delay="500 * 2"
          :content="populate.debug().names().paragraph()"
          type="paragraph"
        />
        <AboutEntityBlock
          v-motion
          :initial="{
            opacity: 0,
            y: 60,
          }"
          :visible="{
            opacity: 1,
            y: 0,
            transition: {
              duration: 500,
            },
          }"
          :delay="500 * 3"
          :content="populate.debug().names().paragraph()"
          type="paragraph"
        />
        <AboutEntityBlock
          v-motion
          :initial="{
            opacity: 0,
            y: 60,
          }"
          :visible="{
            opacity: 1,
            y: 0,
            transition: {
              duration: 500,
            },
          }"
          :delay="500 * 4"
          content="/logo_default.svg"
          type="image"
        />
      </div>
      <div class="flex flex-1 flex-col items-center w-full">
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
          class="text-white font-bold text-lg mb-1"
        >
          {{ t('about.entity.canvas') }}
        </h2>
        <div
          v-motion
          :initial="{
            opacity: 0,
            y: 60,
          }"
          :visible="{
            opacity: 1,
            y: 0,
            transition: {
              duration: 500,
            },
          }"
          :delay="500 * 5"
          class="flex gap-2 flex-col items-center bg-gray-900 text-gray-200 py-2 px-5 my-2 w-full"
        >
          <h2
            class="font-bold text-lg md:text-2xl my-3"
            :contenteditable="true"
            :spellcheck="true"
          >
            {{
              t('editor.project.control.title', {
                suffix: 1,
              })
            }}
          </h2>
          <p class="my-2" :contenteditable="true" :spellcheck="true">
            {{ populate.debug().names().paragraph() }}
          </p>
          <p class="my-2" :contenteditable="true" :spellcheck="true">
            {{ populate.debug().names().paragraph() }}
          </p>
          <img class="my-2" alt="BW Logo" width="30" src="/logo_default.svg" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { usePopulate } from '@/use/populate'
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()
  const populate = usePopulate()
</script>
