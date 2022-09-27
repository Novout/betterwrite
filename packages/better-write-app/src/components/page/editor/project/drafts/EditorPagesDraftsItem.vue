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
      class="cursor-pointer text-theme-editor-creative-drafts-container-item-text"
      @keydown.enter="edit = false"
      @focusout="edit = false"
      @click="emit('info')"
    >
      {{ props.page.entities[0]?.raw }}
    </div>
    <div class="flex gap-2 items-center">
      <ButtonSet v-if="!props.active" @click="creative.draft().set(id)">
        <IconYes class="w-5 h-5" />
      </ButtonSet>
      <ButtonSet v-if="!props.active" @click="creative.draft().reset(id)">
        <IconReload class="w-5 h-5" />
      </ButtonSet>
      <ButtonSet @click="edit = !edit">
        <IconEdit class="w-5 h-5" />
      </ButtonSet>
      <ButtonSet v-if="!props.active" @click="creative.draft().delete(id)">
        <IconDelete class="w-5 h-5" />
      </ButtonSet>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ProjectTypeID, ContextState } from 'better-write-types'
  import { useRaw } from '@/use/raw'
  import { useCreativeType } from '@/use/type/creative'
  import { usePlugin } from 'better-write-plugin-core'
  import { ref, watch, nextTick } from 'vue'

  const creative = useCreativeType()
  const plugin = usePlugin()

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
      .updateTitle(props.id, props.main, input.value?.innerText as string)

    await nextTick

    plugin.emit('plugin-project-creative-drafts-update', props.page)
  })

  const props = defineProps({
    page: {
      required: true,
      type: Object as () => ContextState,
    },
    id: {
      required: true,
      type: Object as () => ProjectTypeID,
    },
    active: {
      required: true,
      type: Boolean,
    },
    main: {
      required: true,
      type: Boolean,
    },
  })
</script>
