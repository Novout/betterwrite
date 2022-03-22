<template>
  <div
    v-motion
    :initial="{ opacity: 0, y: 10 }"
    :enter="{ opacity: 1, y: 0 }"
    :delay="100"
    class="flex flex-col justify-start items-start p-5 gap-5"
  >
    <PDFConfigurationHeader />
    <PDFConfigurationSetProject />
    <PDFConfigurationSetCover />
    <PDFConfigurationSetBase />
    <PDFConfigurationSetParagraph />
    <PDFConfigurationSetHeadingOne />
    <PDFConfigurationSetHeadingTwo />
    <PDFConfigurationSetHeadingThree />
    <PDFConfigurationSetLineBreak />
  </div>
</template>
