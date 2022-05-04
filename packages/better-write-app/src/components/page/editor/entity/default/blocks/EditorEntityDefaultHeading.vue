<template>
  <EditorEntityDefaultContainer :entity="props.entity">
    <div
      class="flex items-center justify-center text-center w-full cursor-text"
    >
      <h2
        :contenteditable="true"
        :spellcheck="true"
        class="font-bold"
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
        @keypress.enter.prevent.stop="onEnter"
      >
        {{ props.entity.raw }}
      </h2>
    </div>
  </EditorEntityDefaultContainer>
</template>

<script setup lang="ts">
  import { useContextStore } from '@/store/context'
  import useEmitter from '@/use/emitter'
  import { Entity } from 'better-write-types'
  import { computed, nextTick } from 'vue'

  const props = defineProps<{
    entity: Entity
  }>()

  const CONTEXT = useContextStore()

  const emitter = useEmitter()

  const _index = computed(() => CONTEXT.entities.indexOf(props.entity))

  const onEnter = async () => {
    CONTEXT.newInPagePosEdit({
      entity: props.entity,
      type: 'paragraph',
    })

    await nextTick

    emitter.emit('entity-text-focus', {
      target: _index.value + 1,
      position: 'auto',
    })
  }
</script>
