<template>
  <section
    class="w-full relative"
    :class="edit ? 'shadow-winset dark:shadow-binset p-0 m-0' : ''"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
  >
    <EditorEntityShowPopover
      v-if="hover && !edit && props.entity.type !== 'heading-one'"
      :entity="props.entity"
    />
    <div
      v-if="!edit"
      ref="show"
      class="overflow-hidden w-full break-words"
      :class="[
        props.entity.type === 'paragraph' && !edit ? 'indent-15' : '',
        props.entity.type === 'paragraph' ? 'text-justify' : '',
        props.entity.type === 'paragraph' ? style.paragraph.fontSize : '',
        props.entity.type === 'paragraph' ? style.paragraph.fontFamily : '',
        props.entity.type === 'paragraph' ? style.paragraph.fontColor : '',
        props.entity.type === 'paragraph' ? style.paragraph.fontWeight : '',

        props.entity.type === 'heading-one' ? 'text-center pb-10 pt-10' : '',
        props.entity.type === 'heading-one' ? style.heading.one.fontSize : '',
        props.entity.type === 'heading-one' ? style.heading.one.fontFamily : '',
        props.entity.type === 'heading-one' ? style.heading.one.fontColor : '',
        props.entity.type === 'heading-one' ? style.heading.one.fontWeight : '',

        props.entity.type === 'heading-two' ? 'text-center pb-3 pt-8' : '',
        props.entity.type === 'heading-two' ? style.heading.two.fontSize : '',
        props.entity.type === 'heading-two' ? style.heading.two.fontFamily : '',
        props.entity.type === 'heading-two' ? style.heading.two.fontColor : '',
        props.entity.type === 'heading-two' ? style.heading.two.fontWeight : '',

        props.entity.type === 'heading-three' ? 'text-center pb-2 pt-5' : '',
        props.entity.type === 'heading-three'
          ? style.heading.three.fontSize
          : '',
        props.entity.type === 'heading-three'
          ? style.heading.three.fontFamily
          : '',
        props.entity.type === 'heading-three'
          ? style.heading.three.fontColor
          : '',
        props.entity.type === 'heading-three'
          ? style.heading.three.fontWeight
          : '',
      ]"
      @click.prevent="onEdit"
      v-html="useRaw().convert(props.entity as any)"
    />
    <textarea
      v-else
      ref="input"
      v-model="data"
      :class="[
        props.entity.type === 'paragraph' ? 'text-justify indent-15' : '',
        props.entity.type === 'paragraph' ? style.paragraph.fontSize : '',
        props.entity.type === 'paragraph' ? style.paragraph.fontFamily : '',
        props.entity.type === 'paragraph' ? style.paragraph.fontColor : '',
        props.entity.type === 'paragraph' ? style.paragraph.fontWeight : '',

        props.entity.type === 'heading-one' ? 'text-center pb-10 pt-10' : '',
        props.entity.type === 'heading-one' ? style.heading.one.fontSize : '',
        props.entity.type === 'heading-one' ? style.heading.one.fontFamily : '',
        props.entity.type === 'heading-one' ? style.heading.one.fontColor : '',
        props.entity.type === 'heading-one' ? style.heading.one.fontWeight : '',

        props.entity.type === 'heading-two' ? 'text-center pb-3 pt-8' : '',
        props.entity.type === 'heading-two' ? style.heading.two.fontSize : '',
        props.entity.type === 'heading-two' ? style.heading.two.fontFamily : '',
        props.entity.type === 'heading-two' ? style.heading.two.fontColor : '',
        props.entity.type === 'heading-two' ? style.heading.two.fontWeight : '',

        props.entity.type === 'heading-three' ? 'text-center pb-2 pt-5' : '',
        props.entity.type === 'heading-three'
          ? style.heading.three.fontSize
          : '',
        props.entity.type === 'heading-three'
          ? style.heading.three.fontFamily
          : '',
        props.entity.type === 'heading-three'
          ? style.heading.three.fontColor
          : '',
        props.entity.type === 'heading-three'
          ? style.heading.three.fontWeight
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
      @keypress.enter.prevent="onUpdateContent"
    />
  </section>
</template>

<script setup lang="ts">
  import { ref, watch, nextTick, computed, useAttrs } from 'vue'
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
  const input = ref<HTMLElement | null>(null)
  const height = ref('0px')
  const style = computed(() => store.state.editor.styles.show)

  // const attrs = useAttrs()

  watch(edit, async (_edit) => {
    await nextTick
    if (_edit) {
      input.value?.focus()

      data.value = props.entity.raw
    }
  })

  const onUpdateContent = () => {
    store.commit('context/updateInPage', {
      entity: props.entity,
      raw: data.value,
    })

    edit.value = false
  }

  const onEdit = () => {
    if (!edit.value) height.value = (show.value as any).offsetHeight + 'px'

    edit.value = true
  }
</script>
