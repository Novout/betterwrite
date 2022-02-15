<template>
  <div class="fixed left-0 top-0 w-full h-screen bg-modal z-max">
    <div
      ref="comment"
      class="flex flex-col fixed w-96 bg-theme-editor-external-comment-background hover:bg-theme-editor-external-comment-background-hover active:bg-theme-editor-external-comment-background-active px-5 py-2 h-40 rounded shadow-2xl"
      :style="style"
    >
      <div class="flex justify-between items-center cursor-pointer pb-2">
        <h2
          v-if="entity.raw !== env.emptyLine()"
          class="w-3/4 truncate font-bold text-lg text-theme-editor-external-comment-title hover:text-theme-editor-external-comment-title-hover active:text-theme-editor-external-comment-title-active"
        >
          {{ raw.v2().normalize(entity.raw) }}
        </h2>
        <HeroIcon class="text-2xs wb-icon" @click.prevent="onClose">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
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
        ref="search"
        contenteditable="true"
        spellcheck="true"
        class="flex-1 bg-theme-editor-external-comment-textarea-background hover:bg-theme-editor-external-comment-background-textarea-hover active:bg-theme-editor-external-comment-background-textarea-active w-full rounded-sm p-2 overflow-y-auto overflow-x-hidden border-theme-editor-external-comment-border text-theme-editor-external-comment-text hover:text-theme-editor-external-comment-text-hover active:text-theme-editor-external-comment-text-active"
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
  import useEmitter from '@/use/emitter'
  import { useRaw } from '@/use/raw'

  const ABSOLUTE = useAbsoluteStore()
  const CONTEXT = useContextStore()
  const EDITOR = useEditorStore()
  const PROJECT = useProjectStore()

  const env = useEnv()
  const emitter = useEmitter()
  const raw = useRaw()

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

    emitter.on('entity-external-comment-save', () => {
      onClose()
    })
  })

  const onInput = (e: any) => {
    input.value = e.target.innerHTML
  }
</script>
