<template>
  <div
    v-motion
    :initial="{ opacity: 0, y: 100 }"
    :enter="{ opacity: 1, y: 0 }"
    class="flex justify-between items-center bg-theme-editor-creative-drafts-container-item-background hover:bg-theme-editor-creative-drafts-container-item-background-hover active:bg-theme-editor-creative-drafts-container-item-background-active w-full p-1 shadow my-2"
  >
    <div
      ref="input"
      :contenteditable="edit"
      class="cursor-pointer truncate text-theme-editor-creative-drafts-container-item-text"
      @keydown.enter="edit = false"
      @focusout="edit = false"
      @click="emit('info')"
    >
      {{ props.page.title }}
    </div>
    <div class="flex gap-2 items-center">
      <ButtonSet v-if="!main" @click="creative.draft().set(props.page)">
        <IconYes class="w-5 h-5" />
      </ButtonSet>
      <ButtonSet v-if="!main" @click="creative.draft().reset(props.page)">
        <IconReload class="w-5 h-5" />
      </ButtonSet>
      <ButtonSet @click="edit = !edit">
        <IconEdit class="w-5 h-5" />
      </ButtonSet>
      <ButtonSet v-if="!main" @click="creative.draft().delete(props.page)">
        <IconDelete class="w-5 h-5" />
      </ButtonSet>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ContextState } from 'better-write-types'
  import { useRaw } from '@/use/raw'
  import { useCreativeType } from '@/use/type/creative'
  import { ref, watch, nextTick } from 'vue'

  const creative = useCreativeType()

  const emit = defineEmits(['info'])
  const input = ref<HTMLDivElement | null>(null)
  const edit = ref<boolean>(false)
  const raw = useRaw()

  watch(edit, async (_edit) => {
    await nextTick

    if (_edit) {
      raw
        .v2()
        .caret()
        .set(input.value as HTMLDivElement, props.page.title.length)

      return
    }

    creative
      .draft()
      .updateTitle(props.page, props.main, input.value?.innerText as string)
  })

  const props = defineProps({
    page: {
      required: true,
      type: Object as () => ContextState,
    },
    main: {
      required: true,
      type: Boolean,
    },
  })
</script>
