import * as zip from '@zip.js/zip.js'
import destr from 'destr'
import { xml2json } from 'xml-js'
import { EntityType, ImporterData, ImporterEntity } from 'better-write-types'

const extractFilter = async (
  entries: zip.Entry[]
): Promise<any[] | undefined> => {
  const arr: any = []

  if (entries.length) {
    for (const target of entries) {
      if (target.filename === 'word/document.xml') {
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

        arr.push(destr(result))
      }
    }

    return arr
  }

  return undefined
}

const DocxToBW = async (arr: Record<string, any>[]): Promise<ImporterData> => {
  const result: ImporterEntity[] = []

  arr.forEach((data) => {
    data?.document?.body?.p?.forEach((target: any) => {
      const style = target?.pPr?.pStyle?._attributes['w:val']
      const raw = target?.r?.t?._text

      if (style && raw) {
        let type: EntityType | null = null

        switch (style) {
          case 'Heading1':
          case 'Heading2':
            type = 'heading-one'
            break
          case 'Heading3':
          case 'Heading4':
            type = 'heading-two'
            break
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
  })

  return {
    entities: result,
  }
}

export const DocxToJson = async (data: string): Promise<ImporterData> => {
  const reader = await new zip.ZipReader(new zip.Data64URIReader(data))

  const entries = await reader.getEntries()

  const arr = await extractFilter(entries)

  await reader.close()

  if (!arr) {
    return {
      entities: [],
    }
  }

  const final = DocxToBW(arr)

  return final
}
