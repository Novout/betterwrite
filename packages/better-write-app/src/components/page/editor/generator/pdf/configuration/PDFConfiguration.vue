<template>
  <div
    v-motion
    :initial="{ opacity: 0, y: 10 }"
    :enter="{ opacity: 1, y: 0 }"
    :delay="0"
    class="flex wb-scroll overflow-x-hidden flex-col justify-start items-start p-5 gap-5"
  >
    <div class="w-full">
      <EditorAbsoluteHeader
        class="wb-text"
        :title="'PDF'"
        @close="ABSOLUTE.pdf.configuration = false"
      />
    </div>
    <PDFConfigurationConfig />
    <PDFConfigurationSetProject
      v-motion
      :initial="{ opacity: 0, y: 30 }"
      :enter="{ opacity: 1, y: 0 }"
      :delay="100"
    />
    <PDFConfigurationSetCover
      v-motion
      :initial="{ opacity: 0, y: 30 }"
      :enter="{ opacity: 1, y: 0 }"
      :delay="200"
    />
    <PDFConfigurationSetBase
      v-motion
      :initial="{ opacity: 0, y: 30 }"
      :enter="{ opacity: 1, y: 0 }"
      :delay="300"
    />
    <PDFConfigurationSetParagraph
      v-motion
      :initial="{ opacity: 0, y: 30 }"
      :enter="{ opacity: 1, y: 0 }"
      :delay="400"
    />
    <PDFConfigurationSetHeadingOne
      v-motion
      :initial="{ opacity: 0, y: 30 }"
      :enter="{ opacity: 1, y: 0 }"
      :delay="500"
    />
    <PDFConfigurationSetHeadingTwo
      v-motion
      :initial="{ opacity: 0, y: 30 }"
      :enter="{ opacity: 1, y: 0 }"
      :delay="600"
    />
    <PDFConfigurationSetHeadingThree
      v-motion
      :initial="{ opacity: 0, y: 30 }"
      :enter="{ opacity: 1, y: 0 }"
      :delay="700"
    />
    <PDFConfigurationSetLineBreak
      v-motion
      :initial="{ opacity: 0, y: 30 }"
      :enter="{ opacity: 1, y: 0 }"
      :delay="800"
    />
  </div>
</template>

<script setup lang="ts">
  import { useAbsoluteStore } from '@/store/absolute'

  const ABSOLUTE = useAbsoluteStore()
</script>
