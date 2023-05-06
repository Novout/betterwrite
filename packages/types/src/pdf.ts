import { ColorSchema } from './color-converter'
import { ContextState } from './context'

export interface PDFStateStyles {
  base: PDFStateStylesBase
  paragraph: PDFStateStylesParagraph
  headingOne: PDFStateStylesHeading
  headingTwo: PDFStateStylesHeading
  headingThree: PDFStateStylesHeading
  lineBreak: PDFStateStylesLineBreak
  switcher: PDFStateStylesSwitcher
}

export interface PDFStateStylesBaseBackground {
  color: string
  data: string
  main: string
}

export interface PDFStateStylesBaseMargins {
  left: number
  top: number
  right: number
  bottom: number
}

export interface PDFStateStylesBaseNote {
  text: string
  bw: boolean
}

export interface PDFStateStylesBase {
  summary: PDFStateStylesBaseSummary
  note: PDFStateStylesBaseNote
  header: PDFStateStylesBaseHeader
  footer: PDFStateStylesBaseFooter
  background: PDFStateStylesBaseBackground
  pageSize: string
  pageOrientation: string
  pageMargins: PDFStateStylesBaseMargins
}

export interface PDFStateStylesBaseSummary {
  fontFamily: string
  fontSize: number
  type: 'default'
}

export interface PDFStateStylesBaseHeader {
  start: number
  content: string
  alignment: 'default' | 'left' | 'center' | 'right'
  textSize: number
  textType: 'simple' | 'counter'
  fontFamily: string
}

export interface PDFStateStylesBaseFooter {
  start: number
  alignment: 'default' | 'left' | 'center' | 'right'
  textSize: number
  textType: 'simple' | 'counter'
  fontFamily: string
}

export interface PDFStateStylesParagraph {
  font: string
  fontSize: number
  lineHeight: number
  alignment: 'left' | 'center' | 'right' | 'justify'
  indent: number
  characterSpacing: number
  color: string
  background: string
  markerColor: string
  decoration: 'underline' | 'lineThrough' | 'overline' | 'none' | undefined
  decorationStyle: 'dashed' | 'dotted' | 'double' | 'none' | undefined
  decorationColor: string
  margin: {
    top: number
    bottom: number
  }
}

export interface PDFStateStylesHeading {
  font: string
  fontSize: number
  lineHeight: number
  bold: boolean
  italics: boolean
  alignment: 'left' | 'center' | 'right' | 'justify'
  characterSpacing: number
  color: string
  background: string
  markerColor: string
  decoration: 'underline' | 'lineThrough' | 'overline' | undefined
  decorationStyle: 'dashed' | 'dotted' | 'double' | 'wavy' | undefined
  decorationColor: string
  breakPage: boolean
  margin: {
    top: number
    bottom: number
  }
}

export interface PDFStateStylesLineBreakImage {
  data: string
  active: boolean
  width: number
  height: number
}

export interface PDFStateStylesLineBreak {
  spacing: number
  image: PDFStateStylesLineBreakImage
}

export interface PDFStateStylesSwitcher {
  cover: boolean
  main: boolean
  footer: boolean
  header: boolean
  summary: boolean
  encryption: boolean
  theme: boolean
}

export interface PDFDocOptions {
  chapters: {
    page: ContextState
    select: boolean
  }[]
  color: ColorSchema
}

export interface PDFState {
  styles: PDFStateStyles
  fonts: Array<string>
  normalize: Record<string, any>
}
