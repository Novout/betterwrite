// in-memory IndexedDB (happy-dom has none); must load before idb-keyval
import 'fake-indexeddb/auto'
import { describe, it, expect, beforeEach } from 'vitest'
import { clear } from 'idb-keyval'
import { createProjectsStorage } from '../projects'
import { set, get } from '../index'
import type {
  ClientStorageOptions,
  ClientStorageSchema,
} from 'better-write-types'

const LEGACY = '__BW_TEST__'

describe.each<ClientStorageSchema>(['indexeddb', 'local-storage'])(
  'createProjectsStorage (%s)',
  (schema) => {
    const options = (): ClientStorageOptions => ({ schema, compress: true })

    let n = 0
    const create = () =>
      createProjectsStorage({
        prefix: `${LEGACY}:projects`,
        options,
        legacyKey: LEGACY,
        legacyMeta: (data) => ({
          name: data.project.nameRaw,
          type: data.project.type,
        }),
        createId: () => `id-${++n}`,
      })

    const project = (nameRaw: string, localId?: string) => ({
      project: { nameRaw, type: 'creative', localId },
    })

    const tick = () => new Promise((r) => setTimeout(r, 5))

    describe('registry', () => {
      beforeEach(async () => {
        localStorage.clear()
        await clear()
        n = 0
      })

      it('saves and loads several projects independently', async () => {
        const store = create()

        await store.save('a', project('Book A', 'a'), { name: 'Book A' })
        await store.save('b', project('Book B', 'b'), { name: 'Book B' })

        expect((await store.load<any>('a'))?.project.nameRaw).toBe('Book A')
        expect((await store.load<any>('b'))?.project.nameRaw).toBe('Book B')
        expect((await store.list()).map((p) => p.id).sort()).toEqual(['a', 'b'])
      })

      it('lists the most recently updated first and keeps createdAt', async () => {
        const store = create()

        await store.save('a', project('A'), { name: 'A' })
        await tick()
        await store.save('b', project('B'), { name: 'B' })
        const createdA = (await store.list()).find(
          (p) => p.id === 'a',
        )!.createdAt

        await tick()
        await store.save('a', project('A2'), { name: 'A2' })

        const list = await store.list()
        expect(list.map((p) => p.id)).toEqual(['a', 'b'])
        expect(list[0].name).toBe('A2')
        expect(list[0].createdAt).toBe(createdA)
        expect(list[0].updatedAt > list[0].createdAt).toBe(true)
      })

      it('tracks the active project (last saved) and falls back to the newest', async () => {
        const store = create()

        await store.save('a', project('A'), { name: 'A' })
        await store.save('b', project('B'), { name: 'B' })
        expect(await store.getActive()).toBe('b')

        await store.setActive('a')
        expect(await store.getActive()).toBe('a')

        await store.remove('a')
        expect(await store.getActive()).toBe('b')
      })

      it('removes a project from the index and its data', async () => {
        const store = create()

        await store.save('a', project('A'), { name: 'A' })
        await store.remove('a')

        expect(await store.list()).toEqual([])
        expect(await store.load('a')).toBeUndefined()
      })

      it('migrates the legacy single-project key once, without data loss', async () => {
        await set(LEGACY, project('Old Book'), options())

        const store = create()
        const list = await store.list()

        expect(list).toHaveLength(1)
        expect(list[0]).toMatchObject({
          id: 'id-1',
          name: 'Old Book',
          type: 'creative',
        })
        expect(await store.getActive()).toBe('id-1')

        const migrated = await store.load<any>('id-1')
        expect(migrated.project.nameRaw).toBe('Old Book')
        expect(migrated.project.localId).toBe('id-1')

        // legacy key removed only after the copy
        expect(await get(LEGACY, options())).toBeUndefined()

        // a new instance does not duplicate it
        expect(await create().list()).toHaveLength(1)
      })

      it('does not duplicate the legacy project when instances migrate concurrently', async () => {
        await set(LEGACY, project('Old Book'), options())

        // several components create their own registry at startup
        const results = await Promise.all([
          create().list(),
          create().list(),
          create().list(),
        ])

        expect(results.map((r) => r.length)).toEqual([1, 1, 1])
        expect(await create().list()).toHaveLength(1)
      })

      it('keeps the localId of a legacy project that already had one', async () => {
        await set(LEGACY, project('Old', 'keep-me'), options())

        const list = await create().list()

        expect(list[0].id).toBe('keep-me')
      })
    })

    // page close: async writes are not awaited by the browser, so a
    // synchronous snapshot is written and recovered on the next start
    describe('emergency snapshot', () => {
      beforeEach(async () => {
        localStorage.clear()
        await clear()
        n = 0
      })

      it('is written synchronously', () => {
        const ok = create().saveSnapshot('a', project('A'), { name: 'A' })

        expect(ok).toBe(true)
        expect(
          Object.keys(localStorage).some((k) => k.includes(':snapshot:a')),
        ).toBe(true)
      })

      it('recovers a snapshot newer than the last save (closed before saving)', async () => {
        const store = create()
        await store.save('a', project('Before'), { name: 'Before' })
        await tick()

        // page closes: only the synchronous snapshot lands
        store.saveSnapshot('a', project('After close'), { name: 'After close' })

        // next start
        const next = create()
        expect((await next.load<any>('a'))?.project.nameRaw).toBe('After close')
        expect((await next.list())[0].name).toBe('After close')
        expect(
          Object.keys(localStorage).some((k) => k.includes(':snapshot:')),
        ).toBe(false)
      })

      it('discards a snapshot older than a save that finished later', async () => {
        const store = create()
        store.saveSnapshot('a', project('Snapshot'), { name: 'Snapshot' })
        await tick()
        // the async save managed to finish after the snapshot
        await store.save('a', project('Saved'), { name: 'Saved' })

        const next = create()
        expect((await next.load<any>('a'))?.project.nameRaw).toBe('Saved')
        expect(
          Object.keys(localStorage).some((k) => k.includes(':snapshot:')),
        ).toBe(false)
      })

      it('adds a project that only exists in the snapshot', async () => {
        create().saveSnapshot('new', project('Never saved'), {
          name: 'Never saved',
        })

        const list = await create().list()

        expect(list.map((p) => p.name)).toEqual(['Never saved'])
      })

      it('a save does not consume the snapshot written just before it', async () => {
        const store = create()
        await store.save('a', project('Old'), { name: 'Old' })
        await tick()

        // exit save: snapshot first, then the regular save starts
        store.saveSnapshot('a', project('Exit'), { name: 'Exit' })
        const pending = Object.keys(localStorage).filter((k) =>
          k.includes(':snapshot:'),
        )
        await store.save('a', project('Exit'), { name: 'Exit' })

        // still there: if the page had died before the commit, it is the
        // only copy (it is dropped on the next start, being older)
        expect(pending.every((k) => localStorage.getItem(k))).toBe(true)
      })

      // the failure can only be injected in IndexedDB: happy-dom's
      // localStorage.setItem used by client-storage bypasses Storage.prototype
      it.runIf(schema === 'indexeddb')(
        'keeps the snapshot when writing it to storage fails',
        async () => {
          const store = create()
          await store.save('a', project('Old'), { name: 'Old' })
          await tick()
          store.saveSnapshot('a', project('Rescued'), { name: 'Rescued' })

          // storage broken on this start (`set` swallows the error, so only the
          // read-back check can notice it)
          const put = IDBObjectStore.prototype.put
          IDBObjectStore.prototype.put = function () {
            throw new Error('write failed')
          } as any

          try {
            await create().list()
          } finally {
            IDBObjectStore.prototype.put = put
          }

          expect(
            Object.keys(localStorage).some((k) => k.includes(':snapshot:a')),
          ).toBe(true)

          // next start with storage working: recovered
          expect((await create().load<any>('a'))?.project.nameRaw).toBe(
            'Rescued',
          )
        },
      )

      it('does not bring back a removed project', async () => {
        const store = create()
        await store.save('a', project('A'), { name: 'A' })
        store.saveSnapshot('a', project('A2'), { name: 'A2' })

        await store.remove('a')

        expect(await create().list()).toEqual([])
      })
    })
  },
)
