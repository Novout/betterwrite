import { On } from 'better-write-plugin-core'
import {
  PluginTypes,
  AuthAccountPayloadRegister,
  SupabaseIntegrations,
} from 'better-write-types'
import { nextTick } from 'vue-demi'

export const AuthSet = (
  emitter: PluginTypes.PluginEmitter,
  stores: PluginTypes.PluginStores,
  hooks: PluginTypes.PluginHooks
) => {
  const resetAndRedirect = () => {
    hooks.router.push('/landing')
  }

  On.externals().PluginOAuthRegister(emitter, [
    (payload: Omit<AuthAccountPayloadRegister, 'termsOfUse'>) => {
      emitter.emit('plugin-progress-start')

      hooks.supabase.auth
        .signUp(payload)
        .then((data) => {
          if (data?.error) {
            emitter.emit('plugin-oauth-register-error')

            return
          }

          hooks.toast.success(hooks.i18n.t('toast.generics.successCreated'))

          emitter.emit('plugin-oauth-register-success')
          emitter.emit('plugin-oauth-register-wizard-reset')
        })
        .catch(() => {
          emitter.emit('plugin-oauth-register-error')
        })
        .finally(() => {
          emitter.emit('plugin-progress-end')
        })
    },
    () => {},
  ])

  On.externals().PluginOAuthLogin(emitter, [
    (payload: Omit<AuthAccountPayloadRegister, 'termsOfUse'>) => {
      emitter.emit('plugin-progress-start')

      hooks.supabase.auth
        .signInWithPassword(payload)
        .then(async ({ error }) => {
          if (error) {
            hooks.toast.error(hooks.i18n.t('editor.auth.login.error'))

            return
          }

          await nextTick

          hooks.router.push('/')
        })
        .catch(() => {
          hooks.toast.error(hooks.i18n.t('editor.auth.login.error'))
        })
        .finally(() => {
          emitter.emit('plugin-progress-end')
        })
    },
    () => {},
  ])

  On.externals().PluginOAuthLoginWithProvider(emitter, [
    (provider: SupabaseIntegrations) => {
      emitter.emit('plugin-progress-start')

      hooks.toast.info(hooks.i18n.t('toast.generics.load'))

      hooks.supabase.auth
        .signInWithOAuth({
          provider,
          options: { redirectTo: hooks.env.getCorrectLocalUrl() },
        })
        .then(async (data) => {
          if (data?.error) {
            hooks.toast(hooks.i18n.t('editor.auth.login.error'))

            return
          }
        })
        .catch(() => {
          hooks.toast(hooks.i18n.t('editor.auth.login.error'))
        })
        .finally(() => {
          stores.ABSOLUTE.auth.supabase = false

          emitter.emit('plugin-progress-end')
        })
    },
    () => {},
  ])

  On.externals().PluginOAuthLogout(emitter, [
    () => {
      resetAndRedirect()
    },
    () => {},
  ])

  On.externals().PluginOAuthDelete(emitter, [
    async () => {
      resetAndRedirect()
    },
    () => {},
  ])
}
