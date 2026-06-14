import { describe, it, expect, vi } from 'vitest'

// usePopulate depends on useDefines which uses vue-i18n — mock it
vi.mock('vue-i18n', () => ({
  createI18n: () => ({ global: { t: (k: string) => k } }),
  useI18n: () => ({
    t: (k: string) => k,
    availableLocales: ['en-US'],
    getLocaleMessage: () => ({
      generator: {
        block: { alignment: { both: 'Justify', left: 'Left', right: 'Right', center: 'Center' } },
        flow: { item: { annotation: 'Annotation', 'break-page': 'Break page', bw: 'BW', content: 'Content' } },
      },
      editor: {
        pdf: { configuration: { alignment: { justify: 'Justify', left: 'Left', center: 'Center', right: 'Right' } } },
        characters: { item: { nameCaseStrict: 'Strict', nameCaseDefault: 'Default', nameCaseAll: 'All' } },
        presence: { type: { owner: 'Owner', visit: 'Visit', collaborator: 'Collaborator' } },
        schemas: {
          types: { characters: { target: 'Characters' }, default: { target: 'Default' } },
          create: { templates: { simple: { title: 'Simple' }, enthusiast: { title: 'Enthusiast' } } },
        },
      },
    }),
  }),
}))

import { usePopulate } from '../populate'

describe('usePopulate', () => {
  const populate = usePopulate()

  describe('cmd()', () => {
    it('returns the entity purge command', () => {
      expect(populate.cmd()).toContain('entity purge')
    })
  })

  describe('debug()', () => {
    it('paragraph() returns a non-empty string', () => {
      expect(populate.debug().names().paragraph()).toBeTruthy()
    })

    it('text() returns a lorem ipsum string', () => {
      expect(populate.debug().names().text()).toContain('Lorem ipsum')
    })
  })

  describe('docx()', () => {
    it('flow() returns default flow items', () => {
      const flow = populate.docx().flow()
      expect(flow.length).toBeGreaterThan(0)
      expect(flow.some((f) => f.type === 'content')).toBe(true)
      expect(flow.some((f) => f.type === 'bw')).toBe(true)
    })

    it('styles() has paragraph with expected defaults', () => {
      const styles = populate.docx().styles()
      expect(styles.paragraph.bold).toBe(false)
      expect(styles.paragraph.size).toBe(14)
      expect(typeof styles.paragraph.color).toBe('string')
    })

    it('styles() has headingOne with bold true', () => {
      expect(populate.docx().styles().headingOne.bold).toBe(true)
    })
  })

  describe('pdf()', () => {
    it('styles() returns paragraph and headings', () => {
      const styles = populate.pdf().styles()
      expect(styles).toHaveProperty('paragraph')
      expect(styles).toHaveProperty('headingOne')
      expect(styles).toHaveProperty('headingTwo')
      expect(styles).toHaveProperty('headingThree')
    })

    it('paragraph fontSize is a number', () => {
      const { paragraph } = populate.pdf().styles()
      expect(typeof paragraph.fontSize).toBe('number')
    })
  })
})
