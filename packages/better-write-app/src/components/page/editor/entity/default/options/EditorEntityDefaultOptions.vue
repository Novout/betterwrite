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
    class="flex flex-col fixed bg-theme-editor-entity-popover-background wb-text shadow-lg z-max rounded"
    @contextmenu.prevent.stop="() => {}"
  >
    <EditorEntityDefaultOptionsItem @action="onDeleteEntity">
      <template #icon>
        <IconDelete class="h-5 w-5" />
      </template>
      <template #title>
        {{ t('editor.aside.entity.delete') }}
      </template>
    </EditorEntityDefaultOptionsItem>
    <EditorEntityDefaultOptionsItem @action="onUpEntity">
      <template #icon>
        <IconUp class="h-5 w-5" />
      </template>
      <template #title>{{ t('editor.aside.entity.up') }}</template>
    </EditorEntityDefaultOptionsItem>
    <EditorEntityDefaultOptionsItem @action="onDownEntity">
      <template #icon>
        <IconDown class="h-5 w-5" />
      </template>
      <template #title>{{ t('editor.aside.entity.down') }}</template>
    </EditorEntityDefaultOptionsItem>
    <EditorEntityDefaultOptionsItem
      v-if="entity.type === 'paragraph'"
      @action="ABSOLUTE.entity.comment = true"
    >
      <template #icon>
        <IconComment class="h-5 w-5" />
      </template>
      <template #title>{{ t('editor.aside.entity.comments') }}</template>
    </EditorEntityDefaultOptionsItem>
    <EditorEntityDefaultOptionsItem :off="true">
      <template #icon>
        <IconSwap class="h-5 w-5" />
      </template>
      <template #title>{{ t('editor.aside.entity.switch') }}</template>

      <template #overflow>
        <EditorEntityDefaultOptionsOverflow
          @click.prevent.stop="onSwitchEntity('paragraph')"
        >
          <IconParagraph width="24" height="24" />
        </EditorEntityDefaultOptionsOverflow>
        <EditorEntityDefaultOptionsOverflow
          @click.prevent.stop="onSwitchEntity('heading-two')"
        >
          <IconHeadingTwo width="24" height="24" />
        </EditorEntityDefaultOptionsOverflow>
        <EditorEntityDefaultOptionsOverflow
          @click.prevent.stop="onSwitchEntity('heading-three')"
        >
          <IconHeadingThree width="24" height="24" />
        </EditorEntityDefaultOptionsOverflow>
        <EditorEntityDefaultOptionsOverflow
          @click.prevent.stop="onSwitchEntity('page-break')"
        >
          <IconPageBreak width="24" height="24" />
        </EditorEntityDefaultOptionsOverflow>
        <EditorEntityDefaultOptionsOverflow
          @click.prevent.stop="onSwitchEntity('line-break')"
        >
          <IconLineBreak width="24" height="24" />
        </EditorEntityDefaultOptionsOverflow>
        <EditorEntityDefaultOptionsOverflow
          @click.prevent.stop="onSwitchEntity('checkbox')"
        >
          <IconCheckbox width="24" height="24" />
        </EditorEntityDefaultOptionsOverflow>
        <EditorEntityDefaultOptionsOverflow
          @click.prevent.stop="onSwitchEntity('list')"
        >
          <IconList width="24" height="24" />
        </EditorEntityDefaultOptionsOverflow>
        <EditorEntityDefaultOptionsOverflow
          @click.prevent.stop="onSwitchEntity('image')"
        >
          <IconDrawing width="24" height="24" />
        </EditorEntityDefaultOptionsOverflow>
        <EditorEntityDefaultOptionsOverflow
          @click.prevent.stop="onSwitchEntity('drau')"
        >
          <IconDrawing width="24" height="24" />
        </EditorEntityDefaultOptionsOverflow>
      </template>
    </EditorEntityDefaultOptionsItem>
    <EditorEntityDefaultOptionsItem :off="true">
      <template #icon>
        <IconAdd class="h-5 w-5" />
      </template>
      <template #title>{{ t('editor.aside.entity.add') }}</template>

      <template #overflow>
        <EditorEntityDefaultOptionsOverflow
          @click.prevent.stop="onNewEntity('paragraph')"
        >
          <IconParagraph width="24" height="24" />
        </EditorEntityDefaultOptionsOverflow>
        <EditorEntityDefaultOptionsOverflow
          @click.prevent.stop="onNewEntity('heading-two')"
        >
          <IconHeadingTwo width="24" height="24" />
        </EditorEntityDefaultOptionsOverflow>
        <EditorEntityDefaultOptionsOverflow
          @click.prevent.stop="onNewEntity('heading-three')"
        >
          <IconHeadingThree width="24" height="24" />
        </EditorEntityDefaultOptionsOverflow>
        <EditorEntityDefaultOptionsOverflow
          @click.prevent.stop="onNewEntity('page-break')"
        >
          <IconPageBreak width="24" height="24" />
        </EditorEntityDefaultOptionsOverflow>
        <EditorEntityDefaultOptionsOverflow
          @click.prevent.stop="onNewEntity('line-break')"
        >
          <IconLineBreak width="24" height="24" />
        </EditorEntityDefaultOptionsOverflow>
        <EditorEntityDefaultOptionsOverflow
          @click.prevent.stop="onNewEntity('checkbox')"
        >
          <IconCheckbox width="24" height="24" />
        </EditorEntityDefaultOptionsOverflow>
        <EditorEntityDefaultOptionsOverflow
          @click.prevent.stop="onNewEntity('list')"
        >
          <IconList width="24" height="24" />
        </EditorEntityDefaultOptionsOverflow>
        <EditorEntityDefaultOptionsOverflow
          @click.prevent.stop="onNewEntity('image')"
        >
          <IconImage width="24" height="24" />
        </EditorEntityDefaultOptionsOverflow>
        <EditorEntityDefaultOptionsOverflow
          @click.prevent.stop="onNewEntity('drau')"
        >
          <IconDrawing width="24" height="24" />
        </EditorEntityDefaultOptionsOverflow>
      </template>
    </EditorEntityDefaultOptionsItem>
    <EditorEntityDefaultOptionsItem
      v-if="
        entity.type === 'paragraph' ||
        entity.type === 'list' ||
        entity.type === 'checkbox'
      "
      @action="onText"
    >
      <template #icon>
        <IconText class="h-5 w-5" />
      </template>
      <template #title>
        {{ t('editor.aside.entity.customize') }}
      </template>
    </EditorEntityDefaultOptionsItem>
    <EditorEntityDefaultOptionsItem v-if="entity.type === 'image'" :off="true">
      <template #icon>
        <IconImage class="h-5 w-5" />
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
  <!-- for not breaking in empty entity.type = "heading-one" open -->
  <div v-else ref="options" />
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
  import { useFactory } from '@/use/factory'
  import { usePlugin } from 'better-write-plugin-core'
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
  const emitter = useEmitter()
  const plugin = usePlugin()
  const factory = useFactory()
  const ent = useEntity()

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

  const onClose = () => {
    ABSOLUTE.entity.menu = false
  }

  const onDeleteEntity = async () => {
    ent.base().onDelete(entity.value, _index.value)
  }

  const onUpEntity = () => {
    CONTEXT.switchInPage({
      entity: entity.value,
      direction: 'up',
    })

    onClose()
  }

  const onDownEntity = () => {
    CONTEXT.switchInPage({
      entity: entity.value,
      direction: 'down',
    })

    onClose()
  }

  const onNewEntity = (type: EntityType) => {
    if (type === 'image') {
      factory.simulate().file((content: Entity) => {
        onNew(content, type)
      })

      return
    }

    onNew(entity.value, type)
  }

  const onNew = async (content: Entity, type: EntityType) => {
    CONTEXT.newInPageByOption({
      entity: content,
      type,
    })

    await nextTick

    emitter.emit('entity-text-focus', {
      position: 'end',
      target: _index.value + 1,
    })

    plugin.emit('plugin-entity-create', {
      data: entity.value.raw,
      index: CONTEXT.entities.indexOf(entity.value),
    })

    onClose()
  }

  const onSwitchEntity = async (type: EntityType) => {
    if (type === 'image') {
      factory.simulate().file((content: Entity) => {
        onSwitch(content, type)
      })

      return
    }

    onSwitch(entity.value, type)
  }

  const onSwitch = async (content: Entity, type: EntityType) => {
    CONTEXT.alterInPage({
      entity: content,
      type,
    })

    await nextTick

    plugin.emit('plugin-entity-alter-in-page', {
      data: t(`editor.entity.${type}`).toUpperCase(),
      index: CONTEXT.entities.indexOf(content),
    })

    onClose()
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

  const onText = async () => {
    const _index: number = CONTEXT.entities.indexOf(entity.value)

    if (!entity.value.external?.paragraph) {
      CONTEXT.entities[_index].external = {
        ...CONTEXT.entities[_index].external,
        ...factory.entity().setText(),
      }
    }

    await nextTick

    ABSOLUTE.entity.customize = true
  }
</script>
