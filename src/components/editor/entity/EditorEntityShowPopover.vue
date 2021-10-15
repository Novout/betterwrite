<template>
  <section
    class="
      flex
      justify-start
      items-start
      transition-all
      absolute
      text-black
      dark:text-gray-500
    "
    :class="[
      props.entity.type === 'page-break' ? 'top-3' : '',
      props.entity.type === 'line-break' ? 'top-3' : '',
      props.entity.type === 'paragraph' ? 'top-0.5' : '',
      props.entity.type === 'heading-two' ? 'top-12' : '',
      props.entity.type === 'heading-three' ? 'top-8' : '',
    ]"
  >
    <section
      v-if="state.new"
      class="
        absolute
        rounded
        bottom-5
        wb-text
        bg-gray-500
        dark:bg-gray-800
        border-gray-400
        dark:border-gray-700
      "
    >
      <EditorEntityShowSelect @click.prevent.stop="onNewEntity('paragraph')">
        P
      </EditorEntityShowSelect>
      <EditorEntityShowSelect @click.prevent.stop="onNewEntity('heading-two')">
        H2
      </EditorEntityShowSelect>
      <EditorEntityShowSelect
        @click.prevent.stop="onNewEntity('heading-three')"
      >
        H3
      </EditorEntityShowSelect>
      <EditorEntityShowSelect @click.prevent.stop="onNewEntity('page-break')">
        BP
      </EditorEntityShowSelect>
      <EditorEntityShowSelect @click.prevent.stop="onNewEntity('line-break')">
        LB
      </EditorEntityShowSelect>
    </section>
    <HeroIcon @mouseenter.prevent.stop="onNewEntityWrapper">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 wb-icon"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
          clip-rule="evenodd"
        />
      </svg>
    </HeroIcon>
    <section
      v-if="state.switcher"
      class="
        absolute
        rounded
        bottom-5
        left-4
        wb-text
        bg-gray-500
        dark:bg-gray-800
        border-gray-400
        dark:border-gray-700
        z-max
      "
    >
      <EditorEntityShowSelect @click.prevent.stop="onSwitchEntity('paragraph')">
        P
      </EditorEntityShowSelect>
      <EditorEntityShowSelect
        @click.prevent.stop="onSwitchEntity('heading-two')"
      >
        H2
      </EditorEntityShowSelect>
      <EditorEntityShowSelect
        @click.prevent.stop="onSwitchEntity('heading-three')"
      >
        H3
      </EditorEntityShowSelect>
      <EditorEntityShowSelect
        @click.prevent.stop="onSwitchEntity('page-break')"
      >
        BP
      </EditorEntityShowSelect>
      <EditorEntityShowSelect
        @click.prevent.stop="onSwitchEntity('line-break')"
      >
        LB
      </EditorEntityShowSelect>
    </section>
    <HeroIcon
      class="wb-icon"
      @mouseenter.prevent.stop="onSwitcherEntityWrapper"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
      </svg>
    </HeroIcon>
  </section>
  <section
    class="absolute wb-icon right-14 bottom-0 pointer-events-none"
    :class="[
      props.entity.type === 'paragraph' ? 'text-justify indent-15' : '',

      props.entity.type === 'heading-one' ? 'text-center pb-12' : '',

      props.entity.type === 'heading-two' ? 'text-center pb-3' : '',
      props.entity.type === 'heading-three' ? 'text-center pb-3' : '',

      props.entity.type === 'page-break' ? 'pt-2' : '',
      props.entity.type === 'line-break' ? 'pt-2' : '',
    ]"
  >
    <p>{{ update }}</p>
  </section>
</template>

<script setup lang="ts">
  import { reactive, computed } from 'vue'
  import { useStore } from 'vuex'
  import { useI18n } from 'vue-i18n'
  import { useFormat } from '@/use/format'

  const store = useStore()
  const format = useFormat()
  const { t } = useI18n()

  const state = reactive({
    new: false as boolean,
    switcher: false as boolean
  })
  const update = computed(() => format.lastTime(props.entity.updatedAt))

  const props = defineProps({
    entity: Object as any,
  })

  const onDeleteEntity = (e: MouseEvent) => {
    store.commit('context/removeInPage', props.entity)
  }

  const onUpEntity = (e: MouseEvent) => {
    store.commit('context/switchInPage', {
      entity: props.entity,
      direction: 'up',
    })
  }

  const onDownEntity = (e: MouseEvent) => {
    store.commit('context/switchInPage', {
      entity: props.entity,
      direction: 'down',
    })
  }

  const onNewEntityWrapper = () => {
    state.new = !state.new
    state.switcher = false
  }

  const onNewEntity = (type: string) => {
    store.commit('context/newInPage', {
      entity: props.entity,
      type,
    })

    state.new = false
  }

  const onSwitcherEntityWrapper = (e: MouseEvent) => {
    state.new = false
    state.switcher = !state.switcher
  }

  const onSwitchEntity = (type: string) => {
    store.commit('context/alterInPage', {
      entity: props.entity,
      type,
    })

    state.switcher = false
  }
</script>
