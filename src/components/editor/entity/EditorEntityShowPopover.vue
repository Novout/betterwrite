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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
        />
      </svg>
    </HeroIcon>
    <section
      v-if="state.adjust"
      class="
        absolute
        rounded
        bottom-5
        left-10
        wb-text
        bg-gray-500
        dark:bg-gray-800
        border-gray-400
        dark:border-gray-700
      "
    >
      <EditorEntityShowSelect @click.prevent.stop="onUpEntity">
        <template #icon>
          <HeroIcon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </HeroIcon>
        </template>
        <p>{{ t('editor.aside.entity.up') }}</p>
      </EditorEntityShowSelect>
      <EditorEntityShowSelect @click.prevent.stop="onDownEntity">
        <template #icon>
          <HeroIcon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </HeroIcon>
        </template>
        <p>{{ t('editor.aside.entity.down') }}</p>
      </EditorEntityShowSelect>
      <EditorEntityShowSelect @click.prevent.stop="onDeleteEntity">
        <template #icon>
          <HeroIcon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
          </HeroIcon>
        </template>
        <p>{{ t('editor.aside.entity.delete') }}</p>
      </EditorEntityShowSelect>
    </section>
    <HeroIcon
      v-if="
        props.entity.type === 'page-break' ||
        props.entity.type === 'line-break' ||
        props.entity.type === 'image'
      "
      class="wb-icon"
      @mouseenter.prevent.stop="onAdjustEntityWrapper"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"
        />
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
    switcher: false as boolean,
    adjust: false as boolean,
  })
  const update = computed(() => format.lastTime(props.entity.updatedAt))

  const props = defineProps({
    entity: Object as any,
  })

  const onDeleteEntity = (e: MouseEvent) => {
    store.commit('context/removeInPage', props.entity)

    state.adjust = false
  }

  const onUpEntity = (e: MouseEvent) => {
    store.commit('context/switchInPage', {
      entity: props.entity,
      direction: 'up',
    })

    state.adjust = false
  }

  const onDownEntity = (e: MouseEvent) => {
    store.commit('context/switchInPage', {
      entity: props.entity,
      direction: 'down',
    })

    state.adjust = false
  }

  const onAdjustEntityWrapper = () => {
    state.new = false
    state.adjust = !state.adjust
    state.switcher = false
  }

  const onNewEntityWrapper = () => {
    state.new = !state.new
    state.switcher = false
    state.adjust = false
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
    state.adjust = false
  }

  const onSwitchEntity = (type: string) => {
    store.commit('context/alterInPage', {
      entity: props.entity,
      type,
    })

    state.switcher = false
  }
</script>
