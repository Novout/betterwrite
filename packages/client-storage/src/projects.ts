import type { ClientStorageOptions, Maybe } from 'better-write-types'
import { get, set, exclude } from './index'

/**
 * Registry of multiple projects saved locally.
 *
 * Keys (all under `prefix`):
 *   `${prefix}:index`          → StoredProjectMeta[] (small, used for listing)
 *   `${prefix}:project:${id}`  → full project data
 *   `${prefix}:active`         → id of the last opened/saved project
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
// and concurrent migrations would duplicate the legacy project
const migrations = new Map<string, Promise<void>>()

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

  const readIndex = async (): Promise<StoredProjectMeta[]> => {
    const index = await get<StoredProjectMeta[]>(indexKey, options())
    return Array.isArray(index) ? index : []
  }

  const writeIndex = (index: StoredProjectMeta[]) =>
    set(indexKey, index, options())

  /** moves the old single saved project into the registry (runs once) */
  const migrate = () => {
    if (!legacyKey) return Promise.resolve()

    const running = migrations.get(legacyKey)
    if (running) return running

    const migration = (async () => {
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
    })()
      // on failure the legacy key stays untouched and is retried next call
      .catch(() => {})
      // only deduplicates concurrent calls; later calls re-check the (now
      // removed) legacy key, which is a single cheap read
      .finally(() => migrations.delete(legacyKey))

    migrations.set(legacyKey, migration)

    return migration
  }

  /** saved projects, most recently updated first */
  const list = async (): Promise<StoredProjectMeta[]> => {
    await migrate()

    const index = await readIndex()

    return [...index].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
  }

  const load = async <T>(id: string): Promise<Maybe<T>> => {
    await migrate()

    return get<T>(projectKey(id), options())
  }

  const save = async <T>(
    id: string,
    data: T,
    meta: Pick<StoredProjectMeta, 'name' | 'type'>,
  ) => {
    await migrate()

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

  const remove = async (id: string) => {
    await migrate()

    const index = await readIndex()
    await writeIndex(index.filter((p) => p.id !== id))
    exclude(projectKey(id))

    if ((await get<string>(activeKey, options())) === id) exclude(activeKey)
  }

  const getActive = async (): Promise<Maybe<string>> => {
    await migrate()

    const id = await get<string>(activeKey, options())
    if (id) return id

    // fallback: most recent project
    return (await list())[0]?.id
  }

  const setActive = (id: string) => set(activeKey, id, options())

  return { list, load, save, remove, getActive, setActive }
}

export type ProjectsStorage = ReturnType<typeof createProjectsStorage>
