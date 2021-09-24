<template>
  <section
    class="w-full relative"
    :class="edit ? 'shadow-winset dark:shadow-binset' : ''"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
  >
    <TextShowPopover
      v-if="hover && !edit && props.entity.type !== 'heading-one'"
      :entity="props.entity"
    />
    <div @click.prevent="onEdit">
      <div
        v-if="!edit"
        ref="show"
        class="overflow-hidden w-full break-words"
        :class="[
          props.entity.type === 'paragraph' && !edit ? 'indent-15' : '',
          props.entity.type === 'paragraph' ? 'text-justify' : '',
          props.entity.type === 'paragraph'
            ? store.state.editor.styles.show.paragraph.fontSize
            : '',
          props.entity.type === 'paragraph'
            ? store.state.editor.styles.show.paragraph.fontFamily
            : '',
          props.entity.type === 'paragraph'
            ? store.state.editor.styles.show.paragraph.fontColor
            : '',
          props.entity.type === 'paragraph'
            ? store.state.editor.styles.show.paragraph.fontWeight
            : '',

          props.entity.type === 'heading-one' ? 'text-center pb-10 pt-10' : '',
          props.entity.type === 'heading-one'
            ? store.state.editor.styles.show.heading.one.fontSize
            : '',
          props.entity.type === 'heading-one'
            ? store.state.editor.styles.show.heading.one.fontFamily
            : '',
          props.entity.type === 'heading-one'
            ? store.state.editor.styles.show.heading.one.fontColor
            : '',
          props.entity.type === 'heading-one'
            ? store.state.editor.styles.show.heading.one.fontWeight
            : '',

          props.entity.type === 'heading-two' ? 'text-center pb-3 pt-8' : '',
          props.entity.type === 'heading-two'
            ? store.state.editor.styles.show.heading.two.fontSize
            : '',
          props.entity.type === 'heading-two'
            ? store.state.editor.styles.show.heading.two.fontFamily
            : '',
          props.entity.type === 'heading-two'
            ? store.state.editor.styles.show.heading.two.fontColor
            : '',
          props.entity.type === 'heading-two'
            ? store.state.editor.styles.show.heading.two.fontWeight
            : '',

          props.entity.type === 'heading-three' ? 'text-center pb-2 pt-5' : '',
          props.entity.type === 'heading-three'
            ? store.state.editor.styles.show.heading.three.fontSize
            : '',
          props.entity.type === 'heading-three'
            ? store.state.editor.styles.show.heading.three.fontFamily
            : '',
          props.entity.type === 'heading-three'
            ? store.state.editor.styles.show.heading.three.fontColor
            : '',
          props.entity.type === 'heading-three'
            ? store.state.editor.styles.show.heading.three.fontWeight
            : '',
        ]"
        v-html="useRaw().convert(props.entity as any)"
      />
      <textarea
        v-else
        id="editInput"
        v-model="data"
        :class="[
          props.entity.type === 'paragraph' ? 'text-justify indent-15' : '',
          props.entity.type === 'paragraph'
            ? store.state.editor.styles.show.paragraph.fontSize
            : '',
          props.entity.type === 'paragraph'
            ? store.state.editor.styles.show.paragraph.fontFamily
            : '',
          props.entity.type === 'paragraph'
            ? store.state.editor.styles.show.paragraph.fontColor
            : '',
          props.entity.type === 'paragraph'
            ? store.state.editor.styles.show.paragraph.fontWeight
            : '',

          props.entity.type === 'heading-one' ? 'text-center pb-10 pt-10' : '',
          props.entity.type === 'heading-one'
            ? store.state.editor.styles.show.heading.one.fontSize
            : '',
          props.entity.type === 'heading-one'
            ? store.state.editor.styles.show.heading.one.fontFamily
            : '',
          props.entity.type === 'heading-one'
            ? store.state.editor.styles.show.heading.one.fontColor
            : '',
          props.entity.type === 'heading-one'
            ? store.state.editor.styles.show.heading.one.fontWeight
            : '',

          props.entity.type === 'heading-two' ? 'text-center pb-3 pt-8' : '',
          props.entity.type === 'heading-two'
            ? store.state.editor.styles.show.heading.two.fontSize
            : '',
          props.entity.type === 'heading-two'
            ? store.state.editor.styles.show.heading.two.fontFamily
            : '',
          props.entity.type === 'heading-two'
            ? store.state.editor.styles.show.heading.two.fontColor
            : '',
          props.entity.type === 'heading-two'
            ? store.state.editor.styles.show.heading.two.fontWeight
            : '',

          props.entity.type === 'heading-three' ? 'text-center pb-2 pt-5' : '',
          props.entity.type === 'heading-three'
            ? store.state.editor.styles.show.heading.three.fontSize
            : '',
          props.entity.type === 'heading-three'
            ? store.state.editor.styles.show.heading.three.fontFamily
            : '',
          props.entity.type === 'heading-three'
            ? store.state.editor.styles.show.heading.three.fontColor
            : '',
          props.entity.type === 'heading-three'
            ? store.state.editor.styles.show.heading.three.fontWeight
            : '',
        ]"
        class="
          w-full
          text-xs
          bg-transparent
          dark:text-gray-100
          text-black
          resize-none
          overflow-hidden
        "
        :style="{ height }"
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
    entity: {
      required: true,
      type: Object,
    },
  })

  const store = useStore()

  const hover = ref(false)
  const edit = ref(false)
  const data = ref('')
  const show = ref(null)
  const height = ref('0px')

  watch(edit, async (_edit) => {
    await nextTick
    if (_edit) {
      const input = document.querySelector('#editInput') as HTMLInputElement

      input.focus()

      data.value = props.entity.raw
    }
  })

  const onUpdateContent = async () => {
    store.commit('context/updateInPage', {
      raw: data.value,
      id: props.entity.id,
    })

    edit.value = false
  }

  const onEdit = () => {
    if (!edit.value) height.value = (show.value as any).offsetHeight + 'px'

    edit.value = true
  }
</script>
