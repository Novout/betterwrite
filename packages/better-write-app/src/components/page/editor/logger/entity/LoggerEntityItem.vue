<template>
  <div
    class="flex flex-col w-full cursor-pointer py-3"
    @click.prevent.stop="toggle()"
  >
    <EntityTypeShow :type="entity.type" />
    <div class="flex justify-between items-center w-full">
      <p class="flex-1 pointer-events-none">
        {{
          project.utils().isValidType(entity)
            ? raw.v2().normalize(entity.raw, 'full')
            : ''
        }}
      </p>
      <IconArrow
        :class="[value ? 'transform transition-all rotate-90' : '']"
        class="w-5 h-5 sm:(w-6 h-6)"
      />
    </div>
    <div
      v-if="value"
      v-motion
      :initial="{ opacity: 0, y: 10 }"
      :enter="{ opacity: 1, y: 0 }"
      class="w-auto"
    >
      <pre class="whitespace-pre-line text-justify" lang="json">{{
        entity
      }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useProject } from '@/use/project'
  import { useRaw } from '@/use/raw'
  import { useToggle } from '@vueuse/core'
  import { Entity } from 'better-write-types'

  defineProps<{
    entity: Entity
  }>()

  const [value, toggle] = useToggle(false)
  const raw = useRaw()

  const project = useProject()
</script>
