<template>
  <div
    ref="container"
    :style="raw.v2().block().style(props.entity)"
    :class="raw.v2().block().class(props.entity)"
    class="w-full relative px-4 md:px-14"
    @contextmenu="raw.v2().block().menu($event, _index)"
    @drop="raw.v2().block().drop($event, props.entity)"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
  import { useAbsoluteStore } from '@/store/absolute'
  import { useContextStore } from '@/store/context'
  import { useEditorStore } from '@/store/editor'
  import { useRaw } from '@/use/raw'
  import {
    useIntersectionObserver,
    useMousePressed,
    watchDebounced,
  } from '@vueuse/core'
  import { useMotion, MotionVariants } from '@vueuse/motion'
  import { Entity } from 'better-write-types'
  import { computed, ref, watch } from 'vue'

  const props = defineProps<{
    entity: Entity
  }>()

  const CONTEXT = useContextStore()
  const EDITOR = useEditorStore()
  const ABSOLUTE = useAbsoluteStore()

  const raw = useRaw()
  const container = ref()

  const _index = computed(() => CONTEXT.entities.indexOf(props.entity))

  const { pressed, sourceType: mouseType } = useMousePressed({
    touch: true,
    target: container,
  })

  const target = computed(
    () => EDITOR.actives.entity.index === _index.value && ABSOLUTE.entity.menu
  )

  /* info */
  watch(target, (_target) => {
    // for delete mutate
    if (!CONTEXT.entities[_index.value]) return

    CONTEXT.entities[_index.value].visual.info = _target
  })

  // mobile contextmenu open
  watchDebounced(
    pressed,
    (_presset) => {
      if (
        _presset &&
        mouseType.value === 'touch' &&
        props.entity.type !== 'drau'
      )
        raw
          .v2()
          .block()
          .menu('' as any, _index.value)
    },
    { debounce: 350 }
  )

  // animations
  if (EDITOR.configuration.transition) {
    const variants = ref<MotionVariants>({
      initial: {
        opacity: 0,
        x: -25,
        transition: {
          delay: 125,
          stiffness: 90,
          damping: 20,
        },
      },
      enter: {
        opacity: 1,
        x: 0,
        transition: {
          delay: 125,
          stiffness: 90,
          damping: 15,
        },
      },
    })

    const motion = useMotion(container, variants)

    useIntersectionObserver(container, ([{ isIntersecting }]) => {
      isIntersecting
        ? (motion.variant.value = 'enter')
        : (motion.variant.value = 'initial')
    })
  }
</script>
