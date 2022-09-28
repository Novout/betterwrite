<template>
  <div
    v-motion
    :initial="{ opacity: 0, y: 30 }"
    :enter="{
      opacity: 1,
      y: 0,
    }"
    class="flex bg-theme-background-opacity-1 gap-5 flex-col w-full p-10 border hover:border-2 rounded-xl shadow-xl"
    :style="{ borderColor: character.color }"
  >
    <div class="flex justify-between gap-2 items-center">
      <div class="flex items-center gap-2">
        <h2 class="font-bold text-xl">{{ character.name }}</h2>
        <InputColorPicker v-model="character.color" />
      </div>
      <div class="flex flex-wrap gap-4 items-center">
        <div
          v-if="value"
          v-motion
          :initial="{ opacity: 0, x: 30 }"
          :enter="{
            opacity: 1,
            x: 0,
          }"
          class="flex flex-wrap gap-5 items-center bg-theme-background-2 rounded-lg p-2 shadow-xl"
        >
          <div class="flex flex-col">
            <p>{{ t('editor.characters.item.name') }}</p>
            <InputText
              v-model="character.name"
              class="bg-theme-background-opacity-1"
            />
          </div>
          <div class="flex flex-col">
            <p>{{ t('editor.characters.item.nameCase') }}</p>
            <InputSelect
              v-model="character.nameCase"
              :arr="defines.characters().nameCase()"
              class="bg-theme-background-opacity-1"
            />
          </div>
          <div class="flex flex-col">
            <p>{{ t('editor.characters.item.color') }}</p>
            <InputColorPicker v-model="character.color" />
          </div>
          <div class="flex flex-col">
            <p>{{ t('editor.characters.item.colorAlpha') }}</p>
            <InputNumber
              v-model="character.colorAlpha"
              :min="0"
              :max="1"
              :step="0.05"
            />
          </div>
          <div class="flex flex-col">
            <p>{{ t('editor.characters.item.important') }}</p>
            <InputBoolean v-model="character.important" />
          </div>
        </div>
        <div class="bg-theme-background-2 rounded-lg p-2 shadow-xl">
          <IconEdit class="wb-icon w-6 h-6" @click="toggle()" />
        </div>
        <div
          class="bg-theme-background-2 rounded-lg p-2 shadow-xl"
          @click="characters.controller().onDelete(character)"
        >
          <IconDelete class="wb-icon w-6 h-6" />
        </div>
        <div
          class="bg-theme-background-2 rounded-lg p-2 shadow-xl"
          @click="toggle2()"
        >
          <IconArrowRight
            class="wb-icon w-6 h-6 transform transition-transform"
            :class="[value2 ? 'rotate-90' : '']"
          />
        </div>
      </div>
    </div>
    <div v-if="value2" class="flex flex-wrap w-full gap-10">
      <EditorProjectCharactersItem>
        <h2 class="text-lg underline">
          {{ t('editor.characters.data.occurrences') }}
        </h2>
        <p class="font-bold text-lg underline">
          {{ totalOccurrences }}
        </p>
      </EditorProjectCharactersItem>
      <EditorProjectCharactersItem>
        <h2 class="text-lg underline">
          {{ t('editor.characters.data.averageOccurrences') }}
        </h2>
        <p class="font-bold text-lg underline">
          {{ averageTotalOccurrences }}
        </p>
      </EditorProjectCharactersItem>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ProjectStateCharacter } from 'better-write-types'
  import { useCharacters } from '@/use/characters'
  import { useI18n } from 'vue-i18n'
  import { computedAsync, useToggle } from '@vueuse/core'
  import { useDefines } from '@/use/defines'

  const props = defineProps<{
    character: ProjectStateCharacter
  }>()

  const characters = useCharacters()
  const defines = useDefines()
  const { t } = useI18n()
  const [value, toggle] = useToggle()
  const [value2, toggle2] = useToggle()

  const totalOccurrences = computedAsync(async () => {
    return await characters.data().totalOccurrences(props.character.name)
  }, 0)
  const averageTotalOccurrences = computedAsync(async () => {
    return await characters.data().averageTotalOccurrences(props.character.name)
  }, '0.0')
</script>
