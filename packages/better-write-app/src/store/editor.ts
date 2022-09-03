import { defineStore } from 'pinia'
import { EditorState } from 'better-write-types'
import { Themes } from 'better-write-plugin-theme'

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
        theme: Themes()[1][0],
        draggable: false,
        bars: true,
        transition: true,
        autosave: true,
        blocked: true,
        bottomBar: true,
        entity: {
          insertEntityInParagraphBreakLine: true,
        },
        commands: {
          paragraph: {
            active: true,
          },
          headingTwo: {
            active: true,
          },
          headingThree: {
            active: true,
          },
          pageBreak: {
            active: false,
          },
          lineBreak: {
            active: false,
          },
          image: {
            active: true,
          },
          checkbox: {
            active: true,
          },
          list: {
            active: true,
          },
          dialogue: {
            active: false,
          },
          drau: {
            active: true,
          },
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
  },
})
