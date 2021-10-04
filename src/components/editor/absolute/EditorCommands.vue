<template>
  <div
    class="
      transform
      duration-700
      w-60
      h-60
      overflow-y-auto
      bg-white
      dark:bg-gray-700
      p-2
      rounded
      transition
      shadow-2xl
      infinite-scroll
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
    <EditorAbsoluteCommands
      :title="t('editor.aside.commands.contents[6].title')"
      :description="t('editor.aside.commands.contents[6].description')"
    >
      <template #exib>
        <p class="text-xl">
          {{ t('editor.aside.commands.contents[6].tag') }}
        </p>
      </template>
    </EditorAbsoluteCommands>
    <EditorAbsoluteCommands
      :title="t('editor.aside.commands.contents[7].title')"
      :description="t('editor.aside.commands.contents[7].description')"
    >
      <template #exib>
        <p class="text-xl">
          {{ t('editor.aside.commands.contents[7].tag') }}
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
