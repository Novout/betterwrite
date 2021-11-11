<template>
  <div
    v-if="
      props.entity.type !== 'paragraph' &&
      props.entity.type !== 'page-break' &&
      props.entity.type !== 'line-break' &&
      props.entity.raw !== env.emptyLine()
    "
    class="
      bg-theme-background-aside-item
      hover:bg-theme-background-aside-item-active
      cursor-pointer
    "
    :class="[
      props.entity.type === 'heading-one'
        ? 'border-l border-theme-aside-graph-lines ml-1'
        : '',
      props.entity.type === 'heading-two' ||
      props.entity.type === 'heading-three'
        ? 'flex items-end border-l border-theme-aside-graph-lines ml-1'
        : '',
      props.entity.type === 'image'
        ? 'flex items-end border-l border-theme-aside-graph-lines ml-1'
        : '',
    ]"
  >
    <div
      v-if="
        props.entity.type === 'heading-two' ||
        props.entity.type === 'heading-three' ||
        props.entity.type === 'image'
      "
      :class="[props.entity.type === 'heading-two' ? 'w-6' : 'w-12']"
      class="border-b mb-2 h-1 border-theme-aside-graph-lines"
    ></div>
    <p
      v-if="props.entity.type !== 'image'"
      class="ml-2 truncate"
      :class="[
        props.entity.type === 'heading-one' ? 'text-tiny py-2 font-bold' : '',
        props.entity.type === 'heading-two' ? 'text-sm w-60' : '',
        props.entity.type === 'heading-three' ? 'text-xs w-60' : '',
      ]"
    >
      {{ props.entity.raw }}
    </p>
    <HeroIcon v-else class="ml-2 wb-text flex justify-start items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-7 w-7"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
          clip-rule="evenodd"
        />
      </svg>
      <p class="ml-1 text-left truncate w-32 text-theme-aside-graph-text">
        {{ props.entity.external?.image?.name }}
      </p>
    </HeroIcon>
  </div>
</template>

<script setup lang="ts">
  import { useEnv } from '@/use/env'
  import { Entity } from '@/types/context'

  const props = defineProps({
    entity: {
      required: true,
      type: Object as () => Entity,
    },
  })

  const env = useEnv()
</script>
