import { defineStore } from 'pinia'
import { EditorState } from '../types/editor'

export const useEditorStore = defineStore('editor', {
  state: (): EditorState => {
    return {
      styles: {
        input: {
          fontFamily: 'font-raleway',
          fontSize: 'text-sm',
          fontColor: 'text-black dark:text-gray-100',
        },
        show: {
          entity: {
            shadow: false,
          },
          fontFamily: 'font-raleway',
          fontColor: 'text-black dark:text-gray-100',
          paragraph: {
            indent: 'indent-15',
            fontFamily: 'font-raleway',
            fontColor: 'text-black dark:text-gray-100',
            fontSize: 'text-sm',
            fontWeight: 'font-normal',
          },
          heading: {
            one: {
              fontFamily: 'font-raleway',
              fontColor: 'text-black dark:text-gray-100',
              fontSize: 'text-3xl',
              fontWeight: 'font-bold',
            },
            two: {
              fontFamily: 'font-raleway',
              fontColor: 'text-black dark:text-gray-100',
              fontSize: 'text-2xl',
              fontWeight: 'font-bold',
            },
            three: {
              fontFamily: 'font-raleway',
              fontColor: 'text-black dark:text-gray-100',
              fontSize: 'text-xl',
              fontWeight: 'font-semibold',
            },
          },
        },
      },
      configuration: {
        dark: true,
        draggable: false,
      },
      actives: {
        text: {
          selection: {
            content: '',
            end: 0,
            start: 0,
          },
        },
      },
    }
  },
  actions: {
    switchTheme(dark: boolean) {
      this.configuration.dark = dark
    },
    setTextSelection(payload: any) {
      this.actives.text.selection.content = payload.content
      this.actives.text.selection.end = payload.end
      this.actives.text.selection.start = payload.start
    },
  },
})
