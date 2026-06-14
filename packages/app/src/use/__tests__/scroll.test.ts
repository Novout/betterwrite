import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useScroll } from '../scroll'

describe('useScroll', () => {
  const scroll = useScroll()

  beforeEach(() => {
    document.body.innerHTML = ''
  })

  describe('to()', () => {
    it('calls scrollIntoView on the matched element', () => {
      const div = document.createElement('div')
      div.id = 'target'
      const spy = vi.fn()
      div.scrollIntoView = spy
      document.body.appendChild(div)

      scroll.to('#target')
      expect(spy).toHaveBeenCalledOnce()
    })

    it('calls scrollIntoView with center block when display is center', () => {
      const div = document.createElement('div')
      div.id = 'center-target'
      const spy = vi.fn()
      div.scrollIntoView = spy
      document.body.appendChild(div)

      scroll.to('#center-target', 'center')
      expect(spy).toHaveBeenCalledWith({ behavior: 'auto', block: 'center', inline: 'center' })
    })

    it('does not throw when element does not exist', () => {
      expect(() => scroll.to('#nonexistent')).not.toThrow()
    })
  })

  describe('entity()', () => {
    it('scrolls entity element into view', () => {
      const div = document.createElement('div')
      div.id = 'entity-42'
      const spy = vi.fn()
      div.scrollIntoView = spy
      document.body.appendChild(div)

      scroll.entity(42)
      expect(spy).toHaveBeenCalledOnce()
    })

    it('scrolls to center when display is center', () => {
      const div = document.createElement('div')
      div.id = 'entity-7'
      const spy = vi.fn()
      div.scrollIntoView = spy
      document.body.appendChild(div)

      scroll.entity(7, 'center')
      expect(spy).toHaveBeenCalledWith({ behavior: 'auto', block: 'center', inline: 'center' })
    })

    it('scrolls to top when display is top', () => {
      const div = document.createElement('div')
      div.id = 'entity-3'
      const spy = vi.fn()
      div.scrollIntoView = spy
      document.body.appendChild(div)

      scroll.entity(3, 'top')
      expect(spy).toHaveBeenCalledWith({ behavior: 'auto', block: 'start', inline: 'start' })
    })

    it('scrolls to bottom when display is bottom', () => {
      const div = document.createElement('div')
      div.id = 'entity-5'
      const spy = vi.fn()
      div.scrollIntoView = spy
      document.body.appendChild(div)

      scroll.entity(5, 'bottom')
      expect(spy).toHaveBeenCalledWith({ behavior: 'auto', block: 'end', inline: 'end' })
    })

    it('does not throw for missing entity', () => {
      expect(() => scroll.entity(9999)).not.toThrow()
    })
  })

  describe('editor()', () => {
    it('get() returns 0 when #edit does not exist', () => {
      expect(scroll.editor().get()).toBe(0)
    })

    it('set() does nothing when #edit does not exist', () => {
      expect(() => scroll.editor().set(100)).not.toThrow()
    })

    it('get() and set() work when #edit exists', () => {
      const div = document.createElement('div')
      div.id = 'edit'
      Object.defineProperty(div, 'scrollTop', {
        writable: true,
        value: 0,
      })
      document.body.appendChild(div)

      scroll.editor().set(200)
      expect(div.scrollTop).toBe(200)
    })
  })

  describe('force()', () => {
    it('does not throw when element does not exist', () => {
      vi.useFakeTimers()
      expect(() => scroll.force('#nonexistent')).not.toThrow()
      vi.runAllTimers()
      vi.useRealTimers()
    })
  })
})
