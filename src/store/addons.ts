import { useProject } from '@/use/project'
import { useRaw } from '@/use/raw'
import { defineStore } from 'pinia'
import { AddonsState } from '../types/addons'
import { useEditorStore } from './editor'
import { useProjectStore } from './project'

export const useAddonsStore = defineStore('addons', {
  state: (): AddonsState => {
    return {
      corrector: {
        options: [
          {
            title: 'editor.addons.corrector.removeStartWhitespace.title',
            description:
              'editor.addons.corrector.removeStartWhitespace.description',
            option: false,
            html: {
              before: `${useRaw()
                .v2()
                .html()
                .error()
                .item('&nbsp;')}Lorem ipsum dolor sit amet, consectetur adi...`,
              after: `${useRaw()
                .v2()
                .html()
                .correct()
                .item('Lorem')} ipsum dolor sit amet, consectetur adipis...`,
            },
          },
          {
            title: 'editor.addons.corrector.removeEndWhitespace.title',
            description:
              'editor.addons.corrector.removeEndWhitespace.description',
            option: false,
            html: {
              before: `...sit amet, consectetur adi.${useRaw()
                .v2()
                .html()
                .error()
                .item('&nbsp;&nbsp;')}`,
              after: `...sit amet, consectetur ${useRaw()
                .v2()
                .html()
                .correct()
                .item('adi.')}`,
            },
          },
          {
            title: 'editor.addons.corrector.insertParagraphEndStop.title',
            description:
              'editor.addons.corrector.insertParagraphEndStop.description',
            option: false,
            html: {
              before: `...sit amet, consectetur adi`,
              after: `...sit amet, consectetur adi${useRaw()
                .v2()
                .html()
                .correct()
                .item('.')}`,
            },
          },
          {
            title: 'editor.addons.corrector.removeExtraWhitespace.title',
            description:
              'editor.addons.corrector.removeExtraWhitespace.description',
            option: false,
            html: {
              before: `...sit amet, consectetur${useRaw()
                .v2()
                .html()
                .error()
                .item('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;')}adi...`,
              after: `...sit amet, consectetur${useRaw()
                .v2()
                .html()
                .correct()
                .item('&nbsp;')}adi...`,
            },
          },
          {
            title: 'editor.addons.corrector.insertDialogEndStop.title',
            description:
              'editor.addons.corrector.insertDialogEndStop.description',
            option: false,
            html: {
              before: `Donec arcu odio, dictum at porttitor eu. ${
                useEditorStore().configuration.commands.dialogue.value
              }Curabitur luctus sollicitudin suscipit${useRaw()
                .v2()
                .html()
                .error()
                .item('&nbsp;')}${
                useEditorStore().configuration.commands.dialogue.value
              }Etiam dictum tellus tellus.`,
              after: `Donec arcu odio, dictum at porttitor eu. ${
                useEditorStore().configuration.commands.dialogue.value
              }Curabitur luctus sollicitudin suscipit${useRaw()
                .v2()
                .html()
                .correct()
                .item('. ')}${
                useEditorStore().configuration.commands.dialogue.value
              }Etiam dictum tellus tellus.`,
            },
          },
        ],
      },
    }
  },
})
