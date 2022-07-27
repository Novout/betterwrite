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
        <IconClose class="wb-icon h-7 w-7" @click.prevent="onClose" />
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
            @keyup.enter="onCreateParagraphTemplate()"
          />
          <IconAdd
            class="wb-icon w-10 h-10"
            @click.prevent.stop="onCreateParagraphTemplate"
          />
          <IconDelete
            class="wb-icon w-10 h-10"
            @click.prevent.stop="onDeleteParagraphTemplate"
          />
        </div>
      </div>
      <div
        class="flex h-60 max-h-60 items-center justify-center w-full overflow-hidden p-1 md:p-5 bg-theme-background-opacity-1"
        :class="[!paragraph.active ? 'opacity-50 pointer-events-none' : '']"
      >
        <p
          :style="{
            fontFamily: generator.font,
            fontSize: `${generator.fontSize}px`,
            fontStyle: generator.italics ? 'italic' : 'normal',
            fontWeight: generator.bold ? 'bolder' : 'normal',
            letterSpacing: `${generator.characterSpacing}px`,
            color: generator.color,
            backgroundColor: generator.background,
            padding: '2rem',
          }"
        >
          Lorem
        </p>
      </div>
      <div
        class="flex gap-5 flex-row flex-wrap items-center overflow-auto"
        :class="[
          !paragraph.active ||
          paragraph.class === t('editor.entity.generator.template')
            ? 'opacity-50 pointer-events-none'
            : '',
        ]"
      >
        <div class="wb-input-container">
          <label class="mx-2 text-xs">{{
            t('editor.pdf.custom.generics.font')
          }}</label>
          <InputSelect
            v-model="generator.font"
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
          <InputNumber v-model="generator.fontSize" />
        </div>
        <div class="wb-input-container">
          <label class="mx-2 text-xs">{{
            t('editor.pdf.custom.generics.bold')
          }}</label>
          <InputBoolean v-model="generator.bold" />
        </div>
        <div class="wb-input-container">
          <label class="mx-2 text-xs">{{
            t('editor.pdf.custom.generics.italics')
          }}</label>
          <InputBoolean v-model="generator.italics" />
        </div>
        <div class="wb-input-container">
          <label class="mx-2 text-xs">{{
            t('editor.pdf.base.pageMargins.title')
          }}</label>
          <section>
            <label>{{ t('editor.pdf.base.pageMargins.top') }}</label>
            <InputNumber v-model="generator.margin.top" />
          </section>
          <section>
            <label>{{ t('editor.pdf.base.pageMargins.bottom') }}</label>
            <InputNumber v-model="generator.margin.bottom" />
          </section>
        </div>
        <div class="wb-input-container">
          <label class="mx-2 text-xs">{{
            t('editor.pdf.custom.generics.lineHeight')
          }}</label>
          <InputNumber v-model="generator.lineHeight" />
        </div>
        <div class="wb-input-container">
          <label class="mx-2 text-xs">{{
            t('editor.pdf.custom.generics.alignment')
          }}</label>
          <InputCarousel
            v-model="generator.alignment"
            class="flex-1"
            :arr="defines.pdf().alignment()"
          />
        </div>
        <div class="wb-input-container">
          <label class="mx-2 text-xs">{{
            t('editor.pdf.custom.generics.indent')
          }}</label>
          <InputNumber v-model="generator.indent" />
        </div>
        <div class="wb-input-container">
          <label class="mx-2 text-xs">{{
            t('editor.pdf.custom.generics.characterSpacing')
          }}</label>
          <InputNumber v-model="generator.characterSpacing" />
        </div>
        <div class="wb-input-container">
          <label class="mx-1 text-xs">{{
            t('editor.pdf.custom.generics.color')
          }}</label>
          <InputColorPicker v-model="generator.color" />
        </div>
        <div class="wb-input-container">
          <label class="mx-1 text-xs">{{
            t('editor.pdf.custom.generics.background')
          }}</label>
          <InputColorPicker v-model="generator.background" />
        </div>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
  import { computed, watch, ref, onMounted } from 'vue'
  import {
    Entity,
    EntityExternalParagraph,
    ProjectStateTemplatesGenerator,
  } from 'better-write-types'
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
  const paragraph = computed(
    () => entity.value.external!.paragraph as EntityExternalParagraph
  )

  const options = ref<HTMLElement | null>(null)

  const templates = computed(() =>
    PROJECT.templates.generators.map((g) => g.className)
  )
  const template = ref<string>(
    entity.value?.external?.paragraph?.class &&
      templates.value.find(
        (template) => template === entity.value?.external?.paragraph?.class
      )
      ? entity.value?.external?.paragraph?.class
      : PROJECT.templates.generators[0].className
  )
  const templateText = ref<string>('')
  const generator = computed<ProjectStateTemplatesGenerator>(
    () =>
      PROJECT.templates.generators.find(
        (g) => g.className === template.value
      ) as any
  )

  onClickOutside(options as any, () => onClose())

  const onClose = () => {
    ABSOLUTE.entity.customize = false
  }

  onMounted(() => {
    PROJECT.templates.generators[0] = factory.entity().generator()
  })

  watch(template, (_template) => {
    if (_template === t('editor.entity.generator.template')) {
      PROJECT.templates.generators[0] = factory.entity().generator()
    }

    paragraph.value.class = _template
  })

  // watch(generator, _generator => {})

  const onCreateParagraphTemplate = () => {
    if (!templateText.value) {
      toast.error(t('toast.entity.paragraph.generator.empty'))
      return
    }

    if (
      PROJECT.templates.generators.find(
        (g) => g.className === templateText.value
      )
    ) {
      toast.error(t('toast.entity.paragraph.generator.exists'))
      return
    }

    isLoading.value = true

    PROJECT.templates.generators.push(
      factory.entity().generator(templateText.value)
    )
    paragraph.value.class = templateText.value

    template.value = templateText.value
    templateText.value = ''
    isLoading.value = false
  }

  const onDeleteParagraphTemplate = () => {
    if (template.value === t('editor.entity.generator.template')) return

    isLoading.value = true

    PROJECT.templates.generators = PROJECT.templates.generators.filter(
      (g) => g.className !== template.value
    )

    template.value = t('editor.entity.generator.template')
    templateText.value = ''
    isLoading.value = false
  }
</script>
