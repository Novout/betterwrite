<template>
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
        <InputBoolean v-model="PDF.styles.switcher.main" />
        <InputFile
          v-if="PDF.styles.switcher.main"
          id="main-background"
          :title="t('generics.input.image')"
          :src="pdf.base.background.main"
          @load="onMainImageLoad"
          @exclude="onDeleteMainImage"
        />
      </div>

      <div class="wb-input-container">
        <label class="mx-2 text-xs">{{ t('editor.pdf.base.pageSize') }}</label>
        <InputSelect
          v-model="pdf.base.pageSize"
          class="flex-1"
          :arr="useDefines().pdf().base().pageSize()"
        />
      </div>
      <div class="wb-input-container">
        <label class="mx-2 text-xs">{{
          t('editor.pdf.base.pageOrientation')
        }}</label>
        <InputSelect
          v-model="pdf.base.pageOrientation"
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
            <InputNumber v-model="pdf.base.pageMargins.left" />
          </section>
          <section>
            <label>{{ t('editor.pdf.base.pageMargins.top') }}</label>
            <InputNumber v-model="pdf.base.pageMargins.top" />
          </section>
          <section>
            <label>{{ t('editor.pdf.base.pageMargins.right') }}</label>
            <InputNumber v-model="pdf.base.pageMargins.right" />
          </section>
          <section>
            <label>{{ t('editor.pdf.base.pageMargins.bottom') }}</label>
            <InputNumber v-model="pdf.base.pageMargins.bottom" />
          </section>
        </section>
      </div>
      <div class="wb-input-container">
        <section
          class="flex justify-start items-center w-full flex-row flex-wrap"
        >
          <section class="flex items-center">
            <label class="mx-2 text-xs">{{
              t('editor.pdf.base.footer.title')
            }}</label>
            <InputBoolean v-model="pdf.switcher.footer" />
          </section>
          <section :class="[!pdf.switcher.footer ? 'wb-disabled' : '']">
            <label>{{ t('editor.pdf.base.footer.start') }}</label>
            <InputNumber v-model="pdf.base.footer.start" />
          </section>
          <section :class="[!pdf.switcher.footer ? 'wb-disabled' : '']">
            <label>{{ t('editor.pdf.base.footer.type') }}</label>
            <InputSelect
              v-model="pdf.base.footer.textType"
              :arr="['simple', 'counter']"
            />
          </section>
          <section :class="[!pdf.switcher.footer ? 'wb-disabled' : '']">
            <label>{{ t('editor.pdf.base.footer.alignment') }}</label>
            <InputSelect
              v-model="pdf.base.footer.alignment"
              :arr="['default', 'left', 'center', 'right']"
            />
          </section>
          <section :class="[!pdf.switcher.footer ? 'wb-disabled' : '']">
            <label>{{ t('editor.pdf.base.footer.size') }}</label>
            <InputNumber v-model="pdf.base.footer.textSize" />
          </section>
          <section :class="[!pdf.switcher.footer ? 'wb-disabled' : '']">
            <label>{{ t('editor.pdf.base.footer.fontFamily') }}</label>
            <InputSelect
              v-model="pdf.base.footer.fontFamily"
              class="flex-1"
              :arr="PDF.fonts"
              :font="true"
            />
          </section>
        </section>
      </div>
      <div class="wb-input-container">
        <section
          class="flex justify-start items-center w-full flex-row flex-wrap"
        >
          <section class="flex items-center">
            <label class="mx-2 text-xs">{{
              t('editor.pdf.base.header.title')
            }}</label>
            <InputBoolean v-model="pdf.switcher.header" />
          </section>
          <section :class="[!pdf.switcher.header ? 'wb-disabled' : '']">
            <label>{{ t('editor.pdf.base.header.start') }}</label>
            <InputNumber v-model="pdf.base.header.start" />
          </section>
          <section :class="[!pdf.switcher.header ? 'wb-disabled' : '']">
            <label>{{ t('editor.pdf.base.header.content') }}</label>
            <InputText
              v-model="pdf.base.header.content"
              class="bg-transparent shadow-lg"
            />
          </section>
          <section :class="[!pdf.switcher.header ? 'wb-disabled' : '']">
            <label>{{ t('editor.pdf.base.header.type') }}</label>
            <InputSelect
              v-model="pdf.base.header.textType"
              :arr="['simple', 'counter']"
            />
          </section>
          <section :class="[!pdf.switcher.header ? 'wb-disabled' : '']">
            <label>{{ t('editor.pdf.base.header.alignment') }}</label>
            <InputSelect
              v-model="pdf.base.header.alignment"
              :arr="['default', 'left', 'center', 'right']"
            />
          </section>
          <section :class="[!pdf.switcher.header ? 'wb-disabled' : '']">
            <label>{{ t('editor.pdf.base.header.size') }}</label>
            <InputNumber v-model="pdf.base.header.textSize" />
          </section>
          <section :class="[!pdf.switcher.header ? 'wb-disabled' : '']">
            <label>{{ t('editor.pdf.base.header.fontFamily') }}</label>
            <InputSelect
              v-model="pdf.base.header.fontFamily"
              class="flex-1"
              :arr="PDF.fonts"
              :font="true"
            />
          </section>
        </section>
      </div>
    </div>
  </PDFConfigurationSlot>
</template>

<script setup lang="ts">
  import { usePDFStore } from '@/store/pdf'
  import { useDefines } from '@/use/defines'
  import { computed } from 'vue'
  import { useI18n } from 'vue-i18n'

  const PDF = usePDFStore()

  const { t } = useI18n()

  const pdf = computed(() => PDF.styles)

  const onMainImageLoad = (e: any) => {
    PDF.setMainBackground(e)
  }

  const onDeleteMainImage = () => {
    PDF.deleteMainBackground()
  }
</script>
