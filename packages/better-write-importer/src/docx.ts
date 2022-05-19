import * as zip from '@zip.js/zip.js'
import destr from 'destr'
import { xml2json } from 'xml-js'
import { Entities } from 'better-write-types'

const extractFilter = async (entries: zip.Entry[]) => {
  if (entries.length) {
    const target = entries[3]

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

const DocxToBW = (data: Record<string, any>): Entities => {
  return []
}

export const DocxToJson = async (data: string): Promise<Entities> => {
  const reader = await new zip.ZipReader(new zip.Data64URIReader(data))

  const entries = await reader.getEntries()

  const extract = await extractFilter(entries)

  await reader.close()

  const final = DocxToBW(extract)

  return final
}
