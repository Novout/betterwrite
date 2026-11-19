/*
 * Port of `@milkdown/plugin-math` (MIT, Copyright 2021 Milkdown by Mirone).
 *
 * The upstream package was discontinued at 7.5.9 and pins `@milkdown/utils`
 * to that version, which breaks with newer Milkdown (duplicated ctx slices).
 * Milkdown's replacement (Crepe's LaTeX feature) stores block math as a
 * `code_block` with language `LaTeX`, which is incompatible with the
 * `milkdownData` JSON already saved in users' projects.
 *
 * This port keeps the exact node names and attributes used by 7.2.x:
 *   - `math_inline`  → content: text*  (formula is the node text)
 *   - `math_block`   → attrs: { value } (formula is the `value` attr)
 * so existing schema files keep loading unchanged.
 */
import type { MilkdownPlugin } from '@milkdown/ctx'
import { InputRule } from '@milkdown/prose/inputrules'
import { Fragment } from '@milkdown/prose/model'
import type { $Remark } from '@milkdown/utils'
import { $ctx, $inputRule, $nodeSchema, $remark } from '@milkdown/utils'
import type { KatexOptions } from 'katex'
import katex from 'katex'
import remarkMath from 'remark-math'

export const mathInlineId = 'math_inline'
export const mathBlockId = 'math_block'

/// Wraps [remark-math](https://www.npmjs.com/package/remark-math).
export const remarkMathPlugin: $Remark<'remarkMath', undefined> = $remark<
  'remarkMath',
  undefined
>('remarkMath', () => remarkMath as any)

/// [Options for katex](https://katex.org/docs/options.html).
export const katexOptionsCtx = $ctx<KatexOptions, 'katexOptions'>(
  { throwOnError: false },
  'katexOptions',
)

const render = (code: string, dom: HTMLElement, options: KatexOptions) => {
  try {
    katex.render(code, dom, { throwOnError: false, ...options })
  } catch {
    dom.textContent = code
  }
}

/// Inline math: `$a^2 + b^2 = c^2$`
export const mathInlineSchema = $nodeSchema(mathInlineId, (ctx) => ({
  group: 'inline',
  content: 'text*',
  inline: true,
  atom: true,
  parseDOM: [
    {
      tag: `span[data-type="${mathInlineId}"]`,
      getContent: (dom, schema) => {
        const value = (dom as HTMLElement).dataset?.value ?? ''

        return value ? Fragment.from(schema.text(value)) : Fragment.empty
      },
    },
  ],
  toDOM: (node) => {
    const code: string = node.textContent
    const dom = document.createElement('span')
    dom.dataset.type = mathInlineId
    dom.dataset.value = code
    render(code, dom, ctx.get(katexOptionsCtx.key))

    return dom
  },
  parseMarkdown: {
    match: (node) => node.type === 'inlineMath',
    runner: (state, node, type) => {
      state.openNode(type)

      if (node.value) state.addText(node.value as string)

      state.closeNode()
    },
  },
  toMarkdown: {
    match: (node) => node.type.name === mathInlineId,
    runner: (state, node) => {
      state.addNode('inlineMath', undefined, node.textContent)
    },
  },
}))

/// Block math:
/// ```markdown
/// $$
/// a^2 + b^2 = c^2
/// $$
/// ```
export const mathBlockSchema = $nodeSchema(mathBlockId, (ctx) => ({
  content: 'text*',
  group: 'block',
  marks: '',
  defining: true,
  atom: true,
  isolating: true,
  attrs: {
    value: {
      default: '',
    },
  },
  parseDOM: [
    {
      tag: `div[data-type="${mathBlockId}"]`,
      preserveWhitespace: 'full',
      getAttrs: (dom) => ({
        value: (dom as HTMLElement).dataset?.value ?? '',
      }),
    },
  ],
  toDOM: (node) => {
    const code: string = node.attrs.value
    const dom = document.createElement('div')
    dom.dataset.type = mathBlockId
    dom.dataset.value = code
    render(code, dom, { ...ctx.get(katexOptionsCtx.key), displayMode: true })

    return dom
  },
  parseMarkdown: {
    match: ({ type }) => type === 'math',
    runner: (state, node, type) => {
      state.addNode(type, { value: node.value as string })
    },
  },
  toMarkdown: {
    match: (node) => node.type.name === mathBlockId,
    runner: (state, node) => {
      state.addNode('math', undefined, node.attrs.value)
    },
  },
}))

/// Typing `$$ ` at the start of a line creates a math block.
export const mathBlockInputRule = $inputRule(
  (ctx) =>
    new InputRule(/^\$\$\s$/, (state, _match, start, end) => {
      const type = mathBlockSchema.type(ctx)
      const $start = state.doc.resolve(start)

      if (
        !$start
          .node(-1)
          .canReplaceWith($start.index(-1), $start.indexAfter(-1), type)
      )
        return null

      return state.tr.delete(start, end).setBlockType(start, start, type)
    }),
)

/// All plugins, same usage as `@milkdown/plugin-math`: `editor.use(math)`.
export const math: MilkdownPlugin[] = [
  remarkMathPlugin,
  katexOptionsCtx,
  mathInlineSchema,
  mathBlockSchema,
  mathBlockInputRule,
].flat()
