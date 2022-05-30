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
    <div class="flex items-center">
      <HeroIcon
        v-if="!props.active"
        class="cursor-pointer wb-icon"
        @click="creative.draft().reset(id)"
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
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            d="M20 8c-1.403-2.96-4.463-5-8-5a9 9 0 1 0 0 18h0a9 9 0 0 0 9-9m0-9v6h-6"
          ></path>
        </svg>
      </HeroIcon>
      <HeroIcon class="cursor-pointer wb-icon" @click="edit = !edit">
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
            d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83l3.75 3.75l1.83-1.83z"
            fill="currentColor"
          ></path>
        </svg>
      </HeroIcon>
      <HeroIcon
        v-if="!props.active"
        class="cursor-pointer wb-icon"
        @click="creative.draft().set(id)"
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
            d="M22 2H6v16h16V2zm-9.53 12L9 10.5l1.4-1.41l2.07 2.08L17.6 6L19 7.41L12.47 14zM4 6H2v16h16v-2H4V6z"
            fill="currentColor"
          ></path>
        </svg>
      </HeroIcon>
      <HeroIcon
        v-if="!props.active"
        class="cursor-pointer wb-icon"
        @click="creative.draft().delete(id)"
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
            d="M8.27 3L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27L15.73 3M8.41 7L12 10.59L15.59 7L17 8.41L13.41 12L17 15.59L15.59 17L12 13.41L8.41 17L7 15.59L10.59 12L7 8.41"
            fill="currentColor"
          ></path>
        </svg>
      </HeroIcon>
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
