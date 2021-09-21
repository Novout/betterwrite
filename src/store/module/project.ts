import { ProjectState } from '@/types/project'

export default {
  namespaced: true,
  state: () =>
    ({
      name: 'foo',
      version: '0.1.0',
      pages: [
        [
          {
            id: 0,
            totalEntityCreated: 0,
            page: [],
          },
        ],
      ],
    } as ProjectState),
  mutations: {},
  actions: {},
  getters: {},
}
