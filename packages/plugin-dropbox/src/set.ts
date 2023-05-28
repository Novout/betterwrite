import {
  Dropbox as DBX,
  DropboxAuth,
  DropboxResponse,
  DropboxResponseError,
  files,
} from 'dropbox'
import { On } from 'better-write-plugin-core'
import { ClientStorageOptions, PluginTypes } from 'better-write-types'
import { readBW, writeBW } from 'better-write-extension'
import { exclude, set } from 'better-write-client-storage'

export const DropboxSet = (
  emitter: PluginTypes.PluginEmitter,
  stores: PluginTypes.PluginStores,
  hooks: PluginTypes.PluginHooks
) => {
  On.externals().PluginDropboxSave(emitter, [
    () => {
      if (!stores.AUTH.account.dropboxAccessToken) {
        return
      }

      const dbx = new DBX({
        clientId: hooks.env.dropboxKey(),
        accessToken: stores.AUTH.account.dropboxAccessToken,
      })

      const path = `/${hooks.project.utils().exportFullName('bw')}`

      hooks.toast.info(hooks.i18n.t('toast.generics.load'))

      emitter.emit('plugin-progress-start')

      hooks.storage.normalize().then(async () => {
        const payload = hooks.storage.getProjectObject()
        payload.project.externalProvider = 'dropbox'

        const obj = JSON.stringify(payload)
        const zip = await writeBW(obj)

        dbx
          .filesUpload({
            path,
            contents: zip,
            mode: {
              '.tag': 'overwrite',
            },
          })
          .then(({ result }) => {
            if (!stores.VAULT.dropboxFiles.some(({ id }) => id === result.id))
              stores.VAULT.dropboxFiles.unshift(
                result as files.FileMetadataReference
              )

            hooks.toast.success(hooks.i18n.t('toast.dropbox.save'))
          })
          .catch(() => {
            hooks.toast.error(hooks.i18n.t('toast.project.error'))
          })
          .finally(() => {
            emitter.emit('plugin-progress-end')
          })
      })
    },
    () => {},
  ])

  On.externals().PluginDropboxLoad(emitter, [
    async () => {
      if (!stores.AUTH.account.dropboxAccessToken) {
        return
      }

      const dbx = new DBX({
        accessToken: stores.AUTH.account.dropboxAccessToken,
      })

      hooks.plugin.emit('plugin-progress-start')

      const files = await dbx.filesListFolder({ path: '' })

      if (!files || files.result.entries.length === 0) {
        hooks.toast.warning(hooks.i18n.t('toast.dropbox.empty'))

        hooks.plugin.emit('plugin-progress-end')

        return
      }

      const targets = (files.result.entries.filter(
        // @ts-expect-error
        (file) => file?.is_downloadable && file?.['.tag'] === 'file'
      ) ?? []) as files.FileMetadataReference[]

      stores.VAULT.dropboxFiles.unshift(...targets)

      hooks.plugin.emit('plugin-progress-end')

      hooks.toast.success(hooks.i18n.t('toast.generics.successChanged'))
    },
    () => {},
  ])

  On.externals().PluginDropboxDelete(emitter, [
    (file: files.FileMetadataReference) => {
      if (!stores.AUTH.account.dropboxAccessToken) return

      if (!confirm(hooks.i18n.t('toast.generics.fileDelete'))) return

      const dbx = new DBX({
        accessToken: stores.AUTH.account.dropboxAccessToken,
      })

      hooks.plugin.emit('plugin-progress-start')

      dbx
        .filesDeleteV2({ path: file.id })
        .then(() => {
          stores.VAULT.dropboxFiles = stores.VAULT.dropboxFiles.filter(
            ({ id }) => id !== file.id
          )
        })
        .catch((err: DropboxResponseError<any>) => {
          hooks.toast.error(hooks.i18n.t('toast.project.error'))
        })
        .finally(() => {
          hooks.plugin.emit('plugin-progress-end')
        })
    },
    () => {},
  ])

  On.externals().PluginDropboxSet(emitter, [
    (file: files.FileMetadataReference) => {
      if (!stores.AUTH.account.dropboxAccessToken) return

      const dbx = new DBX({
        accessToken: stores.AUTH.account.dropboxAccessToken,
      })

      hooks.plugin.emit('plugin-progress-start')

      dbx
        .filesDownload({ path: file.id })
        .then(async (data: DropboxResponse<any>) => {
          const bw = await readBW(data.result.fileBlob as Blob)
          const content = hooks.storage.support(bw)

          hooks.project.onLoadProject(content)
        })
        .catch(() => {
          hooks.toast.error(hooks.i18n.t('toast.project.error'))
        })
        .finally(() => {
          hooks.plugin.emit('plugin-progress-end')
        })
    },
    () => {},
  ])

  On.externals().PluginDropboxConnect(emitter, [
    async () => {
      const dbxAuth = new DropboxAuth({
        clientId: hooks.env.dropboxKey(),
      })

      const url = await dbxAuth.getAuthenticationUrl(
        hooks.env.getCorrectLocalUrl(),
        'dropboxbw',
        'code',
        'online',
        [
          'account_info.read',
          'files.metadata.write',
          'files.metadata.read',
          'files.content.write',
          'files.content.read',
          'file_requests.read',
        ],
        undefined,
        true
      )

      exclude('code_verifier')
      await set(
        'code_verifier',
        dbxAuth.getCodeVerifier(),
        stores.EDITOR.configuration.clientStorage as ClientStorageOptions
      )

      window.open(url as string, '_self')
    },
    () => {},
  ])
}
