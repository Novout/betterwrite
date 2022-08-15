import { getRows } from '../src'
import { describe, expect, it } from 'vitest'

describe('Contenteditable AST - Rows', () => {
  it('should return a simple row.', () => {
    expect(getRows('foo bar baz')).toStrictEqual(['foo bar baz'])
  })

  it('should return a multiple row.', () => {
    expect(getRows('foo <div>bar</div> baz')).toStrictEqual(['foo ', 'bar', ' baz'])
  })
})