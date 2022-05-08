<template>
  <div
    ref="container"
    :class="raw.v2().block().style(props.entity, 'main')"
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
  import { useMousePressed, watchDebounced } from '@vueuse/core'
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
</script>
