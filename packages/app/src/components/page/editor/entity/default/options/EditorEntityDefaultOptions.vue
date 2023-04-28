<template>
  <div
    v-if="entity.type !== 'heading-one'"
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
    class="flex bg-rgba-blur select-none font-raleway flex-col fixed bg-theme-editor-entity-popover-background wb-text shadow-lg z-max"
    @contextmenu.prevent.stop="() => {}"
  >
    <EditorEntityDefaultOptionsItem @action="base().onDelete(entity, _index)">
      <template #icon>
        <IconDelete class="h-5 w-5" />
      </template>
      <template #title>
        {{ t('editor.aside.entity.delete') }}
      </template>
    </EditorEntityDefaultOptionsItem>
    <EditorEntityDefaultOptionsItem @action="base().onUp(entity, _index)">
      <template #icon>
        <IconUp class="h-5 w-5" />
      </template>
      <template #title>{{ t('editor.aside.entity.up') }}</template>
    </EditorEntityDefaultOptionsItem>
    <EditorEntityDefaultOptionsItem @action="base().onDown(entity, _index)">
      <template #icon>
        <IconDown class="h-5 w-5" />
      </template>
      <template #title>{{ t('editor.aside.entity.down') }}</template>
    </EditorEntityDefaultOptionsItem>
    <EditorEntityDefaultOptionsItem :off="true">
      <template #icon>
        <IconAdd class="h-5 w-5" />
      </template>
      <template #title>{{ t('editor.aside.entity.add') }}</template>

      <template #overflow>
        <EditorEntityDefaultOptionsOverflow
          @click.prevent.stop="base().onNew(entity, _index, 'paragraph')"
        >
          <IconParagraph width="24" height="24" />
        </EditorEntityDefaultOptionsOverflow>
        <EditorEntityDefaultOptionsOverflow
          @click.prevent.stop="base().onNew(entity, _index, 'heading-two')"
        >
          <IconHeadingTwo width="24" height="24" />
        </EditorEntityDefaultOptionsOverflow>
        <EditorEntityDefaultOptionsOverflow
          @click.prevent.stop="base().onNew(entity, _index, 'heading-three')"
        >
          <IconHeadingThree width="24" height="24" />
        </EditorEntityDefaultOptionsOverflow>
        <EditorEntityDefaultOptionsOverflow
          @click.prevent.stop="base().onNew(entity, _index, 'page-break')"
        >
          <IconPageBreak width="24" height="24" />
        </EditorEntityDefaultOptionsOverflow>
        <EditorEntityDefaultOptionsOverflow
          @click.prevent.stop="base().onNew(entity, _index, 'line-break')"
        >
          <IconLineBreak width="24" height="24" />
        </EditorEntityDefaultOptionsOverflow>
        <EditorEntityDefaultOptionsOverflow
          @click.prevent.stop="base().onNew(entity, _index, 'checkbox')"
        >
          <IconCheckbox width="24" height="24" />
        </EditorEntityDefaultOptionsOverflow>
        <EditorEntityDefaultOptionsOverflow
          @click.prevent.stop="base().onNew(entity, _index, 'list')"
        >
          <IconList width="24" height="24" />
        </EditorEntityDefaultOptionsOverflow>
        <EditorEntityDefaultOptionsOverflow
          @click.prevent.stop="base().onNew(entity, _index, 'drau')"
        >
          <IconDrawing width="24" height="24" />
        </EditorEntityDefaultOptionsOverflow>
      </template>
    </EditorEntityDefaultOptionsItem>
    <EditorEntityDefaultOptionsItem :off="true">
      <template #icon>
        <IconSwap class="h-5 w-5" />
      </template>
      <template #title>{{ t('editor.aside.entity.switch') }}</template>

      <template #overflow>
        <EditorEntityDefaultOptionsOverflow
          @click.prevent.stop="base().onSwitch('paragraph', _index)"
        >
          <IconParagraph width="24" height="24" />
        </EditorEntityDefaultOptionsOverflow>
        <EditorEntityDefaultOptionsOverflow
          @click.prevent.stop="base().onSwitch('heading-two', _index)"
        >
          <IconHeadingTwo width="24" height="24" />
        </EditorEntityDefaultOptionsOverflow>
        <EditorEntityDefaultOptionsOverflow
          @click.prevent.stop="base().onSwitch('heading-three', _index)"
        >
          <IconHeadingThree width="24" height="24" />
        </EditorEntityDefaultOptionsOverflow>
        <EditorEntityDefaultOptionsOverflow
          @click.prevent.stop="base().onSwitch('page-break', _index)"
        >
          <IconPageBreak width="24" height="24" />
        </EditorEntityDefaultOptionsOverflow>
        <EditorEntityDefaultOptionsOverflow
          @click.prevent.stop="base().onSwitch('line-break', _index)"
        >
          <IconLineBreak width="24" height="24" />
        </EditorEntityDefaultOptionsOverflow>
        <EditorEntityDefaultOptionsOverflow
          @click.prevent.stop="base().onSwitch('checkbox', _index)"
        >
          <IconCheckbox width="24" height="24" />
        </EditorEntityDefaultOptionsOverflow>
        <EditorEntityDefaultOptionsOverflow
          @click.prevent.stop="base().onSwitch('list', _index)"
        >
          <IconList width="24" height="24" />
        </EditorEntityDefaultOptionsOverflow>
        <EditorEntityDefaultOptionsOverflow
          @click.prevent.stop="base().onSwitch('drau', _index)"
        >
          <IconDrawing width="24" height="24" />
        </EditorEntityDefaultOptionsOverflow>
      </template>
    </EditorEntityDefaultOptionsItem>
  </div>
  <!-- for not breaking in empty entity.type = "heading-one" open -->
  <div v-else ref="options" />
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { Entity } from 'better-write-types'
  import { useEditorStore } from '@/store/editor'
  import { useContextStore } from '@/store/context'
  import { tryOnMounted, useIntersectionObserver } from '@vueuse/core'
  import { onClickOutside } from '@vueuse/core'
  import { useAbsoluteStore } from '@/store/absolute'
  import { useI18n } from 'vue-i18n'
  import { useEntity } from '@/use/entity'

  const EDITOR = useEditorStore()
  const ABSOLUTE = useAbsoluteStore()
  const CONTEXT = useContextStore()

  const entity = computed<Entity>(
    () => CONTEXT.entities[EDITOR.actives.entity.index]
  )
  const _index = computed(() => CONTEXT.entities.indexOf(entity.value))
  const options = ref<HTMLElement | null>(null)
  const visible = ref<boolean>(false)
  const block = ref<boolean>(false)

  const { t } = useI18n()
  const { base } = useEntity()

  onClickOutside(options, (e) => onClose(e))

  const mouse = computed(() => EDITOR.actives.global.mouse)

  useIntersectionObserver(
    options,
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
        el.style.top = `${mouse.value.y - el.offsetHeight + 10}px`
      }

      if (mouse.value.horizontal === 'right') {
        el.style.left = `${mouse.value.x - el.offsetWidth + 10}px`
      }

      return
    }

    el.style.top = `${mouse.value.y + 10}px`
    el.style.left = `${mouse.value.x + 10}px`
  }

  const onClose = (e: PointerEvent) => {
    if (e.type !== 'click') return

    ABSOLUTE.entity.menu = false
  }
</script>
