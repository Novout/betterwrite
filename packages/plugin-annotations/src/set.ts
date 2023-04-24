import {
  PluginTypes,
  ProjectStateAnnotationFile,
  ProjectStateAnnotationFolder,
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

export const PluginAnnotationsSet = (
  emitter: PluginTypes.PluginEmitter,
  stores: PluginTypes.PluginStores,
  hooks: PluginTypes.PluginHooks
) => {
  const reset = (force: boolean = false) => {
    document.querySelector('.milkdown')?.remove()

    if (force)
      stores.PROJECT.base =
        stores.PROJECT.type === 'only-annotations' ? 'annotations' : 'chapter'
  }

  const setFile = (id: ID<string>, value: any) => {
    stores.PROJECT.annotations.folders.forEach(
      (folder: ProjectStateAnnotationFolder) => {
        folder.files.forEach((file: ProjectStateAnnotationFile) => {
          if (file.id === id) {
            file.value = value

            let text = ''

            try {
              text = value!.content[0]!.content[0]!.text
            } catch (e) {}

            // fileName reactivity
            if (text) file.fileName = text
          }
        })
      }
    )
  }

  const createFolder = (): ProjectStateAnnotationFolder => {
    const folder = {
      id: `folder-${hooks.utils.id().uuidv4()}`,
      folderName: hooks.i18n.t('editor.annotations.items.folder'),
      files: [],
    }

    stores.PROJECT.annotations.folders.unshift(folder)

    return folder
  }

  const deleteFolder = (folder: ProjectStateAnnotationFolder) => {
    if (
      stores.PROJECT.type === 'only-annotations' &&
      stores.PROJECT.annotations.folders.length === 1
    )
      return

    reset(true)

    stores.PROJECT.annotations.folders =
      stores.PROJECT.annotations.folders.filter((f) => f.id !== folder.id)

    setActive()
  }

  const createFile = (
    folder: ProjectStateAnnotationFolder
  ): ProjectStateAnnotationFile => {
    const file = {
      id: `file-${hooks.utils.id().uuidv4()}`,
      fileName: hooks.i18n.t('editor.annotations.items.file'),
      value: {},
    }

    const index = stores.PROJECT.annotations.folders.indexOf(folder)

    stores.PROJECT.annotations.folders[index].files.push(file)

    return file
  }

  const setActive = () => {
    if (stores.PROJECT.type === 'only-annotations') {
      const folder = stores.PROJECT.annotations.folders.find((f) =>
        f.files.find((f) => f)
      )

      if (!folder || folder.files.length === 0)
        createFile(stores.PROJECT.annotations.folders[0])
      else start(folder.files[0])
    }
  }

  const deleteFile = (
    folder: ProjectStateAnnotationFolder,
    file: ProjectStateAnnotationFile
  ) => {
    reset(true)

    const targetId = stores.PROJECT.annotations.folders.indexOf(folder)

    if (targetId === -1) return

    stores.PROJECT.annotations.folders[targetId].files =
      stores.PROJECT.annotations.folders[targetId].files.filter(
        (f) => f.id !== file.id
      )

    setActive()
  }

  const start = async (file: ProjectStateAnnotationFile) => {
    reset()

    stores.PROJECT.base = 'annotations'

    await nextTick

    const editor = await Editor.make()
      .config((ctx) => {
        ctx.set(rootCtx, document.querySelector('#bw-wysiwyg'))

        if (Object.keys(file.value).length !== 0) {
          ctx.set(defaultValueCtx, {
            type: 'json',
            value: file.value,
          })
        } else {
          ctx.set(
            defaultValueCtx,
            `# ${hooks.i18n.t('editor.annotations.items.file')}`
          )
        }

        const fn = hooks.vueuse.core.useDebounceFn((doc: any) => {
          setFile(file.id, doc.toJSON())
        }, 500)

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

    emitter.emit('plugin-annotations-get-instance', editor)
  }

  On.externals().PluginAnnotationsStart(emitter, [
    (file: ProjectStateAnnotationFile) => {
      start(file)
    },
    () => {},
  ])

  On.externals().PluginAnnotationsCreateFolder(emitter, [
    async () => {
      const folder = createFolder()

      const file = await createFile(folder)

      await start(file)

      hooks.emitter.emit('annotations-folder-graph-open', folder)
    },
    () => {},
  ])

  On.externals().PluginAnnotationsDeleteFolder(emitter, [
    (folder: ProjectStateAnnotationFolder) => {
      deleteFolder(folder)
    },
    () => {},
  ])

  On.externals().PluginAnnotationsCreateFile(emitter, [
    async (folder: ProjectStateAnnotationFolder) => {
      const file = await createFile(folder)

      await start(file)

      hooks.emitter.emit('annotations-folder-graph-open', folder)
    },
    () => {},
  ])

  On.externals().PluginAnnotationsDeleteFile(emitter, [
    ({
      folder,
      file,
    }: {
      folder: ProjectStateAnnotationFolder
      file: ProjectStateAnnotationFile
    }) => {
      deleteFile(folder, file)
    },
    () => {},
  ])

  On.externals().PluginAnnotationsReset(emitter, [
    () => {
      reset()
    },
    () => {},
  ])
}
