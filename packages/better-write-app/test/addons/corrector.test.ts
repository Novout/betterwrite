import { describe, expect, it } from 'vitest'
import { useEnv } from '../../src/use/env'
import { useFactory } from '../../src/use/factory'

describe('Factory - create()', () => {
  const factory = useFactory()
  const env = useEnv()

  it('should create a paragraph', () => {
    const entity = factory.entity().create('paragraph', 'test')

    expect(entity.raw).toEqual('test')
  })

  it('should create a heading-one', () => {
    const entity = factory.entity().create('paragraph', 'test')

    expect(entity.raw).toEqual('test')
  })

  it('should create a heading-two', () => {
    const entity = factory.entity().create('paragraph', 'test')

    expect(entity.raw).toEqual('test')
  })

  it('should create a heading-three', () => {
    const entity = factory.entity().create('paragraph', 'test')

    expect(entity.raw).toEqual('test')
  })

  it('should create a line-break', () => {
    const entity = factory.entity().create('line-break')

    expect(entity.raw).toEqual(env.lineBreak())
  })

  it('should create a page-break', () => {
    const entity = factory.entity().create('page-break')

    expect(entity.raw).toEqual(env.pageBreak())
  })
})
