import { Callback } from '@/types/utils'

export const useIndexedDB: Callback<any> = () => {
  const supports = (): boolean => {
    return window.indexedDB ? true : false
  }

  const open = (
    obj: Record<string, any>,
    cb?: Callback<any>
  ): IDBOpenDBRequest => {
    if (!supports()) {
      alert('kekw')
    }

    const db = window.indexedDB.open(obj.name, obj.version)

    db.onerror = (event: any) => {
      console.error(`Database error: ${event.target.errorCode}`)
    }

    db.onsuccess = (event: any) => {}
    ;(db as any).onupgradeneeded((event: any) => {
      const database = event.target.result

      const _store = database.createObjectStore('Contacts', {
        autoIncrement: true,
      })

      let index = _store.createIndex('email', 'email', {
        unique: true,
      })

      const txn = database.transaction('Contacts', 'readwrite')

      // get the Contacts object store
      const store = txn.objectStore('Contacts')
      //
      let query = store.put({ email: 'email', test: 'test' })

      // handle success case
      query.onsuccess = function (event: any) {
        console.log(event)
      }

      // handle the error case
      query.onerror = function (event: any) {
        console.log(event.target.errorCode)
      }

      // close the database once the
      // transaction completes
      txn.oncomplete = function () {
        database.close()
      }
    })

    return db
  }

  const createTables = (obj: Record<any, any>) => {
    open(obj).onupgradeneeded
  }

  return { open }
}
