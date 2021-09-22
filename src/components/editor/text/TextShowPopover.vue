<template>
  <section
    class="
      flex
      relative
      justify-start
      items-start
      transition-all
      text-black
      dark:text-gray-500
    "
    :class="[
      props.type === 'heading-one'
        ? 'justify-center items-center'
        : 'justify-start items-start',
      props.type === 'heading-two'
        ? 'justify-center items-end pb-4'
        : 'justify-start items-start',
      props.type === 'heading-three'
        ? 'justify-center items-end pb-3'
        : 'justify-start items-start',
    ]"
  >
    <HeroIcon class="h-4 w-4 hover:text-gray-400 dark:hover:text-gray-900">
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
    <HeroIcon
      class="h-4 w-4 hover:text-gray-400 dark:hover:text-gray-900"
      @click="onUpEntity"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4"
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
    <HeroIcon
      class="h-4 w-4 hover:text-gray-400 dark:hover:text-gray-900"
      @click="onDownEntity"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4"
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
    <HeroIcon
      class="h-4 w-4 hover:text-gray-400 dark:hover:text-gray-900"
      @click="onDeleteEntity"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4"
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
  </section>
</template>

<script setup lang="ts">
  import { nextTick } from 'vue'
  import { useStore } from 'vuex'

  const store = useStore()

  const props = defineProps({
    position: Number,
    type: String,
  })

  const onDeleteEntity = async () => {
    if (props.type === 'heading-one') store.state.context.onlyHeadingOne = false
    store.commit('context/removeInPage', props.position)
  }

  const onUpEntity = () => {
    store.commit('context/switchInPage', {
      id: props.position,
      direction: 'up',
    })
  }

  const onDownEntity = () => {
    store.commit('context/switchInPage', {
      id: props.position,
      direction: 'down',
    })
  }
</script>
