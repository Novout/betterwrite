import { saveAs } from 'file-saver'
import { ContextState, Entity, PluginTypes } from 'better-write-types'
import { On } from 'better-write-plugin-core'
import { getRows, parse } from 'better-write-contenteditable-ast'
import EPUB, { Chapter } from 'epub-gen-memory/bundle'
import { getStyles } from './styles'

export const PluginEpubSet = (
  emitter: PluginTypes.PluginEmitter,
  stores: PluginTypes.PluginStores,
  hooks: PluginTypes.PluginHooks
) => {
  const entities = () => {
    const headingOne = (entity: Entity) => {
      return hooks.substitution.purge(entity.raw)
    }

    const headingTwo = (entity: Entity) => {
      return `<h2>${hooks.substitution.purge(entity.raw)}</h2>`
    }

    const headingThree = (entity: Entity) => {
      return `<h3>${hooks.substitution.purge(entity.raw)}</h3>`
    }

    const paragraph = (entity: Entity): string[] => {
      if (
        hooks.env.emptyLine() === entity.raw ||
        entity.raw === '' ||
        entity.raw === ' '
      )
        return [lineBreak()]

      return getRows(entity.raw).map((row) => {
        const target = parse(hooks.substitution.purge(row))

        return target.reduce((acc, item) => {
          return (acc += item.text.trim() ? `<span>${item.text}</span>` : '')
        }, '')
      })
    }

    const pageBreak = () => {
      return `<span style="page-break-after: always"></span>`
    }

    const lineBreak = () => {
      return '<span style="width: 100%;padding-top: 1rem;border: none;"></span>'
    }

    return {
      paragraph,
      headingOne,
      headingTwo,
      headingThree,
      pageBreak,
      lineBreak,
    }
  }

  const contents = (): Chapter[] => {
    const chapters: Chapter[] = []

    stores.PROJECT.pages.forEach((page: ContextState) => {
      const chapter = {
        title: '',
        content: '',
      }

      page.entities.forEach((entity: Entity) => {
        switch (entity.type) {
          case 'paragraph':
          case 'list':
          case 'checkbox':
            entities()
              .paragraph(entity)
              ?.forEach(
                (paragraph) => (chapter.content += `<p>${paragraph}</p>`)
              )
            break
          case 'heading-one':
            chapter.title = entities().headingOne(entity)
            break
          case 'heading-two':
            chapter.content += entities().headingTwo(entity)
            break
          case 'heading-three':
            chapter.content += entities().headingThree(entity)
            break
          case 'page-break':
            chapter.content += entities().pageBreak()
            break
          case 'line-break':
            chapter.content += entities().lineBreak()
            break
        }
      })

      chapters.push(chapter)
    })

    return chapters
  }

  const generate = () => {
    EPUB(
      {
        title: stores.PROJECT.nameRaw,
        author: stores.PROJECT.creator,
        description: stores.PROJECT.subject,
        publisher: stores.PROJECT.producer,
        tocTitle: hooks.i18n.t('editor.bar.epub.table') ?? undefined,
        date: new Date().toString(),
        css: getStyles(stores, hooks),
        cover: stores.PDF.styles.base.background.data ?? undefined,
      },
      contents()
    ).then(
      (content) => download(content),
      (_) => hooks.toast.error(hooks.i18n.t('toast.generics.error'))
    )
  }

  const download = (blob: Blob) => {
    saveAs(blob, hooks.project.utils().exportFullName('epub'))

    hooks.toast.success(hooks.i18n.t('toast.project.epub.generate'))
  }

  On.externals().PluginEpubGenerate(emitter, [
    () => {
      generate()
    },
    () => {},
  ])
}
