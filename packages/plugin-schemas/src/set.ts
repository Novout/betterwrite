import {
  PluginTypes,
  ProjectStateSchema,
  ProjectStateSchemaFile,
  ProjectStateSchemaFolder,
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
import { emoji } from '@milkdown/plugin-emoji'
import { upload } from '@milkdown/plugin-upload'
import { commonmark } from '@milkdown/preset-commonmark'
import { ID } from 'better-write-types'
import { nextTick } from 'vue-demi'
import { ProjectStateSchemaCreate } from 'better-write-types'

export const PluginSchemasSet = (
  emitter: PluginTypes.PluginEmitter,
  stores: PluginTypes.PluginStores,
  hooks: PluginTypes.PluginHooks
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
            }
          }
        })
      })
    })
  }

  function createFile<T extends object = any>(
    folder: ProjectStateSchemaFolder
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
    schema: ProjectStateSchema
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
    folder: ProjectStateSchemaFolder<T>
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
      else if (schema.folders) start(schema.folders[0].files[0])
    }
  }

  function deleteFile<T extends object = any>(
    folder: ProjectStateSchemaFolder<T>,
    file: ProjectStateSchemaFile
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
        (f) => f.id !== file.id
      )

    setActive()
  }

  const start = async (file: ProjectStateSchemaFile) => {
    reset()

    stores.PROJECT.base = 'annotations'
    stores.HISTORY.addBar(hooks.factory.history().bar().schema(file))

    await nextTick

    const editor = await Editor.make()
      .config((ctx) => {
        ctx.set(rootCtx, document.querySelector('#bw-wysiwyg'))

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
            }`
          )
        }

        const fn = hooks.vueuse.core.useDebounceFn((doc: any) => {
          setFile(file.id, doc.toJSON())
        }, 300)

        ctx.get(listenerCtx).updated((_, doc) => {
          fn(doc)
        })

        ctx.update(editorViewOptionsCtx, (prev) => ({
          ...prev,
          attributes: { class: 'milkdown-betterwrite', spellcheck: 'true' },
        }))
      })
      .use(listener)
      .use(commonmark)
      .use(math)
      .use(clipboard)
      .use(block)
      .use(history)
      .use(cursor)
      .use(trailing)
      .use(emoji)
      .use(upload)
      .create()

    emitter.emit('plugin-schemas-get-instance', { editor, file })
  }

  On.externals().PluginSchemasStart(emitter, [
    (file: ProjectStateSchemaFile) => {
      start(file)
    },
    () => {},
  ])

  On.externals().PluginSchemasCreateFolder(emitter, [
    async (schema: ProjectStateSchema) => {
      const folder = createFolder(schema)

      const file = await createFile(folder)

      await start(file)

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

      await start(file)

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
        ({ id }) => id !== schema.id
      )
    },
    () => {},
  ])
}
