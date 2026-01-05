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
    async (data: Record<string, any>) => {
      const { payload } = await ofetch('/api/users', {
        method: 'POST',
        body: data,
      })

      stores.AUTH.user = payload

      hooks.toast.success(hooks.i18n.t('toast.user.success'))
    },
    () => {},
  ])

  On.backend().PluginLoadUser(emitter, [
    async (id: string) => {
      // TODO: backend types
      await ofetch(`/api/user/${id}`, {
        method: 'POST',
        body: { some: 'json' },
        async onRequestError() {
          hooks.toast.error(hooks.i18n.t('toast.user.fail'))
        },
      })
    },
    () => {},
  ])
}
