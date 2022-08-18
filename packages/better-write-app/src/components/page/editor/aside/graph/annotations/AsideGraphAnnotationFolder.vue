<template>
  <div class="flex justify-between items-center w-full">
    <div class="flex items-center ml-2">
      <IconFolderOpen class="wb-icon w-5 h-5" @click.prevent.stop="toggle()" />
      <InputText
        v-model="folder.folderName"
        class="wb-text bg-transparent py-0.5 rounded hover:bg-theme-background-opacity-1 focus:bg-theme-background-opacity-1 ml-2 font-bold font-raleway w-2/3 text-left truncate"
      />
    </div>
    <div class="flex items-center">
      <div
        @click.prevent.stop="
          plugin.emit('plugin-annotations-file-create', folder)
        "
      >
        <IconFileAdd class="wb-icon w-6 h-6" />
      </div>
      <div
        :class="[value ? 'transform rotate-90' : '']"
        @click.prevent.stop="toggle()"
      >
        <IconArrowRight class="wb-icon w-7 h-7" />
      </div>
    </div>
  </div>
  <AsideGraphAnnotationsListFiles v-if="value" :folder="folder" />
</template>

<script setup lang="ts">
  import useEmitter from '@/use/emitter'
  import { useToggle } from '@vueuse/core'
  import { usePlugin } from 'better-write-plugin-core'
  import { ProjectStateAnnotationFolder } from 'better-write-types'
  import { onMounted } from 'vue'

  const props = defineProps<{
    folder: ProjectStateAnnotationFolder
  }>()

  const plugin = usePlugin()
  const emitter = useEmitter()
  const [value, toggle] = useToggle(false)

  onMounted(() => {
    emitter.on('annotations-folder-graph-open', (folder) => {
      if (folder.id === props.folder.id) value.value = true
    })
  })
</script>
