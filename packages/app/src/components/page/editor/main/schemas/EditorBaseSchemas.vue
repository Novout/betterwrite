<template>
  <div class="flex-1 relative w-full wb-edit overflow-hidden">
    <div
    class="absolute right-10 top-2 bg-none z-50 flex items-center justify-end w-full"
    >
      <div class="flex gap-2 sm:gap-6 items-center">
        <HeroIcon class="wb-icon" @click="call(redoCommand.key)">
          <IconRedo class="w-5.5 h-5.5 md:(w-6 h-6)" />
        </HeroIcon>
        <HeroIcon class="wb-icon mr-2 sm:mr-6" @click="call(undoCommand.key)">
          <IconUndo class="w-5.5 h-5.5 md:(w-6 h-6)" />
        </HeroIcon>
        <HeroIcon class="wb-icon" @click="call(toggleStrongCommand.key)">
          <IconBold class="w-5.5 h-5.5 md:(w-6 h-6)" />
        </HeroIcon>
        <HeroIcon class="wb-icon" @click="call(toggleEmphasisCommand.key)">
          <IconItalic class="w-5.5 h-5.5 md:(w-6 h-6)" />
        </HeroIcon>
        <HeroIcon class="wb-icon" @click="call(wrapInBulletListCommand.key)">
          <IconBulletList class="w-5.5 h-5.5 md:(w-6 h-6)" />
        </HeroIcon>
        <HeroIcon class="wb-icon" @click="call(wrapInOrderedListCommand.key)">
          <IconOrderedList class="w-5.5 h-5.5 md:(w-6 h-6)" />
        </HeroIcon>
        <HeroIcon class="wb-icon" @click="call(wrapInBlockquoteCommand.key)">
          <IconBlockquote class="w-7 h-7 md:(w-9 h-9)" />
        </HeroIcon>
        <HeroIcon class="wb-icon" @click="onImageInput">
          <IconImage class="w-5.5 h-5.5 md:(w-6 h-6)" />
        </HeroIcon>
        <div class="flex items-center ml-5 md:(ml-10)">
          <HeroIcon class="wb-icon" @click="onGetMarkdown()">
            <IconExport class="w-5 h-5 md:(w-6 h-6)" />
          </HeroIcon>
        </div>
      </div>
    </div>
    <div
      id="bw-wysiwyg"
      class="h-full wb-scroll overflow-auto overscroll-none"
    />
  </div>
</template>

<script setup lang="ts">
  import { usePlugin } from 'better-write-plugin-core'
  import { onBeforeUnmount, onMounted, ref } from 'vue'
  import { callCommand } from '@milkdown/utils'
  import type { CmdKey, Editor } from '@milkdown/core'
  import { redoCommand, undoCommand } from '@milkdown/plugin-history'
  import {
    toggleEmphasisCommand,
    toggleStrongCommand,
    wrapInBlockquoteCommand,
    wrapInBulletListCommand,
    wrapInOrderedListCommand,
    insertImageCommand,
  } from '@milkdown/preset-commonmark'
  import { useEditorStore } from '@/store/editor'
  import { getImageFileRaw } from 'better-write-image-converter'
  import { getMarkdown } from '@milkdown/utils'
  import { useProject } from '@/use/project'
  import { saveAs } from 'file-saver'
  import { useUtils } from '@/use/utils'
  import { useToast } from 'vue-toastification'
  import { useI18n } from 'vue-i18n'
  import { ProjectStateSchemaFile } from 'better-write-types'
  import { useDefines } from '@/use/defines'

  const EDITOR = useEditorStore()

  const plugin = usePlugin()
  const project = useProject()
  const utils = useUtils()
  const toast = useToast()
  const defines = useDefines()
  const { t } = useI18n()

  const editor = ref<Editor | null>(null)
  const file = ref<ProjectStateSchemaFile | null>(null)

  onMounted(() => {
    plugin.on('plugin-schemas-get-instance', (set) => {
      editor.value = set.editor as Editor
      file.value = set.file as ProjectStateSchemaFile
    }) 
  })

  onBeforeUnmount(async () => {
    editor.value = null
    await plugin.emit('plugin-schemas-reset')
  })

  function call<T>(command: CmdKey<T>, payload?: T) {
    editor.value?.action(callCommand(command, payload))
  }

  const onImageInput = () => {
    getImageFileRaw({ compress: EDITOR.configuration.compressFiles })
      .then(({ raw, fileName }) => {
        call(insertImageCommand.key, { src: raw, alt: '', title: fileName })
      })
      .catch(() => {})
  }

  const onGetMarkdown = () => {
    const md = editor.value?.action(getMarkdown())

    if (md) {
      const normalized = utils.text().defaultWhitespace(md)

      if (!normalized) return

      const data = new Blob([normalized], { type: 'text/markdown' })

      saveAs(data, project.utils().exportFullName('md'))

      toast.success(t('toast.project.md.generate'))
    }
  }
</script>
