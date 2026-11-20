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
  },
)
