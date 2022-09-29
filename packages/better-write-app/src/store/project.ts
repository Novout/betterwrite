import { defineStore } from 'pinia'
import {
  ContextState,
  ProjectState,
  ID,
  Entity,
  ProjectStateOptions,
} from 'better-write-types'
import { useFormat } from '@/use/format'
import { useGlobalStore } from './global'
import { useProject } from '@/use/project'
import { useFactory } from '../use/factory'
import { useUtils } from '@/use/utils'
import { useEnv } from '@/use/env'
import { useDefines } from '@/use/defines'
import { useContextStore } from './context'

export const useProjectStore = defineStore('project', {
  state: (): ProjectState => {
    return {
      name: '__NOT_CREATED__',
      nameRaw: '__NOT_CREATED__',
      version: '0.1.0',
      creator: 'Untitled',
      producer: 'Untitled',
      keywords: 'Untitled',
      subject: 'Untitled',
      base: 'chapter',
      type: 'creative',
      totalPagesCreated: 0,
      main: {},
      summary: {},
      pages: [],
      pageLoaded: useUtils().id().uuidv4(),
      scrollLoaded: 0,
      offsetLoaded: 0,
      pdf: {
        encryption: {
          userPassword: '',
          ownerPassword: '',
        },
        permissions: {
          printing: 'highResolution',
          modifying: false,
          copying: false,
          annotating: true,
          fillingForms: true,
          contentAccessibility: true,
          documentAssembly: true,
        },
      },
      bw: {
        version: '0.1.0',
        platform: 'web',
      },
      creative: {
        drafts: [],
      },
      templates: {
        generators: [],
        substitutions: {
          text: [],
          italic: [],
          bold: [],
        },
      },
      shortcuts: {
        inserts: [
          {
            key: 'D',
            value: '— ',
          },
        ],
      },
      annotations: {
        folders: [],
      },
      characters: {
        list: [],
      },
    }
  },
  actions: {
    load(payload: ProjectState) {
      const global = useGlobalStore()
      global.reset()

      this.name = payload.name
      this.nameRaw = payload.nameRaw
      this.version = payload.version
      this.creator = payload.creator
      this.type = payload.type || 'creative'
      this.subject = payload.subject
      this.pageLoaded = payload.pageLoaded
      this.scrollLoaded = payload.scrollLoaded
      this.offsetLoaded = payload.offsetLoaded
      this.totalPagesCreated = payload.totalPagesCreated
      this.main = payload.main
      this.summary = payload.summary
      this.pages = payload.pages
      this.templates = payload.templates
      this.bw.platform = payload.bw.platform
      this.bw.version = payload.bw.version
      this.shortcuts = payload.shortcuts
      this.annotations = payload.annotations
      this.creative = payload.creative
      this.characters = payload.characters
    },
    new(options: ProjectStateOptions, forceTitle?: string) {
      const global = useGlobalStore()
      global.reset()

      const title = useUtils()
        .text()
        .kebab(options.name || '')

      this.$state = {
        image: options.image || undefined,
        name: title,
        nameRaw: options.name || 'Project',
        version: options.version || '0.1.0',
        creator: options.creator || 'Better Write',
        producer: options.creator || 'betterwrite.io',
        keywords: options.keywords || 'docx,project',
        subject: options.subject || 'betterwrite',
        type: options.type,
        base: options.base || 'chapter',
        totalPagesCreated: options.totalPagesCreated || 1,
        main: options.main || {},
        summary: options.summary || {},
        pageLoaded: options.pageLoaded || useUtils().id().uuidv4(),
        scrollLoaded: options.scrollLoaded || 0,
        offsetLoaded: options.offsetLoaded || 0,
        pages: options.pages || [
          {
            id: useUtils().id().uuidv4(),
            title: `${forceTitle || title}  | ${useFormat().actually()}`,
            entities: [
              useFactory()
                .entity()
                .create('heading-one', forceTitle || title),
            ],
            createdAt: useFormat().actually(),
            updatedAt: useFormat().actually(),
          },
        ],
        bw: options.bw || {
          platform: 'web',
          version: useEnv().packageVersion() as string,
        },
        pdf: options.pdf || {
          encryption: {
            userPassword: '',
            ownerPassword: '',
          },
          permissions: {
            printing: 'highResolution',
            modifying: false,
            copying: false,
            annotating: true,
            fillingForms: true,
            contentAccessibility: true,
            documentAssembly: true,
          },
        },
        creative: options.creative || {
          drafts: [],
        },
        templates: options.templates || {
          generators: [useFactory().entity().generator()],
          substitutions: {
            text: useDefines().generator().substitutions().text(),
            italic: useDefines().generator().substitutions().italic(),
            bold: useDefines().generator().substitutions().bold(),
          },
        },
        shortcuts: options.shortcuts || {
          inserts: [
            {
              key: 'D',
              value: '— ',
            },
          ],
        },
        annotations: options.annotations || {
          folders: [],
        },
        characters: options.characters || {
          list: [],
        },
      }

      if (this.pages[0].entities.length === 0) {
        switch (options.type) {
          case 'creative':
            this.pages[0].entities.push(
              useFactory().entity().create('heading-one', options.name)
            )
            this.pages[0].entities.push(
              useFactory().entity().create('paragraph', '')
            )
            break
          case 'blank':
            this.pages[0].entities.push(
              useFactory().entity().create('paragraph', '')
            )
            break
        }
      }
    },
    newPage(title: string) {
      this.totalPagesCreated++

      const context: ContextState = {
        id: useUtils().id().uuidv4(),
        title: `${title} | ${useFormat().actually()}`,
        entities: [
          useFactory().entity().create('heading-one', title),
          useFactory().entity().create('paragraph', ''),
        ],
        createdAt: useFormat().actually(),
        updatedAt: useFormat().actually(),
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

      this.creative.drafts = this.creative.drafts.filter(
        (draft) => draft.id !== content.id
      )
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
      this.pages[index].updatedAt = useFormat().actually()
    },
  },
  getters: {
    getCreativeDrafts: (state) => {
      return () => state.creative.drafts
    },
    getActuallyDrafts: (state) => {
      const CONTEXT = useContextStore()

      return () =>
        state.creative.drafts.filter((draft) => draft.id === CONTEXT.id)
    },
    getAllCharacters: (state) => {
      return () =>
        state.pages.reduce(
          (sum, val) => sum + useProject().utils().getChapterAllCharacters(val),
          0
        )
    },
    getAllLetters: (state) => {
      return () =>
        state.pages.reduce(
          (sum, val) => sum + useProject().utils().getChapterLetters(val),
          0
        )
    },
    getAllWords: (state) => {
      return () =>
        state.pages.reduce(
          (sum, val) => sum + useProject().utils().getChapterWords(val),
          0
        )
    },
    getAllParagraphs: (state) => {
      return () =>
        state.pages.reduce(
          (sum, val) => sum + useProject().utils().getChapterParagraphs(val),
          0
        )
    },
    getAllHeadings: (state) => {
      return () =>
        state.pages.reduce(
          (sum, val) => sum + useProject().utils().getChapterHeadings(val),
          0
        )
    },
    getAllFixeds: (state) => {
      return () =>
        state.pages.reduce(
          (sum, val) => sum + useProject().utils().getChapterFixed(val),
          0
        )
    },
  },
})
