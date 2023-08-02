import { ASTNormalizeOptions } from 'better-write-types'

export const occurrences = (
  str: string,
  target: string,
  allowOverlapping?: boolean,
) => {
  str += ''
  target += ''

  if (target.length <= 0) return str.length + 1

  let n = 0,
    pos = 0,
    step = allowOverlapping ? 1 : target.length

  while (true) {
    pos = str.indexOf(target, pos)
    if (pos >= 0) {
      ++n
      pos += step
    } else break
  }
  return n
}

export const normalize = (str: string, options: ASTNormalizeOptions) => {
  if (options?.whitespace)
    str = str.replaceAll('&nbsp;', ' ').replaceAll('&#160', ' ')

  if (options?.trim) str = str.trim()

  switch (options.type) {
    case 'all':
      return str.replace(/(<([^>]+)>)/gi, '')
    case 'inserts':
      return str
        .replaceAll('<span>', '')
        .replaceAll('</span>', '')
        .replaceAll('<b>', '')
        .replaceAll('</b>', '')
        .replaceAll('<i>', '')
        .replaceAll('</i>', '')
        .replaceAll('<u>', '')
        .replaceAll('</u>', '')
    default:
      return str
  }
}
