import * as indexeddb from 'idb-keyval'
import { destr } from 'destr'
import lz from 'lz-string'
import type { ClientStorageOptions, Maybe } from 'better-write-types'

// used for force indexeddb use in FF4 browsers and in specific TWA android build's. Even though indexeddb is not supported in some older versions, local saving will work correctly in any modern browser or environment.
const isLocalSupported = typeof Storage !== 'undefined'

export function set<T extends unknown>(
  key: string,
  data: T,
  options: ClientStorageOptions,
) {
  if (!isLocalSupported) {
    options.schema = 'indexeddb'
  }

  return new Promise((res) => {
    const str = JSON.stringify(data)
    const strResolved = options.compress ? lz.compress(str) : str

    if (options.schema === 'indexeddb') {
      if (isLocalSupported) localStorage.removeItem(key)

      indexeddb
        .set(key, strResolved)
        .then((value) => {
          res(value)
        })
        .catch(() => {
          res(undefined)
        })

      return
    }

    indexeddb.del(key).catch(() => {})
    localStorage.setItem(key, strResolved)

    res(key)
  })
}

export function get<T extends unknown>(
  key: string,
  options: ClientStorageOptions,
): Promise<Maybe<T>> {
  if (!isLocalSupported) {
    options.schema = 'indexeddb'
  }

  return new Promise((res) => {
    const item = isLocalSupported ? localStorage.getItem(key) : false

    if (item)
      res(
        item ? destr(options.compress ? lz.decompress(item) : item) : undefined,
      )

    indexeddb
      .get<T>(key)
      .then((value) => {
        res(
          value
            ? destr(options.compress ? lz.decompress(value) : value)
            : undefined,
        )
      })
      .catch(() => {
        res(undefined)
      })
  })
}

export function exclude(key: string) {
  indexeddb.del(key).catch(() => {})
  if (isLocalSupported) localStorage.removeItem(key)
}
