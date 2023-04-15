import { HEXToCMYK } from 'src'
import { describe, expect, it } from 'vitest'

describe('Color Converter - PDFMake Provider', () => {
  it('should converter hex to cmyk', () => {
    expect(HEXToCMYK('#FF00FF', 'pdfmake')).toEqual([0, 100, 0, 0])
  })

  it('should converter hex to cmyk with no #', () => {
    expect(HEXToCMYK('FF00FF', 'pdfmake')).toEqual([0, 100, 0, 0])
  })

  it('should not converter hex to cmyk', () => {
    expect(HEXToCMYK('#333', 'pdfmake')).toEqual("#333")
  })

  it('should converter correct black #', () => {
    expect(HEXToCMYK('#000000', 'pdfmake')).toEqual([0, 0, 0, 100])
  })
})