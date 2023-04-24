import { fromHtml } from 'hast-util-from-html'
import { Content } from 'hast'
import {
  TextAST,
  TextASTElement,
  TextASTTag,
  TextASTTagArgument,
} from 'better-write-types'

export const getRows = (text: string): string[] => {
  return text
    .split(new RegExp(/<div>(.*?)<\/div>/))
    .map((t) => t?.replaceAll('<br>', ' '))
    .filter((_) => _ && !_.includes('<div>') && !_.includes('</div>'))
}

export const parse = (row: string) => {
  const nodes: TextAST[] = []

  const _TAG_NAMES_: TextASTTag = {
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

  const wrapTag = (tag: TextASTTagArgument, value: boolean) => {
    switch (tag) {
      case 'b':
        _TAG_NAMES_.bold = value
        break
      case 'i':
        _TAG_NAMES_.italic = value
        break
      case 'u':
        _TAG_NAMES_.underline = value
        break
      case 'a':
        _TAG_NAMES_.link = value
        break
    }
  }

  const textAST = (children: Content[], prevTag: TextASTTagArgument) => {
    children.forEach((node: Content) => {
      if (node.type === 'element') {
        wrapTag(node.tagName as TextASTTagArgument, true)

        if (node.children)
          textAST(node.children, node.tagName as TextASTTagArgument)
      }

      if (node.type === 'text') {
        elementText({
          text: node.value,
        })
      }
    })

    wrapTag(prevTag, false)
  }

  textAST(htmlNodes, 'root')

  return nodes
}

export * as ASTUtils from './utils'
