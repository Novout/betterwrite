/**
 * PreMiD activity for Better Write (https://betterwrite.io)
 *
 * The editor publishes its state in:
 *   <meta name="betterwrite:presence" content='{"v":1,...}'>
 * (see packages/app/src/use/presence.ts). The meta tag is only present while
 * a project is open in the editor and the user has "Discord Presence" enabled.
 */

// @ts-ignore
const presence = new Presence({
  // Discord application ID (create one at https://discord.com/developers/applications)
  clientId: '1573085667850850569',
})

const enum Assets {
  Logo = 'https://betterwrite.io/icon_x512.png',
}

interface BetterWritePresence {
  v: 1
  kind: 'chapter' | 'document' | 'annotations'
  project: string
  title: string
  chapter?: { index: number, total: number }
  words: number
  startedAt: number
}

function readEditorState(): BetterWritePresence | null {
  const meta = document.querySelector<HTMLMetaElement>(
    'meta[name="betterwrite:presence"]',
  )

  if (!meta?.content)
    return null

  try {
    const data = JSON.parse(meta.content) as BetterWritePresence
    return data?.v === 1 ? data : null
  }
  catch {
    return null
  }
}

const browsingTimestamp = Math.floor(Date.now() / 1000)

presence.on('UpdateData', async () => {
  const [showTitle, showProject, showWords, showTimestamp] = await Promise.all([
    presence.getSetting<boolean>('showTitle'),
    presence.getSetting<boolean>('showProject'),
    presence.getSetting<boolean>('showWords'),
    presence.getSetting<boolean>('showTimestamp'),
  ])

  const presenceData: any = {
    largeImageKey: Assets.Logo,
    largeImageText: 'Better Write',
  }

  const state = readEditorState()

  if (!state) {
    // landing, about, or editor with presence disabled
    presenceData.details = 'Browsing'
    if (showTimestamp)
      presenceData.startTimestamp = browsingTimestamp

    presence.setActivity(presenceData)
    return
  }

  const words = showWords ? ` · ${state.words.toLocaleString()} words` : ''

  switch (state.kind) {
    case 'chapter': {
      const chapter = state.chapter
        ? `Chapter ${state.chapter.index}/${state.chapter.total}`
        : 'Writing a chapter'

      presenceData.details = showTitle ? `✍️ ${state.title}` : chapter
      presenceData.state = showProject
        ? `${state.project} · ${chapter}${words}`
        : `${chapter}${words}`
      break
    }
    case 'document': {
      presenceData.details = showTitle
        ? `✍️ ${state.title}`
        : 'Writing a document'
      presenceData.state = showProject
        ? `${state.project}${words}`
        : words.replace(' · ', '') || undefined
      break
    }
    case 'annotations': {
      presenceData.details = 'Editing annotations'
      presenceData.state = showProject ? state.project : undefined
      break
    }
  }

  if (showTimestamp)
    presenceData.startTimestamp = Math.floor(state.startedAt / 1000)

  presence.setActivity(presenceData)
})
