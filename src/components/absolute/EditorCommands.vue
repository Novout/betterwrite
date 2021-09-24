<template>
  <div
    class="
      absolute
      top-1/2
      left-1/2
      transform
      -translate-x-1/2 -translate-y-1/2
      w-60
      bg-white
      dark:bg-gray-700
      p-2
      rounded
      shadow-2xl
    "
  >
    <EditorAbsoluteCommands
      :title="t('editor.aside.commands.contents[0].title')"
      :description="t('editor.aside.commands.contents[0].description')"
    >
      <template #exib>
        <p class="text-xl">{{ t('editor.aside.commands.contents[0].tag') }}</p>
      </template>
    </EditorAbsoluteCommands>
    <EditorAbsoluteCommands
      :title="t('editor.aside.commands.contents[1].title')"
      :description="t('editor.aside.commands.contents[1].description')"
    >
      <template #exib>
        <p class="font-bold text-xl">
          {{ t('editor.aside.commands.contents[1].tag') }}
        </p>
      </template>
    </EditorAbsoluteCommands>
    <EditorAbsoluteCommands
      :title="t('editor.aside.commands.contents[2].title')"
      :description="t('editor.aside.commands.contents[2].description')"
    >
      <template #exib>
        <p class="font-italic text-xl">
          {{ t('editor.aside.commands.contents[2].tag') }}
        </p>
      </template>
    </EditorAbsoluteCommands>
    <EditorAbsoluteCommands
      :title="t('editor.aside.commands.contents[4].title')"
      :description="t('editor.aside.commands.contents[4].description')"
    >
      <template #exib>
        <p class="font-bold text-xl">
          {{ t('editor.aside.commands.contents[4].tag') }}
        </p>
      </template>
    </EditorAbsoluteCommands>
    <EditorAbsoluteCommands
      :title="t('editor.aside.commands.contents[5].title')"
      :description="t('editor.aside.commands.contents[5].description')"
    >
      <template #exib>
        <p class="font-bold text-xl">
          {{ t('editor.aside.commands.contents[5].tag') }}
        </p>
      </template>
    </EditorAbsoluteCommands>
  </div>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import { useStore } from 'vuex'

  const { t } = useI18n()
  const store = useStore()
</script>
