export type ColorSchema = 'CMYK' | 'RGB'
export type ColorSchemaReturn =
  | `#${string}`
  | string
  | [number, number, number, number]
