<template>
  <div
    ref="options"
    v-motion
    :initial="{ opacity: 0, y: 50, x: 25 }"
    :enter="{
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        delay: 100,
        duration: 200,
      },
    }"
    class="flex flex-col fixed bg-theme-editor-entity-popover-background wb-text shadow-lg z-max rounded"
    @contextmenu.prevent.stop="() => {}"
  >
    <EditorEntityDefaultOptionsItem @action="onDeleteEntity">
      <template #icon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          class="h-5 w-5"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 24 24"
        >
          <path
            d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12z"
            fill="currentColor"
          ></path>
        </svg>
      </template>
      <template #title>
        {{ t('editor.aside.entity.delete') }}
      </template>
    </EditorEntityDefaultOptionsItem>
    <EditorEntityDefaultOptionsItem @action="onUpEntity">
      <template #icon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </template>
      <template #title>{{ t('editor.aside.entity.up') }}</template>
    </EditorEntityDefaultOptionsItem>
    <EditorEntityDefaultOptionsItem @action="onDownEntity">
      <template #icon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </template>
      <template #title>{{ t('editor.aside.entity.down') }}</template>
    </EditorEntityDefaultOptionsItem>
    <EditorEntityDefaultOptionsItem
      v-if="entity.type === 'paragraph'"
      @action="ABSOLUTE.entity.comment = true"
    >
      <template #icon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          class="h-5 w-5"
          role="img"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 432 432"
        >
          <path
            d="M405 88q9 0 15.5 6.5T427 109v320l-86-85H107q-9 0-15.5-6.5T85 323v-43h278V88h42zm-85 128q0 9-6.5 15t-14.5 6H85L0 323V24q0-9 6.5-15T21 3h278q8 0 14.5 6t6.5 15v192z"
            fill="currentColor"
          ></path>
        </svg>
      </template>
      <template #title>{{ t('editor.aside.entity.comments') }}</template>
    </EditorEntityDefaultOptionsItem>
    <EditorEntityDefaultOptionsItem :off="true">
      <template #icon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          class="h-5 w-5"
          aria-hidden="true"
          role="img"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 17 16"
        >
          <g fill="currentColor" fill-rule="evenodd">
            <path
              d="M16.796 8.908L15.234 7.21a.553.553 0 0 0-.776 0l-1.564 1.698a.543.543 0 0 0 0 .772h1.294a5.345 5.345 0 0 1-3.789 3.79a5.378 5.378 0 0 1-5.767-2.119l-1.091.751a6.709 6.709 0 0 0 7.196 2.643A6.665 6.665 0 0 0 15.55 9.68h1.245a.544.544 0 0 0 .001-.772z"
            ></path>
            <path
              d="M5.475 8.021a.543.543 0 0 0 0-.772H4.018a5.339 5.339 0 0 1 3.771-3.738a5.373 5.373 0 0 1 5.766 2.121l1.092-.752a6.712 6.712 0 0 0-7.199-2.645a6.67 6.67 0 0 0-4.8 5.014H1.196a.543.543 0 0 0 0 .772l1.638 1.637a.553.553 0 0 0 .776 0l1.865-1.637z"
            ></path>
          </g>
        </svg>
      </template>
      <template #title>{{ t('editor.aside.entity.switch') }}</template>

      <template #overflow>
        <EditorEntityDefaultOptionsOverflow
          @click.prevent.stop="onSwitchEntity('paragraph')"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            width="24"
            height="24"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <path
              d="M13 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4h-2v6H9V4h4m0 6a2 2 0 0 0 2-2a2 2 0 0 0-2-2h-2v4h2z"
              fill="currentColor"
            ></path>
          </svg>
        </EditorEntityDefaultOptionsOverflow>
        <EditorEntityDefaultOptionsOverflow
          @click.prevent.stop="onSwitchEntity('heading-two')"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            width="24"
            height="24"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <g fill="none">
              <path
                d="M10 4v7H4V4H2v16h2v-7h6v7h2V4h-2z"
                fill="currentColor"
              ></path>
              <path
                d="M22 11.75C22 9.679 20.21 8 18 8s-4 1.679-4 3.75h2.133l.007-.144C16.218 10.707 17.02 10 18 10c1.03 0 1.867.784 1.867 1.75c0 .439-.173.841-.459 1.148L14 18.444V20h8v-2h-4.497l3.516-3.79l.158-.18A3.59 3.59 0 0 0 22 11.75z"
                fill="currentColor"
              ></path>
            </g>
          </svg>
        </EditorEntityDefaultOptionsOverflow>
        <EditorEntityDefaultOptionsOverflow
          @click.prevent.stop="onSwitchEntity('heading-three')"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            width="24"
            height="24"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <g fill="none">
              <path
                d="M10 4v7H4V4H2v16h2v-7h6v7h2V4h-2z"
                fill="currentColor"
              ></path>
              <path
                d="M21.729 10l.002-2H14.5v2h4.378l-3.176 3.283l1.407 1.515c.256-.118.546-.186.854-.186c1.04 0 1.884.768 1.884 1.714c0 .947-.844 1.715-1.884 1.715c-.917 0-1.681-.597-1.849-1.386L14 17.029C14.36 18.722 15.998 20 17.963 20C20.193 20 22 18.355 22 16.326c0-1.691-1.256-3.117-2.968-3.543L21.73 10z"
                fill="currentColor"
              ></path>
            </g>
          </svg>
        </EditorEntityDefaultOptionsOverflow>
        <EditorEntityDefaultOptionsOverflow
          @click.prevent.stop="onSwitchEntity('page-break')"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            width="24"
            height="24"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 16 16"
          >
            <path
              d="M0 8h2v1H0zm3 0h3v1H3zm4 0h2v1H7zm3 0h3v1h-3zm4 0h2v1h-2zm-.25-8L14 7H2l.25-7h.5L3 6h10l.25-6zM2.25 16L2 10h12l-.25 6h-.5L13 11H3l-.25 5z"
              fill="currentColor"
            ></path>
          </svg>
        </EditorEntityDefaultOptionsOverflow>
        <EditorEntityDefaultOptionsOverflow
          @click.prevent.stop="onSwitchEntity('line-break')"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            width="24"
            height="24"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <path
              d="M4 17h16v5H4zm16-9l-6-6H4.01L4 11h16V8zm-7 1V3.5L18.5 9H13zm-4 4h6v2H9zm8 0h6v2h-6zM1 13h6v2H1z"
              fill="currentColor"
            ></path>
          </svg>
        </EditorEntityDefaultOptionsOverflow>
      </template>
    </EditorEntityDefaultOptionsItem>
    <EditorEntityDefaultOptionsItem :off="true">
      <template #icon>
        <svg
          class="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          role="img"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 24 24"
        >
          <path
            d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
            fill="currentColor"
          ></path>
        </svg>
      </template>
      <template #title>{{ t('editor.aside.entity.add') }}</template>

      <template #overflow>
        <EditorEntityDefaultOptionsOverflow
          @click.prevent.stop="onNewEntity('paragraph')"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            width="24"
            height="24"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <path
              d="M13 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4h-2v6H9V4h4m0 6a2 2 0 0 0 2-2a2 2 0 0 0-2-2h-2v4h2z"
              fill="currentColor"
            ></path>
          </svg>
        </EditorEntityDefaultOptionsOverflow>
        <EditorEntityDefaultOptionsOverflow
          @click.prevent.stop="onNewEntity('heading-two')"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            width="24"
            height="24"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <g fill="none">
              <path
                d="M10 4v7H4V4H2v16h2v-7h6v7h2V4h-2z"
                fill="currentColor"
              ></path>
              <path
                d="M22 11.75C22 9.679 20.21 8 18 8s-4 1.679-4 3.75h2.133l.007-.144C16.218 10.707 17.02 10 18 10c1.03 0 1.867.784 1.867 1.75c0 .439-.173.841-.459 1.148L14 18.444V20h8v-2h-4.497l3.516-3.79l.158-.18A3.59 3.59 0 0 0 22 11.75z"
                fill="currentColor"
              ></path>
            </g>
          </svg>
        </EditorEntityDefaultOptionsOverflow>
        <EditorEntityDefaultOptionsOverflow
          @click.prevent.stop="onNewEntity('heading-three')"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            width="24"
            height="24"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <g fill="none">
              <path
                d="M10 4v7H4V4H2v16h2v-7h6v7h2V4h-2z"
                fill="currentColor"
              ></path>
              <path
                d="M21.729 10l.002-2H14.5v2h4.378l-3.176 3.283l1.407 1.515c.256-.118.546-.186.854-.186c1.04 0 1.884.768 1.884 1.714c0 .947-.844 1.715-1.884 1.715c-.917 0-1.681-.597-1.849-1.386L14 17.029C14.36 18.722 15.998 20 17.963 20C20.193 20 22 18.355 22 16.326c0-1.691-1.256-3.117-2.968-3.543L21.73 10z"
                fill="currentColor"
              ></path>
            </g>
          </svg>
        </EditorEntityDefaultOptionsOverflow>
        <EditorEntityDefaultOptionsOverflow
          @click.prevent.stop="onNewEntity('page-break')"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            width="24"
            height="24"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 16 16"
          >
            <path
              d="M0 8h2v1H0zm3 0h3v1H3zm4 0h2v1H7zm3 0h3v1h-3zm4 0h2v1h-2zm-.25-8L14 7H2l.25-7h.5L3 6h10l.25-6zM2.25 16L2 10h12l-.25 6h-.5L13 11H3l-.25 5z"
              fill="currentColor"
            ></path>
          </svg>
        </EditorEntityDefaultOptionsOverflow>
        <EditorEntityDefaultOptionsOverflow
          @click.prevent.stop="onNewEntity('line-break')"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            width="24"
            height="24"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <path
              d="M4 17h16v5H4zm16-9l-6-6H4.01L4 11h16V8zm-7 1V3.5L18.5 9H13zm-4 4h6v2H9zm8 0h6v2h-6zM1 13h6v2H1z"
              fill="currentColor"
            ></path>
          </svg>
        </EditorEntityDefaultOptionsOverflow>
      </template>
    </EditorEntityDefaultOptionsItem>
    <EditorEntityDefaultOptionsItem
      v-if="entity.type === 'paragraph'"
      :off="true"
    >
      <template #icon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          role="img"
          class="h-5 w-5"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 24 24"
        >
          <path
            d="M13 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4h-2v6H9V4h4m0 6a2 2 0 0 0 2-2a2 2 0 0 0-2-2h-2v4h2z"
            fill="currentColor"
          ></path>
        </svg>
      </template>
      <template #title>{{ t('editor.aside.entity.paragraph') }}</template>

      <template #overflow>
        <div class="flex p-3 items-center justify-between w-full">
          <h3>{{ t('editor.aside.entity.optionsOn') }}</h3>
          <InputBoolean v-model="paragraph.active" />
        </div>
        <div
          class="flex flex-col items-center overflow-auto max-h-28"
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
              <InputNumber
                v-model="(paragraph.generator as any).margin.bottom"
              />
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
            <InputColorPicker
              v-model="(paragraph.generator as any).background"
            />
          </div>
        </div>
      </template>
    </EditorEntityDefaultOptionsItem>
    <EditorEntityDefaultOptionsItem v-if="entity.type === 'image'" :off="true">
      <template #icon>
        <svg
          class="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          role="img"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 24 24"
        >
          <path
            d="M8.5 13.5l2.5 3l3.5-4.5l4.5 6H5m16 1V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z"
            fill="currentColor"
          ></path>
        </svg>
      </template>
      <template #title>{{ t('editor.aside.entity.image') }}</template>

      <template #overflow>
        <div
          class="mx-2 flex flex-col justify-center"
          :class="[
            image.alignment === 'full' ? 'opacity-50 pointer-events-none' : '',
          ]"
        >
          <label>{{ t('editor.pdf.custom.image.width') }}</label>
          <InputNumber v-model="image.width" :step="25" />
        </div>
        <div
          class="mx-2 flex flex-col justify-center"
          :class="[
            image.alignment === 'full' ? 'opacity-50 pointer-events-none' : '',
          ]"
        >
          <label>{{ t('editor.pdf.custom.image.height') }}</label>
          <InputNumber v-model="image.height" :step="25" />
        </div>
        <div class="mx-2 flex flex-col justify-center">
          <label>{{ t('editor.pdf.custom.image.alignment') }}</label>
          <InputCarousel
            v-model="image.alignment"
            :arr="['full', 'left', 'center', 'right']"
          />
        </div>
      </template>
    </EditorEntityDefaultOptionsItem>
  </div>
</template>

<script setup lang="ts">
  import { computed, watch, ref, nextTick, reactive } from 'vue'
  import { Entity, EntityType } from 'better-write-types'
  import { useEditorStore } from '@/store/editor'
  import { useContextStore } from '@/store/context'
  import { tryOnMounted, useIntersectionObserver } from '@vueuse/core'
  import { onClickOutside } from '@vueuse/core'
  import { useAbsoluteStore } from '@/store/absolute'
  import { useI18n } from 'vue-i18n'
  import useEmitter from '@/use/emitter'
  import { usePlugin } from 'better-write-plugin-core'
  import { usePDFStore } from '@/store/pdf'
  import { useDefines } from '@/use/defines'

  const EDITOR = useEditorStore()
  const ABSOLUTE = useAbsoluteStore()
  const CONTEXT = useContextStore()
  const PDF = usePDFStore()

  const entity = computed<Entity>(
    () => CONTEXT.entities[EDITOR.actives.entity.index]
  )
  const options = ref<HTMLElement | null>(null)
  const visible = ref<boolean>(false)
  const block = ref<boolean>(false)

  const { t } = useI18n()
  const emitter = useEmitter()
  const plugin = usePlugin()
  const defines = useDefines()

  onClickOutside(options as any, () => onClose())

  const mouse = computed(() => EDITOR.actives.global.mouse)

  useIntersectionObserver(
    options as any,
    ([{ isIntersecting }]) => {
      if (block.value) return

      visible.value = isIntersecting
      block.value = true

      onPosition()
    },
    {
      threshold: 1,
    }
  )

  tryOnMounted(() => {
    onPosition()
  })

  const onPosition = () => {
    const el = options.value as HTMLElement

    if (!visible.value && block.value) {
      if (mouse.value.vertical === 'bottom') {
        el.style.top = `${mouse.value.y - el.offsetHeight}px`
      }

      if (mouse.value.horizontal === 'right') {
        el.style.left = `${mouse.value.x - el.offsetWidth}px`
      }

      return
    }

    el.style.top = `${mouse.value.y}px`
    el.style.left = `${mouse.value.x}px`
  }

  const onClose = () => {
    ABSOLUTE.entity.menu = false
  }

  const onDeleteEntity = () => {
    CONTEXT.removeInPage(entity.value)
  }

  const onUpEntity = () => {
    CONTEXT.switchInPage({
      entity: entity.value,
      direction: 'up',
    })
  }

  const onDownEntity = () => {
    CONTEXT.switchInPage({
      entity: entity.value,
      direction: 'down',
    })
  }

  const onNewEntity = async (type: string) => {
    emitter.emit('entity-not-mutate', entity.value)

    await nextTick

    CONTEXT.newInPage({
      entity: entity.value,
      type,
    })

    await nextTick

    plugin.emit('plugin-entity-create', {
      data: entity.value.raw,
      index: CONTEXT.entities.indexOf(entity.value),
    })
  }

  const onSwitchEntity = async (type: EntityType) => {
    CONTEXT.alterInPage({
      entity: entity.value,
      type,
    })

    await nextTick

    plugin.emit('plugin-entity-alter-in-page', {
      data: t(`editor.entity.${type}`).toUpperCase(),
      index: CONTEXT.entities.indexOf(entity.value),
    })
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
