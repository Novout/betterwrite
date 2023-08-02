import {
  HistoryStateBarItem,
  Maybe,
  PluginTypes,
  ProjectStateSchema,
  ProjectStateSchemaFile,
  ProjectStateSchemaFolder,
  MilkdownSlashMark,
} from 'better-write-types'
import { On } from 'better-write-plugin-core'
import {
  rootCtx,
  defaultValueCtx,
  Editor,
  editorViewOptionsCtx,
} from '@milkdown/core'
import { listener, listenerCtx } from '@milkdown/plugin-listener'
import { math } from '@milkdown/plugin-math'
import { clipboard } from '@milkdown/plugin-clipboard'
import { block } from '@milkdown/plugin-block'
import { history } from '@milkdown/plugin-history'
import { cursor } from '@milkdown/plugin-cursor'
import { trailing } from '@milkdown/plugin-trailing'
import { upload } from '@milkdown/plugin-upload'
import { commonmark } from '@milkdown/preset-commonmark'
import { ID } from 'better-write-types'
import { nextTick } from 'vue-demi'
import { ProjectStateSchemaCreate } from 'better-write-types'
import { slashFactory } from './plugins/slash/slash-plugin'
import { SlashProvider } from './plugins/slash/slash-provider'

export const PluginSchemasSet = (
  emitter: PluginTypes.PluginEmitter,
  stores: PluginTypes.PluginStores,
  hooks: PluginTypes.PluginHooks,
) => {
  function getSchema<T extends ProjectStateSchema>(id: ID<string>) {
    return stores.PROJECT.schemas.find((schema) => schema.id === id) as T
  }

  function getSchemaId<T extends ProjectStateSchema>(schema: T) {
    return stores.PROJECT.schemas.indexOf(schema)
  }

  const reset = (force: boolean = false) => {
    document.querySelector('.milkdown')?.remove()

    if (force)
      stores.PROJECT.base =
        stores.PROJECT.type === 'only-annotations' ? 'annotations' : 'chapter'
  }

  const setFile = (id: ID<string>, value: any) => {
    stores.PROJECT.schemas.forEach((schema) => {
      schema.folders.forEach((folder) => {
        folder.files.forEach((file) => {
          if (file.id === id) {
            file.milkdownData = value

            let text = ''

            try {
              text = value!.content[0]!.content[0]!.text
            } catch (e) {}

            // fileName reactivity
            if (text) {
              file.fileName = text
              if (file.extra?.id) file.extra.name = text

              stores.HISTORY.updateItemName(text, id)
            }
          }
        })
      })
    })
  }

  const getFile = (id: ID<string>): Maybe<ProjectStateSchemaFile> => {
    let _file: Maybe<ProjectStateSchemaFile> = undefined

    if (!id.startsWith('file-')) return _file

    stores.PROJECT.schemas.forEach((schema) => {
      schema.folders.forEach((folder) => {
        folder.files.forEach((file) => {
          if (file.id === id) {
            _file = file
          }
        })
      })
    })

    return _file
  }

  function createFile<T extends object = any>(
    folder: ProjectStateSchemaFolder,
  ): ProjectStateSchemaFile<T> {
    const schema = getSchema(folder.parentId)
    const schemaId = getSchemaId(schema)

    const genNameArr = hooks.defines.characters().names()
    const genName = genNameArr[Math.floor(Math.random() * genNameArr.length)]

    const file = {
      id: hooks.utils.id().nano({ prefix: 'file' }),
      parentId: folder.id,
      fileName:
        schema.type === 'characters'
          ? genName
          : hooks.i18n.t('editor.schemas.items.file'),
      milkdownData: {},
      extra:
        schema.type === 'characters'
          ? {
              id: hooks.utils.id().nano({ prefix: 'character' }),
              name: genName,
              nameCase: 'default',
              color: hooks.utils.text().randomColor(),
              colorAlpha: 0.2,
              important: false,
              configuration: false,
              disabled: false,
            }
          : {},
      customIcon: folder.customIcon,
    } as ProjectStateSchemaFile<T>

    const index = stores.PROJECT.schemas[schemaId].folders.indexOf(folder)

    // @ts-expect-error
    stores.PROJECT.schemas[schemaId].folders[index].files.push(file)

    return file
  }

  function createFolder<T extends object = any>(
    schema: ProjectStateSchema,
  ): ProjectStateSchemaFolder<T> {
    const folder = {
      id: hooks.utils.id().nano({ prefix: 'folder' }),
      parentId: schema.id,
      folderName: hooks.i18n.t('editor.schemas.items.folder'),
      files: [],
      customIcon: schema.customIcon,
    } as ProjectStateSchemaFolder<T>

    const schemaId = getSchemaId(schema)

    // @ts-expect-error
    stores.PROJECT.schemas[schemaId].folders.unshift(folder)

    return folder
  }

  function deleteFolder<T extends object = any>(
    folder: ProjectStateSchemaFolder<T>,
  ) {
    const schema = getSchema(folder.parentId)

    if (
      stores.PROJECT.type === 'only-annotations' &&
      schema.folders.length === 1
    )
      return

    reset(true)

    const schemaId = getSchemaId(schema)

    stores.PROJECT.schemas[schemaId].folders = stores.PROJECT.schemas[
      schemaId
    ].folders.filter((f) => f.id !== folder.id)

    setActive()
  }

  const setActive = () => {
    if (stores.PROJECT.type === 'only-annotations') {
      const schema = stores.PROJECT.schemas.find((schema) => {
        schema.folders.find((f) => f.files.find((f) => f))
      })

      if (!schema || schema?.folders?.length === 0)
        createFile(stores.PROJECT.schemas[0].folders[0])
      else if (schema.folders) start({ target: schema.folders[0].files[0] })
    }
  }

  function deleteFile<T extends object = any>(
    folder: ProjectStateSchemaFolder<T>,
    file: ProjectStateSchemaFile,
  ) {
    reset(true)

    const schema = getSchema(folder.parentId)

    const schemaId = getSchemaId(schema)

    if (schemaId === -1) return

    // @ts-expect-error
    const folderId = stores.PROJECT.schemas[schemaId].folders.indexOf(folder)

    if (schemaId === -1 || folderId === -1) return

    stores.PROJECT.schemas[schemaId].folders[folderId].files =
      stores.PROJECT.schemas[schemaId].folders[folderId].files.filter(
        (f) => f.id !== file.id,
      )

    setActive()
  }

  const start = async ({
    target: file,
    item,
  }: {
    target: ProjectStateSchemaFile
    item?: HistoryStateBarItem
  }) => {
    reset()

    stores.PROJECT.base = 'annotations'
    stores.HISTORY.addBar(hooks.factory.history().bar().schema(file))

    await nextTick

    const slash = slashFactory('prefix')
    const marks: MilkdownSlashMark[] = []

    stores.PROJECT.schemas.forEach((schema: ProjectStateSchema) => {
      const mark = {
        prefix: schema.prefix,
        links: [],
      } as MilkdownSlashMark

      schema.folders.forEach((folder) => {
        folder.files.forEach((file) => {
          mark.links.push({
            id: file.id,
            fullName: `${folder.folderName}/${file.fileName}`,
            name: file.fileName,
          })
        })
      })

      marks.push(mark)
    })

    const editor = await Editor.make()
      .config((ctx) => {
        const el = document.querySelector('#bw-wysiwyg') as HTMLDivElement

        ctx.set(rootCtx, el)

        const content = document.createElement('div')

        const provider = new SlashProvider({
          content,
          marks,
        })

        const slashPluginView = (view: any) => {
          return {
            update: (updatedView: any, prevState: any) => {
              provider.update(updatedView, prevState)
            },
            destroy: () => {
              provider.destroy()
              content.remove()
            },
          }
        }

        ctx.set(slash.key, {
          view: slashPluginView,
        })

        if (Object.keys(file.milkdownData).length !== 0) {
          ctx.set(defaultValueCtx, {
            type: 'json',
            value: file.milkdownData,
          })
        } else {
          ctx.set(
            defaultValueCtx,
            `# ${
              file?.extra?.name || hooks.i18n.t('editor.schemas.items.file')
            }`,
          )
        }

        const saveContentFn = hooks.vueuse.core.useDebounceFn((doc: any) => {
          setFile(file.id, doc.toJSON())
        }, 300)

        ctx.get(listenerCtx).updated((ctx, doc) => {
          saveContentFn(doc)
        })

        ctx.update(editorViewOptionsCtx, (prev) => ({
          ...prev,
          attributes: { class: 'milkdown-betterwrite', spellcheck: 'true' },
        }))

        el?.addEventListener('click', (e: MouseEvent | TouchEvent) => {
          const el = e.target as HTMLElement
          const href = el.getAttribute('href')

          // navigate to other schema file
          if (
            href?.startsWith('nav-file-') &&
            el.nodeType === Node.ELEMENT_NODE
          ) {
            e.preventDefault()
            e.stopPropagation()

            const key = href.replace('nav-', '')

            const file = getFile(key)

            if (file) hooks.schemas.onStart(file)
          }
        })

        // TODO: get key event in selection offset
        el?.addEventListener('keydown', (e) => {
          if (e.key) provider.lastChar = e.key
        })
      })
      .use(listener)
      .use(commonmark)
      .use(math)
      .use(clipboard)
      .use(block)
      .use(history)
      .use(cursor)
      .use(trailing)
      .use(upload)
      .use(slash)
      .create()

    const el = document.querySelector('#bw-wysiwyg')

    if (!item) {
      const active = stores.HISTORY.barActive

      if (active) {
        const set = stores.HISTORY.bar.find(({ id }) => id === active)

        if (set) item = set
      }
    }

    if (el && item) el.scrollTop = item.scrollHeight

    emitter.emit('plugin-schemas-get-instance', { editor, file })
  }

  On.externals().PluginSchemasStart(emitter, [
    (obj) => {
      start(obj)
    },
    () => {},
  ])

  On.externals().PluginSchemasCreateFolder(emitter, [
    async (schema: ProjectStateSchema) => {
      const folder = createFolder(schema)

      const file = await createFile(folder)

      await start({ target: file })

      hooks.emitter.emit('schemas-folder-graph-open', folder)
    },
    () => {},
  ])

  On.externals().PluginSchemasDeleteFolder(emitter, [
    (folder: ProjectStateSchemaFolder) => {
      deleteFolder(folder)
    },
    () => {},
  ])

  On.externals().PluginSchemasCreateFile(emitter, [
    async (folder: ProjectStateSchemaFolder) => {
      const file = await createFile(folder)

      await start({ target: file })

      hooks.emitter.emit('schemas-folder-graph-open', folder)
    },
    () => {},
  ])

  On.externals().PluginSchemasDeleteFile(emitter, [
    ({
      folder,
      file,
    }: {
      folder: ProjectStateSchemaFolder
      file: ProjectStateSchemaFile
    }) => {
      deleteFile(folder, file)
    },
    () => {},
  ])

  On.externals().PluginSchemasReset(emitter, [
    () => {
      reset()
    },
    () => {},
  ])

  On.externals().PluginSchemasCreate(emitter, [
    (options: ProjectStateSchemaCreate) => {
      stores.PROJECT.schemas.unshift({
        id: hooks.utils.id().nano({ prefix: 'schema' }),
        type: options.type,
        name: options.name,
        prefix: options.prefix,
        customIcon: '📁',
        folders: [],
      })

      stores.ABSOLUTE.schemas.create = false
    },
    () => {},
  ])

  On.externals().PluginSchemasDelete(emitter, [
    (schema: ProjectStateSchema) => {
      stores.PROJECT.schemas = stores.PROJECT.schemas.filter(
        ({ id }) => id !== schema.id,
      )
    },
    () => {},
  ])
}
