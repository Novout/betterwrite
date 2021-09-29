<template>
  <div class="flex flex-col justify-start items-start p-5">
    <HeroIcon class="absolute right-0 top-0 wb-icon" @click.prevent="onClose">
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
    <PDFConfigurationSlot>
      <template #title>
        <h2 class="text-2xl font-bold font-poppins">
          {{ t('editor.pdf.custom.title.paragraph') }}
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
          <TextSelect
            v-model="paragraph.font"
            class="flex-1"
            :arr="useDefines().pdf().fontFamily()"
          />
        </div>
        <div class="wb-input-container">
          <label class="mx-2 text-xs">{{
            t('editor.pdf.custom.generics.fontSize')
          }}</label>
          <TextNumber v-model="paragraph.fontSize" />
        </div>
        <div class="wb-input-container">
          <label class="mx-2 text-xs">{{
            t('editor.pdf.custom.generics.lineHeight')
          }}</label>
          <TextNumber v-model="paragraph.lineHeight" />
        </div>
        <div class="wb-input-container">
          <label class="mx-2 text-xs">{{
            t('editor.pdf.custom.generics.aligment')
          }}</label>
          <TextSelect
            v-model="paragraph.aligment"
            class="flex-1"
            :arr="useDefines().pdf().aligment()"
          />
        </div>
        <div class="wb-input-container">
          <label class="mx-2 text-xs">{{
            t('editor.pdf.custom.generics.characterSpacing')
          }}</label>
          <TextNumber v-model="paragraph.characterSpacing" />
        </div>
        <div class="wb-input-container">
          <label class="mx-1 text-xs">{{
            t('editor.pdf.custom.generics.color')
          }}</label>
          <TextInput
            v-model="paragraph.color"
            css="w-20 p-1 bg-gray-200 dark:bg-gray-600"
          />
        </div>
        <div class="wb-input-container">
          <label class="mx-1 text-xs">{{
            t('editor.pdf.custom.generics.background')
          }}</label>
          <TextInput
            v-model="paragraph.background"
            css="w-20 p-1 bg-gray-200 dark:bg-gray-600"
          />
        </div>
        <div class="wb-input-container">
          <label class="mx-1 text-xs">{{
            t('editor.pdf.custom.generics.markerColor')
          }}</label>
          <TextInput
            v-model="paragraph.markerColor"
            css="w-20 p-1 bg-gray-200 dark:bg-gray-600"
          />
        </div>
        <div class="wb-input-container">
          <label class="mx-2 text-xs">{{
            t('editor.pdf.custom.generics.decoration')
          }}</label>
          <TextSelect
            v-model="paragraph.decoration"
            class="flex-1"
            :arr="useDefines().pdf().decoration()"
          />
        </div>
        <div class="wb-input-container">
          <label class="mx-2 text-xs">{{
            t('editor.pdf.custom.generics.decorationStyle')
          }}</label>
          <TextSelect
            v-model="paragraph.decorationStyle"
            class="flex-1"
            :arr="useDefines().pdf().decorationStyle()"
          />
        </div>
      </div>
    </PDFConfigurationSlot>
    <button
      class="
        wb-text
        mt-5
        ml-5
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
  import { useDefines } from '@/use/defines'
  import { reactive, nextTick } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useStore } from 'vuex'

  const { t } = useI18n()
  const store = useStore()

  const paragraph = reactive({
    font: useDefines().pdf().fontFamily()[0] as string,
    fontSize: 12 as number,
    lineHeight: 0 as number,
    aligment: useDefines().pdf().aligment()[0] as
      | 'left'
      | 'center'
      | 'right'
      | 'justify',
    characterSpacing: 0 as number,
    color: '#000000' as string,
    background: '#ffffff' as string,
    markerColor: '' as string,
    decoration: useDefines().pdf().decoration()[0] as
      | 'underline'
      | 'lineThrough'
      | 'overline',
    decorationStyle: useDefines().pdf().decorationStyle()[0] as
      | 'dashed'
      | 'dotted'
      | 'double'
      | 'wavy',
    decorationColor: '' as string,
  })

  const onSetConfiguration = async () => {
    store.commit('pdf/setStyles', {
      paragraph,
    })
    await nextTick

    store.commit('absolute/switchPdfConfiguration', false)
  }

  const onClose = () => {
    store.commit('absolute/switchPdfConfiguration', false)
  }
</script>
