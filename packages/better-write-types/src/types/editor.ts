export type BetterWriteThemes =
  | 'BetterWrite - Light'
  | 'BetterWrite - Dark'
  | 'BetterWrite - Rise'
  | 'BetterWrite - Ascend'
  | 'BetterWrite - Harmonic'
  | 'BetterWrite - Infinity'

export interface EditorState {
  styles: EditorStateStyles
  configuration: EditorStateConfiguration
  actives: EditorStateActives
}

export interface EditorStateActivesEntity {
  index: number
}

export interface EditorStateActivesGlobalMouse {
  x: number
  y: number
  vertical: 'top' | 'bottom'
  horizontal: 'right' | 'left'
  validLastSelection: boolean
}

export interface EditorStateActivesGlobal {
  mouse: EditorStateActivesGlobalMouse
}

export interface EditorStateActives {
  entity: EditorStateActivesEntity
  global: EditorStateActivesGlobal
}

export interface EditorStateConfigurationEntity {
  updateTime: boolean
}

export interface EditorStateConfigurationCommands {
  paragraph: {
    active: boolean
  }
  headingTwo: {
    active: boolean
  }
  headingThree: {
    active: boolean
  }
  pageBreak: {
    active: boolean
  }
  lineBreak: {
    active: boolean
  }
  image: {
    active: boolean
  }
  checkbox: {
    active: boolean
  }
  list: {
    active: boolean
  }
  dialogue: {
    active: boolean
  }
  drau: {
    active: boolean
  }
}

export interface EditorStateConfiguration {
  theme: BetterWriteThemes
  lang?: boolean
  draggable: boolean
  bars: boolean
  transition: boolean
  auto: number | 'never'
  entity: EditorStateConfigurationEntity
  commands: EditorStateConfigurationCommands
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
