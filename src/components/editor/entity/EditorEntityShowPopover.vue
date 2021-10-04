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
    <HeroIcon @click.prevent="onNewEntity">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4 wb-icon"
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
    <HeroIcon class="wb-icon" @click.prevent="onUpEntity">
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
    <HeroIcon class="wb-icon" @click.prevent="onDownEntity">
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
    <HeroIcon class="wb-icon" @click.prevent="onDeleteEntity">
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
  import { useStore } from 'vuex'
  import { nextTick } from 'vue'
  import { useScroll } from '@/use/scroll'

  const store = useStore()

  const props = defineProps({
    entity: Object as any,
  })

  const onForceScroll = async () => {
    await nextTick

    const index = store.state.context.entity.indexOf(props.entity)

    if (!index || index === -1) return

    setTimeout(() => {
      useScroll().to(`#entity-${index - 1}`)
    }, 1)
  }

  const onDeleteEntity = () => {
    store.commit('context/removeInPage', props.entity)

    onForceScroll()
  }

  const onUpEntity = () => {
    store.commit('context/switchInPage', {
      entity: props.entity,
      direction: 'up',
    })

    onForceScroll()
  }

  const onDownEntity = () => {
    store.commit('context/switchInPage', {
      entity: props.entity,
      direction: 'down',
    })

    onForceScroll()
  }

  const onNewEntity = () => {
    store.commit('context/newInPage', props.entity)

    onForceScroll()
  }
</script>
