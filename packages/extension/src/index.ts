import {
  BlobReader,
  BlobWriter,
  TextReader,
  TextWriter,
  ZipReader,
  ZipWriter,
} from '@zip.js/zip.js'
import { ProjectObject } from 'better-write-types'
import { destr } from 'destr'

export const writeMimetype = (): TextReader => {
  const reader = new TextReader('application/bw+zip')

  return reader
}

export const writeBW = async (data: string) => {
  const writer = new BlobWriter()
  const json = new TextReader(data)

  const zipWriter = new ZipWriter(writer)
  await zipWriter.add('data.json', json)

  const mimetype = writeMimetype()
  await zipWriter.add('mimetype', mimetype)

  await zipWriter.close()

  const target = await writer.getData()

  return target
}

export const readBW = async (blob: Blob): Promise<ProjectObject> => {
  const zipFileReader = new BlobReader(blob)

  const writer = new TextWriter()

  const zipReader = new ZipReader(zipFileReader)
  const firstEntry = (await zipReader.getEntries()).shift()

  // @ts-expect-error
  const data = await firstEntry.getData(writer)

  await zipReader.close()

  return destr(data)
}
