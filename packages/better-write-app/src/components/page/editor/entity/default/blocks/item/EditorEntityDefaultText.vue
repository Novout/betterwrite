<template>
  <div class="relative w-full">
    <div
      ref="__INPUT__"
      :class="!isAttached ? 'indent-xl sm:indent-lg' : ''"
      :style="{
        fontFamily: EDITOR.styles.text.fontFamily,
        fontWeight: EDITOR.styles.text.fontWeight,
        fontSize: `${EDITOR.styles.text.fontSize}px`,
      }"
      class="editable whitespace-pre-line text-justify text-theme-editor-entity-text hover:text-theme-editor-entity-text-hover active:text-theme-editor-entity-text-active"
      :spellcheck="true"
      :contenteditable="true"
      :data-placeholder="focused ? t('editor.text.placeholder.base') : ''"
      @input="block.onInput"
      @keydown="block.onKeyboard"
      @keypress.enter="block.onEnter"
      @paste="block.onPaste"
      v-html="raw.v2().purge().editor(props.entity)"
    />
  </div>
</template>

<script setup lang="ts">
  import { useBlockText } from '@/use/block/text'
  import { ref, computed, onMounted } from 'vue'
  import { useFocus } from '@vueuse/core'
  import { useI18n } from 'vue-i18n'
  import { useContextStore } from '@/store/context'
  import { Entity } from 'better-write-types'
  import { useRaw } from '@/use/raw'
  import { useEditorStore } from '@/store/editor'

  const props = defineProps<{
    entity: Entity
    isAttached: boolean
  }>()

  const CONTEXT = useContextStore()
  const EDITOR = useEditorStore()

  const __INPUT__ = ref()
  const isSalvageable = ref(false)
  const { t } = useI18n()
  const raw = useRaw()
  const { focused } = useFocus(__INPUT__)

  const _index = computed(() => CONTEXT.entities.indexOf(props.entity))
  // const last = computed(() => _index.value === CONTEXT.entities.length - 1)

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
