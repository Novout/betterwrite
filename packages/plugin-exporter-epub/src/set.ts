import { ContextState, Entity, EPUBDocOptions, PluginTypes } from 'better-write-types'
import { On } from 'better-write-plugin-core'
// @ts-ignore
import { Epub, ready } from 'epub-gen3/browser'

const bionicWord = (word: string): string => {
  const len = Math.ceil(word.length * 0.45)
  return `<b>${word.slice(0, len)}</b>${word.slice(len)}`
}

const bionicHtml = (text: string): string => {
  return text.replace(/(\S+)/g, (word) => {
    // skip html tags
    if (word.startsWith('<')) return word
    return bionicWord(word)
  })
}

export const PluginEpubSet = (
  emitter: PluginTypes.PluginEmitter,
  stores: PluginTypes.PluginStores,
  hooks: PluginTypes.PluginHooks,
) => {
  const isValidType = (val: Entity) => {
    return (
      !hooks.entity.utils().isFixedRaw(val.raw) &&
      val.type !== 'image' &&
      val.type !== 'drau'
    )
  }

  const contents = (options: EPUBDocOptions): string[][] => {
    const raw: string[][] = []

    stores.PROJECT.chapters.forEach(({ entities: list }: ContextState) => {
      let data = []

      for (const entity of list) {
        if (isValidType(entity)) {
          const purged = hooks.substitution.purge(entity.raw)
          data.push(options.bionicReading ? bionicHtml(purged) : purged)
        }
      }

      raw.push(data)
    })

    return raw
  }

  const generate = async (options: EPUBDocOptions) => {
    await ready

    const epub = new Epub(
      {
        title: stores.PROJECT.nameRaw,
        author: stores.PROJECT.creator,
        description: stores.PROJECT.subject,
        publisher: stores.PROJECT.producer,
        tocTitle: stores.PROJECT.nameRaw ?? undefined,
        lang: 'en',
        fonts: [],
        version: 3,
      },
      contents(options)
    )

    download(epub, stores.PROJECT.nameRaw)
  }

  const download = (epub: Epub, title: string) => {
    const bytes = epub.archive()
    const blob  = new Blob([bytes as any], { type: 'application/epub+zip' })
    const url   = URL.createObjectURL(blob)
    const a     = Object.assign(document.createElement('a'), { href: url, download: `${title}.epub` })
    a.click()

    hooks.toast.success(hooks.i18n.t('toast.project.epub.generate'))
  }

  On.externals().PluginEpubGenerate(emitter, [
    (options: EPUBDocOptions) => {
      generate(options ?? { bionicReading: false })
    },
    () => {},
  ])
}
