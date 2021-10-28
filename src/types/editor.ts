export interface EditorState {
  styles: EditorStateStyles
  configuration: EditorStateConfiguration
  actives: EditorStateActives
}

export interface EditorStateActives {
  text: EditorStateActivesText
}

export interface EditorStateActivesText {
  selection: EditorStateActivesTextSelection
}

export interface EditorStateActivesTextSelection {
  end: number
  start: number
  content: string
}

export interface EditorStateConfiguration {
  dark: boolean
  lang?: boolean
  draggable: boolean
  auto: number | 'never'
}

export interface EditorStateStyles {
  input: EditorStateInput
  show: EditorStateShow
}
export interface EditorStateInput {
  fontFamily: string
  fontSize: string
  fontColor: string
}

export interface EditorStateShow {
  entity: EditorStateShowEntity
  fontFamily: string
  fontColor: string
  paragraph: EditorStateShowParagraph
  heading: EditorStateShowHeading
}

export interface EditorStateShowEntity {
  shadow: boolean
}

export interface EditorStateShowParagraph {
  indent: string
  fontFamily: string
  fontColor: string
  fontSize: string
  fontWeight: string
}

export interface EditorStateShowHeading {
  one: EditorStateShowHeadingOne
  two: EditorStateShowHeadingTwo
  three: EditorStateShowHeadingThree
}

export interface EditorStateShowHeadingOne {
  fontFamily: string
  fontColor: string
  fontSize: string
  fontWeight: string
}

export interface EditorStateShowHeadingTwo {
  fontFamily: string
  fontColor: string
  fontSize: string
  fontWeight: string
}

export interface EditorStateShowHeadingThree {
  fontFamily: string
  fontColor: string
  fontSize: string
  fontWeight: string
}
