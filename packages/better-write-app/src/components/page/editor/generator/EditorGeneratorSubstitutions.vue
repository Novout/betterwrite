<template>
  <Modal @close="onClose">
    <div
      ref="rf"
      :style="style"
      class="fixed flex flex-col w-3/4 md:w-1/2 h-3/4 bg-theme-background-1 wb-text rounded shadow-2xl p-5 overflow-y-auto"
    >
      <EditorAbsoluteHeader
        class="pl-5"
        :title="t('editor.bar.generator.substitutions')"
        @close="onClose"
      />
      <h2 class="mt-5 break-words font-light text-lg">
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
      </div>
    </div>
  </Modal>
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
