import { On } from 'better-write-plugin-core'
import { PluginTypes } from 'better-write-types'
import { ofetch } from 'ofetch'

export const DataSet = (
  emitter: PluginTypes.PluginEmitter,
  stores: PluginTypes.PluginStores,
  hooks: PluginTypes.PluginHooks,
) => {
  On.backend().PluginRegisterUser(emitter, [
    // TODO: backend types
    async (data) => {
      const { payload } = await ofetch('/api/users', {
        method: 'POST',
        body: { some: 'json' },
      })

      stores.AUTH.account = payload
    },
    () => {},
  ])

  On.backend().PluginLoadUser(emitter, [
    async (id: string) => {
      // TODO: backend types
      await ofetch(`/api/user/${id}`, {
        method: 'POST',
        body: { some: 'json' },
        async onRequestError({ request, options, error }) {
          // TODO: toast
          console.log('[fetch request error]', request, error)
        },
      })
    },
    () => {},
  ])
}
