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
