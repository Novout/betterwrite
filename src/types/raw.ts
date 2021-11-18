export interface V2RawApply {
  existent: string
  type: 'bold' | 'italic'
  input: HTMLDivElement
}

export interface V2RawSet {
  content: string
  type: 'simple' | 'bold' | 'italic' | 'bolditalic'
}

export type V2RawNormalizeType = 'simple' | 'full' | 'editor'
