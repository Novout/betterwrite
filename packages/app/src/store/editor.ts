import { defineStore } from 'pinia'
import { EditorState } from 'better-write-types'
import { Themes } from 'better-write-plugin-theme'

export const useEditorStore = defineStore('editor', {
  state: (): EditorState => {
    return {
      styles: {
        googleFontsInjection: false,
        heading: {
          fontFamily: 'Poppins',
          fontWeight: 700,
        },
        text: {
          fontFamily: 'Raleway',
          fontWeight: 400,
          fontSize: 16,
        },
        header: {
          fontFamily: 'Raleway',
          fontWeight: 400,
          fontSize: 16,
        },
        graph: {
          fontFamily: 'Raleway',
          fontWeight: 400,
          fontSize: 18,
        },
        base: {
          backgroundCoverAttribute: true,
          backgroundData: '',
          backgroundBlur: false,
          backgroundGrayscale: false,
          backgroundSaturate: false,
          backgroundSepia: false,
        },
      },
      configuration: {
        theme: Themes()[1][0],
        draggable: false,
        bars: true,
        transition: true,
        autosave: true,
        cloudAutosave: false,
        compressFiles: {
          value: false,
          quality: 0.8,
        },
        clientStorage: {
          schema: 'indexeddb',
          compress: true,
        },
        purgeEntities: false,
        trackEntities: true,
        blocked: true,
        bottomBar: true,
        topBar: true,
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
