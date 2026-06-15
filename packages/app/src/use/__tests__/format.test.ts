import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useFormat } from '../format'

describe('useFormat', () => {
  const { simple, actually, lastTime } = useFormat()

  describe('simple()', () => {
    const date = new Date(2024, 5, 15, 9, 5, 3) // 2024-06-15 09:05:03

    it('formats as default (YYYY-M-D H:M:S)', () => {
      const result = simple(date, 'default')
      expect(result).toBe(`2024-5-6 9:5:3`)
    })

    it('formats as resume (HH:MM)', () => {
      expect(simple(date, 'resume')).toBe('09:05')
    })

    it('formats as iso', () => {
      expect(simple(date, 'iso')).toBe(date.toISOString())
    })

    it('defaults to "default" format when type is omitted', () => {
      const result = simple(date)
      expect(result).toMatch(/^\d{4}-\d+-\d+ \d+:\d+:\d+$/)
    })
  })

  describe('actually()', () => {
    it('returns a string for the current date', () => {
      const result = actually()
      expect(typeof result).toBe('string')
      expect(result.length).toBeGreaterThan(0)
    })

    it('returns ISO string when type is iso', () => {
      const before = new Date().toISOString().slice(0, 10)
      expect(actually('iso')).toContain(before)
    })

    it('returns HH:MM format for resume', () => {
      expect(actually('resume')).toMatch(/^\d{2}:\d{2}$/)
    })
  })

  describe('lastTime()', () => {
    it('returns the passed updatedAt value', () => {
      expect(lastTime('2024-01-01T00:00:00.000Z')).toBe('2024-01-01T00:00:00.000Z')
    })

    it('falls back to actually() when updatedAt is undefined', () => {
      const result = lastTime(undefined as any)
      expect(typeof result).toBe('string')
    })
  })
})
