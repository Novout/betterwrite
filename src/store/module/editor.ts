import { EditorState } from '@/types/editor'

export default {
  namespaced: true,
  state: () =>
    ({
      styles: {
        input: {
          fontFamily: 'font-raleway',
          fontSize: 'text-xs',
          fontColor: 'text-black dark:text-gray-100',
        },
        show: {
          fontFamily: 'font-raleway',
          fontColor: 'text-black dark:text-gray-100',
          paragraph: {
            fontFamily: 'font-raleway',
            fontColor: 'text-black dark:text-gray-100',
            fontSize: 'text-xs',
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
    } as EditorState),
  mutations: {
    switchTheme(state: any, dark: boolean) {
      state.configuration.dark = dark
    },
  },
  actions: {},
  getters: {},
}
