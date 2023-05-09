import * as indexeddb from 'idb-keyval'
import destr from 'destr'
import lz from 'lz-string'
import type { ClientStorageOptions, Maybe } from 'better-write-types'

export function set<T extends unknown>(
  key: string,
  data: T,
  options: ClientStorageOptions
) {
  return new Promise((res) => {
    const str = JSON.stringify(data)
    const strResolved = options.compress ? lz.compress(str) : str

    if (options.schema === 'indexeddb') {
      localStorage.removeItem(key)

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
  options: ClientStorageOptions
): Promise<Maybe<T>> {
  return new Promise((res) => {
    const item = localStorage.getItem(key)

    if (item)
      res(
        item ? destr(options.compress ? lz.decompress(item) : item) : undefined
      )

    indexeddb
      .get<T>(key)
      .then((value) => {
        res(
          value
            ? destr(options.compress ? lz.decompress(value) : value)
            : undefined
        )
      })
      .catch(() => {
        res(undefined)
      })
  })
}

export function exclude(key: string) {
  indexeddb.del(key).catch(() => {})
  localStorage.removeItem(key)
}
