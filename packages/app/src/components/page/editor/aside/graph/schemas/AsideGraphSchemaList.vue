<template>
  <div class="flex mb-5 shadow-lg flex-col gap-2 w-full">
    <div class="flex w-full border-theme-aside-graph-lines border-l-1 border-t-1 border-r-1 rounded-t justify-between items-center truncate">
      <div class="flex px-2 wb-text justify-between items-center">
        <InputEmoji v-model="props.schema.customIcon" />
        <p class="font-bold">
          <InputChar
            v-model="props.schema.prefix"
            class="wb-text bg-transparent w-10 py-0.5 rounded hover:bg-theme-background-opacity-1 focus:bg-theme-background-opacity-1 ml-2 font-bold text-left"
          />
          <InputText
            v-model="props.schema.name"
            class="wb-text bg-transparent w-30 truncate py-0.5 rounded hover:bg-theme-background-opacity-1 focus:bg-theme-background-opacity-1 ml-2 font-bold text-left"
          />
        </p>
      </div>
      <div class="flex justify-end items-center w-full">
        <div
          class="cursor-pointer"
          @click.prevent.stop="schemas.onSchemaDelete(schema)"
        >
          <IconDelete class="wb-aside-icon" />
        </div>
        <div
          class="cursor-pointer"
          @click.prevent.stop="schemas.onFolderCreate(schema)"
        >
          <IconFolderAdd class="wb-aside-icon" />
        </div>
        <div
          :class="[value ? 'transform rotate-90' : '']"
          @click.prevent.stop="toggle()"
        >
          <IconArrowRight class="wb-aside-toggle-icon" />
        </div>
      </div>
    </div>
    <div v-if="value">
      <div
        v-for="(folder, index) in props.schema.folders"
        :key="index"
        :class="[PROJECT.base === 'annotations' ? '' : 'opacity-70']"
        class="border-l border-r border-theme-aside-graph-lines"
      >
        <AsideGraphSchemaFolder :folder="folder" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useProjectStore } from '@/store/project'
  import { useSchemas } from '@/use/schemas'
  import { useToggle } from '@vueuse/core'
  import { ProjectStateSchema } from 'better-write-types'

  const props = defineProps<{
    schema: ProjectStateSchema
  }>() 

  const PROJECT = useProjectStore()

  const schemas = useSchemas()
  const [value, toggle] = useToggle(true)
</script>
