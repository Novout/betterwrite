import { fromHtml } from 'hast-util-from-html'
import { Content } from 'hast'
import { TextAST, TextASTElement } from 'better-write-types'

export const getRows = (text: string): string[] => {
  return text
    .split(new RegExp(/<div>(.*?)<\/div>/))
    .map((text) => text.replaceAll('<br>', ' '))
    .filter(
      (text) => text && !text.includes('<div>') && !text.includes('</div>')
    )
}

export const parse = (row: string) => {
  const nodes: TextAST[] = []
  const _TAG_NAMES_ = {
    bold: false,
    italic: false,
    underline: false,
    link: false,
  }

  const htmlNodes = fromHtml(row, { fragment: true }).children

  const elementText = (element: TextASTElement) => {
    nodes.push({
      text: element.text,
      bold: _TAG_NAMES_.bold || false,
      italic: _TAG_NAMES_.italic || false,
      underline: _TAG_NAMES_.underline || false,
      link: _TAG_NAMES_.link || false,
    })
  }

  const textAST = (children: Content[]) => {
    children.forEach((node: Content) => {
      if (node.type === 'element') {
        if (node.tagName === 'b') _TAG_NAMES_.bold = true
        if (node.tagName === 'i') _TAG_NAMES_.italic = true
        if (node.tagName === 'u') _TAG_NAMES_.underline = true
        if (node.tagName === 'a') _TAG_NAMES_.link = true

        if (node.children) textAST(node.children)
      }

      if (node.type === 'text') {
        elementText({
          text: node.value,
        })
      }
    })

    _TAG_NAMES_.bold = false
    _TAG_NAMES_.italic = false
    _TAG_NAMES_.underline = false
  }

  textAST(htmlNodes)

  return nodes
}
