<template>
  <div class="flex justify-between items-center w-full">
    <div class="flex items-center ml-2">
      <InputEmoji v-model="folder.customIcon">
        <IconFolderOpen class="wb-icon w-5 h-5" />
      </InputEmoji>
      <InputText
        v-model="folder.folderName"
        class="wb-text bg-transparent py-0.5 rounded hover:bg-theme-background-opacity-1 focus:bg-theme-background-opacity-1 ml-2 font-bold w-2/3 text-left truncate"
      />
    </div>
    <div class="flex items-center">
      <div @click.prevent.stop="schemas.onFolderDelete(folder)">
        <IconDelete class="wb-aside-icon" />
      </div>
      <div @click.prevent.stop="schemas.onFileCreate(folder)">
        <IconFileAdd class="wb-aside-icon" />
      </div>
      <div
        :class="[value ? 'transform rotate-90' : '']"
        @click.prevent.stop="toggle()"
      >
        <IconArrowRight class="wb-aside-toggle-icon" />
      </div>
    </div>
  </div>
  <AsideGraphSchemaListFiles v-if="value" :folder="folder" />
</template>

<script setup lang="ts">
  import { useSchemas } from '@/use/schemas'
  import useEmitter from '@/use/emitter'
  import { useToggle } from '@vueuse/core'
  import { ProjectStateSchemaFolder } from 'better-write-types'
  import { onMounted } from 'vue'

  const props = defineProps<{
    folder: ProjectStateSchemaFolder
  }>()

  const emitter = useEmitter()
  const schemas = useSchemas()
  const [value, toggle] = useToggle(true)

  onMounted(() => {
    emitter.on('annotations-folder-graph-open', (folder) => {
      if (folder.id === props.folder.id) value.value = true
    })
  })
</script>
