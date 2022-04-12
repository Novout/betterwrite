import { defineStore } from 'pinia'
import { EditorState } from 'better-write-types'
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
            indent: 'wb-indent',
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
        bars: true,
        entity: {
          updateTime: false,
        },
        commands: {
          prefix: '/',
          paragraph: {
            prefix: 'p',
            active: true,
          },
          headingTwo: {
            prefix: 'h2',
            active: true,
          },
          headingThree: {
            prefix: 'h3',
            active: true,
          },
          pageBreak: {
            prefix: 'bp',
            active: false,
          },
          lineBreak: {
            prefix: 'lb',
            active: false,
          },
          image: {
            prefix: 'im',
            active: true,
          },
          checkbox: {
            prefix: 'ch',
            active: true,
          },
          list: {
            prefix: 'li',
            active: true,
          },
          dialogue: {
            prefix: 'd',
            value: '— ',
            active: false,
          },
          drau: {
            prefix: 't',
            active: true,
          },
        },
        dropbox: {
          hourInSaveFileName: false,
        },
      },
      actives: {
        entity: {
          index: 0,
        },
        global: {
          mouse: {
            x: 0,
            y: 0,
            vertical: 'top',
            horizontal: 'right',
            validLastSelection: false,
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
    setAutoSave(auto: number | 'never') {
      this.configuration.auto = auto
    },
  },
})
