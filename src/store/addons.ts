import { useRaw } from '@/use/raw'
import { defineStore } from 'pinia'
import { AddonsState } from '../types/addons'

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
        ],
      },
    }
  },
})
