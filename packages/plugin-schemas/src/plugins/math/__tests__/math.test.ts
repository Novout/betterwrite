import { describe, it, expect } from 'vitest'
import { Editor, defaultValueCtx, rootCtx, editorViewCtx } from '@milkdown/core'
import { commonmark } from '@milkdown/preset-commonmark'
import { getMarkdown } from '@milkdown/utils'
import { math } from '../math-plugin'
import { slashFactory } from '../../slash/slash-plugin'

// `milkdownData` as saved by @milkdown/plugin-math 7.2.x (doc.toJSON())
const legacyDoc = {
  type: 'doc',
  content: [
    {
      type: 'heading',
      attrs: { level: 1, id: '' },
      content: [{ type: 'text', text: 'Physics' }],
    },
    {
      type: 'paragraph',
      content: [
        { type: 'text', text: 'Pythagoras: ' },
        {
          type: 'math_inline',
          content: [{ type: 'text', text: 'a^2 + b^2 = c^2' }],
        },
      ],
    },
    { type: 'math_block', attrs: { value: 'E = mc^2' } },
  ],
}

const create = async (value: any) => {
  const root = document.createElement('div')
  document.body.appendChild(root)

  const slash = slashFactory('test')

  return Editor.make()
    .config((ctx) => {
      ctx.set(rootCtx, root)
      ctx.set(defaultValueCtx, value)
      ctx.set(slash.key, {})
    })
    .use(commonmark)
    .use(math)
    .use(slash)
    .create()
}

const json = (editor: Editor) =>
  editor.action((ctx) => ctx.get(editorViewCtx).state.doc.toJSON())

describe('math plugin (port of @milkdown/plugin-math 7.2.x)', () => {
  it('loads legacy milkdownData JSON without losing math nodes', async () => {
    const editor = await create({ type: 'json', value: legacyDoc })
    const doc = json(editor)

    const paragraph = doc.content[1]
    expect(paragraph.content[1]).toEqual({
      type: 'math_inline',
      content: [{ type: 'text', text: 'a^2 + b^2 = c^2' }],
    })
    expect(doc.content[2]).toEqual({
      type: 'math_block',
      attrs: { value: 'E = mc^2' },
    })
  })

  it('serializes math back to markdown', async () => {
    const editor = await create({ type: 'json', value: legacyDoc })
    const md = editor.action(getMarkdown())

    expect(md).toContain('$a^2 + b^2 = c^2$')
    expect(md).toMatch(/\$\$\s*E = mc\^2\s*\$\$/)
  })

  it('parses markdown math into the same node types', async () => {
    const editor = await create('inline $x+1$ here\n\n$$\ny = 2\n$$\n')
    const doc = json(editor)

    expect(doc.content[0].content[1]).toEqual({
      type: 'math_inline',
      content: [{ type: 'text', text: 'x+1' }],
    })
    expect(doc.content[1]).toEqual({
      type: 'math_block',
      attrs: { value: 'y = 2' },
    })
  })

  // happy-dom runs in quirks mode, where KaTeX refuses to render, so this also
  // covers the fallback: the formula is shown as plain text, never crashing.
  it('renders math nodes (katex or plain-text fallback)', async () => {
    const editor = await create({ type: 'json', value: legacyDoc })
    const dom = editor.action((ctx) => ctx.get(editorViewCtx).dom)

    const inline = dom.querySelector<HTMLElement>('span[data-type="math_inline"]')
    const block = dom.querySelector<HTMLElement>('div[data-type="math_block"]')

    expect(inline?.dataset.value).toBe('a^2 + b^2 = c^2')
    expect(block?.dataset.value).toBe('E = mc^2')
    expect(inline?.textContent).toContain('a')
    expect(block?.textContent).toContain('E')
  })
})
