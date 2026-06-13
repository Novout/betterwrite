import {
  BlobReader,
  BlobWriter,
  Entry,
  FileEntry,
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

// --- WebCrypto helpers ---

const PBKDF2_ITERATIONS = 200_000
const SALT_LEN = 16
const IV_LEN = 12

const deriveKey = async (
  password: string,
  salt: Uint8Array,
): Promise<CryptoKey> => {
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    'PBKDF2',
    false,
    ['deriveKey'],
  )

  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt.buffer as ArrayBuffer,
      iterations: PBKDF2_ITERATIONS,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt'],
  )
}

export const encryptBW = async (
  data: string,
  password: string,
): Promise<Blob> => {
  const salt = crypto.getRandomValues(new Uint8Array(SALT_LEN))
  const iv = crypto.getRandomValues(new Uint8Array(IV_LEN))
  const key = await deriveKey(password, salt)

  const ciphertext = new Uint8Array(
    await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      new TextEncoder().encode(data),
    ),
  )

  // layout: [16 salt][12 iv][...ciphertext]
  const payload = new Uint8Array(SALT_LEN + IV_LEN + ciphertext.byteLength)
  payload.set(salt, 0)
  payload.set(iv, SALT_LEN)
  payload.set(ciphertext, SALT_LEN + IV_LEN)

  const blobWriter = new BlobWriter()
  const zipWriter = new ZipWriter(blobWriter)

  await zipWriter.add(
    'meta.json',
    new TextReader(JSON.stringify({ encrypted: true, version: 1 })),
  )
  await zipWriter.add('encrypted.bin', new BlobReader(new Blob([payload])))
  await zipWriter.add('mimetype', writeMimetype())
  await zipWriter.close()

  return blobWriter.getData()
}

const isEncryptedZip = async (zipReader: ZipReader<Blob>): Promise<boolean> => {
  const entries = await zipReader.getEntries()

  return entries.some((e: Entry) => e.filename === 'meta.json')
}

export const decryptBW = async (
  blob: Blob,
  password: string,
): Promise<ProjectObject> => {
  const zipReader = new ZipReader(new BlobReader(blob))
  const entries = await zipReader.getEntries()

  const encEntry = entries.find((e) => e.filename === 'encrypted.bin')

  if (!encEntry) throw new Error('encrypted.bin not found')

  const payloadBlob = await (encEntry as FileEntry).getData(new BlobWriter())
  const payload = new Uint8Array(await payloadBlob.arrayBuffer())

  const salt = payload.slice(0, SALT_LEN)
  const iv = payload.slice(SALT_LEN, SALT_LEN + IV_LEN)
  const ciphertext = payload.slice(SALT_LEN + IV_LEN)

  const key = await deriveKey(password, salt)

  let plaintext: ArrayBuffer

  try {
    plaintext = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      key,
      ciphertext,
    )
  } catch {
    throw new Error('wrong-password')
  }

  await zipReader.close()

  return destr(new TextDecoder().decode(plaintext))
}

export const readBW = async (
  blob: Blob,
  getPassword?: () => Promise<string | null>,
): Promise<ProjectObject> => {
  // peek at entries to decide the path
  const peekReader = new ZipReader(new BlobReader(blob))
  const encrypted = await isEncryptedZip(peekReader)
  await peekReader.close()

  if (encrypted) {
    if (!getPassword)
      throw new Error('File is encrypted but no password provider was given')

    const password = await getPassword()

    if (password === null) throw new Error('cancelled')

    return decryptBW(blob, password)
  }

  // original unencrypted path
  const zipFileReader = new BlobReader(blob)
  const writer = new TextWriter()
  const zipReader = new ZipReader(zipFileReader)
  const firstEntry = (await zipReader.getEntries()).shift()

  // @ts-expect-error
  const data = await firstEntry.getData(writer)

  await zipReader.close()

  return destr(data)
}
