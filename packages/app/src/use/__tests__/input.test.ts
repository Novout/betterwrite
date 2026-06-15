import { describe, it, expect, vi } from 'vitest'
import { useInput } from '../input'

describe('useInput', () => {
  const { pasteText, expandTextArea, getScrollHeight } = useInput()

  describe('pasteText()', () => {
    const makeEvent = (text: string) => ({
      clipboardData: { getData: () => text },
    })

    it('splits by newline and trims', () => {
      expect(pasteText(makeEvent('hello\nworld'))).toEqual(['hello', 'world'])
    })

    it('filters out empty lines', () => {
      expect(pasteText(makeEvent('a\n\nb'))).toEqual(['a', 'b'])
    })

    it('normalises multiple spaces', () => {
      expect(pasteText(makeEvent('  foo   bar  '))).toEqual(['foo bar'])
    })

    it('returns empty array for blank-only text', () => {
      expect(pasteText(makeEvent('\n\n\n'))).toEqual([])
    })
  })

  describe('expandTextArea()', () => {
    it('sets element height to scrollHeight', () => {
      const el = document.createElement('textarea')
      Object.defineProperty(el, 'scrollHeight', { value: 120, configurable: true })
      expandTextArea(el)
      expect(el.style.height).toBe('120px')
    })

    it('does nothing when element is falsy', () => {
      expect(() => expandTextArea(null as any)).not.toThrow()
    })
  })

  describe('getScrollHeight()', () => {
    it('stores _baseScrollHeight and resets value', () => {
      const el = { value: 'hello', scrollHeight: 80, _baseScrollHeight: 0 }
      getScrollHeight(el)
      expect(el._baseScrollHeight).toBe(80)
      expect(el.value).toBe('hello')
    })
  })
})
