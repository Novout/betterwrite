import { exclude, get } from 'better-write-client-storage'
import { ClientStorageOptions, PluginTypes } from 'better-write-types'
import { DropboxAuth } from 'dropbox'

export const DropboxToken = (
  emitter: PluginTypes.PluginEmitter,
  stores: PluginTypes.PluginStores,
  hooks: PluginTypes.PluginHooks
) => {
  emitter.on('call-editor-mounted', async () => {
    const params = hooks.vueuse.core.useUrlSearchParams()
    const code = params?.code
    const state = params?.state
    const code_verifier = await get<string>(
      'code_verifier',
      stores.EDITOR.configuration.clientStorage as ClientStorageOptions
    )

    if (code && code_verifier && state === 'dropboxbw') {
      const dbxAuth = new DropboxAuth({
        clientId: hooks.env.dropboxKey(),
      })
      dbxAuth.setCodeVerifier(code_verifier)

      const token = await dbxAuth.getAccessTokenFromCode(
        hooks.env.getCorrectLocalUrl(),
        code
      )

      stores.AUTH.account.dropboxAccessToken = token?.result // @ts-expect-error
        ?.access_token as string

      await exclude('code_verifier')

      hooks.toast.success(hooks.i18n.t('toast.dropbox.load'))
    }
  })
}
