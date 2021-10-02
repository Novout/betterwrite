import { ProjectState } from '@/types/project'
import { useText } from '@/use/text'
import { useFormat } from '@/use/format'
import { ContextState } from '@/types/context'

export default {
  namespaced: true,
  state: () =>
    ({
      name: '__NOT_CREATED__',
      nameRaw: '__NOT_CREATED__',
      version: '0.1.0',
      creator: 'Untitled',
      subject: 'Untitled',
      totalPagesCreated: 0,
      main: {},
      summary: {},
      pages: [] as Array<ContextState>,
      pageLoaded: 0,
    } as ProjectState),
  mutations: {
    load(state: ProjectState, payload: ProjectState) {
      state.name = payload.name
      state.nameRaw = payload.nameRaw
      state.version = payload.version
      state.creator = payload.creator
      state.subject = payload.subject
      state.totalPagesCreated = payload.totalPagesCreated
      state.main = payload.main
      state.summary = payload.summary
      state.pages = payload.pages
    },
    create(state: ProjectState, payload: Record<any, any>) {
      state.name = useText().kebab(payload.name)
      state.nameRaw = payload.name
      state.version = payload.version
      state.creator = payload.creator
      state.subject = payload.subject
      state.totalPagesCreated = 1
      state.main = {}
      state.summary = {}
      state.pages = []

      const init: ContextState = {
        id: state.totalPagesCreated,
        entity: [
          {
            type: 'heading-one',
            raw: payload.name,
            createdAt: useFormat().actually(),
            updatedAt: useFormat().actually(),
          },
          {
            type: 'paragraph',
            raw: payload.subject,
            createdAt: useFormat().actually(),
            updatedAt: useFormat().actually(),
          },
        ],
      }

      state.pageLoaded = init.id
      state.pages.push(init)
    },
    newPage(state: ProjectState) {
      state.totalPagesCreated++

      const init: ContextState = {
        id: state.totalPagesCreated,
        entity: [
          {
            type: 'heading-one',
            raw: 'Untitled',
            createdAt: useFormat().actually(),
            updatedAt: useFormat().actually(),
          },
          {
            type: 'paragraph',
            raw: 'Vivamus ac facilisis nisl. Nam a nulla convallis, euismod libero a, rutrum purus. Mauris &luctus& maximus diam, et ornare dolor luctus vel. Nam mi sem, venenatis sed elementum et, tempor id orci. Duis eget erat a eros scelerisque faucibus. Sed scelerisque pharetra justo id placerat. Mauris sit amet est eget felis iaculis dictum. In hac habitasse platea dictumst. Aenean nibh ipsum, faucibus nec pulvinar sed, euismod gravida metus. Vivamus quis nisl in nisl aliquet aliquam. Vestibulum quis tortor feugiat, faucibus ante quis, rutrum nulla. *Donec congue* ornare luctus.',
            createdAt: useFormat().actually(),
            updatedAt: useFormat().actually(),
          },
        ],
      }

      state.pageLoaded = init.id
      state.pages.push(init)
    },
    deletePage(state: ProjectState, context: ContextState) {
      const content = state.pages.find(
        (content: ContextState) => content.id === context.id
      )

      if (!content) return

      const index = state.pages.indexOf(content)

      state.pages.splice(index, 1)
    },
    updatePage(state: ProjectState, page: ContextState) {
      const _page = state.pages.find(
        (content: ContextState) => content.id === page.id
      )

      if (!_page) return

      const index = state.pages.indexOf(_page)

      state.pages.splice(index, 1, page)
    },
  },
  actions: {},
  getters: {},
}
