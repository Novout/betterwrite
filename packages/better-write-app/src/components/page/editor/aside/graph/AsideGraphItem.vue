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
      props.entity.type === 'heading-one' ? 'h-12' : 'h-8',
    ]"
  >
    <div
      v-if="
        props.entity.type === 'heading-two' ||
        props.entity.type === 'heading-three' ||
        props.entity.type === 'image' ||
        props.entity.type === 'checkbox' ||
        props.entity.type === 'list' ||
        props.entity.type === 'page-break' ||
        props.entity.type === 'line-break' ||
        props.entity.type === 'drau' ||
        props.entity.external?.comment?.raw
      "
      class="border-b w-15 mb-2 h-1 border-theme-aside-graph-lines mr-0.5"
    ></div>
    <IconHeadingTwo
      v-if="props.entity.type === 'heading-two'"
      class="wb-text h-8 w-8"
    />
    <IconHeadingThree
      v-else-if="props.entity.type === 'heading-three'"
      class="wb-text h-8 w-8"
    />
    <IconCheckboxTrue
      v-else-if="
        props.entity.type === 'checkbox' &&
        props.entity.external?.checkbox?.select
      "
      class="wb-text h-8 w-8"
    />
    <IconCheckboxFalse
      v-else-if="
        props.entity.type === 'checkbox' &&
        !props.entity.external?.checkbox?.select
      "
      class="wb-text h-8 w-8"
    />
    <IconList
      v-else-if="props.entity.type === 'list'"
      class="wb-text h-8 w-8"
    />
    <IconPageBreak
      v-else-if="props.entity.type === 'page-break'"
      class="wb-text h-5 w-5"
    />
    <IconLineBreak
      v-else-if="props.entity.type === 'line-break'"
      class="wb-text h-5 w-5"
    />
    <IconDrawing
      v-else-if="props.entity.type === 'drau'"
      class="wb-text h-6 w-6"
    />
    <IconComment
      v-else-if="props.entity.external?.comment?.raw"
      class="wb-text h-8 w-8"
    />
    <div
      v-else-if="props.entity.external?.image?.name"
      class="wb-text flex gap-2 justify-start items-center"
    >
      <IconImage class="wb-text h-6 w-6" />
      <p class="text-left truncate w-32">
        {{ props.entity.external?.image?.name }}
      </p>
    </div>
    <p
      v-if="
        props.entity.type !== 'image' &&
        props.entity.type !== 'line-break' &&
        props.entity.type !== 'page-break' &&
        props.entity.type !== 'drau'
      "
      class="ml-2 truncate w-full"
      :class="[
        props.entity.type === 'heading-one'
          ? 'text-tiny py-2 font-poppins'
          : '',
      ]"
    >
      {{ raw.v2().normalize(props.entity.raw, 'full') }}
    </p>
  </div>
</template>

<script setup lang="ts">
  import { useContextStore } from '@/store/context'
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

  const env = useEnv()
  const raw = useRaw()

  const activity = computed<boolean>(() => props.page.id === CONTEXT.id)
</script>
