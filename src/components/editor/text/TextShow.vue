<template>
  <section
    class="flex w-full hover:shadow-winset dark:hover:shadow-binset"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
  >
    <TextShowPopover v-if="hover" :position="position" />
    <p
      class="w-full break-all"
      :class="[
        props.type === 'paragraph' ? 'text-justify indent-15' : '',
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

        props.type === 'heading-one' ? 'text-center pb-10 pt-10' : '',
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

        props.type === 'heading-two' ? 'text-center pb-3 pt-8' : '',
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

        props.type === 'heading-three' ? 'text-center indent-15 pb-2 pt-5' : '',
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
    position: Number,
  })

  const store = useStore()

  const hover = ref(false)
</script>
