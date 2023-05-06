<template>
  <div
    ref="container"
    :style="
      raw
        .v2()
        .block()
        .style(computed(() => props.entity))
    "
    :class="raw.v2().block().class(props.entity)"
    class="w-full relative"
    @contextmenu="raw.v2().block().menu($event, _index)"
    @drop="raw.v2().block().drop($event, props.entity)"
  >
    <div
      v-if="isHovered"
      v-motion
      :initial="{ opacity: 0, x: 20 }"
      :enter="{ opacity: 1, x: 0 }"
      class="absolute z-10 flex gap-1 items-center px-0.5"
    >
      <slot name="left" />
    </div>
    <div class="md:px-10 px-4">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useAbsoluteStore } from '@/store/absolute'
  import { useContextStore } from '@/store/context'
  import { useEditorStore } from '@/store/editor'
  import { useRaw } from '@/use/raw'
  import { useElementHover, useIntersectionObserver } from '@vueuse/core'
  import { useMotion, MotionVariants } from '@vueuse/motion'
  import { onLongPress } from '@vueuse/core'
  import { Calls } from 'better-write-plugin-core'
  import { usePlugin } from 'better-write-plugin-core'
  import { Entity } from 'better-write-types'
  import { computed, ref, watch, watchEffect } from 'vue'

  const props = defineProps<{
    entity: Entity
  }>()

  const CONTEXT = useContextStore()
  const EDITOR = useEditorStore()
  const ABSOLUTE = useAbsoluteStore()

  const raw = useRaw()
  const container = ref()
  const plugin = usePlugin()
  const isHovered = useElementHover(container)
  const _index = computed(() => CONTEXT.entities.indexOf(props.entity))

  const target = computed(
    () => EDITOR.actives.entity.index === _index.value && ABSOLUTE.entity.menu
  )

  /* info */
  watch(target, (_target) => {
    // for delete mutate
    if (!CONTEXT.entities[_index.value]) return

    CONTEXT.entities[_index.value].visual.info = _target
  })

  onLongPress(
    container,
    (e) => {
      if (props.entity.type === 'drau' || e.pointerType === 'mouse') return

      raw.v2().block().menu(e, _index.value)
    },
    { delay: 300 }
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
      if (!EDITOR.configuration.transition) return

      isIntersecting
        ? (motion.variant.value = 'enter')
        : (motion.variant.value = 'initial')
    })
  }

  watchEffect(() => {
    Calls.EditorEntityUpdated(plugin)
  })
</script>
