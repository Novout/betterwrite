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
  const reset = () => {
    document.querySelector('.milkdown')?.remove()
  }

  const setFile = (id: ID<string>, value: any) => {
    stores.PROJECT.annotations.folders.forEach(
      (folder: ProjectStateAnnotationFolder) => {
        folder.files.forEach((file: ProjectStateAnnotationFile) => {
          if (file.id === id) {
            file.value = value

            // fileName reactivity
            if (value?.content[0]?.content[0]?.text)
              file.fileName = value.content[0].content[0].text
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
    stores.PROJECT.annotations.activeId = file.id

    return file
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
      .use(bw)
      .create()
  }

  On.externals().PluginAnnotationsStart(emitter, [
    (file: ProjectStateAnnotationFile) => {
      start(file)
    },
    () => {},
  ])

  On.externals().PluginAnnotationsCreateFolder(emitter, [
    async () => {
      const folder = await createFolder()

      hooks.emitter.emit('annotations-folder-graph-open', folder)
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
}
