<template>
  <div class="pt-2" />
  <draggable
    class="flex flex-col items-center justify-between ml-5"
    :list="folder.files"
    item-key="id"
  >
    <template #item="{ element }">
      <div class="w-full">
        <div
        class="flex justify-between items-center w-full bg-theme-aside-graph-background hover:bg-theme-aside-graph-background-hover active:bg-theme-aside-graph-background-active text-theme-aside-graph-text hover:text-theme-aside-graph-text-hover active:text-theme-aside-graph-text-active"
      >
        <InputColorPicker v-if="element.extra.color" v-model="element.extra.color" />
        <div
        class="truncate cursor-pointer"
          @click.prevent.stop="schemas.onStart(element)"
        >
          {{ element.fileName }}
        </div>
        <div class="flex items-center">
          <div
          @click.prevent.stop="
          schemas.onFileDelete({ file: element, folder })
          "
        >
          <IconDelete class="wb-aside-icon" />
        </div>
        <IconArrowRight
          v-if="element.extra?.id"
            :class="[element.extra.configuration ? 'transform rotate-90' : '']"
            class="wb-aside-toggle-icon"
            @click.prevent.stop="element.extra.configuration = !element.extra.configuration"
          />
        </div>
      </div>
      <div
          v-if="element.extra.id"
          class="flex flex-col gap-2 wb-text w-full"
        >
          <div v-if="element.extra.configuration" class="flex flex-col w-full gap-2 mt-5">
            <AsideGraphSchemaCharactersItem>
              <p>{{ t('editor.characters.item.nameCase') }}</p>
              <InputSelect
                v-model="element.extra.nameCase"
                :arr="defines.characters().nameCase()"
                class="bg-theme-background-opacity-1"
              />
            </AsideGraphSchemaCharactersItem>
            <AsideGraphSchemaCharactersItem>
              <p>{{ t('editor.characters.item.colorAlpha') }}</p>
              <InputNumber
                v-model="element.extra.colorAlpha"
                :min="0"
                :max="1"
                :step="0.1"
              />
            </AsideGraphSchemaCharactersItem>
            <AsideGraphSchemaCharactersItem>
              <p>{{ t('editor.characters.item.important') }}</p>
              <InputBoolean v-model="element.extra.important" />
            </AsideGraphSchemaCharactersItem>
            <AsideGraphSchemaCharactersItem>
              <p>{{ t('editor.characters.item.disabled') }}</p>
              <InputBoolean v-model="element.extra.disabled" />
            </AsideGraphSchemaCharactersItem>
          </div>
        </div>
      </div>
    </template>
  </draggable>
  <div class="pb-2" />
</template>

<script setup lang="ts">
  import { ProjectStateSchemaFolder } from 'better-write-types'
  import { useSchemas } from '@/use/schemas'
  import draggable from 'vuedraggable'
  import { useDefines } from '@/use/defines'
  import { useI18n } from 'vue-i18n'

  defineProps<{
    folder: ProjectStateSchemaFolder
  }>()

  const schemas = useSchemas()
  const defines = useDefines()
  const { t } = useI18n()
</script>
