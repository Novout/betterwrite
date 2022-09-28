export interface ImageToForcePNGOptions {
  raw: string
  width: number
  height: number
}

export interface ImageFileRawOptions {
  accept?: string
}

export interface ImageFileRawReturn {
  raw: string
  fileName: string
  fileSize: number
}
