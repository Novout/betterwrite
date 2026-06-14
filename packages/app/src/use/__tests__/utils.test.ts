import { describe, it, expect } from 'vitest'
import { useUtils } from '../utils'

describe('useUtils', () => {
  const utils = useUtils()

  describe('array()', () => {
    const { insert, mapToObject } = utils.array()

    it('inserts items at the given index', () => {
      expect(insert([1, 2, 4], 2, 3)).toEqual([1, 2, 3, 4])
    })

    it('inserts at index 0', () => {
      expect(insert([2, 3], 0, 1)).toEqual([1, 2, 3])
    })

    it('inserts at end', () => {
      expect(insert([1, 2], 2, 3)).toEqual([1, 2, 3])
    })

    it('converts a Map to an object', () => {
      const map = new Map([['a', 1], ['b', 2]])
      expect(mapToObject(map)).toEqual({ a: 1, b: 2 })
    })
  })

  describe('join()', () => {
    it('joins path parts with /', () => {
      expect(utils.join(['a', 'b', 'c'])).toBe('a/b/c')
    })

    it('collapses duplicate separators', () => {
      expect(utils.join(['a/', '/b'])).toBe('a/b')
    })

    it('accepts custom separator', () => {
      expect(utils.join(['a', 'b'], '-')).toBe('a-b')
    })
  })

  describe('id()', () => {
    const { uuidv4, nano } = utils.id()

    it('uuidv4 returns a valid UUID format', () => {
      expect(uuidv4()).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
      )
    })

    it('uuidv4 generates unique values', () => {
      expect(uuidv4()).not.toBe(uuidv4())
    })

    it('nano generates a string of default length', () => {
      expect(nano().length).toBeGreaterThan(0)
    })

    it('nano uses prefix when provided', () => {
      expect(nano({ prefix: 'entity' })).toMatch(/^entity-/)
    })

    it('nano uses suffix when provided', () => {
      expect(nano({ suffix: 'end' })).toMatch(/-end$/)
    })

    it('nano respects custom length', () => {
      const id = nano({ length: 10 })
      // length = 10 chars + possible prefix/suffix
      expect(id.length).toBeGreaterThanOrEqual(10)
    })
  })

  describe('text()', () => {
    const { kebab, defaultWhitespace, randomLetter, randomColor } = utils.text()

    it('converts text to kebab-case', () => {
      expect(kebab('Hello World')).toBe('hello-world')
    })

    it('converts multiple spaces to kebab dashes', () => {
      expect(kebab('foo bar baz')).toBe('foo-bar-baz')
    })

    it('replaces &nbsp; with space', () => {
      expect(defaultWhitespace('hello&nbsp;world')).toBe('hello world')
    })

    it('replaces &#160 with space', () => {
      expect(defaultWhitespace('a&#160b')).toBe('a b')
    })

    it('randomLetter returns an uppercase letter', () => {
      const letter = randomLetter()
      expect(letter).toMatch(/^[A-Z]$/)
    })

    it('randomColor returns a hex color string', () => {
      expect(randomColor()).toMatch(/^#[0-9a-f]{1,6}$/i)
    })
  })

  describe('regex()', () => {
    const r = utils.regex()

    it('links() matches http URLs', () => {
      expect('https://betterwrite.io'.match(r.links())).toBeTruthy()
    })

    it('links() matches www URLs', () => {
      expect('www.example.com'.match(r.links())).toBeTruthy()
    })

    it('htmlTags() matches html tags', () => {
      expect('<b>text</b>'.match(r.htmlTags())).toBeTruthy()
    })

    it('divTag() matches a div', () => {
      expect('<div>content</div>'.match(r.divTag())).toBeTruthy()
    })
  })

  describe('delay()', () => {
    it('resolves after the given time', async () => {
      const start = Date.now()
      await utils.delay(50)
      expect(Date.now() - start).toBeGreaterThanOrEqual(40)
    })
  })
})
