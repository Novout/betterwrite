export interface ImageToForcePNGOptions {
  raw: string
  width: number
  height: number
}

export interface ImageFileRawOptions {
  accept?: string
  compress?: {
    value?: boolean
    quality?: number
  }
}

export interface ImageFileRawReturn {
  raw: string
  fileName: string
  fileSize: number
}
