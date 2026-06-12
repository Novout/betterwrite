import { ContextState, PluginTypes } from 'better-write-types'
import { On } from 'better-write-plugin-core'
import { Epub, ready } from 'epub-gen3/browser'

export const PluginEpubSet = (
  emitter: PluginTypes.PluginEmitter,
  stores: PluginTypes.PluginStores,
  hooks: PluginTypes.PluginHooks,
) => {
  const contents = (): string[][] => {
    const raw: string[][] = []

    stores.PROJECT.chapters.forEach(({ entities: list }: ContextState) => {
      let data = []

      for (const entity of list) {
        data.push(hooks.substitution.purge(entity.raw))
      }

      raw.push(data)
    })

    return raw
  }

  const generate = async () => {
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
      contents()
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
    () => {
      generate()
    },
    () => {},
  ])
}
