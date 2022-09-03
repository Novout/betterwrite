import { ASTUtils } from '../src'
import { describe, expect, it } from 'vitest'

describe.concurrent('Contenteditable AST - Utils', () => {
  it('should return a simple occurrence in a string.', () => {
    expect(ASTUtils.occurrences('foofoobarbazbazbaz', 'foo', false)).toEqual(2)
  })

  it('should return a simple occurrence in a string overlapping.', () => {
    expect(ASTUtils.occurrences('foofoobarbazbazbaz', 'foo', true)).toEqual(2)
  })
})