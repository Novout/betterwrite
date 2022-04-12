export type BetterWriteThemes =
  | 'BetterWrite - Light'
  | 'BetterWrite - Dark'
  | 'BetterWrite - Rise'
  | 'BetterWrite - Ascend'
  | 'BetterWrite - Harmonic'

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
  prefix: string
  paragraph: {
    prefix: string
    active: boolean
  }
  headingTwo: {
    prefix: string
    active: boolean
  }
  headingThree: {
    prefix: string
    active: boolean
  }
  pageBreak: {
    prefix: string
    active: boolean
  }
  lineBreak: {
    prefix: string
    active: boolean
  }
  image: {
    prefix: string
    active: boolean
  }
  checkbox: {
    prefix: string
    active: boolean
  }
  list: {
    prefix: string
    active: boolean
  }
  dialogue: {
    prefix: string
    value: string
    active: boolean
  }
  drau: {
    prefix: string
    active: boolean
  }
}

export interface EditorStateConfigurationDropbox {
  hourInSaveFileName: boolean
}

export interface EditorStateConfiguration {
  theme: BetterWriteThemes
  lang?: boolean
  draggable: boolean
  bars: boolean
  auto: number | 'never'
  dropbox: EditorStateConfigurationDropbox
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
