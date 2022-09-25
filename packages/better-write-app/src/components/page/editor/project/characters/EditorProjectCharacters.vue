<template>
  <FullModal @close="onClose">
    <EditorAbsoluteHeader
      class="pl-5"
      :title="t('editor.characters.title')"
      @close="onClose"
    />
    <h2 class="mt-10 break-words text-base sm:text-lg">
      {{ t('editor.characters.description') }}
    </h2>
    <div class="flex flex-col gap-2 w-full">
      <EditorProjectCharactersAdd />
      <div class="flex gap-10 flex-col mt-10">
        <EditorProjectCharactersListContainer
          v-for="(character, index) in PROJECT.characters.list"
          :key="index"
          :character="character"
        />
      </div>
    </div>
  </FullModal>
</template>

<script setup lang="ts">
  import { useAbsoluteStore } from '@/store/absolute'
  import { useProjectStore } from '@/store/project'
  import { useCharacters } from '@/use/characters'
  import { onClickOutside } from '@vueuse/core'
  import { nextTick, ref } from 'vue'
  import { useI18n } from 'vue-i18n'

  const ABSOLUTE = useAbsoluteStore()
  const PROJECT = useProjectStore()

  const { t } = useI18n()
  const characters = useCharacters()

  const rf = ref<HTMLElement | null>(null)

  onClickOutside(rf as any, () => {
    onClose()
  })

  const onClose = async () => {
    characters.reset()

    await nextTick

    characters.handler()

    await nextTick

    ABSOLUTE.project.characters = false
  }
</script>
