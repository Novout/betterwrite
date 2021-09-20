export interface EditorState {
  styles: EditorStateStyles
  configuration: EditorStateConfiguration
}

export interface EditorStateConfiguration {
  dark: boolean
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
}
