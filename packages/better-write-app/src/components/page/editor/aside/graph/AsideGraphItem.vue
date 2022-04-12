<template>
  <div
    v-if="
      (props.entity.type !== 'paragraph' ||
        props.entity.external?.comment?.raw) &&
      props.entity.raw !== env.emptyLine()
    "
    class="flex items-center cursor-pointer bg-theme-aside-graph-background hover:bg-theme-aside-graph-background-hover active:bg-theme-aside-graph-background-active text-theme-aside-graph-text hover:text-theme-aside-graph-text-hover active:text-theme-aside-graph-text-active"
    :class="[
      'border-l border-theme-aside-graph-lines ml-1',
      activity ? '' : 'opacity-75',
      props.entity.type === 'heading-one' ? 'h-12' : '',
    ]"
  >
    <div
      v-if="
        (props.entity.type === 'heading-two' &&
          EDITOR.configuration.commands.headingTwo.active) ||
        (props.entity.type === 'heading-three' &&
          EDITOR.configuration.commands.headingThree.active) ||
        (props.entity.type === 'image' &&
          EDITOR.configuration.commands.image.active) ||
        (props.entity.type === 'checkbox' &&
          EDITOR.configuration.commands.checkbox.active) ||
        (props.entity.type === 'list' &&
          EDITOR.configuration.commands.list.active) ||
        (props.entity.type === 'page-break' &&
          EDITOR.configuration.commands.pageBreak.active) ||
        (props.entity.type === 'line-break' &&
          EDITOR.configuration.commands.lineBreak.active) ||
        (props.entity.type === 'drau' &&
          EDITOR.configuration.commands.drau.active) ||
        (props.entity.external?.comment?.raw &&
          EDITOR.configuration.commands.paragraph.active)
      "
      class="border-b w-15 mb-2 h-1 border-theme-aside-graph-lines mr-0.5 h-8"
    ></div>
    <IconHeadingTwo
      v-if="
        props.entity.type === 'heading-two' &&
        EDITOR.configuration.commands.headingTwo.active
      "
      class="wb-text h-8 w-8"
    />
    <IconHeadingThree
      v-else-if="
        props.entity.type === 'heading-three' &&
        EDITOR.configuration.commands.headingThree.active
      "
      class="wb-text h-8 w-8"
    />
    <IconCheckboxTrue
      v-else-if="
        props.entity.type === 'checkbox' &&
        props.entity.external?.checkbox?.select &&
        EDITOR.configuration.commands.checkbox.active
      "
      class="wb-text h-8 w-8"
    />
    <IconCheckboxFalse
      v-else-if="
        props.entity.type === 'checkbox' &&
        !props.entity.external?.checkbox?.select &&
        EDITOR.configuration.commands.checkbox.active
      "
      class="wb-text h-8 w-8"
    />
    <IconList
      v-else-if="
        props.entity.type === 'list' &&
        EDITOR.configuration.commands.list.active
      "
      class="wb-text h-8 w-8"
    />
    <IconPageBreak
      v-else-if="
        props.entity.type === 'page-break' &&
        EDITOR.configuration.commands.pageBreak.active
      "
      class="wb-text h-5 w-5"
    />
    <IconLineBreak
      v-else-if="
        props.entity.type === 'line-break' &&
        EDITOR.configuration.commands.lineBreak.active
      "
      class="wb-text h-5 w-5"
    />
    <IconDrawing
      v-else-if="
        props.entity.type === 'drau' &&
        EDITOR.configuration.commands.drau.active
      "
      class="wb-text h-6 w-6"
    />
    <IconComment
      v-else-if="
        props.entity.external?.comment?.raw &&
        EDITOR.configuration.commands.paragraph.active
      "
      class="wb-text h-8 w-8"
    />
    <div
      v-else-if="
        props.entity.external?.image?.name &&
        EDITOR.configuration.commands.image.active
      "
      class="wb-text flex gap-2 justify-start items-center"
    >
      <IconImage class="wb-text h-6 w-6" />
      <p class="text-left truncate w-32">
        {{ props.entity.external?.image?.name }}
      </p>
    </div>
    <p
      v-if="
        (props.entity.type !== 'image' &&
          props.entity.type !== 'line-break' &&
          props.entity.type !== 'page-break' &&
          props.entity.type !== 'drau' &&
          ((props.entity.type === 'heading-two' &&
            EDITOR.configuration.commands.headingTwo.active) ||
            (props.entity.type === 'heading-three' &&
              EDITOR.configuration.commands.headingThree.active) ||
            (props.entity.type === 'checkbox' &&
              EDITOR.configuration.commands.checkbox.active) ||
            (props.entity.type === 'list' &&
              EDITOR.configuration.commands.list.active) ||
            (props.entity.external?.comment?.raw &&
              EDITOR.configuration.commands.paragraph.active))) ||
        props.entity.type === 'heading-one'
      "
      class="ml-2 truncate w-full"
      :class="[
        props.entity.type === 'heading-one'
          ? 'text-base py-2 font-poppins'
          : '',
      ]"
    >
      {{ raw.v2().normalize(props.entity.raw, 'full') }}
    </p>
  </div>
</template>

<script setup lang="ts">
  import { useContextStore } from '@/store/context'
  import { useEditorStore } from '@/store/editor'
  import { useEnv } from '@/use/env'
  import { useRaw } from '@/use/raw'
  import { ContextState, Entity } from 'better-write-types'
  import { computed } from 'vue'

  const props = defineProps({
    entity: {
      required: true,
      type: Object as () => Entity,
    },
    page: {
      required: true,
      type: Object as () => ContextState,
    },
  })

  const CONTEXT = useContextStore()
  const EDITOR = useEditorStore()

  const env = useEnv()
  const raw = useRaw()

  const activity = computed<boolean>(() => props.page.id === CONTEXT.id)
</script>
