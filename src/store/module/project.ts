import { ProjectState } from '@/types/project'
import { useText } from '@/use/text'
import { useFormat } from '../../use/format'
import { ContextState } from '../../types/context'

export default {
  namespaced: true,
  state: () =>
    ({
      name: '__NOT_CREATED__',
      version: '0.1.0',
      totalPagesCreated: 0,
      main: {},
      summary: {},
      pages: [],
      pageLoaded: 0,
    } as ProjectState),
  mutations: {
    create(state: any, payload: Record<any, any>) {
      state.name = useText().kebab(payload.name)
      state.version = payload.version
      state.totalPagesCreated++
      state.main = {}
      state.summary = {}
      state.pages = []

      const init: ContextState = {
        id: 0,
        totalEntityCreated: 2,
        onlyHeadingOne: true,
        page: [
          {
            id: 0,
            type: 'heading-one',
            raw: payload.name,
            createdAt: useFormat().actually(),
            updatedAt: useFormat().actually(),
          },
          {
            id: 1,
            type: 'paragraph',
            raw: 'v' + payload.version,
            createdAt: useFormat().actually(),
            updatedAt: useFormat().actually(),
          },
        ],
      }

      state.pageLoaded = init.id
      state.pages.push(init)
    },
    updatePage(state: any, context: ContextState) {
      const _context = state.pages.find(
        (_context: ContextState) => _context.id === context.id
      )

      const index = state.pages.indexOf(_context)

      state.pages[index] = context
    },
  },
  actions: {},
  getters: {},
}
