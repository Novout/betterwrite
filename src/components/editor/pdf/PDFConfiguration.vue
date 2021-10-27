<template>
  <div class="flex flex-col justify-start items-start p-5">
    <HeroIcon
      class="absolute right-0 top-0 wb-icon"
      @click.prevent="onSetConfiguration"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </HeroIcon>
    <PDFConfigurationSlot v-if="!project.isBlankProject()">
      <template #title>
        <h2 class="text-2xl ml-2 font-bold font-poppins">
          {{ t('editor.pdf.custom.title.cover') }}
        </h2>
      </template>
      <div
        class="
          flex flex-row flex-wrap
          justify-start
          items-center
          my-3
          overflow-x-hidden
        "
      >
        <div class="wb-input-container justify-start">
          <label class="mx-2 text-xs">{{ t('editor.pdf.cover.type') }}</label>
          <InputBoolean v-model="switcher.cover" />
          <InputFile
            v-if="switcher.cover"
            id="cover-background"
            :src="_base.background.data"
            @load="onCoverImageLoad"
            @exclude="onDeleteCoverImage"
          />
        </div>
      </div>
    </PDFConfigurationSlot>
    <PDFConfigurationSlot>
      <template #title>
        <h2 class="text-2xl ml-2 font-bold font-poppins">
          {{ t('editor.pdf.base.title') }}
        </h2>
      </template>
      <div
        class="
          flex flex-row flex-wrap
          justify-start
          items-center
          my-3
          overflow-x-hidden
        "
      >
        <div class="wb-input-container">
          <label class="mx-2 text-xs">{{ t('editor.pdf.cover.type') }}</label>
          <InputBoolean v-model="switcher.main" />
          <InputFile
            v-if="switcher.main"
            id="main-background"
            :title="t('generics.input.image')"
            :src="_base.background.main"
            @load="onMainImageLoad"
            @exclude="onDeleteMainImage"
          />
        </div>

        <div class="wb-input-container">
          <label class="mx-2 text-xs">{{
            t('editor.pdf.base.pageSize')
          }}</label>
          <InputSelect
            v-model="base.pageSize"
            class="flex-1"
            :arr="useDefines().pdf().base().pageSize()"
          />
        </div>
        <div class="wb-input-container">
          <label class="mx-2 text-xs">{{
            t('editor.pdf.base.pageOrientation')
          }}</label>
          <InputSelect
            v-model="base.pageOrientation"
            class="flex-1"
            :arr="useDefines().pdf().base().pageOrientation()"
          />
        </div>
        <div class="wb-input-container">
          <label class="mx-2 text-xs">{{
            t('editor.pdf.base.pageMargins.title')
          }}</label>
          <section class="flex justify-between w-full flex-row flex-wrap">
            <section>
              <label>{{ t('editor.pdf.base.pageMargins.left') }}</label>
              <InputNumber v-model="basePageMargins.left" />
            </section>
            <section>
              <label>{{ t('editor.pdf.base.pageMargins.top') }}</label>
              <InputNumber v-model="basePageMargins.top" />
            </section>
            <section>
              <label>{{ t('editor.pdf.base.pageMargins.right') }}</label>
              <InputNumber v-model="basePageMargins.right" />
            </section>
            <section>
              <label>{{ t('editor.pdf.base.pageMargins.bottom') }}</label>
              <InputNumber v-model="basePageMargins.bottom" />
            </section>
          </section>
        </div>
      </div>
    </PDFConfigurationSlot>
    <PDFConfigurationSlot>
      <template #title>
        <h2 class="text-2xl ml-2 font-bold font-poppins">
          {{ t('editor.pdf.custom.title.paragraph') }}
        </h2>
      </template>
      <div
        class="
          flex flex-row flex-wrap
          justify-start
          items-center
          my-3
          overflow-x-hidden
        "
      >
        <div class="wb-input-container">
          <label class="mx-2 text-xs">{{
            t('editor.pdf.custom.generics.font')
          }}</label>
          <InputSelect
            v-model="paragraph.font"
            class="flex-1"
            :arr="fontFamily"
            :font="true"
          />
        </div>
        <div class="wb-input-container">
          <label class="mx-2 text-xs">{{
            t('editor.pdf.custom.generics.fontSize')
          }}</label>
          <InputNumber v-model="paragraph.fontSize" />
        </div>
        <div class="wb-input-container">
          <label class="mx-2 text-xs">{{
            t('editor.pdf.custom.generics.lineHeight')
          }}</label>
          <InputNumber v-model="paragraph.lineHeight" />
        </div>
        <div class="wb-input-container">
          <label class="mx-2 text-xs">{{
            t('editor.pdf.custom.generics.alignment')
          }}</label>
          <InputSelect
            v-model="paragraph.alignment"
            class="flex-1"
            :arr="useDefines().pdf().alignment()"
          />
        </div>
        <div class="wb-input-container">
          <label class="mx-2 text-xs">{{
            t('editor.pdf.custom.generics.indent')
          }}</label>
          <InputNumber v-model="paragraph.indent" />
        </div>
        <div class="wb-input-container">
          <label class="mx-2 text-xs">{{
            t('editor.pdf.custom.generics.characterSpacing')
          }}</label>
          <InputNumber v-model="paragraph.characterSpacing" />
        </div>
        <div class="wb-input-container">
          <label class="mx-1 text-xs">{{
            t('editor.pdf.custom.generics.color')
          }}</label>
          <InputColorPicker v-model="paragraph.color" />
        </div>
        <div class="wb-input-container">
          <label class="mx-1 text-xs">{{
            t('editor.pdf.custom.generics.background')
          }}</label>
          <InputColorPicker v-model="paragraph.background" />
        </div>
        <div class="wb-input-container">
          <label class="mx-1 text-xs">{{
            t('editor.pdf.custom.generics.markerColor')
          }}</label>
          <InputColorPicker v-model="paragraph.markerColor" />
        </div>
        <div class="wb-input-container">
          <label class="mx-2 text-xs">{{
            t('editor.pdf.custom.generics.decoration')
          }}</label>
          <InputSelect
            v-model="paragraph.decoration"
            class="flex-1"
            :arr="useDefines().pdf().decoration()"
          />
        </div>
        <div class="wb-input-container">
          <label class="mx-2 text-xs">{{
            t('editor.pdf.custom.generics.decorationStyle')
          }}</label>
          <InputSelect
            v-model="paragraph.decorationStyle"
            class="flex-1"
            :arr="useDefines().pdf().decorationStyle()"
          />
        </div>
      </div>
    </PDFConfigurationSlot>
    <PDFConfigurationSlot v-if="!project.isBlankProject()">
      <template #title>
        <h2 class="text-2xl ml-2 font-bold font-poppins">
          {{ t('editor.pdf.custom.title.headingOne') }}
        </h2>
      </template>
      <div
        class="
          flex flex-row flex-wrap
          justify-between
          items-center
          my-3
          overflow-x-hidden
        "
      >
        <div class="wb-input-container">
          <label class="mx-2 text-xs">{{
            t('editor.pdf.custom.generics.font')
          }}</label>
          <InputSelect
            v-model="headingOne.font"
            class="flex-1"
            :arr="fontFamily"
            :font="true"
          />
        </div>
        <div class="wb-input-container">
          <label class="mx-2 text-xs">{{
            t('editor.pdf.custom.generics.fontSize')
          }}</label>
          <InputNumber v-model="headingOne.fontSize" />
        </div>
        <div class="wb-input-container">
          <label class="mx-2 text-xs">{{
            t('editor.pdf.custom.generics.lineHeight')
          }}</label>
          <InputNumber v-model="headingOne.lineHeight" />
        </div>
        <div class="wb-input-container">
          <label class="mx-2 text-xs">{{
            t('editor.pdf.custom.generics.bold')
          }}</label>
          <InputBoolean v-model="headingOne.bold" />
        </div>
        <div class="wb-input-container">
          <label class="mx-2 text-xs">{{
            t('editor.pdf.custom.generics.italics')
          }}</label>
          <InputBoolean v-model="headingOne.italics" />
        </div>
        <div class="wb-input-container">
          <label class="mx-2 text-xs">{{
            t('editor.pdf.custom.generics.alignment')
          }}</label>
          <InputSelect
            v-model="headingOne.alignment"
            class="flex-1"
            :arr="useDefines().pdf().alignment()"
          />
        </div>
        <div class="wb-input-container">
          <label class="mx-2 text-xs">{{
            t('editor.pdf.custom.generics.characterSpacing')
          }}</label>
          <InputNumber v-model="headingOne.characterSpacing" />
        </div>
        <div class="wb-input-container">
          <label class="mx-1 text-xs">{{
            t('editor.pdf.custom.generics.color')
          }}</label>
          <InputColorPicker v-model="headingOne.color" />
        </div>
        <div class="wb-input-container">
          <label class="mx-1 text-xs">{{
            t('editor.pdf.custom.generics.background')
          }}</label>
          <InputColorPicker v-model="headingOne.background" />
        </div>
        <div class="wb-input-container">
          <label class="mx-1 text-xs">{{
            t('editor.pdf.custom.generics.markerColor')
          }}</label>
          <InputColorPicker v-model="headingOne.markerColor" />
        </div>
        <div class="wb-input-container">
          <label class="mx-2 text-xs">{{
            t('editor.pdf.custom.generics.decoration')
          }}</label>
          <InputSelect
            v-model="headingOne.decoration"
            class="flex-1"
            :arr="useDefines().pdf().decoration()"
          />
        </div>
        <div class="wb-input-container">
          <label class="mx-2 text-xs">{{
            t('editor.pdf.custom.generics.decorationStyle')
          }}</label>
          <InputSelect
            v-model="headingOne.decorationStyle"
            class="flex-1"
            :arr="useDefines().pdf().decorationStyle()"
          />
        </div>
        <div class="wb-input-container">
          <label class="mx-2 text-xs">{{
            t('editor.pdf.custom.generics.breakPage')
          }}</label>
          <InputBoolean v-model="headingOne.breakPage" />
        </div>
      </div>
    </PDFConfigurationSlot>
    <PDFConfigurationSlot>
      <template #title>
        <h2 class="text-2xl ml-2 font-bold font-poppins">
          {{ t('editor.pdf.custom.title.headingTwo') }}
        </h2>
      </template>
      <div
        class="
          flex flex-row flex-wrap
          justify-between
          items-center
          my-3
          overflow-x-hidden
        "
      >
        <div class="wb-input-container">
          <label class="mx-2 text-xs">{{
            t('editor.pdf.custom.generics.font')
          }}</label>
          <InputSelect
            v-model="headingTwo.font"
            class="flex-1"
            :arr="fontFamily"
            :font="true"
          />
        </div>
        <div class="wb-input-container">
          <label class="mx-2 text-xs">{{
            t('editor.pdf.custom.generics.fontSize')
          }}</label>
          <InputNumber v-model="headingTwo.fontSize" />
        </div>
        <div class="wb-input-container">
          <label class="mx-2 text-xs">{{
            t('editor.pdf.custom.generics.lineHeight')
          }}</label>
          <InputNumber v-model="headingTwo.lineHeight" />
        </div>
        <div class="wb-input-container">
          <label class="mx-2 text-xs">{{
            t('editor.pdf.custom.generics.bold')
          }}</label>
          <InputBoolean v-model="headingTwo.bold" />
        </div>
        <div class="wb-input-container">
          <label class="mx-2 text-xs">{{
            t('editor.pdf.custom.generics.italics')
          }}</label>
          <InputBoolean v-model="headingTwo.italics" />
        </div>
        <div class="wb-input-container">
          <label class="mx-2 text-xs">{{
            t('editor.pdf.custom.generics.alignment')
          }}</label>
          <InputSelect
            v-model="headingTwo.alignment"
            class="flex-1"
            :arr="useDefines().pdf().alignment()"
          />
        </div>
        <div class="wb-input-container">
          <label class="mx-2 text-xs">{{
            t('editor.pdf.custom.generics.characterSpacing')
          }}</label>
          <InputNumber v-model="headingTwo.characterSpacing" />
        </div>
        <div class="wb-input-container">
          <label class="mx-1 text-xs">{{
            t('editor.pdf.custom.generics.color')
          }}</label>
          <InputColorPicker v-model="headingTwo.color" />
        </div>
        <div class="wb-input-container">
          <label class="mx-1 text-xs">{{
            t('editor.pdf.custom.generics.background')
          }}</label>
          <InputColorPicker v-model="headingTwo.background" />
        </div>
        <div class="wb-input-container">
          <label class="mx-1 text-xs">{{
            t('editor.pdf.custom.generics.markerColor')
          }}</label>
          <InputColorPicker v-model="headingTwo.markerColor" />
        </div>
        <div class="wb-input-container">
          <label class="mx-2 text-xs">{{
            t('editor.pdf.custom.generics.decoration')
          }}</label>
          <InputSelect
            v-model="headingTwo.decoration"
            class="flex-1"
            :arr="useDefines().pdf().decoration()"
          />
        </div>
        <div class="wb-input-container">
          <label class="mx-2 text-xs">{{
            t('editor.pdf.custom.generics.decorationStyle')
          }}</label>
          <InputSelect
            v-model="headingTwo.decorationStyle"
            class="flex-1"
            :arr="useDefines().pdf().decorationStyle()"
          />
        </div>
        <div class="wb-input-container">
          <label class="mx-2 text-xs">{{
            t('editor.pdf.custom.generics.breakPage')
          }}</label>
          <InputBoolean v-model="headingTwo.breakPage" />
        </div>
      </div>
    </PDFConfigurationSlot>
    <PDFConfigurationSlot>
      <template #title>
        <h2 class="text-2xl ml-2 font-bold font-poppins">
          {{ t('editor.pdf.custom.title.headingThree') }}
        </h2>
      </template>
      <div
        class="
          flex flex-row flex-wrap
          justify-between
          items-center
          my-3
          overflow-x-hidden
        "
      >
        <div class="wb-input-container">
          <label class="mx-2 text-xs">{{
            t('editor.pdf.custom.generics.font')
          }}</label>
          <InputSelect
            v-model="headingThree.font"
            class="flex-1"
            :arr="fontFamily"
            :font="true"
          />
        </div>
        <div class="wb-input-container">
          <label class="mx-2 text-xs">{{
            t('editor.pdf.custom.generics.fontSize')
          }}</label>
          <InputNumber v-model="headingThree.fontSize" />
        </div>
        <div class="wb-input-container">
          <label class="mx-2 text-xs">{{
            t('editor.pdf.custom.generics.lineHeight')
          }}</label>
          <InputNumber v-model="headingThree.lineHeight" />
        </div>
        <div class="wb-input-container">
          <label class="mx-2 text-xs">{{
            t('editor.pdf.custom.generics.bold')
          }}</label>
          <InputBoolean v-model="headingThree.bold" />
        </div>
        <div class="wb-input-container">
          <label class="mx-2 text-xs">{{
            t('editor.pdf.custom.generics.italics')
          }}</label>
          <InputBoolean v-model="headingThree.italics" />
        </div>
        <div class="wb-input-container">
          <label class="mx-2 text-xs">{{
            t('editor.pdf.custom.generics.alignment')
          }}</label>
          <InputSelect
            v-model="headingThree.alignment"
            class="flex-1"
            :arr="useDefines().pdf().alignment()"
          />
        </div>
        <div class="wb-input-container">
          <label class="mx-2 text-xs">{{
            t('editor.pdf.custom.generics.characterSpacing')
          }}</label>
          <InputNumber v-model="headingThree.characterSpacing" />
        </div>
        <div class="wb-input-container">
          <label class="mx-1 text-xs">{{
            t('editor.pdf.custom.generics.color')
          }}</label>
          <InputColorPicker v-model="headingThree.color" />
        </div>
        <div class="wb-input-container">
          <label class="mx-1 text-xs">{{
            t('editor.pdf.custom.generics.background')
          }}</label>
          <InputColorPicker v-model="headingThree.background" />
        </div>
        <div class="wb-input-container">
          <label class="mx-1 text-xs">{{
            t('editor.pdf.custom.generics.markerColor')
          }}</label>
          <InputColorPicker v-model="headingThree.markerColor" />
        </div>
        <div class="wb-input-container">
          <label class="mx-2 text-xs">{{
            t('editor.pdf.custom.generics.decoration')
          }}</label>
          <InputSelect
            v-model="headingThree.decoration"
            class="flex-1"
            :arr="useDefines().pdf().decoration()"
          />
        </div>
        <div class="wb-input-container">
          <label class="mx-2 text-xs">{{
            t('editor.pdf.custom.generics.decorationStyle')
          }}</label>
          <InputSelect
            v-model="headingThree.decorationStyle"
            class="flex-1"
            :arr="useDefines().pdf().decorationStyle()"
          />
        </div>
        <div class="wb-input-container">
          <label class="mx-2 text-xs">{{
            t('editor.pdf.custom.generics.breakPage')
          }}</label>
          <InputBoolean v-model="headingThree.breakPage" />
        </div>
      </div>
    </PDFConfigurationSlot>
    <button
      class="
        relative
        right-0
        wb-text
        px-4
        py-2
        bg-gray-300
        active:bg-gray-500
        dark:bg-gray-600 dark:active:bg-gray-800
      "
      @click.prevent="onSetConfiguration"
    >
      {{ t('editor.pdf.custom.save') }}
    </button>
  </div>
</template>

<script setup lang="ts">
  import { useAbsoluteStore } from '@/store/absolute'
  import { usePDFStore } from '@/store/pdf'
  import { useProjectStore } from '@/store/project'
  import { useDefines } from '@/use/defines'
  import { useProject } from '@/use/project'
  import { reactive, nextTick, computed } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useToast } from 'vue-toastification'

  const ABSOLUTE = useAbsoluteStore()
  const PDF = usePDFStore()
  const PROJECT = useProjectStore()

  const { t } = useI18n()
  const toast = useToast()
  const project = useProject()

  const _base = computed(() => PDF.styles.base)
  const _paragraph = computed(() => PDF.styles.paragraph)
  const _hone = computed(() => PDF.styles.headingOne)
  const _htwo = computed(() => PDF.styles.headingTwo)
  const _hthree = computed(() => PDF.styles.headingThree)

  const switcher = reactive({
    cover: PDF.styles.switcher.cover,
    main: PDF.styles.switcher.main,
  })

  const fontFamily = computed(() => PDF.fonts)

  const base = reactive({
    pageSize: _base.value.pageSize,
    pageOrientation: _base.value.pageOrientation,
  })

  const basePageMargins = reactive({
    left: _base.value.pageMargins.left,
    top: _base.value.pageMargins.top,
    right: _base.value.pageMargins.right,
    bottom: _base.value.pageMargins.bottom,
  })

  const paragraph = reactive({
    font: _paragraph.value.font,
    fontSize: _paragraph.value.fontSize,
    lineHeight: _paragraph.value.lineHeight,
    indent: _paragraph.value.indent,
    alignment: _paragraph.value.alignment,
    characterSpacing: _paragraph.value.characterSpacing,
    color: _paragraph.value.color,
    background: _paragraph.value.background,
    markerColor: _paragraph.value.markerColor,
    decoration: _paragraph.value.decoration,
    decorationStyle: _paragraph.value.decorationStyle,
    decorationColor: _paragraph.value.decorationColor,
  })

  const headingOne = reactive({
    font: _hone.value.font,
    fontSize: _hone.value.fontSize,
    lineHeight: _hone.value.lineHeight,
    bold: _hone.value.bold,
    italics: _hone.value.italics,
    alignment: _hone.value.alignment,
    characterSpacing: _hone.value.characterSpacing,
    color: _hone.value.color,
    background: _hone.value.background,
    markerColor: _hone.value.markerColor,
    decoration: _hone.value.decoration,
    decorationStyle: _hone.value.decorationStyle,
    decorationColor: _hone.value.decorationColor,
    breakPage: _hone.value.breakPage,
  })

  const headingTwo = reactive({
    font: _htwo.value.font,
    fontSize: _htwo.value.fontSize,
    lineHeight: _htwo.value.lineHeight,
    bold: _htwo.value.bold,
    italics: _htwo.value.italics,
    alignment: _htwo.value.alignment,
    characterSpacing: _htwo.value.characterSpacing,
    color: _htwo.value.color,
    background: _htwo.value.background,
    markerColor: _htwo.value.markerColor,
    decoration: _htwo.value.decoration,
    decorationStyle: _htwo.value.decorationStyle,
    decorationColor: _htwo.value.decorationColor,
    breakPage: _htwo.value.breakPage,
  })

  const headingThree = reactive({
    font: _hthree.value.font,
    fontSize: _hthree.value.fontSize,
    lineHeight: _hthree.value.lineHeight,
    bold: _hthree.value.bold,
    italics: _hthree.value.italics,
    alignment: _hthree.value.alignment,
    characterSpacing: _hthree.value.characterSpacing,
    color: _hthree.value.color,
    background: _hthree.value.background,
    markerColor: _hthree.value.markerColor,
    decoration: _hthree.value.decoration,
    decorationStyle: _hthree.value.decorationStyle,
    decorationColor: _hthree.value.decorationColor,
    breakPage: _hthree.value.breakPage,
  })

  const onSetConfiguration = async () => {
    if (window.confirm(t('editor.window.confirmConfiguration'))) {
      PDF.setStyles({
        base: {
          ...base,
          background: _base.value.background,
          pageMargins: basePageMargins,
        },
        paragraph,
        headingOne,
        headingTwo,
        headingThree,
        switcher,
      })

      await nextTick

      toast.success(t('toast.pdf.configuration.save'))
    }

    ABSOLUTE.pdf.configuration = false
  }

  const onCoverImageLoad = (e: any) => {
    PDF.setCoverBackground(e)
  }

  const onMainImageLoad = (e: any) => {
    PDF.setMainBackground(e)
  }

  const onDeleteCoverImage = () => {
    PDF.deleteCoverBackground()
  }

  const onDeleteMainImage = () => {
    PDF.deleteMainBackground()
  }
</script>
