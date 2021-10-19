import { EditorState } from '@/types/editor'

export default {
  namespaced: true,
  state: () =>
    ({
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
    } as EditorState),
  mutations: {
    switchTheme(state: any, dark: boolean) {
      state.configuration.dark = dark
    },
    setTextSelection(state: EditorState, payload: any) {
      state.actives.text.selection.content = payload.content
      state.actives.text.selection.end = payload.end
      state.actives.text.selection.start = payload.start
    },
  },
  actions: {},
  getters: {},
}
