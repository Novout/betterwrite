import { computed } from 'vue'
import { tryOnUnmounted, watchDebounced } from '@vueuse/core'
import { Entity } from 'better-write-types'
import { useProjectStore } from '@/store/project'
import { useContextStore } from '@/store/context'
import { useEditorStore } from '@/store/editor'
import { useEnv } from './env'

/**
 * Discord Rich Presence bridge.
 *
 * Browsers can't talk to the Discord client directly, so the editor publishes
 * what is being written in a `<meta name="betterwrite:presence">` tag.
 * The PreMiD activity (`integrations/premid/`) reads it and updates Discord.
 *
 * Nothing leaves the browser by itself: data only reaches Discord if the user
 * has the PreMiD extension installed, and the option can be disabled in
 * Preferences → Configuration.
 */

export const PRESENCE_META_NAME = 'betterwrite:presence'

export type PresenceKind = 'chapter' | 'document' | 'annotations'

export interface PresencePayload {
  v: 1
  kind: PresenceKind
  project: string
  title: string
  chapter?: { index: number; total: number }
  words: number
  startedAt: number
}

const stripHtml = (raw: string) =>
  raw
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .trim()

const truncate = (text: string, max = 100) =>
  text.length > max ? `${text.slice(0, max - 1)}…` : text

const isHeading = (entity?: Entity) =>
  !!entity && entity.type.startsWith('heading')

export const usePresence = () => {
  const PROJECT = useProjectStore()
  const CONTEXT = useContextStore()
  const EDITOR = useEditorStore()
  const env = useEnv()

  const startedAt = Date.now()

  const isValidText = (raw?: string) =>
    !!raw && raw !== env.emptyLine() && stripHtml(raw).length > 0

  const chapterTitle = () => {
    const heading = CONTEXT.entities.find((e) => e.type === 'heading-one')

    return isValidText(heading?.raw)
      ? stripHtml(heading!.raw)
      : stripHtml(CONTEXT.title || '')
  }

  // blank projects have no chapters: use the nearest heading above the caret
  const documentTitle = () => {
    const active = EDITOR.actives.entity.index

    for (let i = Math.min(active, CONTEXT.entities.length - 1); i >= 0; i--) {
      const entity = CONTEXT.entities[i]

      if (isHeading(entity) && isValidText(entity.raw))
        return stripHtml(entity.raw)
    }

    return PROJECT.nameRaw
  }

  const words = () =>
    CONTEXT.entities.reduce((total, entity) => {
      if (!isValidText(entity.raw) || entity.type !== 'paragraph') return total

      return total + stripHtml(entity.raw).split(/\s+/).filter(Boolean).length
    }, 0)

  const payload = computed((): PresencePayload | null => {
    if (EDITOR.configuration.discordPresence === false) return null

    if (!PROJECT.nameRaw || env.isEmptyProject(PROJECT.name)) return null

    const base = {
      v: 1 as const,
      project: truncate(PROJECT.nameRaw),
      words: words(),
      startedAt,
    }

    if (PROJECT.base === 'annotations' || PROJECT.type === 'only-annotations')
      return { ...base, kind: 'annotations', title: truncate(PROJECT.nameRaw) }

    if (PROJECT.type === 'blank')
      return { ...base, kind: 'document', title: truncate(documentTitle()) }

    const index = PROJECT.chapters.findIndex((c) => c.id === CONTEXT.id)

    return {
      ...base,
      kind: 'chapter',
      title: truncate(chapterTitle()),
      chapter: {
        index: index === -1 ? 1 : index + 1,
        total: PROJECT.chapters.length,
      },
    }
  })

  const getMeta = () =>
    document.head.querySelector<HTMLMetaElement>(
      `meta[name="${PRESENCE_META_NAME}"]`,
    )

  const write = (data: PresencePayload | null) => {
    let meta = getMeta()

    if (!data) {
      meta?.remove()
      return
    }

    if (!meta) {
      meta = document.createElement('meta')
      meta.name = PRESENCE_META_NAME
      document.head.appendChild(meta)
    }

    meta.content = JSON.stringify(data)
  }

  const init = () => {
    write(payload.value)

    watchDebounced(payload, write, { debounce: 1000, deep: true })

    tryOnUnmounted(() => write(null))
  }

  return { init, payload }
}
