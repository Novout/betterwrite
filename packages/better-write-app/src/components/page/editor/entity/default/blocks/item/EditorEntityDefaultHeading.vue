<template>
  <EditorEntityDefaultContainer :entity="props.entity">
    <div
      class="flex items-center justify-center text-center w-full cursor-text"
    >
      <div
        ref="__INPUT__"
        :contenteditable="true"
        :spellcheck="true"
        :style="{
          fontFamily: EDITOR.styles.heading.fontFamily,
          fontWeight: EDITOR.styles.heading.fontWeight,
        }"
        class="w-full"
        :class="[
          props.entity.type === 'heading-one'
            ? 'text-2xl pb-10 pt-10 text-theme-editor-entity-heading-one hover:text-theme-editor-entity-heading-one-hover active:text-theme-editor-entity-heading-one-active'
            : '',
          props.entity.type === 'heading-two'
            ? 'text-xl pb-3 pt-8 text-theme-editor-entity-heading-two hover:text-theme-editor-entity-heading-two-hover active:text-theme-editor-entity-heading-two-active'
            : '',
          props.entity.type === 'heading-three'
            ? 'text-lg pb-2 pt-5 text-theme-editor-entity-heading-three hover:text-theme-editor-entity-heading-three-hover active:text-theme-editor-entity-heading-three-active'
            : '',
        ]"
        @keypress.enter.prevent.stop="block.onEnter"
        @keydown="block.onKeyboard"
        @input="block.onInput"
      >
        {{ props.entity.raw }}
      </div>
    </div>
  </EditorEntityDefaultContainer>
</template>

<script setup lang="ts">
  import { useContextStore } from '@/store/context'
  import { useEditorStore } from '@/store/editor'
  import { useBlockText } from '@/use/block/text'
  import { useFocus } from '@vueuse/core'
  import { Entity } from 'better-write-types'
  import { computed, onMounted, ref } from 'vue'

  const props = defineProps<{
    entity: Entity
  }>()

  const CONTEXT = useContextStore()
  const EDITOR = useEditorStore()

  const __INPUT__ = ref()
  const isSalvageable = ref(false)

  const { focused } = useFocus(__INPUT__)

  const _index = computed(() => CONTEXT.entities.indexOf(props.entity))

  const block = useBlockText({
    props,
    focused,
    input: __INPUT__,
    isSalvageable,
    index: _index,
  })

  block.onWatcher()

  onMounted(() => {
    block.onMounted()
  })
</script>
