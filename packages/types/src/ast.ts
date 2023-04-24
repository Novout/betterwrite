export interface TextAST {
  text: string
  bold: boolean
  italic: boolean
  underline: boolean
  link: boolean
}

export interface TextASTElement {
  text: string
  bold?: boolean
  italic?: boolean
  underline?: boolean
}

export type TextASTTagArgument = 'root' | 'b' | 'i' | 'u' | 'a'

export interface TextASTTag {
  bold: boolean
  italic: boolean
  underline: boolean
  link: boolean
}

export interface ASTNormalizeOptions {
  type: 'all' | 'inserts'
  whitespace?: boolean
  trim?: boolean
}
