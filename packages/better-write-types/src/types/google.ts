export interface GoogleFont {
  kind: string
  family: string
  variants?: Array<string>
  subsets?: Array<string>
  version: string
  lastModified: string
  files: GoogleFontFiles
}

export interface GoogleFontFiles {
  [key: string]: string
}

export interface GoogleFontsGetOption {
  key: string
  maxFonts: number
  requiredFonts: string[]
  globalStyle: boolean
}
