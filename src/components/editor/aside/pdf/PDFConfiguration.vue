<template>
  <div class="flex flex-col justify-start items-start">
    <PDFConfigurationSlot>
      <template #title>
        <h2 class="text-2xl font-bold font-poppins">Paragraph</h2>
      </template>
      <div class="flexflex-row flex-wrap justify-between items-center my-3">
        <div
          class="
            flex
            w-52
            items-center
            justify-between
            p-2
            border
            rounded-xl
            border-gray-300
            dark:border-gray-800
            bg-gray-300
            dark:hover:bg-gray-800
            w-32
          "
        >
          <label class="mx-2">{{
            t('editor.pdf.custom.paragraph.font')
          }}</label>
          <TextSelect
            v-model="paragraph.font"
            class="flex-1"
            :arr="useDefines().pdf().fontFamily()"
          />
        </div>
      </div>
    </PDFConfigurationSlot>
    <button @click.prevent="onSetConfiguration">test</button>
  </div>
</template>

<script setup lang="ts">
  import { useDefines } from '@/use/defines'
  import { reactive } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useStore } from 'vuex'

  const { t } = useI18n()
  const store = useStore()

  const paragraph = reactive({
    font: 'Raleway' as string,
    fontSize: '' as string,
    lineHeight: 0 as number,
    bold: false as boolean,
    italics: false as boolean,
    aligment: '' as 'left' | 'center' | 'right' | 'justify',
    characterSpacing: 0 as number,
    color: '' as string,
    background: '' as string,
    markerColor: '' as string,
    decoration: '' as 'underline' | 'lineThrough' | 'overline',
    decorationStyle: '' as 'dashed' | 'dotted' | 'double' | 'wavy',
    decorationColor: '' as string,
  })

  const onSetConfiguration = () => {
    store.commit('pdf/setStyles', {
      paragraph,
    })
  }
</script>
