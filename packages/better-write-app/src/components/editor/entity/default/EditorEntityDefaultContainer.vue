<template>
  <div
    ref="container"
    :class="raw.v2().style(props.entity, 'main')"
    class="w-full relative px-4 md:px-14"
    @contextmenu="onSetContextMenu"
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
  import { computed, nextTick, ref } from 'vue'

  const props = defineProps<{
    entity: Entity
  }>()

  const ABSOLUTE = useAbsoluteStore()
  const EDITOR = useEditorStore()
  const CONTEXT = useContextStore()

  const raw = useRaw()
  const container = ref()

  const _index = computed(() => CONTEXT.entities.indexOf(props.entity))

  const { pressed, sourceType: mouseType } = useMousePressed({
    touch: true,
    target: container,
  })

  // mobile contextmenu open
  watchDebounced(
    pressed,
    (_presset) => {
      if (_presset && mouseType.value === 'touch') onSetContextMenu()
    },
    { debounce: 350 }
  )

  const onSetContextMenu = async (e?: MouseEvent) => {
    ABSOLUTE.entity.menu = false

    EDITOR.actives.entity.index = _index.value

    if (EDITOR.actives.global.mouse.validLastSelection) {
      EDITOR.actives.global.mouse.validLastSelection = false
      return
    }

    e?.preventDefault()

    await nextTick

    ABSOLUTE.entity.menu = true
  }
</script>
