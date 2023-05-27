<template>
  <div class="flex mb-5 shadow-lg flex-col gap-2 w-full">
    <div class="flex w-full border-theme-aside-graph-lines border-l-1 border-t-1 border-r-1 rounded-t justify-between items-center truncate">
      <div class="flex px-2 wb-text justify-between items-center">
        <InputEmoji v-model="props.schema.customIcon" />
        <p class="ml-5 font-bold w-auto md:w-12 lg:w-30 truncate">{{ props.schema.prefix }}  {{ props.schema.name }}</p>
      </div>
      <div class="flex items-center gap-1">
        <div
          class="cursor-pointer"
          @click.prevent.stop="schemas.onFolderCreate(schema)"
        >
          <IconFolderAdd class="wb-aside-icon" />
        </div>
        <div
          class="cursor-pointer"
          @click.prevent.stop="schemas.onSchemaDelete(schema)"
        >
          <IconDelete class="wb-aside-icon" />
        </div>
      </div>
    </div>
    <div
      v-for="(folder, index) in props.schema.folders"
      :key="index"
      :class="[PROJECT.base === 'annotations' ? '' : 'opacity-70']"
      class="border-l border-theme-aside-graph-lines"
    >
      <AsideGraphSchemaFolder :folder="folder" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useProjectStore } from '@/store/project'
  import { useSchemas } from '@/use/schemas'
  import { ProjectStateSchema } from 'better-write-types'

  const props = defineProps<{
    schema: ProjectStateSchema
  }>() 

  const PROJECT = useProjectStore()

  const schemas = useSchemas()
</script>
