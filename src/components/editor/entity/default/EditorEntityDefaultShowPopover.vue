<template>
  <section
    v-motion
    class="
      flex
      justify-start
      items-start
      transition-all
      absolute
      text-theme-text-1
    "
    :class="[
      props.entity.type === 'page-break' ? 'top-3' : '',
      props.entity.type === 'line-break' ? 'top-3' : '',
      props.entity.type === 'paragraph' ? 'top-0.5' : '',
      props.entity.type === 'heading-two' ? 'top-12' : '',
      props.entity.type === 'heading-three' ? 'top-8' : '',
      props.entity.type === 'line-break' ? '-top-0.5' : '',
      props.entity.type === 'page-break' ? '-top-0.5' : '',
    ]"
  >
    <section
      v-if="state.new"
      class="
        flex
        absolute
        rounded
        bg-theme-editor-entity-popover-background
        border-theme-border-1
      "
      :class="[
        props.entity.type === 'line-break' ||
        props.entity.type === 'page-break' ||
        props.entity.type === 'image'
          ? 'bottom-4'
          : 'bottom-6',
      ]"
      @mouseleave="onReset"
    >
      <EditorEntityDefaultShowSelect
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
      </EditorEntityDefaultShowSelect>
      <EditorEntityDefaultShowSelect
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
      </EditorEntityDefaultShowSelect>
      <EditorEntityDefaultShowSelect
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
      </EditorEntityDefaultShowSelect>
      <EditorEntityDefaultShowSelect
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
      </EditorEntityDefaultShowSelect>
      <EditorEntityDefaultShowSelect
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
      </EditorEntityDefaultShowSelect>
    </section>
    <HeroIcon @mouseenter.prevent.stop="onNewEntityWrapper">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 wb-icon"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
          clip-rule="evenodd"
        />
      </svg>
    </HeroIcon>
    <section
      v-if="state.switcher"
      class="
        flex
        absolute
        rounded
        left-5
        bg-theme-editor-entity-popover-background
        border-theme-border-1
        z-max
      "
      :class="[
        props.entity.type === 'line-break' ||
        props.entity.type === 'page-break' ||
        props.entity.type === 'image'
          ? 'bottom-4'
          : 'bottom-6',
      ]"
    >
      <EditorEntityDefaultShowSelect
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
      </EditorEntityDefaultShowSelect>
      <EditorEntityDefaultShowSelect
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
      </EditorEntityDefaultShowSelect>
      <EditorEntityDefaultShowSelect
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
      </EditorEntityDefaultShowSelect>
      <EditorEntityDefaultShowSelect
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
      </EditorEntityDefaultShowSelect>
      <EditorEntityDefaultShowSelect
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
      </EditorEntityDefaultShowSelect>
    </section>
    <HeroIcon
      class="wb-icon"
      @mouseenter.prevent.stop="onSwitcherEntityWrapper"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
        />
      </svg>
    </HeroIcon>
    <section
      v-if="state.adjust"
      class="
        absolute
        rounded
        bottom-5
        left-10
        text-theme-editor-entity-popover-text
        hover:text-theme-editor-entity-popover-text-hover
        active:text-theme-editor-entity-popover-text-active
        bg-theme-editor-entity-popover-background
        border-theme-border-1
      "
    >
      <EditorEntityDefaultShowSelect @click.prevent.stop="onUpEntity">
        <template #icon>
          <HeroIcon>
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
          </HeroIcon>
        </template>
        <p>{{ t('editor.aside.entity.up') }}</p>
      </EditorEntityDefaultShowSelect>
      <EditorEntityDefaultShowSelect @click.prevent.stop="onDownEntity">
        <template #icon>
          <HeroIcon>
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
          </HeroIcon>
        </template>
        <p>{{ t('editor.aside.entity.down') }}</p>
      </EditorEntityDefaultShowSelect>
      <EditorEntityDefaultShowSelect @click.prevent.stop="onDeleteEntity">
        <template #icon>
          <HeroIcon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
          </HeroIcon>
        </template>
        <p>{{ t('editor.aside.entity.delete') }}</p>
      </EditorEntityDefaultShowSelect>
    </section>
    <HeroIcon
      v-if="
        props.entity.type === 'page-break' ||
        props.entity.type === 'line-break' ||
        props.entity.type === 'image'
      "
      class="wb-icon"
      @mouseenter.prevent.stop="onAdjustEntityWrapper"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"
        />
      </svg>
    </HeroIcon>
    <section
      v-if="state.image"
      class="
        flex flex-row
        absolute
        rounded
        bottom-5
        left-16
        p-3
        text-theme-editor-entity-popover-text
        hover:text-theme-editor-entity-popover-text-hover
        active:text-theme-editor-entity-popover-text-active
        bg-theme-editor-entity-popover-background
        border-theme-border-1
      "
    >
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
    </section>
    <HeroIcon
      v-if="props.entity.type === 'image'"
      class="wb-icon ml-1"
      @mouseenter.prevent.stop="onImageEntityWrapper"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
          clip-rule="evenodd"
        />
      </svg>
    </HeroIcon>
    <section v-if="props.entity.type === 'paragraph'">
      <HeroIcon
        v-if="
          props.entity.external?.comment?.raw === '' ||
          !props.entity.external?.comment?.raw
        "
        class="wb-icon ml-0.5"
        @mouseenter.prevent.stop="onCommentEntityWrapper"
        @click.prevent.stop="onClickComment"
      >
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
            d="M12 23a1 1 0 0 1-1-1v-3H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-4.1l-3.7 3.71c-.2.18-.44.29-.7.29H12m1-6v3.08L16.08 17H21V7H7v10h6M3 15H1V3a2 2 0 0 1 2-2h16v2H3v12m6-6h10v2H9V9m0 4h8v2H9v-2z"
            fill="currentColor"
          ></path>
        </svg>
      </HeroIcon>
      <HeroIcon
        v-else
        class="wb-icon ml-0.5"
        @mouseenter.prevent.stop="onCommentEntityWrapper"
        @click.prevent.stop="onClickComment"
      >
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
            d="M3 15H1V3a2 2 0 0 1 2-2h16v2H3v12m9 8a1 1 0 0 1-1-1v-3H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-4.1l-3.7 3.71c-.2.18-.44.29-.7.29H12M9 9v2h10V9H9m0 4v2h8v-2H9z"
            fill="currentColor"
          ></path>
        </svg>
      </HeroIcon>
    </section>
  </section>
  <section
    v-if="EDITOR.configuration.entity.updateTime"
    class="absolute wb-icon right-14 bottom-0 pointer-events-none"
    :class="[
      props.entity.type === 'paragraph' ? 'text-justify indent-15' : '',

      props.entity.type === 'heading-one' ? 'text-center pb-12' : '',

      props.entity.type === 'heading-two' ? 'text-center pb-3' : '',
      props.entity.type === 'heading-three' ? 'text-center pb-3' : '',

      props.entity.type === 'page-break' ? '-top-0.5' : '',
      props.entity.type === 'line-break' ? '-top-0.5' : '',
    ]"
  >
    <p>
      {{ update }}
    </p>
  </section>
</template>

<script setup lang="ts">
  import { reactive, computed, watch, onMounted, nextTick } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useFormat } from '@/use/format'
  import { EntityType } from '@/types/context'
  import { useContextStore } from '@/store/context'
  import { Entity } from '@/types/context'
  import usePlugin from '@/use/plugin/core'
  import useEmitter from '@/use/emitter'
  import { useEditorStore } from '@/store/editor'
  import { useAbsoluteStore } from '@/store/absolute'
  import { useEntity } from '@/use/entity'
  import { useRaw } from '@/use/raw'

  const props = defineProps({
    entity: {
      required: true,
      type: Object as () => Entity,
    },
    input: {
      required: true,
      type: Object as () => HTMLInputElement,
    },
  })

  const CONTEXT = useContextStore()
  const EDITOR = useEditorStore()
  const ABSOLUTE = useAbsoluteStore()

  const format = useFormat()
  const plugin = usePlugin()
  const emitter = useEmitter()
  const entity = useEntity()
  const raw = useRaw()
  const { t } = useI18n()

  const state = reactive({
    new: false as boolean,
    switcher: false as boolean,
    adjust: false as boolean,
    image: false as boolean,
    comment: false as boolean,
  })

  const image = reactive({
    height: props.entity.external?.image?.size.height,
    width: props.entity.external?.image?.size.width,
    alignment: props.entity.external?.image?.alignment,
  })

  onMounted(() => {
    emitter.on('entity-hover', (hover: boolean) => {
      if (!hover) onReset()
    })
  })

  watch(image, () => {
    const _index: number = CONTEXT.entities.indexOf(props.entity)

    ;(CONTEXT.entities[_index] as any).external.image.alignment =
      image.alignment as any
    ;(CONTEXT.entities[_index] as any).external.image.size.height =
      image.height as any
    ;(CONTEXT.entities[_index] as any).external.image.size.width =
      image.width as any
  })

  const update = computed(() => format.lastTime(props.entity.updatedAt))

  const onDeleteEntity = () => {
    CONTEXT.removeInPage(props.entity)

    state.adjust = false
  }

  const onUpEntity = () => {
    CONTEXT.switchInPage({
      entity: props.entity,
      direction: 'up',
    })

    state.adjust = false
  }

  const onDownEntity = () => {
    CONTEXT.switchInPage({
      entity: props.entity,
      direction: 'down',
    })

    state.adjust = false
  }

  const onAdjustEntityWrapper = () => {
    state.new = false
    state.adjust = !state.adjust
    state.switcher = false
    state.image = false
  }

  const onImageEntityWrapper = () => {
    state.new = false
    state.adjust = false
    state.switcher = false
    state.image = !state.image
  }

  const onNewEntityWrapper = () => {
    state.new = !state.new
    state.switcher = false
    state.adjust = false
    state.image = false
  }

  const onCommentEntityWrapper = () => {
    state.comment = !state.comment
    state.new = false
    state.switcher = false
    state.adjust = false
    state.image = false
  }

  const onClickComment = () => {
    EDITOR.actives.entity.index = entity.utils().getIndex(props.entity)

    ABSOLUTE.entity.comment = true
  }

  const onReset = () => {
    state.new = false
    state.switcher = false
    state.adjust = false
    state.image = false
  }

  const onNewEntity = async (type: string) => {
    CONTEXT.newInPage({
      entity: props.entity,
      type,
    })

    await nextTick

    emitter.emit('entity-edit-reset')

    plugin.emit('plugin-entity-create', {
      data: props.entity.raw,
      index: CONTEXT.entities.indexOf(props.entity),
    })

    state.new = false

    props.input.focus()
    raw.v2().caret().set(props.input, props.entity.raw.length)
  }

  const onSwitcherEntityWrapper = () => {
    state.new = false
    state.switcher = !state.switcher
    state.adjust = false
    state.image = false
  }

  const onSwitchEntity = async (type: EntityType) => {
    CONTEXT.alterInPage({
      entity: props.entity,
      type,
    })

    await nextTick

    emitter.emit('entity-edit-reset')

    plugin.emit('plugin-entity-alter-in-page', {
      data: t(`editor.entity.${type}`).toUpperCase(),
      index: CONTEXT.entities.indexOf(props.entity),
    })

    state.switcher = false

    props.input.focus()
    raw.v2().caret().set(props.input, props.entity.raw.length)
  }
</script>
