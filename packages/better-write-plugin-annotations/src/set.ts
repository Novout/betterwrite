import {
  PluginTypes,
  ProjectStateAnnotationFile,
  ProjectStateAnnotationFolder,
} from 'better-write-types'
import { On } from 'better-write-plugin-core'
import { rootCtx, defaultValueCtx, Editor } from '@milkdown/core'
import { listener, listenerCtx } from '@milkdown/plugin-listener'
import { math } from '@milkdown/plugin-math'
import { tooltip } from '@milkdown/plugin-tooltip'
import { clipboard } from '@milkdown/plugin-clipboard'
import { block } from '@milkdown/plugin-block'
import { history } from '@milkdown/plugin-history'
import { cursor } from '@milkdown/plugin-cursor'
import { indent, indentPlugin } from '@milkdown/plugin-indent'
import { trailing } from '@milkdown/plugin-trailing'
import { upload } from '@milkdown/plugin-upload'
import { emoji } from '@milkdown/plugin-emoji'
import { bw } from './theme'
import { cmk } from './plugin/commonmark'
import { sls } from './plugin/slash'
import { ID } from 'better-write-types'
import { nextTick } from 'vue-demi'

export const PluginAnnotationsSet = (
  emitter: PluginTypes.PluginEmitter,
  stores: PluginTypes.PluginStores,
  hooks: PluginTypes.PluginHooks
) => {
  const reset = (force: boolean = false) => {
    document.querySelector('.milkdown')?.remove()

    if (force) stores.PROJECT.base = 'chapter'
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
    reset(true)

    stores.PROJECT.annotations.folders =
      stores.PROJECT.annotations.folders.filter((f) => f.id !== folder.id)
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
  }

  const start = async (file: ProjectStateAnnotationFile) => {
    reset()

    stores.PROJECT.base = 'annotations'

    await nextTick

    await Editor.make()
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

        ctx.get(listenerCtx).updated((ctx, doc, prevDoc) => {
          setFile(file.id, doc.toJSON())
        })
      })
      .use(listener)
      .use(cmk)
      .use(math)
      .use(sls(hooks))
      .use(tooltip)
      .use(clipboard)
      .use(block)
      .use(history)
      .use(cursor)
      .use(trailing)
      .use(upload)
      .use(emoji)
      .use(
        indent.configure(indentPlugin, {
          type: 'space',
          size: 2,
        })
      )
      .use(bw)
      .create()
  }

  On.externals().PluginAnnotationsStart(emitter, [
    (file: ProjectStateAnnotationFile) => {
      hooks.bar.load(() => {
        start(file)
      })
    },
    () => {},
  ])

  On.externals().PluginAnnotationsCreateFolder(emitter, [
    () => {
      hooks.bar.load(() => {
        createFolder()
      })
    },
    () => {},
  ])

  On.externals().PluginAnnotationsDeleteFolder(emitter, [
    (folder: ProjectStateAnnotationFolder) => {
      hooks.bar.load(() => {
        deleteFolder(folder)
      })
    },
    () => {},
  ])

  On.externals().PluginAnnotationsCreateFile(emitter, [
    async (folder: ProjectStateAnnotationFolder) => {
      hooks.bar.load(async () => {
        const file = await createFile(folder)

        await start(file)

        hooks.emitter.emit('annotations-folder-graph-open', folder)
      })
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
      hooks.bar.load(() => {
        deleteFile(folder, file)
      })
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
