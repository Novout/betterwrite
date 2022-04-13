<template>
  <Modal @close="onClose">
    <div
      ref="custom"
      class="fixed px-2 md:px-10 w-full h-screen overflow-y-auto text-theme-editor-extras-finder-text hover:text-theme-editor-extras-finder-text-hover active:text-theme-editor-extras-finder-text-active bg-theme-editor-extras-finder-background hover:bg-theme-editor-extras-finder-background-hover active:bg-theme-editor-extras-finder-background-active p-2 rounded shadow-2xl"
    >
      <div class="flex py-3 items-center justify-between w-full">
        <div class="flex">
          <h3 class="mr-2">{{ t('editor.aside.entity.optionsOn') }}</h3>
          <InputBoolean v-model="paragraph.active" :specific="true" />
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
        :class="[!paragraph.active ? 'opacity-50 pointer-events-none' : '']"
        class="flex items-center justify-start w-full my-5"
      >
        <InputSelect v-model="template" class="w-52" :arr="templates" />
        <div
          class="flex flex-wrap ml-2 px-2 items-center bg-theme-background-2"
        >
          <InputText
            v-model="templateText"
            class="mx-2 bg-transparent shadow shadow-xl rounded"
          />
          <HeroIcon class="wb-icon w-10 h-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              aria-hidden="true"
              role="img"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 24 24"
              @click.prevent.stop="onCreateParagraphTemplate"
            >
              <path
                fill="currentColor"
                d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
              ></path>
            </svg>
          </HeroIcon>
          <HeroIcon class="wb-icon w-10 h-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              aria-hidden="true"
              role="img"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 24 24"
              @click.prevent.stop="onDeleteParagraphTemplate"
            >
              <path
                fill="currentColor"
                d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
              ></path>
            </svg>
          </HeroIcon>
        </div>
      </div>
      <div
        class="flex h-60 max-h-60 items-center justify-center w-full overflow-hidden p-1 md:p-5 bg-theme-background-opacity-1"
        :class="[!paragraph.active ? 'opacity-50 pointer-events-none' : '']"
      >
        <p
          :style="{
            fontFamily: paragraph.generator?.font,
            fontSize: `${paragraph.generator?.fontSize}px`,
            fontStyle: paragraph.generator?.italics ? 'italic' : 'normal',
            fontWeight: paragraph.generator?.bold ? 'bolder' : 'normal',
            letterSpacing: `${paragraph.generator?.characterSpacing}px`,
            color: paragraph.generator?.color,
            backgroundColor: paragraph.generator?.background,
            padding: '2rem',
          }"
        >
          Lorem
        </p>
      </div>
      <div
        class="flex gap-5 flex-row flex-wrap items-center overflow-auto"
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
  import { onClickOutside } from '@vueuse/core'
  import { useAbsoluteStore } from '@/store/absolute'
  import { useI18n } from 'vue-i18n'
  import { usePDFStore } from '@/store/pdf'
  import { useDefines } from '@/use/defines'
  import { useProjectStore } from '@/store/project'
  import { useNProgress } from '@vueuse/integrations/useNProgress'
  import { useToast } from 'vue-toastification'
  import { useFactory } from '@/use/factory'

  const custom = ref<HTMLElement | null>(null)

  onClickOutside(custom as any, () => {
    onClose()
  })

  const EDITOR = useEditorStore()
  const ABSOLUTE = useAbsoluteStore()
  const CONTEXT = useContextStore()
  const PROJECT = useProjectStore()
  const PDF = usePDFStore()

  const { t } = useI18n()
  const toast = useToast()
  const defines = useDefines()
  const factory = useFactory()
  const { isLoading } = useNProgress()

  const entity = computed<Entity>(
    () => CONTEXT.entities[EDITOR.actives.entity.index]
  )
  const options = ref<HTMLElement | null>(null)

  const templates = computed(() => [
    t('editor.entity.generator.template'),
    ...PROJECT.templates.generator.map((g) => g.name),
  ])
  const template = ref<string>(templates.value[0])
  const templateText = ref<string>('')

  onClickOutside(options as any, () => onClose())

  const onClose = () => {
    ABSOLUTE.entity.customize = false
  }

  watch(template, (_template) => {
    if (!_template) return

    if (_template === t('editor.entity.generator.template')) {
      paragraph.generator = factory.entity().generator()

      return
    }

    const generator = PROJECT.templates.generator.find(
      (g) => g.name === template.value
    )

    if (!generator) return

    paragraph.generator = generator.paragraph

    const _index: number = CONTEXT.entities.indexOf(entity.value)

    ;(CONTEXT.entities[_index] as any).external.paragraph.active =
      paragraph.active as any
    ;(CONTEXT.entities[_index] as any).external.paragraph.generator =
      paragraph.generator as any
  })

  const paragraph = reactive({
    active: entity.value.external?.paragraph?.active,
    generator: entity.value.external?.paragraph?.generator,
  })

  watch(paragraph, () => {
    if (template.value !== t('editor.entity.generator.template')) return

    const _index: number = CONTEXT.entities.indexOf(entity.value)

    ;(CONTEXT.entities[_index] as any).external.paragraph.active =
      paragraph.active as any
    ;(CONTEXT.entities[_index] as any).external.paragraph.generator =
      paragraph.generator as any
  })

  const onCreateParagraphTemplate = () => {
    if (!templateText.value) {
      toast.error(t('toast.entity.paragraph.generator.empty'))
      return
    }

    if (
      PROJECT.templates.generator.find((g) => g.name === templateText.value)
    ) {
      toast.error(t('toast.entity.paragraph.generator.exists'))
      return
    }

    isLoading.value = true

    if (!paragraph.generator) return

    PROJECT.templates.generator.push({
      name: templateText.value,
      paragraph: factory.entity().generator(),
    })

    template.value = templateText.value
    templateText.value = ''
    isLoading.value = false
  }

  const onDeleteParagraphTemplate = () => {
    isLoading.value = true

    PROJECT.templates.generator = PROJECT.templates.generator.filter(
      (g) => g.name !== template.value
    )

    template.value = t('editor.entity.generator.template')
    templateText.value = ''
    isLoading.value = false
  }
</script>
