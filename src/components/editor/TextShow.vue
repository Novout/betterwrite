<template>
  <section
    class="flex w-full"
    @mouseenter="hover = true"
    @mouseout="hover = false"
  >
    <HeroIcon v-if="hover" class="text-gray-200 h-4 w-4 opacity-20">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"
        />
      </svg>
    </HeroIcon>
    <HeroIcon v-if="hover" class="text-gray-200 h-4 w-4 opacity-20">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
        />
      </svg>
    </HeroIcon>
    <p
      class="w-full"
      :class="[
        props.type === 'paragraph'
          ? store.state.editor.styles.show.paragraph.fontSize
          : '',
        props.type === 'paragraph'
          ? store.state.editor.styles.show.paragraph.fontFamily
          : '',
        props.type === 'paragraph'
          ? store.state.editor.styles.show.paragraph.fontColor
          : '',
        props.type === 'paragraph'
          ? store.state.editor.styles.show.paragraph.fontWeight
          : '',

        props.type === 'heading-one'
          ? store.state.editor.styles.show.heading.one.fontSize
          : '',
        props.type === 'heading-one'
          ? store.state.editor.styles.show.heading.one.fontFamily
          : '',
        props.type === 'heading-one'
          ? store.state.editor.styles.show.heading.one.fontColor
          : '',
        props.type === 'heading-one'
          ? store.state.editor.styles.show.heading.one.fontWeight
          : '',

        props.type === 'heading-two'
          ? store.state.editor.styles.show.heading.two.fontSize
          : '',
        props.type === 'heading-two'
          ? store.state.editor.styles.show.heading.two.fontFamily
          : '',
        props.type === 'heading-two'
          ? store.state.editor.styles.show.heading.two.fontColor
          : '',
        props.type === 'heading-two'
          ? store.state.editor.styles.show.heading.two.fontWeight
          : '',

        props.type === 'heading-three'
          ? store.state.editor.styles.show.heading.three.fontSize
          : '',
        props.type === 'heading-three'
          ? store.state.editor.styles.show.heading.three.fontFamily
          : '',
        props.type === 'heading-three'
          ? store.state.editor.styles.show.heading.three.fontColor
          : '',
        props.type === 'heading-three'
          ? store.state.editor.styles.show.heading.three.fontWeight
          : '',
      ]"
    >
      <slot />
    </p>
  </section>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useStore } from 'vuex'

  const props = defineProps({
    type: String,
  })

  const store = useStore()

  const hover = ref(false)
</script>
