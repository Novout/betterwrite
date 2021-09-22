import { ProjectState } from '@/types/project'
import { useText } from '@/use/text'
import { useFormat } from '../../use/format'

export default {
  namespaced: true,
  state: () =>
    ({
      name: 'foo',
      version: '0.1.0',
      totalPagesCreated: 0,
      main: {},
      summary: {},
      pages: [],
    } as ProjectState),
  mutations: {
    create(state: any, payload: Record<any, any>) {
      state.name = useText().kebab(payload.name)
      state.version = payload.version
      state.totalPagesCreated++

      const init = {
        id: 0,
        totalEntityCreated: 2,
        page: [
          {
            id: 0,
            type: 'heading-one',
            raw: 'Untitled',
            createdAt: useFormat().actually(),
            updatedAt: useFormat().actually(),
          },
          {
            id: 1,
            type: 'paragraph',
            raw: 'Untitled',
            createdAt: useFormat().actually(),
            updatedAt: useFormat().actually(),
          },
        ],
      }

      state.pages.push(init)
    },
  },
  actions: {},
  getters: {},
}
