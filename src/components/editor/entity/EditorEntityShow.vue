<template>
  <section
    class="w-full relative px-14"
    :class="edit ? 'shadow-winset dark:shadow-binset p-0 m-0' : ''"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
    @click="onClickInEntity"
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

        props.entity.type === 'page-break'
          ? 'cursor-default my-4 border-b-8 border-gray-400 dark:border-gray-900'
          : '',

        props.entity.type === 'line-break'
          ? 'cursor-default my-4 border-b-8 border-dashed border-gray-400 dark:border-gray-800'
          : '',
      ]"
      @click="onEdit"
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
        block
        break-words
      "
      :style="{ height }"
      @keypress.enter.prevent="onEnter"
      @input="onInput"
      @click="onStopEvents"
    />
  </section>
</template>

<script setup lang="ts">
  import { ref, watch, nextTick, computed, onMounted } from 'vue'
  import { useStore } from 'vuex'
  import { useRaw } from '@/use/raw'
  import useEmitter from '@/use/emitter'
  import { ContextStatePageContent } from '@/types/context'
  import { useScroll } from '@/use/scroll'
  import { useInput } from '@/use/input'

  const props = defineProps({
    entity: {
      required: true,
      type: Object,
    },
  })

  const store = useStore()
  const emitter = useEmitter()

  const hover = ref(false)
  const edit = ref(false)
  const data = ref('')
  const show = ref(null)
  const input = ref<HTMLElement | null>(null)
  const height = ref('0px')
  const style = computed(() => store.state.editor.styles.show)

  watch(edit, async (_edit) => {
    await nextTick
    if (_edit) {
      input.value?.focus()

      props.entity.raw === '-'
        ? (data.value = '')
        : (data.value = props.entity.raw)

      emitter.emit('entity-close', props.entity)
    }
  })

  onMounted(() => {
    emitter.on(
      'entity-close',
      (entity?: ContextStatePageContent, options?: Record<string, boolean>) => {
        if (options && options.all) {
          onUpdateContent()
          return
        }

        const index = store.state.context.entity.indexOf(entity)

        if (store.state.context.entity[index] === props.entity) return

        if (edit.value) onUpdateContent()
      }
    )

    emitter.on(
      'entity-open',
      async (
        entity?: ContextStatePageContent,
        options?: Record<string, boolean>
      ) => {
        const index = store.state.context.entity.indexOf(entity)

        if (store.state.context.entity[index + 1] === props.entity) {
          onEdit()
        }
      }
    )
  })

  const onUpdateContent = () => {
    store.commit('context/updateInPage', {
      entity: props.entity,
      raw: data.value,
    })

    edit.value = false
  }

  const onEdit = (e?: MouseEvent) => {
    onStopEvents(e)

    if (!edit.value) height.value = (show.value as any)?.offsetHeight + 'px'

    if (
      props.entity.type === 'page-break' ||
      props.entity.type === 'line-break' ||
      props.entity.type === 'image'
    )
      return

    edit.value = true
  }

  const onEnter = async () => {
    onUpdateContent()

    const index = store.state.context.entity.indexOf(props.entity)

    if (index + 1 === store.state.context.entity.length) {
      emitter.emit('entity-input-focus')
      return
    }

    store.commit('context/newInPagePosEdit', {
      entity: props.entity,
      type: 'paragraph',
    })

    await nextTick

    useScroll().to(`#entity-${index}`, 'center')

    emitter.emit('entity-open', props.entity)
  }

  const onClickInEntity = () => {
    const index = store.state.context.entity.indexOf(props.entity)

    useScroll().to(`#entity-${index}`, 'center')
  }

  const onStopEvents = (e?: MouseEvent) => {
    e?.stopPropagation()
    e?.preventDefault()
  }

  const onInput = () => {
    useInput().expandTextArea(input.value as HTMLTextAreaElement)
  }
</script>
