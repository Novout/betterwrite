<template>
  <div
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
        <InputText
          v-model="state.nameCase"
          class="bg-theme-background-opacity-1"
        />
      </EditorProjectCharactersItem>
      <EditorProjectCharactersItem>
        <p>{{ t('editor.characters.item.color') }}</p>
        <InputColorPicker v-model="state.color" />
      </EditorProjectCharactersItem>
      <EditorProjectCharactersItem>
        <p>{{ t('editor.characters.item.colorAlpha') }}</p>
        <InputNumber v-model="state.colorAlpha" :min="0" :max="1" :step="0.1" />
      </EditorProjectCharactersItem>
      <EditorProjectCharactersItem>
        <p>{{ t('editor.characters.item.important') }}</p>
        <InputBoolean v-model="state.important" />
      </EditorProjectCharactersItem>
      <EditorProjectCharactersItem>
        <div>
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
  import { nextTick, reactive } from 'vue'
  import { useI18n } from 'vue-i18n'

  const PROJECT = useProjectStore()

  const utils = useUtils()
  const { t } = useI18n()
  const characters = useCharacters()

  const state = reactive({
    name: '',
    nameCase: 'strict' as any,
    color: '#FFFFFF',
    colorAlpha: 0.1,
    important: false,
  })

  const onAdd = async () => {
    if (!state.name) {
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
    state.nameCase = 'strict'
    state.color = '#FFFFFF'
    state.colorAlpha = 0.1
    state.important = false

    characters.handler()
  }
</script>
