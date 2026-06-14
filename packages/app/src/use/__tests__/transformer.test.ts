import { describe, it, expect, vi } from 'vitest'
import { DOCXAlignmentType } from 'better-write-types'

const mockT = (k: string) => {
  const map: Record<string, string> = {
    'generator.block.alignment.both': 'Justify',
    'generator.block.alignment.left': 'Left',
    'generator.block.alignment.right': 'Right',
    'generator.block.alignment.center': 'Center',
    'generator.flow.item.annotation': 'Annotation',
    'generator.flow.item.break-page': 'Break page',
    'generator.flow.item.bw': 'BW',
    'generator.flow.item.content': 'Content',
    'editor.characters.item.nameCaseStrict': 'Strict',
    'editor.characters.item.nameCaseDefault': 'Default',
    'editor.characters.item.nameCaseAll': 'All',
    'editor.presence.type.owner': 'Owner',
    'editor.presence.type.visit': 'Visit',
    'editor.presence.type.collaborator': 'Collaborator',
    'editor.schemas.types.characters.target': 'Characters',
    'editor.schemas.types.default.target': 'Default',
    'editor.schemas.create.templates.simple.title': 'Simple',
    'editor.schemas.create.templates.enthusiast.title': 'Enthusiast',
  }
  return map[k] ?? k
}

const mockLocaleMessage = () => ({
  generator: {
    block: { alignment: { justify: 'Justify', left: 'Left', center: 'Center', right: 'Right' } },
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
})

vi.mock('vue-i18n', () => ({
  useI18n: () => ({
    t: mockT,
    availableLocales: ['en-US'],
    getLocaleMessage: () => mockLocaleMessage(),
  }),
}))

import { useTransformer } from '../generator/transformer'

describe('useTransformer', () => {
  const transformer = useTransformer()

  describe('docx().entityAlignment()', () => {
    it('getter: returns translated label for "both"', () => {
      expect(transformer.docx().entityAlignment('both', 'getter')).toBe('Justify')
    })

    it('getter: returns translated label for "left"', () => {
      expect(transformer.docx().entityAlignment('left', 'getter')).toBe('Left')
    })

    it('setter: translates label back to DOCX alignment type', () => {
      expect(transformer.docx().entityAlignment('Justify', 'setter')).toBe(DOCXAlignmentType.JUSTIFIED)
    })

    it('setter: falls back to JUSTIFIED for unknown value', () => {
      expect(transformer.docx().entityAlignment('unknown', 'setter')).toBe(DOCXAlignmentType.JUSTIFIED)
    })
  })

  describe('docx().flowItem()', () => {
    it('getter: maps "content" to locale string', () => {
      expect(transformer.docx().flowItem('content', 'getter')).toBe('Content')
    })

    it('setter: maps locale string back to "content"', () => {
      expect(transformer.docx().flowItem('Content', 'setter')).toBe('content')
    })

    it('setter: falls back to "annotation" for unknown value', () => {
      expect(transformer.docx().flowItem('unknown', 'setter')).toBe('annotation')
    })
  })

  describe('characters().nameCase()', () => {
    it('getter: maps "strict" to locale string', () => {
      expect(transformer.characters().nameCase('strict', 'getter')).toBe('Strict')
    })

    it('setter: maps locale string back to "default"', () => {
      expect(transformer.characters().nameCase('Default', 'setter')).toBe('default')
    })

    it('setter: falls back to "default" for unknown value', () => {
      expect(transformer.characters().nameCase('unknown', 'setter')).toBe('default')
    })
  })

  describe('presence().type()', () => {
    it('getter: maps "owner" to locale string', () => {
      expect(transformer.presence().type('owner', 'getter')).toBe('Owner')
    })

    it('setter: maps locale string to "visit"', () => {
      expect(transformer.presence().type('Visit', 'setter')).toBe('visit')
    })

    it('setter: falls back to "visit" for unknown value', () => {
      expect(transformer.presence().type('unknown', 'setter')).toBe('visit')
    })
  })

  describe('schemas().type()', () => {
    it('getter: maps "characters" to locale string', () => {
      expect(transformer.schemas().type('characters', 'getter')).toBe('Characters')
    })

    it('setter: maps locale string to "default"', () => {
      expect(transformer.schemas().type('Default', 'setter')).toBe('default')
    })
  })

  describe('schemas().template()', () => {
    it('getter: maps "simple" to locale string', () => {
      expect(transformer.schemas().template('simple', 'getter')).toBe('Simple')
    })

    it('setter: maps locale string to "enthusiast"', () => {
      expect(transformer.schemas().template('Enthusiast', 'setter')).toBe('enthusiast')
    })

    it('setter: falls back to "simple" for unknown value', () => {
      expect(transformer.schemas().template('unknown', 'setter')).toBe('simple')
    })
  })
})
