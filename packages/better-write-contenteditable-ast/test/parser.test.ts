import { parse } from '../src'
import { describe, expect, it } from 'vitest'

describe('Contenteditable AST - Parser', () => {
  it('should return a simple node.', () => {
    expect(parse('foo bar baz')).toStrictEqual([{
      bold: false,
      italic: false,
      link: false,
      text: 'foo bar baz',
      underline: false
    }])
  })
  it('should not set a unsupportable tag in node.', () => {
    expect(parse('foo <main>bar</main> baz')).toStrictEqual([{
      bold: false,
      italic: false,
      link: false,
      text: 'foo ',
      underline: false
    }, {
      bold: false,
      italic: false,
      link: false,
      text: 'bar',
      underline: false
    }, {
      bold: false,
      italic: false,
      link: false,
      text: ' baz',
      underline: false
    }])
  })
  it('should return a bold node.', () => {
    expect(parse('foo <b>bar</b> baz')).toStrictEqual([{
      bold: false,
      italic: false,
      link: false,
      text: 'foo ',
      underline: false
    }, {
      bold: true,
      italic: false,
      link: false,
      text: 'bar',
      underline: false
    }, {
      bold: false,
      italic: false,
      link: false,
      text: ' baz',
      underline: false
    }])
  })
  
  it('should return a italic node.', () => {
    expect(parse('foo <i>bar</i> baz')).toStrictEqual([{
      bold: false,
      italic: false,
      link: false,
      text: 'foo ',
      underline: false
    }, {
      bold: false,
      italic: true,
      link: false,
      text: 'bar',
      underline: false
    }, {
      bold: false,
      italic: false,
      link: false,
      text: ' baz',
      underline: false
    }])
  })

  it('should return a link node.', () => {
    expect(parse('foo <a>bar</a> baz')).toStrictEqual([{
      bold: false,
      italic: false,
      link: false,
      text: 'foo ',
      underline: false
    }, {
      bold: false,
      italic: false,
      link: true,
      text: 'bar',
      underline: false
    }, {
      bold: false,
      italic: false,
      link: false,
      text: ' baz',
      underline: false
    }])
  })

  it('should return a underline node.', () => {
    expect(parse('foo <u>bar</u> baz')).toStrictEqual([{
      bold: false,
      italic: false,
      link: false,
      text: 'foo ',
      underline: false
    }, {
      bold: false,
      italic: false,
      link: false,
      text: 'bar',
      underline: true
    }, {
      bold: false,
      italic: false,
      link: false,
      text: ' baz',
      underline: false
    }])
  })
})