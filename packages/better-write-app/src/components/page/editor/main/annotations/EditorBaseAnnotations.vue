<template>
  <div class="relative w-full wb-edit overflow-auto">
    <div class="absolute right-10 top-2 bg-none z-9999 flex items-center justify-end w-full">
      <div class="flex gap-2 sm:gap-6 items-center">
        <HeroIcon class="wb-icon" @click="call(redoCommand.key)">
          <IconRedo class="w-7 h-7 md:(w-8 h-8)" />
        </HeroIcon>
        <HeroIcon class="wb-icon mr-2 sm:mr-6" @click="call(undoCommand.key)">
          <IconUndo class="w-7 h-7 md:(w-8 h-8)" />
        </HeroIcon>
        <HeroIcon class="wb-icon" @click="call(toggleStrongCommand.key)">
          <IconBold class="w-7 h-7 md:(w-8 h-8)" />
        </HeroIcon>
        <HeroIcon class="wb-icon" @click="call(toggleEmphasisCommand.key)">
          <IconItalic class="w-7 h-7 md:(w-8 h-8)" />
        </HeroIcon>
        <HeroIcon class="wb-icon" @click="call(wrapInBulletListCommand.key)">
          <IconBulletList class="w-7 h-7 md:(w-8 h-8)" />
        </HeroIcon>
        <HeroIcon class="wb-icon" @click="call(wrapInOrderedListCommand.key)">
          <IconOrderedList class="w-7 h-7 md:(w-8 h-8)" />
        </HeroIcon>
        <HeroIcon class="wb-icon" @click="call(wrapInBlockquoteCommand.key)">
          <IconBlockquote class="w-7 h-7 md:(w-9 h-9)" />
        </HeroIcon>
        <HeroIcon class="wb-icon" @click="onImageInput">
          <IconImage class="w-7 h-7 md:(w-8 h-8)" />
        </HeroIcon>
      </div>
    </div>
    <div id="bw-wysiwyg" class="h-full wb-scroll overflow-auto overscroll-none" />
  </div>
</template>

<script setup lang="ts">
  import { usePlugin } from 'better-write-plugin-core'
  import { onBeforeUnmount, onMounted, ref } from 'vue'
  import { callCommand } from "@milkdown/utils";
  import type {
    CmdKey,
    Editor,
  } from '@milkdown/core'
  import { redoCommand, undoCommand } from "@milkdown/plugin-history";
  import {
    toggleEmphasisCommand,
    toggleStrongCommand,
    wrapInBlockquoteCommand,
    wrapInBulletListCommand,
    wrapInOrderedListCommand,
    insertImageCommand
  } from "@milkdown/preset-commonmark";
  import { useEditorStore } from '@/store/editor';
  import { getImageFileRaw } from 'better-write-image-converter';

  const EDITOR = useEditorStore()

  const plugin = usePlugin()
  const editor = ref<Editor | null>(null)

  onMounted(() => {
    plugin.on('plugin-annotations-get-instance', (_editor: Editor) => {
      editor.value = _editor
    })
  })

  onBeforeUnmount(async () => {
    editor.value = null
    await plugin.emit('plugin-annotations-reset')
  })

  function call<T>(command: CmdKey<T>, payload?: T) {
    return editor.value?.action(callCommand(command, payload));
  }

  const onImageInput = () => {
    getImageFileRaw({ compress: EDITOR.configuration.compressFiles })
      .then(({ raw, fileName }) => {
        call(insertImageCommand.key, { src: raw, alt: '', title: fileName })
      })
      .catch(() => {})
  }
</script>
