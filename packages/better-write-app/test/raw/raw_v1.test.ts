import { useFormat } from '../../src/use/format'
import { bold, italic, link, useRaw } from '../../src/use/raw'
import { Entity } from 'better-write-types'
import { describe, expect, it } from 'vitest'
import { useFactory } from '../../src/use/factory'

describe('Editor Converter - v1', () => {
  const factory = useFactory()

  it('should not convert unnecessary paragraph', () => {
    const entity = factory.entity().create('paragraph')

    const raw = useRaw().v1().convert(entity)

    expect('').toEqual(raw)
  })

  it('should not convert unnecessary heading one', () => {
    const entity = factory.entity().create('heading-one')

    const raw = useRaw().v1().convert(entity)

    expect('').toEqual(raw)
  })

  it('should not convert unnecessary heading two', () => {
    const entity = factory.entity().create('heading-two')

    const raw = useRaw().v1().convert(entity)

    expect('').toEqual(raw)
  })

  it('should not convert unnecessary heading three', () => {
    const entity = factory.entity().create('heading-three')

    const raw = useRaw().v1().convert(entity)

    expect('').toEqual(raw)
  })

  // link
  it('should not convert link in heading one', () => {
    const entity = factory
      .entity()
      .create('heading-one', 'Untitled http://test Untitled')

    const raw = useRaw().v1().convert(entity)

    expect(entity.raw).toEqual(raw)
  })

  it('should not convert link in heading one', () => {
    const entity = factory
      .entity()
      .create('heading-two', 'Untitled http://test Untitled')

    const raw = useRaw().v1().convert(entity)

    expect(entity.raw).toEqual(raw)
  })

  it('should not convert link in heading one', () => {
    const entity = factory
      .entity()
      .create('heading-three', 'Untitled http://test Untitled')

    const raw = useRaw().v1().convert(entity)

    expect(entity.raw).toEqual(raw)
  })

  it('should correct link convert', () => {
    const entity = factory
      .entity()
      .create('paragraph', 'Untitled http://test Untitled')

    const raw = useRaw().v1().convert(entity)

    expect(
      `Untitled ${link().open(
        'http://test'
      )}http://test${link().close()} Untitled`
    ).toEqual(raw)
  })

  // italic
  it('should not convert italic in heading one', () => {
    const entity = factory
      .entity()
      .create('heading-one', 'Untitled *test* Untitled')

    const raw = useRaw().v1().convert(entity)

    expect(entity.raw).toEqual(raw)
  })

  it('should not convert italic in heading two', () => {
    const entity = factory
      .entity()
      .create('heading-two', 'Untitled *test* Untitled')

    const raw = useRaw().v1().convert(entity)

    expect(entity.raw).toEqual(raw)
  })

  it('should not convert italic in heading three', () => {
    const entity = factory
      .entity()
      .create('heading-three', 'Untitled *test* Untitled')

    const raw = useRaw().v1().convert(entity)

    expect(entity.raw).toEqual(raw)
  })

  it('should correct italic convert', () => {
    const entity = factory
      .entity()
      .create('paragraph', 'Untitled *test* Untitled')

    const raw = useRaw().v1().convert(entity)

    expect(
      `Untitled ${italic().open()}test${italic().close()} Untitled`
    ).toEqual(raw)
  })

  it('should not convert break italic insert', () => {
    const entity = factory
      .entity()
      .create('paragraph', 'Untitled *test Untitled')

    const raw = useRaw().v1().convert(entity)

    expect(`Untitled ${italic().open()}test Untitled`).toEqual(raw)
  })

  // bold
  it('should not convert bold in heading one', () => {
    const entity = factory
      .entity()
      .create('heading-one', 'Untitled &test& Untitled')

    const raw = useRaw().v1().convert(entity)

    expect(entity.raw).toEqual(raw)
  })

  it('should not convert bold in heading two', () => {
    const entity = factory
      .entity()
      .create('heading-two', 'Untitled &test& Untitled')

    const raw = useRaw().v1().convert(entity)

    expect(entity.raw).toEqual(raw)
  })

  it('should not convert bold in heading three', () => {
    const entity = factory
      .entity()
      .create('heading-three', 'Untitled &test& Untitled')

    const raw = useRaw().v1().convert(entity)

    expect(entity.raw).toEqual(raw)
  })

  it('should correct bold convert', () => {
    const entity = factory
      .entity()
      .create('paragraph', 'Untitled &test& Untitled')

    const raw = useRaw().v1().convert(entity)

    expect(`Untitled ${bold().open()}test${bold().close()} Untitled`).toEqual(
      raw
    )
  })

  it('should not convert break bold insert', () => {
    const entity = factory
      .entity()
      .create('paragraph', 'Untitled &test Untitled')

    const raw = useRaw().v1().convert(entity)

    expect(`Untitled ${bold().open()}test Untitled`).toEqual(raw)
  })

  // utilities
  it('should correct page break', () => {
    const entity = {
      type: 'page-break',
      raw: '',
      createdAt: useFormat().actually(),
      updatedAt: useFormat().actually(),
    } as Entity

    const raw = useRaw().v1().convert(entity)

    expect('').toEqual(raw)
  })

  it('should correct line break', () => {
    const entity = {
      type: 'line-break',
      raw: '',
      createdAt: useFormat().actually(),
      updatedAt: useFormat().actually(),
    } as Entity

    const raw = useRaw().v1().convert(entity)

    expect('').toEqual(raw)
  })
})

describe('PDF Converter - v1', () => {
  it('should create a simple entity without a object', () => {
    const raw = useRaw().v1().pdfConvert('Untitled')

    expect(['Untitled']).toEqual(raw)
  })

  it('should create a unique italic entity', () => {
    const raw = useRaw().v1().pdfConvert('Untitled *test* Untitled')

    expect([
      'Untitled ',
      {
        text: 'test',
        italics: true,
      },
      ' Untitled',
    ]).toEqual(raw)
  })

  it('should create a unique bold entity', () => {
    const raw = useRaw().v1().pdfConvert('Untitled &test& Untitled')

    expect([
      'Untitled ',
      {
        text: 'test',
        bold: true,
      },
      ' Untitled',
    ]).toEqual(raw)
  })

  it('should create a bold and italic entity', () => {
    const raw = useRaw().v1().pdfConvert('Untitled &test& *test* Untitled')

    expect([
      'Untitled ',
      {
        text: 'test',
        bold: true,
      },
      ' ',
      {
        text: 'test',
        italics: true,
      },
      ' Untitled',
    ]).toEqual(raw)
  })

  it('should not insert a broken entity', () => {
    const raw = useRaw().v1().pdfConvert('Untitled &test Untitled')

    expect(['Untitled ']).toEqual(raw)
  })

  it('should create a unique link entity', () => {
    const raw = useRaw().v1().pdfConvert('Untitled http://test Untitled')

    expect([
      'Untitled ',
      {
        text: 'test',
        link: 'http://test',
        decoration: 'underline',
      },
      ' Untitled',
    ]).toEqual(raw)
  })
})
