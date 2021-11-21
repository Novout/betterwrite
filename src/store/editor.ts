import { defineStore } from 'pinia'
import { EditorState } from '../types/editor'
import { useDefines } from '../use/defines'

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
              fontSize: 'text-2xl',
              fontWeight: 'font-bold',
            },
            two: {
              fontFamily: 'font-raleway',
              fontColor: 'text-black dark:text-gray-100',
              fontSize: 'text-xl',
              fontWeight: 'font-bold',
            },
            three: {
              fontFamily: 'font-raleway',
              fontColor: 'text-black dark:text-gray-100',
              fontSize: 'text-lg',
              fontWeight: 'font-semibold',
            },
          },
        },
      },
      configuration: {
        theme: useDefines().themes()[1],
        draggable: false,
        auto: 15,
        bars: false,
        entity: {
          updateTime: true,
        },
      },
      actives: {
        entity: {
          index: 0,
        },
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
    load(content: EditorState) {
      this.styles = content.styles
      this.configuration = content.configuration
      this.actives = content.actives
    },
    setTextSelection(payload: any) {
      this.actives.text.selection.content = payload.content
      this.actives.text.selection.end = payload.end
      this.actives.text.selection.start = payload.start
    },
    setAutoSave(auto: number | 'never') {
      this.configuration.auto = auto
    },
  },
})
