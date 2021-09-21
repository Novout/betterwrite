<template>
  <section
    class="flex w-full hover:shadow-winset dark:hover:shadow-binset"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
  >
    <TextShowPopover v-if="hover && !edit" :position="props.page.id" />
    <div
      class="w-full break-all"
      :class="[
        props.page.type === 'paragraph' && !edit ? 'indent-15' : '',
        props.page.type === 'paragraph' ? 'text-justify' : '',
        props.page.type === 'paragraph'
          ? store.state.editor.styles.show.paragraph.fontSize
          : '',
        props.page.type === 'paragraph'
          ? store.state.editor.styles.show.paragraph.fontFamily
          : '',
        props.page.type === 'paragraph'
          ? store.state.editor.styles.show.paragraph.fontColor
          : '',
        props.page.type === 'paragraph'
          ? store.state.editor.styles.show.paragraph.fontWeight
          : '',

        props.page.type === 'heading-one' ? 'text-center pb-10 pt-10' : '',
        props.page.type === 'heading-one'
          ? store.state.editor.styles.show.heading.one.fontSize
          : '',
        props.page.type === 'heading-one'
          ? store.state.editor.styles.show.heading.one.fontFamily
          : '',
        props.page.type === 'heading-one'
          ? store.state.editor.styles.show.heading.one.fontColor
          : '',
        props.page.type === 'heading-one'
          ? store.state.editor.styles.show.heading.one.fontWeight
          : '',

        props.page.type === 'heading-two' ? 'text-center pb-3 pt-8' : '',
        props.page.type === 'heading-two'
          ? store.state.editor.styles.show.heading.two.fontSize
          : '',
        props.page.type === 'heading-two'
          ? store.state.editor.styles.show.heading.two.fontFamily
          : '',
        props.page.type === 'heading-two'
          ? store.state.editor.styles.show.heading.two.fontColor
          : '',
        props.page.type === 'heading-two'
          ? store.state.editor.styles.show.heading.two.fontWeight
          : '',

        props.page.type === 'heading-three' ? 'text-center pb-2 pt-5' : '',
        props.page.type === 'heading-three'
          ? store.state.editor.styles.show.heading.three.fontSize
          : '',
        props.page.type === 'heading-three'
          ? store.state.editor.styles.show.heading.three.fontFamily
          : '',
        props.page.type === 'heading-three'
          ? store.state.editor.styles.show.heading.three.fontColor
          : '',
        props.page.type === 'heading-three'
          ? store.state.editor.styles.show.heading.three.fontWeight
          : '',
      ]"
      @click.prevent="edit = true"
    >
      <p
        v-if="!edit"
        class="overflow-hidden"
        v-html="useRaw().convert(props.page as any)"
      />
      <input
        v-else
        id="editInput"
        v-model="data"
        class="w-full bg-transparent p-2"
        @keypress.enter="onUpdateContent"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
  import { ref, watch, nextTick } from 'vue'
  import { useStore } from 'vuex'
  import { useRaw } from '@/use/raw'

  const props = defineProps({
    page: {
      required: true,
      type: Object,
    },
  })

  const store = useStore()

  const hover = ref(false)
  const edit = ref(false)
  const data = ref('')

  watch(edit, async (_edit) => {
    await nextTick
    if (_edit) {
      const input = document.querySelector('#editInput') as HTMLInputElement

      input.focus()

      data.value = props.page.raw
    }
  })

  const onUpdateContent = () => {
    store.commit('context/updateInPage', {
      raw: data.value,
      id: props.page.id,
    })

    edit.value = false
  }
</script>
