import { PluginTypes } from 'better-write-types'
import { On } from 'better-write-plugin-core'
import { readBW } from 'better-write-extension'
import { read } from 'better-write-plugin-importer'
import { isImageExtension } from 'better-write-image-converter'

export const PluginDropSet = (
  emitter: PluginTypes.PluginEmitter,
  stores: PluginTypes.PluginStores,
  hooks: PluginTypes.PluginHooks,
) => {
  On.externals().PluginWindowDrop(emitter, [
    async ({ dataTransfer }: DragEvent) => {
      if (dataTransfer?.items && dataTransfer.items[0].kind === 'file') {
        const file = dataTransfer.items[0].getAsFile()

        if (!file) return

        const filename = file.name.replace(/\.(bw|doc(x)?|txt)$/, '')

        if (file.name.match(/\.bw$/)) {
          if (
            confirm(hooks.i18n.t('toast.project.import', { name: file.name }))
          ) {
            const data = await readBW(file)

            hooks.project.onLoadProject(data, false)
          }

          return
        }

        if (file.name.match(/\.doc(x)?$/)) {
          if (
            confirm(hooks.i18n.t('toast.project.import', { name: file.name }))
          ) {
            const data = await read(file, 'data')

            emitter.emit('plugin-importer-docx', {
              data,
              fileName: filename,
            })
          }

          return
        }

        if (file.name.match(/\.txt$/)) {
          if (
            confirm(hooks.i18n.t('toast.project.import', { name: file.name }))
          ) {
            const data = await read(file, 'text')

            emitter.emit('plugin-importer-txt', {
              data,
              fileName: filename,
            })
          }

          return
        }

        if (!isImageExtension(file.name))
          hooks.toast.warning(
            hooks.i18n.t('toast.project.unsupportedExtension'),
          )
      }
    },
    () => {},
  ])
}
