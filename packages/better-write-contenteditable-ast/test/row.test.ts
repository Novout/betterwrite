import { getRows } from '../src'
import { describe, expect, it } from 'vitest'

describe.concurrent('Contenteditable AST - Rows', () => {
  it('should return a simple row.', () => {
    expect(getRows('foo bar baz')).toStrictEqual(['foo bar baz'])
  })

  it('should return a multiple row.', () => {
    expect(getRows('foo <div>bar</div> baz')).toStrictEqual(['foo ', 'bar', ' baz'])
  })
})