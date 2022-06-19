export interface DOCXStateStylesBase {}

export interface DOCXStateStylesParagraph {}

export interface DOCXStateStylesHeading {}

export interface DOCXStateStylesLineBreak {}

export interface DOCXStateStyles {
  base: DOCXStateStylesBase
  paragraph: DOCXStateStylesParagraph
  headingOne: DOCXStateStylesHeading
  headingTwo: DOCXStateStylesHeading
  headingThree: DOCXStateStylesHeading
  lineBreak: DOCXStateStylesLineBreak
}

export interface DOCXStateStyles {}

export type DOCXStateFlowItemType =
  | 'annotation'
  | 'content'
  | 'break-page'
  | 'bw'

export interface DOCXStateFlowItem {
  raw?: string
  type: DOCXStateFlowItemType
}

export type DOCXStateFlow = DOCXStateFlowItem[]

export interface DOCXState {
  flow: DOCXStateFlow
  styles: DOCXStateStyles
}
