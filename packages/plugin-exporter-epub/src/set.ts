import { saveAs } from 'file-saver'
import { ContextState, Entity, PluginTypes } from 'better-write-types'
import { On } from 'better-write-plugin-core'
import { getRows, parse } from 'better-write-contenteditable-ast'
import EPUB, { Chapter } from 'epub-gen-memory/bundle'
import { getStyles } from './styles'

export const PluginEpubSet = (
  emitter: PluginTypes.PluginEmitter,
  stores: PluginTypes.PluginStores,
  hooks: PluginTypes.PluginHooks,
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

    const image = (entity: Entity) => {
      return `<div><img src="${entity.raw}" alt=""></div>`
    }

    const svg = (entity: Entity) => {
      return `<div>${entity.raw}</div>`
    }

    const checkbox = (entity: Entity) => {
      const id = String(hooks.utils.id().uuidv4())

      return `<div><input type="checkbox" name="${id}" id="${id}" ${
        entity?.external?.checkbox?.select ? `checked` : ''
      }>
<label for="${id}">${hooks.substitution.purge(entity.raw)}</label></div>`
    }

    const list = (entity: Entity) => {
      return `<ul><li style="list-style-type: square;">${hooks.substitution.purge(
        entity.raw,
      )}</li></ul>`
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
          // boldItalics
          if (item.italic && item.bold)
            return (acc += item.text.trim() ? `<i><b>${item.text}</b></i>` : '')

          // italics
          if (item.italic)
            return (acc += item.text.trim() ? `<i>${item.text}</i>` : '')

          // bold
          if (item.bold)
            return (acc += item.text.trim() ? `<b>${item.text}</b>` : '')

          // common case
          return (acc += item.text.trim() ? `<span>${item.text}</span>` : '')
        }, '')
      })
    }

    const pageBreak = () => {
      return `<div style="page-break-after: always;"></div>`
    }

    const lineBreak = () => {
      return '<div style="width: 100%;height:16px;border: none;"></div>'
    }

    return {
      paragraph,
      headingOne,
      headingTwo,
      headingThree,
      image,
      svg,
      checkbox,
      list,
      pageBreak,
      lineBreak,
    }
  }

  const contents = (): Chapter[] => {
    const chapters: Chapter[] = []

    stores.PROJECT.chapters.forEach(({ entities: list }: ContextState) => {
      const chapter = {
        title: '',
        content: '',
      }

      for (const entity of list) {
        switch (entity.type) {
          case 'checkbox':
            chapter.content += entities().checkbox(entity)
            break
          case 'list':
            chapter.content += entities().list(entity)
            break
          case 'paragraph':
            entities()
              .paragraph(entity)
              ?.forEach(
                (paragraph) => (chapter.content += `<p>${paragraph}</p>`),
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
          case 'image':
            chapter.content += entities().image(entity)
            break
          case 'drau':
            chapter.content += entities().svg(entity)
            break
        }
      }

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
        tocInTOC: stores.PROJECT.type === 'creative',
        date: new Date().toString(),
        css: getStyles(stores, hooks),
        cover: undefined,
      },
      contents(),
    ).then(
      (content) => download(content),
      (_) => hooks.toast.error(hooks.i18n.t('toast.generics.error')),
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
