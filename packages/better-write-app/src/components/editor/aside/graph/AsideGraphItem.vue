<template>
  <div
    v-if="
      (props.entity.type !== 'paragraph' ||
        props.entity.external?.comment?.raw) &&
      props.entity.type !== 'page-break' &&
      props.entity.type !== 'line-break' &&
      props.entity.raw !== env.emptyLine()
    "
    class="cursor-pointer bg-theme-aside-graph-background hover:bg-theme-aside-graph-background-hover active:bg-theme-aside-graph-background-active text-theme-aside-graph-text hover:text-theme-aside-graph-text-hover active:text-theme-aside-graph-text-active transition"
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
      props.entity.external?.comment?.raw ||
      props.entity.external?.checkbox ||
      props.entity.external?.list
        ? 'flex items-end border-l border-theme-aside-graph-lines ml-1'
        : '',
      activity ? '' : 'opacity-75',
    ]"
  >
    <div
      v-if="
        props.entity.type === 'heading-two' ||
        props.entity.type === 'heading-three' ||
        props.entity.type === 'image' ||
        props.entity.type === 'checkbox' ||
        props.entity.type === 'list' ||
        props.entity.external?.comment?.raw
      "
      :class="[props.entity.type === 'heading-two' ? 'w-6' : 'w-12']"
      class="border-b mb-2 h-1 border-theme-aside-graph-lines"
    ></div>
    <HeroIcon
      v-if="props.entity.external?.comment?.raw"
      class="ml-2 wb-text flex justify-start items-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        aria-hidden="true"
        class="h-6 w-6"
        role="img"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 432 432"
      >
        <path
          d="M405 88q9 0 15.5 6.5T427 109v320l-86-85H107q-9 0-15.5-6.5T85 323v-43h278V88h42zm-85 128q0 9-6.5 15t-14.5 6H85L0 323V24q0-9 6.5-15T21 3h278q8 0 14.5 6t6.5 15v192z"
          fill="currentColor"
        ></path>
      </svg>
      <p class="ml-1 text-left truncate w-32">
        {{ props.entity.external?.comment?.raw }}
      </p>
    </HeroIcon>
    <HeroIcon
      v-else-if="props.entity.external?.checkbox"
      class="ml-2 wb-text flex justify-start items-center"
    >
      <svg
        v-if="!props.entity.external?.checkbox.select"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        aria-hidden="true"
        role="img"
        class="h-6 w-6"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 21 21"
      >
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M5.5 3.5h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2v-10a2 2 0 0 1 2-2z"
        ></path>
      </svg>
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        aria-hidden="true"
        role="img"
        class="h-6 w-6"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M18 3a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h12Zm-1.53 4.97L10 14.44l-2.47-2.47a.75.75 0 0 0-1.06 1.06l3 3a.75.75 0 0 0 1.06 0l7-7a.75.75 0 0 0-1.06-1.06Z"
        ></path>
      </svg>
      <p class="ml-1 text-left truncate w-32">
        {{ props.entity.raw }}
      </p>
    </HeroIcon>
    <HeroIcon
      v-else-if="props.entity.external?.list"
      class="ml-2 wb-text flex justify-start items-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        aria-hidden="true"
        role="img"
        class="w-6 h-6"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5s1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5S5.5 6.83 5.5 6S4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5s1.5-.68 1.5-1.5s-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z"
        ></path>
      </svg>
      <p class="ml-1 text-left truncate w-32">
        {{ props.entity.raw }}
      </p>
    </HeroIcon>
    <p
      v-else-if="props.entity.type !== 'image'"
      class="ml-2 truncate w-full"
      :class="[
        props.entity.type === 'heading-one'
          ? 'text-tiny py-2 font-poppins'
          : '',
        props.entity.type === 'heading-two' ? 'text-sm' : '',
        props.entity.type === 'heading-three' ? 'text-xs' : '',
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
      <p class="ml-1 text-left truncate w-32">
        {{ props.entity.external?.image?.name }}
      </p>
    </HeroIcon>
  </div>
</template>

<script setup lang="ts">
  import { useContextStore } from '@/store/context'
  import { useEnv } from '@/use/env'
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

  const activity = computed<boolean>(() => props.page.id === CONTEXT.id)
</script>
