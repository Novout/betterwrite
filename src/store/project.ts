import { defineStore } from 'pinia'
import { ContextState } from '@/types/context'
import { ProjectState } from '@/types/project'
import { useFormat } from '@/use/format'
import { useText } from '../use/text'
import { Entity } from '../types/context'
import isElectron from 'is-electron'
import { useEnv } from '@/use/env'
import { useLoggerStore } from './logger'
import { useEditorStore } from './editor'

export const useProjectStore = defineStore('project', {
  state: (): ProjectState => {
    return {
      name: '__NOT_CREATED__',
      nameRaw: '__NOT_CREATED__',
      version: '0.1.0',
      creator: 'Untitled',
      subject: 'Untitled',
      type: 'creative',
      totalPagesCreated: 0,
      main: {},
      summary: {},
      pages: [] as Array<ContextState>,
      pageLoaded: 1,
      bw: {
        version: '0.1.0',
        platform: 'web',
      },
    }
  },
  actions: {
    load(payload: ProjectState) {
      const logger = useLoggerStore()
      const editor = useEditorStore()

      editor.$reset()
      logger.reset()
      this.$reset()

      this.name = payload.name
      this.nameRaw = payload.nameRaw
      this.version = payload.version
      this.creator = payload.creator
      this.type = payload.type || 'creative'
      this.subject = payload.subject
      this.totalPagesCreated = payload.totalPagesCreated
      this.main = payload.main
      this.summary = payload.summary
      this.pages = payload.pages
      this.bw.platform = payload.bw.platform
      this.bw.version = payload.bw.version
    },
    create(payload: Record<any, any>) {
      const logger = useLoggerStore()
      const editor = useEditorStore()

      editor.$reset()
      logger.reset()
      this.$reset()

      this.name = useText().kebab(payload.name)
      this.nameRaw = payload.name
      this.version = payload.version
      this.creator = payload.creator
      this.subject = payload.subject
      this.type = payload.type
      this.totalPagesCreated = 1
      this.main = {}
      this.summary = {}
      this.pages = []
      this.bw.platform = isElectron() ? 'desktop' : 'web'
      this.bw.version = useEnv().packageVersion() as string

      const init: ContextState = {
        id: this.totalPagesCreated,
        entities: [
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

      this.pageLoaded = init.id
      this.pages.push(init)
    },
    createBlank(payload: Record<any, any>) {
      const logger = useLoggerStore()
      const editor = useEditorStore()

      editor.$reset()
      logger.reset()

      this.$reset()

      this.name = useText().kebab(payload.name)
      this.nameRaw = payload.name
      this.version = payload.version
      this.creator = payload.creator
      this.subject = payload.subject
      this.type = payload.type
      this.totalPagesCreated = 1
      this.main = {}
      this.summary = {}
      this.pages = []
      this.bw.platform = isElectron() ? 'desktop' : 'web'
      this.bw.version = useEnv().packageVersion() as string

      const context: ContextState = {
        id: this.totalPagesCreated,
        entities: [
          {
            type: 'paragraph',
            raw: payload.subject,
            createdAt: useFormat().actually(),
            updatedAt: useFormat().actually(),
          },
        ],
      }

      this.pageLoaded = context.id
      this.pages.push(context)
    },
    newPage() {
      this.totalPagesCreated++

      const context: ContextState = {
        id: this.totalPagesCreated,
        entities: [
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

      this.pageLoaded = context.id
      this.pages.push(context)
    },
    deletePage(context: ContextState) {
      const content = this.pages.find(
        (content: ContextState) => content.id === context.id
      )

      if (!content) return

      const index = this.pages.indexOf(content)

      this.pages.splice(index, 1)
    },
    updatePage(page: ContextState) {
      const _page = this.pages.find(
        (content: ContextState) => content.id === page.id
      )

      if (!_page) return

      const index = this.pages.indexOf(_page)

      this.pages.splice(index, 1, page)
    },
    switchPage(obj: Record<any, any>) {
      const page = this.pages.filter(
        (page: ContextState) => obj.page.id === page.id
      )[0]

      if (!page) return

      const index = this.pages.indexOf(page)

      if (index === -1) return

      let sIndex
      obj.direction === 'up' ? (sIndex = index - 1) : (sIndex = index + 1)

      if (
        (sIndex < 0 && obj.direction === 'up') ||
        (sIndex >= this.pages.length && obj.direction === 'down')
      )
        return

      const target = this.pages[sIndex]

      const temp = this.pages[index]
      this.pages[index] = target
      this.pages[sIndex] = temp
    },
    resetDates() {
      this.pages.forEach((page: ContextState) => {
        page.entities.forEach((line: Entity) => {
          line.createdAt = useFormat().actually()
          line.updatedAt = useFormat().actually()
        })
      })
    },
    updateContext(context: ContextState) {
      const _context = this.pages.filter(
        (cont: ContextState) => cont.id === context.id
      )
      const index = this.pages.indexOf(_context[0])

      if (index === -1) return

      this.pages[index].entities = context.entities
    },
  },
})
