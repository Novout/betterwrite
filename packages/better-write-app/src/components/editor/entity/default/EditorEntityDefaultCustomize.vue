<template>
  <Modal @close="onClose">
    <div
      ref="custom"
      class="fixed w-full h-screen overflow-y-auto text-theme-editor-extras-finder-text hover:text-theme-editor-extras-finder-text-hover active:text-theme-editor-extras-finder-text-active bg-theme-editor-extras-finder-background hover:bg-theme-editor-extras-finder-background-hover active:bg-theme-editor-extras-finder-background-active p-2 rounded shadow-2xl"
    >
      <div class="flex p-3 items-center justify-between w-full">
        <div class="flex">
          <h3 class="mr-2">{{ t('editor.aside.entity.optionsOn') }}</h3>
          <InputBoolean v-model="paragraph.active" />
        </div>
        <HeroIcon class="wb-icon" @click.prevent="onClose">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-7 w-7"
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
      </div>
      <div
        class="flex flex-row flex-wrap items-center overflow-auto"
        :class="[!paragraph.active ? 'opacity-50 pointer-events-none' : '']"
      >
        <div class="wb-input-container">
          <label class="mx-2 text-xs">{{
            t('editor.pdf.custom.generics.font')
          }}</label>
          <InputSelect
            v-model="(paragraph.generator as any).font"
            class="flex-1"
            :min="true"
            :arr="PDF.fonts"
            :font="true"
          />
        </div>
        <div class="wb-input-container">
          <label class="mx-2 text-xs">{{
            t('editor.pdf.custom.generics.fontSize')
          }}</label>
          <InputNumber v-model="(paragraph.generator as any).fontSize" />
        </div>
        <div class="wb-input-container">
          <label class="mx-2 text-xs">{{
            t('editor.pdf.custom.generics.bold')
          }}</label>
          <InputBoolean v-model="(paragraph.generator as any).bold" />
        </div>
        <div class="wb-input-container">
          <label class="mx-2 text-xs">{{
            t('editor.pdf.custom.generics.italics')
          }}</label>
          <InputBoolean v-model="(paragraph.generator as any).italics" />
        </div>
        <div class="wb-input-container">
          <label class="mx-2 text-xs">{{
            t('editor.pdf.base.pageMargins.title')
          }}</label>
          <section>
            <label>{{ t('editor.pdf.base.pageMargins.top') }}</label>
            <InputNumber v-model="(paragraph.generator as any).margin.top" />
          </section>
          <section>
            <label>{{ t('editor.pdf.base.pageMargins.bottom') }}</label>
            <InputNumber v-model="(paragraph.generator as any).margin.bottom" />
          </section>
        </div>
        <div class="wb-input-container">
          <label class="mx-2 text-xs">{{
            t('editor.pdf.custom.generics.lineHeight')
          }}</label>
          <InputNumber v-model="(paragraph.generator as any).lineHeight" />
        </div>
        <div class="wb-input-container">
          <label class="mx-2 text-xs">{{
            t('editor.pdf.custom.generics.alignment')
          }}</label>
          <InputCarousel
            v-model="(paragraph.generator as any).alignment"
            class="flex-1"
            :arr="defines.pdf().alignment()"
          />
        </div>
        <div class="wb-input-container">
          <label class="mx-2 text-xs">{{
            t('editor.pdf.custom.generics.indent')
          }}</label>
          <InputNumber v-model="(paragraph.generator as any).indent" />
        </div>
        <div class="wb-input-container">
          <label class="mx-2 text-xs">{{
            t('editor.pdf.custom.generics.characterSpacing')
          }}</label>
          <InputNumber
            v-model="(paragraph.generator as any).characterSpacing"
          />
        </div>
        <div class="wb-input-container">
          <label class="mx-1 text-xs">{{
            t('editor.pdf.custom.generics.color')
          }}</label>
          <InputColorPicker v-model="(paragraph.generator as any).color" />
        </div>
        <div class="wb-input-container">
          <label class="mx-1 text-xs">{{
            t('editor.pdf.custom.generics.background')
          }}</label>
          <InputColorPicker v-model="(paragraph.generator as any).background" />
        </div>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
  import { computed, watch, ref, reactive } from 'vue'
  import { Entity } from 'better-write-types'
  import { useEditorStore } from '@/store/editor'
  import { useContextStore } from '@/store/context'
  import { useDraggable } from '@vueuse/core'
  import { onClickOutside } from '@vueuse/core'
  import { useAbsoluteStore } from '@/store/absolute'
  import { useI18n } from 'vue-i18n'
  import useEmitter from '@/use/emitter'
  import { usePlugin } from 'better-write-plugin-core'
  import { usePDFStore } from '@/store/pdf'
  import { useDefines } from '@/use/defines'

  const custom = ref<HTMLElement | null>(null)

  onClickOutside(custom as any, () => {
    onClose()
  })

  const EDITOR = useEditorStore()
  const ABSOLUTE = useAbsoluteStore()
  const CONTEXT = useContextStore()
  const PDF = usePDFStore()

  const entity = computed<Entity>(
    () => CONTEXT.entities[EDITOR.actives.entity.index]
  )
  const options = ref<HTMLElement | null>(null)

  const { t } = useI18n()
  const emitter = useEmitter()
  const plugin = usePlugin()
  const defines = useDefines()

  onClickOutside(options as any, () => onClose())

  const onClose = () => {
    ABSOLUTE.entity.customize = false
  }

  const image = reactive({
    height: entity.value.external?.image?.size.height,
    width: entity.value.external?.image?.size.width,
    alignment: entity.value.external?.image?.alignment,
  })

  watch(image, () => {
    const _index: number = CONTEXT.entities.indexOf(entity.value)

    ;(CONTEXT.entities[_index] as any).external.image.alignment =
      image.alignment as any
    ;(CONTEXT.entities[_index] as any).external.image.size.height =
      image.height as any
    ;(CONTEXT.entities[_index] as any).external.image.size.width =
      image.width as any
  })

  const paragraph = reactive({
    active: entity.value.external?.paragraph?.active,
    generator: entity.value.external?.paragraph?.generator,
  })

  watch(paragraph, () => {
    const _index: number = CONTEXT.entities.indexOf(entity.value)

    ;(CONTEXT.entities[_index] as any).external.paragraph.active =
      paragraph.active as any
    ;(CONTEXT.entities[_index] as any).external.paragraph.generator =
      paragraph.generator as any
  })
</script>
