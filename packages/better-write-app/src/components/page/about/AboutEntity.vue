<template>
  <div
    id="about-1"
    class="flex flex-col items-center w-full md:w-3/4 border border-gray-900 shadow-xl shadow-gray-900 p-15"
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
      class="text-white text-center font-bold text-xl md:text-3xl font-poppins mt-5"
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
      class="text-white font-thin my-10 text-lg"
    >
      {{ t('about.entity.description') }}
    </p>
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
          suffix: PROJECT.totalPagesCreated + 1,
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
</template>

<script setup lang="ts">
  import { useProjectStore } from '@/store/project'
  import { usePopulate } from '@/use/populate'
  import { useI18n } from 'vue-i18n'

  const PROJECT = useProjectStore()

  const { t } = useI18n()
  const populate = usePopulate()
</script>
