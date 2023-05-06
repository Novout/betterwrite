<template>
  <FullModal @close="onClose">
    <EditorAbsoluteHeader
      class="pl-5"
      :title="t('editor.bar.generator.substitutions')"
      @close="onClose"
    />
    <EditorGeneratorSubstitutionsFile />
    <h2 class="mt-5 break-words text-base sm:text-lg">
      {{ t('editor.addons.substitutions.description') }}
    </h2>
    <div class="flex flex-col w-full mt-5">
      <EditorGeneratorSubstitutionsAdd />
      <div class="flex justify-around items-center w-full">
        <p class="font-poppins text-lg font-bold">
          {{ t('editor.addons.substitutions.from') }}
        </p>
        <p class="font-poppins text-lg font-bold">
          {{ t('editor.addons.substitutions.to') }}
        </p>
      </div>
      <draggable :list="PROJECT.templates.substitutions.text" item-key="id">
        <template #item="{ element, index }">
          <EditorGeneratorSubstitutionsItem
            :template="element"
            :index="index"
          />
        </template>
      </draggable>
      <div class="flex flex-col my-4">
        <h2 class="font-poppins font-bold text-xl">
          {{ t('editor.addons.substitutions.italic') }}
        </h2>
        <EditorGeneratorSubstitutionsItalicAdd />
        <draggable :list="PROJECT.templates.substitutions.italic" item-key="id">
          <template #item="{ element, index }">
            <EditorGeneratorSubstitutionsItalicItem
              :template="element"
              :index="index"
            />
          </template>
        </draggable>
      </div>
      <div class="flex flex-col my-4">
        <h2 class="font-poppins font-bold text-xl">
          {{ t('editor.addons.substitutions.bold') }}
        </h2>
        <EditorGeneratorSubstitutionsBoldAdd />
        <draggable :list="PROJECT.templates.substitutions.bold" item-key="id">
          <template #item="{ element, index }">
            <EditorGeneratorSubstitutionsBoldItem
              :template="element"
              :index="index"
            />
          </template>
        </draggable>
      </div>
    </div>
  </FullModal>
</template>

<script setup lang="ts">
  import { useAbsoluteStore } from '@/store/absolute'
  import { useProjectStore } from '@/store/project'
  import { onClickOutside } from '@vueuse/core'
  import { ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import draggable from 'vuedraggable'

  const ABSOLUTE = useAbsoluteStore()
  const PROJECT = useProjectStore()

  const { t } = useI18n()

  const rf = ref<HTMLElement | null>(null)

  onClickOutside(rf as any, () => {
    onClose()
  })

  const onClose = () => {
    ABSOLUTE.generator.substitutions = false
  }
</script>
