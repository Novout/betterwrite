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
    <div class="flex flex-col w-full gap-5 mt-10">
      <EditorGeneratorSubstitutionsAdd />
      <div class="flex justify-around items-center w-full">
        <p class="text-lg font-bold">
          {{ t('editor.addons.substitutions.from') }}
        </p>
        <p class="text-lg font-bold">
          {{ t('editor.addons.substitutions.to') }}
        </p>
      </div>
      <EditorGeneratorSubstitutionsItem
        v-for="(template, index) in PROJECT.templates.substitutions.text"
        :template="template"
        :index="index"
      />
      <div class="flex flex-col my-4">
        <h2 class="font-bold text-xl">
          {{ t('editor.addons.substitutions.italic') }}
        </h2>
        <EditorGeneratorSubstitutionsItalicAdd />
        <EditorGeneratorSubstitutionsItalicItem
          v-for="(template, index) in PROJECT.templates.substitutions.italic"
          :template="template"
          :index="index"
        />
      </div>
      <div class="flex flex-col my-4">
        <h2 class="font-bold text-xl">
          {{ t('editor.addons.substitutions.bold') }}
        </h2>
        <EditorGeneratorSubstitutionsBoldAdd />
        <EditorGeneratorSubstitutionsBoldItem
          v-for="(template, index) in PROJECT.templates.substitutions.bold"
          :template="template"
          :index="index"
        />
      </div>
    </div>
  </FullModal>
</template>

<script setup lang="ts">
  import { useAbsoluteStore } from '@/store/absolute'
  import { useProjectStore } from '@/store/project'
  import { onClickOutside, useDraggable } from '@vueuse/core'
  import { ref } from 'vue'
  import { useI18n } from 'vue-i18n'

  const ABSOLUTE = useAbsoluteStore()
  const PROJECT = useProjectStore()

  const { t } = useI18n()

  const rf = ref<HTMLElement | null>(null)

  const { style } = useDraggable(rf as any, {
    initialValue: { x: window.innerWidth / 4, y: window.innerHeight / 6 },
  })

  onClickOutside(rf as any, () => {
    onClose()
  })

  const onClose = () => {
    ABSOLUTE.generator.substitutions = false
  }
</script>
