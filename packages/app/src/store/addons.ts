import { bold, italic, useRaw } from '@/use/raw'
import { defineStore } from 'pinia'
import { AddonsState } from 'better-write-types'

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
            title: 'editor.addons.corrector.resetEntityRaw.title',
            description: 'editor.addons.corrector.resetEntityRaw.description',
            option: false,
            html: {
              before: `Donec arcu odio, ${useRaw()
                .v2()
                .html()
                .error()
                .item(
                  italic().insert('dictum'),
                )} at porttitor eu. Curabitur sollicitudin suscipit ${useRaw()
                .v2()
                .html()
                .error()
                .item(bold().insert('luctus'))}. Etiam dictum tellus tellus.`,
              after: `Donec arcu odio, ${useRaw()
                .v2()
                .html()
                .correct()
                .item(
                  'dictum',
                )} at porttitor eu. Curabitur luctus sollicitudin suscipit ${useRaw()
                .v2()
                .html()
                .correct()
                .item('luctus')}. Etiam dictum tellus tellus.`,
            },
          },
        ],
      },
    }
  },
})
