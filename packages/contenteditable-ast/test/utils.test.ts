import { ASTUtils } from '../src'
import { describe, expect, it } from 'vitest'

describe('Contenteditable AST - Utils', () => {
  it('should return a simple occurrence in a string.', () => {
    expect(ASTUtils.occurrences('foofoobarbazbazbaz', 'foo', false)).toEqual(2)
  })

  it('should return a simple occurrence in a string overlapping.', () => {
    expect(ASTUtils.occurrences('foofoobarbazbazbaz', 'foo', true)).toEqual(2)
  })

  it('should ignore all html tags.', () => {
    expect(ASTUtils.normalize('test<p> t</p><span>est</span>', { type: 'all' })).toEqual('test test')
  })

  it('should ignore a bw list of insert html tags.', () => {
    expect(ASTUtils.normalize('test<u> test</u>', { type: 'inserts' })).toEqual('test test')
  })

  it('should remove a edge whitespace cases.', () => {
    expect(ASTUtils.normalize('test&nbsp;test&#160test', { type: 'all', whitespace: true })).toEqual('test test test')
  })
})