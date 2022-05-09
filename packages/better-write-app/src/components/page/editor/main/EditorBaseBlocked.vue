<template>
  <div
    class="z-20 flex flex-col items-center gap-3 wb-edit wb-scroll w-full wb-text px-10 py-5"
  >
    <div
      v-motion
      :initial="{ x: -100, opacity: 0 }"
      :enter="{ x: 0, opacity: 1 }"
      :delay="100"
      class="flex justify-end items-center w-full py-2"
    >
      <IconClose
        class="w-7 h-7 wb-icon"
        @click.prevent.stop="ABSOLUTE.project.blocked = false"
      />
    </div>
    <div
      v-motion
      :initial="{ x: -100, opacity: 0 }"
      :enter="{ x: 0, opacity: 1 }"
      :delay="100"
      class="flex items-center justify-center w-full mb-10"
    >
      <Logo :hidden="true" :width="75" />
    </div>
    <EditorBaseBlockedContainer
      v-motion
      :initial="{ x: -50, opacity: 0 }"
      :enter="{ x: 0, opacity: 1 }"
      :delay="300"
      :title="t('editor.blocked.commands.name')"
    >
      <p class="mb-2">{{ t('editor.blocked.commands.description') }}</p>
      <BlockedItem :title="t('editor.preferences.commands.1')">
        <template #icon>
          <IconParagraph class="w-7 h-7" />
        </template>
        <BlockedItem title="CTRL + 1" />
      </BlockedItem>
      <BlockedItem :title="t('editor.preferences.commands.2')">
        <template #icon>
          <IconHeadingTwo class="w-7 h-7" />
        </template>
        <BlockedItem title="CTRL + 2" />
      </BlockedItem>
      <BlockedItem :title="t('editor.preferences.commands.3')">
        <template #icon>
          <IconHeadingThree class="w-7 h-7" />
        </template>
        <BlockedItem title="CTRL + 3" />
      </BlockedItem>
      <BlockedItem :title="t('editor.preferences.commands.4')">
        <template #icon>
          <IconLineBreak class="w-7 h-7" />
        </template>
        <BlockedItem title="CTRL + 4" />
      </BlockedItem>
      <BlockedItem :title="t('editor.preferences.commands.5')">
        <template #icon>
          <IconPageBreak class="w-7 h-7" />
        </template>
        <BlockedItem title="CTRL + 5" />
      </BlockedItem>
      <BlockedItem :title="t('editor.preferences.commands.6')">
        <template #icon>
          <IconCheckbox class="w-7 h-7" />
        </template>
        <BlockedItem title="CTRL + 6" />
      </BlockedItem>
      <BlockedItem :title="t('editor.preferences.commands.7')">
        <template #icon>
          <IconList class="w-7 h-7" />
        </template>
        <BlockedItem title="CTRL + 7" />
      </BlockedItem>
      <BlockedItem :title="t('editor.preferences.commands.8')">
        <template #icon>
          <IconImage class="w-7 h-7" />
        </template>
        <BlockedItem title="CTRL + 8" />
      </BlockedItem>
      <BlockedItem :title="t('editor.preferences.commands.9')">
        <template #icon>
          <IconDrawing class="w-7 h-7" />
        </template>
        <BlockedItem title="CTRL + 9" />
      </BlockedItem>
    </EditorBaseBlockedContainer>
  </div>
</template>

<script lang="ts" setup>
  import { useAbsoluteStore } from '@/store/absolute'
  import { useI18n } from 'vue-i18n'

  const ABSOLUTE = useAbsoluteStore()

  const { t } = useI18n()
</script>
