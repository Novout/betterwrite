<template>
  <div
    v-motion
    :initial="{ opacity: 0, y: 30 }"
    :enter="{
      opacity: 1,
      y: 0,
    }"
    class="flex flex-col p-10 bg-theme-background-opacity-1 shadow-lg gap-5 items-start w-full my-5"
  >
    <h2 class="text-xl font-bold">
      {{ t('editor.characters.item.addCharacter') }}
    </h2>
    <div class="flex flex-wrap gap-10 items-center w-full">
      <EditorProjectCharactersItem>
        <p>{{ t('editor.characters.item.name') }}</p>
        <InputText
          v-model="state.name"
          class="bg-theme-background-opacity-1"
          @keypress.enter="onAdd"
        />
      </EditorProjectCharactersItem>
      <EditorProjectCharactersItem>
        <p>{{ t('editor.characters.item.nameCase') }}</p>
        <InputSelect
          v-model="state.nameCase"
          :arr="defines.characters().nameCase()"
          class="bg-theme-background-opacity-1"
        />
      </EditorProjectCharactersItem>
      <EditorProjectCharactersItem>
        <p>{{ t('editor.characters.item.color') }}</p>
        <InputColorPicker v-model="state.color" />
      </EditorProjectCharactersItem>
      <EditorProjectCharactersItem>
        <p>{{ t('editor.characters.item.colorAlpha') }}</p>
        <InputNumber
          v-model="state.colorAlpha"
          :min="0"
          :max="1"
          :step="0.05"
        />
      </EditorProjectCharactersItem>
      <EditorProjectCharactersItem>
        <p>{{ t('editor.characters.item.important') }}</p>
        <InputBoolean v-model="state.important" />
      </EditorProjectCharactersItem>
      <EditorProjectCharactersItem>
        <div class="p-3 bg-theme-background-opacity-1 rounded-full">
          <IconAdd class="w-7 h-7 wb-icon" @click="onAdd" />
        </div>
      </EditorProjectCharactersItem>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useProjectStore } from '@/store/project'
  import { useCharacters } from '@/use/characters'
  import { useUtils } from '@/use/utils'
  import { useDefines } from '@/use/defines'
  import { nextTick, reactive } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useToast } from 'vue-toastification'

  const PROJECT = useProjectStore()

  const utils = useUtils()
  const { t } = useI18n()
  const defines = useDefines()
  const characters = useCharacters()
  const toast = useToast()

  const state = reactive({
    name: '',
    nameCase: t('editor.characters.item.nameCaseStrict'),
    color: '#FFFFFF',
    colorAlpha: 0.2,
    important: false,
  })

  const onAdd = async () => {
    if (
      !state.name ||
      PROJECT.characters.list.find((n) => n.name === state.name)
    ) {
      toast.error(t('toast.generics.invalidName'))
      return
    }

    PROJECT.characters.list.unshift({
      id: utils.id().uuidv4(),
      name: state.name,
      nameCase: state.nameCase,
      color: state.color,
      colorAlpha: state.colorAlpha,
      important: state.important,
    })

    await nextTick

    state.name = ''
    state.nameCase = t('editor.characters.item.nameCaseStrict')
    state.color = '#FFFFFF'
    state.colorAlpha = 0.2
    state.important = false

    characters.handler()

    toast.success(t('toast.generics.successAdded'))
  }
</script>
