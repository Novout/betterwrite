<template>
  <div @mouseleave="n = false" @mouseenter="n = true">
    <p
      class="wb-header-button"
      :class="[n ? 'text-theme-icon-active' : '']"
    >
      <div class="flex items-center pointer-events-none">
        <HeroIcon class="h-9 w-9 md:(w-7 h-7) mr-0 md:mr-1">
          <slot name="icon" />
        </HeroIcon>
        <p class="hidden md:flex">
          <slot name="text" />
        </p>
      </div>
    </p>
    <EditorHeaderBar v-if="n">
      <slot name="bar" />
    </EditorHeaderBar>
  </div>
</template>

<script setup lang="ts">
  import { useToggle } from '@vueuse/core'
  import { On, usePlugin } from 'better-write-plugin-core';
  import { onMounted } from 'vue';

  const props = defineProps<{
    type: string
  }>()

  const [n] = useToggle()
  const emitter = usePlugin()

  onMounted(() => {
    switch (props.type) {
      case 'create': On.editor().PluginEditorHeaderCreateOpen(emitter, [
          () => {
            n.value = true
          },
          () => {}
        ]) 
        break;
      case 'externals': On.editor().PluginEditorHeaderExternalsOpen(emitter, [
        () => {
          n.value = true
        },
        () => {}
      ]) 
      break;
      case 'help': On.editor().PluginEditorHeaderHelpOpen(emitter, [
        () => {
          n.value = true
        },
        () => {}
      ])
      break;
      case 'project': On.editor().PluginEditorHeaderProjectOpen(emitter, [
        () => {
          n.value = true
        },
        () => {}
      ])
      break;
    }
  })
</script>
