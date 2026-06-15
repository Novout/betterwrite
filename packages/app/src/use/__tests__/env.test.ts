import { describe, it, expect } from 'vitest'
import { useEnv } from '../env'

// import.meta.env is stubbed in setup.ts

describe('useEnv', () => {
  const env = useEnv()

  it('getSentryDsn() returns the Sentry DSN', () => {
    expect(env.getSentryDsn()).toBe('https://sentry.example.com')
  })

  it('getProdUrl() returns the base URL', () => {
    expect(env.getProdUrl()).toBe('https://betterwrite.io')
  })

  it('getCorrectLocalUrl() returns localhost in dev mode', () => {
    expect(env.getCorrectLocalUrl()).toBe('http://localhost:3000')
  })

  it('projectEmpty() returns the empty project sentinel', () => {
    expect(env.projectEmpty()).toBe('__EMPTY__')
  })

  it('isEmptyProject() detects the empty project name', () => {
    expect(env.isEmptyProject('__EMPTY__')).toBe(true)
    expect(env.isEmptyProject('My Project')).toBe(false)
  })

  it('storageLimitSaver() returns the limit saver key', () => {
    expect(env.storageLimitSaver()).toBe('__BW_LIMIT_SAVER__')
  })

  it('emptyLine() returns the empty line sentinel', () => {
    expect(env.emptyLine()).toBe('__EMPTY_LINE__')
  })

  it('lineBreak() returns the line break sentinel', () => {
    expect(env.lineBreak()).toBe('__LINE_BREAK__')
  })

  it('pageBreak() returns the page break sentinel', () => {
    expect(env.pageBreak()).toBe('__PAGE_BREAK__')
  })

  it('packageVersion() returns the version string', () => {
    expect(env.packageVersion()).toBe('1.0.0')
  })

  it('isDev() returns true in test environment', () => {
    expect(env.isDev()).toBe(true)
  })

  it('production() returns false in test environment', () => {
    expect(env.production()).toBe(false)
  })

  it('getAccountPlanLimit() returns limits per plan', () => {
    expect(env.getAccountPlanLimit('beginner')).toBe('10')
    expect(env.getAccountPlanLimit('intermediate')).toBe('50')
    expect(env.getAccountPlanLimit('advanced')).toBe('100')
    expect(env.getAccountPlanLimit('unlimited')).toBe('999')
  })
})
