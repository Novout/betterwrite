/**
 * @jest-environment jsdom
 */

import { useRaw } from '../../src/use/raw'
import { useFormat } from '../../src/use/format'

describe('Raw v2 - HTML', () => {
  const html = useRaw().v2().html()
  beforeEach(() => {})

  it('should correct italic open', () => {
    expect(html.italic().open()).toEqual(
      '<span class="italic text-sm text-theme-editor-italic-text hover:text-theme-editor-italic-text-hover active:text-theme-editor-italic-text-active">'
    )
  })

  it('should correct italic close', () => {
    expect(html.italic().close()).toEqual('</span>')
  })

  it('should correct italic length', () => {
    expect(html.italic().length()).toEqual(
      html.italic().open().length + html.italic().close().length
    )
  })

  it('should correct bold open', () => {
    expect(html.bold().open()).toEqual(
      '<span class="font-bold text-sm text-theme-editor-bold-text hover:text-theme-editor-bold-text-hover active:text-theme-editor-bold-text-active">'
    )
  })

  it('should correct bold close', () => {
    expect(useRaw().v2().html().bold().close()).toEqual('</span>')
  })

  it('should correct bold length', () => {
    expect(html.bold().length()).toEqual(
      html.bold().open().length + html.bold().close().length
    )
  })
})

describe('Raw v2 - HTML', () => {
  const v2 = useRaw().v2()
  const format = useFormat()

  beforeEach(() => {})

  const styleMock = {
    paragraph: {
      indent: '',
      fontSize: '',
      fontFamily: '',
      fontColor: '',
      fontWeight: '',
    },
    heading: {
      one: {
        fontSize: '',
        fontFamily: '',
        fontColor: '',
        fontWeight: '',
      },
      two: {
        fontSize: '',
        fontFamily: '',
        fontColor: '',
        fontWeight: '',
      },
      three: {
        fontSize: '',
        fontFamily: '',
        fontColor: '',
        fontWeight: '',
      },
    },
  }

  it('should return paragraph styles', () => {
    expect(
      v2.style(
        {
          type: 'paragraph',
          raw: '',
          createdAt: format.actually(),
          updatedAt: format.actually(),
          external: {},
        },
        styleMock
      )
    ).toEqual([
      'editable overflow-hidden w-full text-sm break-words bg-theme-editor-entity-background hover:bg-theme-editor-entity-background-hover active:bg-theme-editor-entity-background-active',
      'text-justify text-theme-editor-entity-text hover:text-theme-editor-entity-text-hover active:text-theme-editor-entity-text-active',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
    ])
  })

  it('should return heading one styles', () => {
    expect(
      v2.style(
        {
          type: 'heading-one',
          raw: '',
          createdAt: format.actually(),
          updatedAt: format.actually(),
          external: {},
        },
        styleMock
      )
    ).toEqual([
      'editable overflow-hidden w-full text-sm break-words bg-theme-editor-entity-background hover:bg-theme-editor-entity-background-hover active:bg-theme-editor-entity-background-active',
      '',
      '',
      '',
      '',
      '',
      '',
      'text-center pb-10 pt-10 text-theme-editor-entity-heading-one hover:text-theme-editor-entity-heading-one-hover active:text-theme-editor-entity-heading-one-active',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
    ])
  })

  it('should return heading two styles', () => {
    expect(
      v2.style(
        {
          type: 'heading-two',
          raw: '',
          createdAt: format.actually(),
          updatedAt: format.actually(),
          external: {},
        },
        styleMock
      )
    ).toEqual([
      'editable overflow-hidden w-full text-sm break-words bg-theme-editor-entity-background hover:bg-theme-editor-entity-background-hover active:bg-theme-editor-entity-background-active',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      'text-center pb-3 pt-8 text-theme-editor-entity-heading-two hover:text-theme-editor-entity-heading-two-hover active:text-theme-editor-entity-heading-two-active',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
    ])
  })

  it('should return heading three styles', () => {
    expect(
      v2.style(
        {
          type: 'heading-three',
          raw: '',
          createdAt: format.actually(),
          updatedAt: format.actually(),
          external: {},
        },
        styleMock
      )
    ).toEqual([
      'editable overflow-hidden w-full text-sm break-words bg-theme-editor-entity-background hover:bg-theme-editor-entity-background-hover active:bg-theme-editor-entity-background-active',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      'text-center pb-2 pt-5 text-theme-editor-entity-heading-three hover:text-theme-editor-entity-heading-three-hover active:text-theme-editor-entity-heading-three-active',
      '',
      '',
      '',
      '',
      '',
      '',
    ])
  })

  it('should return heading three styles', () => {
    expect(
      v2.style(
        {
          type: 'heading-three',
          raw: '',
          createdAt: format.actually(),
          updatedAt: format.actually(),
          external: {},
        },
        styleMock
      )
    ).toEqual([
      'editable overflow-hidden w-full text-sm break-words bg-theme-editor-entity-background hover:bg-theme-editor-entity-background-hover active:bg-theme-editor-entity-background-active',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      'text-center pb-2 pt-5 text-theme-editor-entity-heading-three hover:text-theme-editor-entity-heading-three-hover active:text-theme-editor-entity-heading-three-active',
      '',
      '',
      '',
      '',
      '',
      '',
    ])
  })

  it('should return page break styles', () => {
    expect(
      v2.style(
        {
          type: 'page-break',
          raw: '',
          createdAt: format.actually(),
          updatedAt: format.actually(),
          external: {},
        },
        styleMock
      )
    ).toEqual([
      'editable overflow-hidden w-full text-sm break-words bg-theme-editor-entity-background hover:bg-theme-editor-entity-background-hover active:bg-theme-editor-entity-background-active',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      'cursor-default mt-2 mb-6 border-b-8 border-theme-border-1 border-theme-editor-entity-page',
      '',
    ])
  })

  it('should return line break styles', () => {
    expect(
      v2.style(
        {
          type: 'line-break',
          raw: '',
          createdAt: format.actually(),
          updatedAt: format.actually(),
          external: {},
        },
        styleMock
      )
    ).toEqual([
      'editable overflow-hidden w-full text-sm break-words bg-theme-editor-entity-background hover:bg-theme-editor-entity-background-hover active:bg-theme-editor-entity-background-active',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      'cursor-default mt-2 mb-6 border-b-8 border-dashed border-theme-editor-entity-line',
    ])
  })
})

describe('Raw v2 - Make', () => {
  const make = useRaw().v2().make()
  const format = useFormat()

  beforeEach(() => {})

  it('should create image', () => {
    const file_name = 'foo.png'

    expect(
      make.image({
        type: 'image',
        raw: '',
        createdAt: format.actually(),
        updatedAt: format.actually(),
        external: {
          image: {
            name: file_name,
            size: {
              width: 0,
              height: 0,
            },
            alignment: 'full',
          },
        },
      })
    ).toContain(file_name)
  })

  it('should not create image because unsupported extension', () => {
    const file_name = 'foo.bw'

    expect(
      make.image({
        type: 'image',
        raw: 'dsaKDSADaskASHDGYasdahbdasnASD...',
        createdAt: format.actually(),
        updatedAt: format.actually(),
        external: {
          image: {
            name: file_name,
            size: {
              width: 0,
              height: 0,
            },
            alignment: 'full',
          },
        },
      })
    ).toContain('id="unsupported-extension-image"')
  })
})
