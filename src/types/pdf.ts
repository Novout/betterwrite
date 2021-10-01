export interface GenerateParagraphOptions {
  stack: boolean
  indent: number
}

export interface PDFState {
  styles: Record<string, any>
  fonts: Array<string>
  normalize: Record<string, any>
}
