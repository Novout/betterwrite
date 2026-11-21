import type { ClientStorageOptions, Maybe } from 'better-write-types'
import lz from 'lz-string'
import { get, set, exclude } from './index'

/**
 * Registry of multiple projects saved locally.
 *
 * Keys (all under `prefix`):
 *   `${prefix}:index`          → StoredProjectMeta[] (small, used for listing)
 *   `${prefix}:project:${id}`  → full project data
 *   `${prefix}:active`         → id of the last opened/saved project
 *   `${prefix}:snapshot:${id}` → emergency copy written on page close
 *                                (always localStorage, see `saveSnapshot`)
 *
 * Data goes through `set`/`get`, so it follows the same schema
 * (localStorage / IndexedDB) and compression as the rest of the app.
 */

export interface StoredProjectMeta {
  id: string
  name: string
  type?: string
  createdAt: string
  updatedAt: string
}

export interface ProjectsStorageOptions {
  /** base key, e.g. the old single-project key */
  prefix: string
  /** read on every call, so schema/compression changes apply immediately */
  options: () => ClientStorageOptions
  /** previous single-project key, migrated once into the registry */
  legacyKey?: string
  /** builds the metadata of a migrated legacy project */
  legacyMeta?: (data: any) => Pick<StoredProjectMeta, 'name' | 'type'>
  /** id generator for migrated projects */
  createId?: () => string
}

const now = () => new Date().toISOString()

// shared by every instance: the app creates one registry per composable call,
// and concurrent migrations/recoveries would duplicate projects
const preparations = new Map<string, Promise<void>>()

const hasLocalStorage = () => {
  try {
    return typeof localStorage !== 'undefined'
  } catch {
    return false
  }
}

interface Snapshot<T = unknown> {
  savedAt: string
  meta: Pick<StoredProjectMeta, 'name' | 'type'>
  data: T
}

const defaultId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`

export function createProjectsStorage({
  prefix,
  options,
  legacyKey,
  legacyMeta,
  createId = defaultId,
}: ProjectsStorageOptions) {
  const indexKey = `${prefix}:index`
  const activeKey = `${prefix}:active`
  const projectKey = (id: string) => `${prefix}:project:${id}`
  const snapshotPrefix = `${prefix}:snapshot:`

  const readIndex = async (): Promise<StoredProjectMeta[]> => {
    const index = await get<StoredProjectMeta[]>(indexKey, options())
    return Array.isArray(index) ? index : []
  }

  const writeIndex = (index: StoredProjectMeta[]) =>
    set(indexKey, index, options())

  /** writes a project and its index entry (no preparation step) */
  const write = async <T>(
    id: string,
    data: T,
    meta: Pick<StoredProjectMeta, 'name' | 'type'>,
  ) => {
    const index = await readIndex()
    const current = index.find((p) => p.id === id)
    const date = now()

    const entry: StoredProjectMeta = {
      id,
      ...meta,
      createdAt: current?.createdAt ?? date,
      updatedAt: date,
    }

    await set(projectKey(id), data, options())
    await writeIndex([entry, ...index.filter((p) => p.id !== id)])
    await set(activeKey, id, options())

    return entry
  }

  /** moves the old single saved project into the registry (runs once) */
  const migrate = async () => {
    if (!legacyKey) return

    try {
      const legacy = await get<any>(legacyKey, options())
      if (!legacy) return

      const index = await readIndex()
      const id = legacy?.project?.localId || createId()

      if (!index.some((p) => p.id === id)) {
        if (legacy?.project) legacy.project.localId = id

        const meta = legacyMeta?.(legacy) ?? { name: 'Project' }
        const date = now()

        await set(projectKey(id), legacy, options())
        await writeIndex([
          { id, ...meta, createdAt: date, updatedAt: date },
          ...index,
        ])

        if (!(await get<string>(activeKey, options())))
          await set(activeKey, id, options())
      }

      // only removed after the copy above succeeded
      exclude(legacyKey)
    } catch {
      // the legacy key stays untouched and is retried next call
    }
  }

  /**
   * Promotes emergency snapshots (written on page close) that are newer than
   * the saved project. Snapshots older or equal to the save are discarded:
   * the regular save already finished after them.
   */
  const recoverSnapshots = async () => {
    if (!hasLocalStorage()) return

    const keys = Object.keys(localStorage).filter((k) =>
      k.startsWith(snapshotPrefix),
    )
    if (!keys.length) return

    const index = await readIndex()

    for (const key of keys) {
      const id = key.slice(snapshotPrefix.length)

      try {
        const raw = localStorage.getItem(key)
        const snapshot: Snapshot | null = raw
          ? JSON.parse(lz.decompress(raw) || 'null')
          : null

        const saved = index.find((p) => p.id === id)

        if (snapshot && (!saved || snapshot.savedAt > saved.updatedAt)) {
          await write(id, snapshot.data, snapshot.meta)

          // `set` swallows storage errors, so confirm the copy by reading it
          // back before dropping the only other copy of the data
          const stored = await get(projectKey(id), options())
          if (JSON.stringify(stored) !== JSON.stringify(snapshot.data)) continue
        }

        localStorage.removeItem(key)
      } catch {
        // keep it, try again next time
      }
    }
  }

  // deduplicates concurrent calls across instances; later calls re-check,
  // which is a couple of cheap reads once there is nothing left to do
  const once = (key: string, task: () => Promise<void>) => {
    const running = preparations.get(key)
    if (running) return running

    const promise = task()
      .catch(() => {})
      .finally(() => preparations.delete(key))

    preparations.set(key, promise)

    return promise
  }

  const runMigration = () => once(`${prefix}:migrate`, migrate)

  /**
   * Reads (list/load/getActive) migrate and recover snapshots. Writes only
   * migrate: recovering inside `save` would consume the snapshot that the
   * exit save has just written, before its own IndexedDB write commits.
   */
  const prepare = async () => {
    await runMigration()
    await once(`${prefix}:recover`, recoverSnapshots)
  }

  /**
   * Synchronous emergency copy for page close (`pagehide`/`beforeunload`).
   * Browsers don't wait for async work (IndexedDB) while unloading, but a
   * synchronous localStorage write always lands. It is promoted to the
   * registry on the next start if it is newer than the regular save.
   *
   * Returns false when it can't be written (e.g. quota exceeded by images).
   */
  const saveSnapshot = <T>(
    id: string,
    data: T,
    meta: Pick<StoredProjectMeta, 'name' | 'type'>,
  ): boolean => {
    if (!hasLocalStorage()) return false

    try {
      const snapshot: Snapshot<T> = { savedAt: now(), meta, data }
      localStorage.setItem(
        snapshotPrefix + id,
        lz.compress(JSON.stringify(snapshot)),
      )
      return true
    } catch {
      return false
    }
  }

  /** saved projects, most recently updated first */
  const list = async (): Promise<StoredProjectMeta[]> => {
    await prepare()

    const index = await readIndex()

    return [...index].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
  }

  const load = async <T>(id: string): Promise<Maybe<T>> => {
    await prepare()

    return get<T>(projectKey(id), options())
  }

  const save = async <T>(
    id: string,
    data: T,
    meta: Pick<StoredProjectMeta, 'name' | 'type'>,
  ) => {
    await runMigration()

    return write(id, data, meta)
  }

  const remove = async (id: string) => {
    await prepare()

    // a pending emergency copy must not bring the project back
    if (hasLocalStorage()) localStorage.removeItem(snapshotPrefix + id)

    const index = await readIndex()
    await writeIndex(index.filter((p) => p.id !== id))
    exclude(projectKey(id))

    if ((await get<string>(activeKey, options())) === id) exclude(activeKey)
  }

  const getActive = async (): Promise<Maybe<string>> => {
    await prepare()

    const id = await get<string>(activeKey, options())
    if (id) return id

    // fallback: most recent project
    return (await list())[0]?.id
  }

  const setActive = (id: string) => set(activeKey, id, options())

  return { list, load, save, saveSnapshot, remove, getActive, setActive }
}

export type ProjectsStorage = ReturnType<typeof createProjectsStorage>
