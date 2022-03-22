<template>
  <div
    v-motion
    :initial="{ opacity: 0, y: 10 }"
    :enter="{ opacity: 1, y: 0 }"
    :delay="0"
    class="flex flex-col justify-start items-start p-5 gap-5"
  >
    <PDFConfigurationHeader />
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
      :visible-once="{
        opacity: 1,
        y: 0,
      }"
      :delay="0"
    />
    <PDFConfigurationSetHeadingOne
      v-motion
      :initial="{ opacity: 0, y: 30 }"
      :visible-once="{
        opacity: 1,
        y: 0,
      }"
      :delay="0"
    />
    <PDFConfigurationSetHeadingTwo
      v-motion
      :initial="{ opacity: 0, y: 30 }"
      :visible-once="{
        opacity: 1,
        y: 0,
      }"
      :delay="0"
    />
    <PDFConfigurationSetHeadingThree
      v-motion
      :initial="{ opacity: 0, y: 30 }"
      :visible-once="{
        opacity: 1,
        y: 0,
      }"
      :delay="0"
    />
    <PDFConfigurationSetLineBreak
      v-motion
      :initial="{ opacity: 0, y: 30 }"
      :visible-once="{
        opacity: 1,
        y: 0,
      }"
      :delay="0"
    />
  </div>
</template>
