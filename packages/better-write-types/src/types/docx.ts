export enum DOCXAlignmentType {
  START = 'start',
  END = 'end',
  CENTER = 'center',
  BOTH = 'both',
  JUSTIFIED = 'both',
  DISTRIBUTE = 'distribute',
  LEFT = 'left',
  RIGHT = 'right',
}

export interface DOCXStateStylesBase {}

export interface DOCXStateStylesText {
  bold: boolean
  italics: boolean
  color: string
  size: number
  margin: {
    top: number
    bottom: number
  }
  alignment: DOCXAlignmentType
}

export interface DOCXStateStylesParagraph extends DOCXStateStylesText {
  indent: number
}

export interface DOCXStateStylesHeading extends DOCXStateStylesText {}

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
