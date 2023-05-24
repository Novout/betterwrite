import { PluginTypes } from 'better-write-types'
import { DropboxAuth } from 'dropbox'

export const PluginDropboxTokenSet = (
  emitter: PluginTypes.PluginEmitter,
  stores: PluginTypes.PluginStores,
  hooks: PluginTypes.PluginHooks
) => {
  emitter.on('call-editor-mounted', async () => {
    const params = hooks.vueuse.core.useUrlSearchParams()
    const code = params?.code
    const state = params?.state
    const code_verifier = localStorage.getItem('code_verifier')

    if (code && code_verifier && state === 'dropboxbw') {
      const dbxAuth = new DropboxAuth({
        clientId: hooks.env.dropboxKey(),
      })
      dbxAuth.setCodeVerifier(code_verifier)

      const token = await dbxAuth.getAccessTokenFromCode(
        hooks.env.getCorrectLocalUrl(),
        code
      )

      stores.AUTH.account.dropboxAccessToken = // @ts-expect-error
        token?.result?.access_token as string

      localStorage.removeItem('code_verifier')

      hooks.toast.success(hooks.i18n.t('toast.dropbox.load'))
    }
  })
}
