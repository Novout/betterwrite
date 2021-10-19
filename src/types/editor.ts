export interface EditorState {
  styles: EditorStateStyles
  configuration: EditorStateConfiguration
  actives: Record<any, any>
}

export interface EditorStateConfiguration {
  dark: boolean
  lang?: boolean
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
  fontFamily: string
  fontColor: string
  paragraph: EditorStateShowParagraph
  heading: EditorStateShowHeading
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
