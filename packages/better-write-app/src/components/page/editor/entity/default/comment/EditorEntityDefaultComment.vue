<template>
  <div class="fixed left-0 top-0 w-full h-screen bg-modal z-max font-raleway">
    <div
      ref="comment"
      v-motion
      class="flex flex-col bg-rgba-blur fixed w-96 bg-theme-editor-external-comment-background hover:bg-theme-editor-external-comment-background-hover active:bg-theme-editor-external-comment-background-active px-5 py-2 h-40 rounded shadow-2xl"
      :style="style"
      :initial="{ opacity: 0, x: 40 }"
      :enter="{
        opacity: 1,
        x: 0,
        transition: {
          delay: 100,
          duration: 200,
        },
      }"
    >
      <div class="flex justify-between items-center cursor-pointer pb-2">
        <h2
          v-if="entity.raw !== env.emptyLine()"
          class="w-3/4 truncate font-bold text-lg text-theme-editor-external-comment-title hover:text-theme-editor-external-comment-title-hover active:text-theme-editor-external-comment-title-active"
        >
          {{
            ASTUtils.normalize(entity.raw, { type: 'all', whitespace: true })
          }}
        </h2>
        <Icon @click.prevent="onClose">
          <IconClose class="h-6 w-6" />
        </Icon>
      </div>
      <div
        ref="search"
        contenteditable="true"
        spellcheck="true"
        class="flex-1 bg-theme-editor-external-comment-textarea-background hover:bg-theme-editor-external-comment-background-textarea-hover active:bg-theme-editor-external-comment-background-textarea-active w-full rounded-sm p-2 wb-scroll overflow-x-hidden border-theme-editor-external-comment-border text-theme-editor-external-comment-text hover:text-theme-editor-external-comment-text-hover active:text-theme-editor-external-comment-text-active"
        @input="onInput"
        @mouseenter="onTextArea = true"
        @mouseleave="onTextArea = false"
        v-html="entity.external?.comment?.raw"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, nextTick, computed } from 'vue'
  import { useAbsoluteStore } from '@/store/absolute'
  import { useDraggable } from '@vueuse/core'
  import { useEditorStore } from '@/store/editor'
  import { useContextStore } from '@/store/context'
  import { useEnv } from '@/use/env'
  import { useProjectStore } from '@/store/project'
  import { ASTUtils } from 'better-write-contenteditable-ast'

  const ABSOLUTE = useAbsoluteStore()
  const CONTEXT = useContextStore()
  const EDITOR = useEditorStore()
  const PROJECT = useProjectStore()

  const env = useEnv()

  const onTextArea = ref<boolean>(false)

  const comment = ref<HTMLElement | null>(null)
  const search = ref<HTMLElement | null>(null)

  const entity = computed(() => CONTEXT.entities[EDITOR.actives.entity.index])
  const input = ref(entity.value.external?.comment?.raw || '')

  const { style } = useDraggable(comment as any, {
    initialValue: { x: window.innerWidth / 2 - 192, y: window.innerHeight / 3 },
    onStart() {
      if (onTextArea.value) return false
    },
  })

  const onClose = async () => {
    CONTEXT.updateCommentInPage({
      entity: entity.value,
      raw: input.value,
    })

    await nextTick

    PROJECT.updateContext(CONTEXT.$state)

    await nextTick

    ABSOLUTE.entity.comment = false
  }

  onMounted(() => {
    search.value?.focus()
  })

  const onInput = (e: any) => {
    input.value = e.target.innerHTML
  }
</script>
