import * as zip from '@zip.js/zip.js'
import destr from 'destr'
import { xml2json } from 'xml-js'
import { EntityType, ImporterData, ImporterEntity } from 'better-write-types'

const extractFilter = async (entries: zip.Entry[], position: number = 3) => {
  if (entries.length) {
    const target = entries[position]

    // @ts-ignore
    const text = await target.getData(new zip.TextWriter())

    const result = await xml2json(text, {
      compact: true,
      elementNameFn: (val) => {
        return val.replace('w:', '').replace('_', '').replace('xml:', '')
      },
      ignoreComment: true,
      ignoreDeclaration: true,
      spaces: 2,
    })

    return destr(result)
  }
}

const DocxToBW = async (data: Record<string, any>): Promise<ImporterData> => {
  const result: ImporterEntity[] = []

  data.body.p.forEach((target: any) => {
    const style = target?.pPr?.pStyle?._attributes['w:val']
    const raw = target?.r?.t?._text

    if (style && raw) {
      let type: EntityType | null = null

      switch (style) {
        case 'Heading1':
          type = 'heading-one'
          break
        case 'Heading2':
          type = 'heading-two'
          break
        case 'Heading3':
        case 'Heading4':
        case 'Heading5':
        case 'Heading6':
          type = 'heading-three'
          break
      }

      if (type) {
        result.push({
          type,
          raw,
        })
      }

      return
    }

    if (raw) {
      result.push({
        type: 'paragraph',
        raw,
      })
    }
  })

  return {
    entities: result,
  }
}

export const DocxToJson = async (data: string): Promise<ImporterData> => {
  const reader = await new zip.ZipReader(new zip.Data64URIReader(data))

  const entries = await reader.getEntries()

  const { document } = await extractFilter(entries)

  await reader.close()

  const final = DocxToBW(document)

  return final
}
