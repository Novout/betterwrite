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
    stores.GLOBAL.reset()

    hooks.local.deleteProject()

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
      if (!confirm(hooks.i18n.t('editor.presence.alert.logoutAccount'))) return

      emitter.emit('plugin-progress-start')

      hooks.supabase.auth
        .signOut()
        .then(async (data) => {
          if (data?.error) {
            hooks.toast(hooks.i18n.t('editor.auth.logout.error'))

            return
          }

          resetAndRedirect()
        })
        .catch(() => {
          hooks.toast(hooks.i18n.t('editor.auth.logout.error'))
        })
        .finally(() => {
          emitter.emit('plugin-progress-end')
        })
    },
    () => {},
  ])

  On.externals().PluginOAuthDelete(emitter, [
    async () => {
      if (!stores.AUTH.account.user) return

      if (!confirm(hooks.i18n.t('editor.presence.alert.deleteAccount'))) return

      emitter.emit('plugin-progress-start')

      const id = stores.AUTH.account.user.id

      try {
        await hooks.supabase.from('projects').delete().match({ id_user: id })

        await hooks.supabase.from('profiles').delete().match({ id })

        await hooks.supabase.auth.signOut()
      } catch (e) {
        hooks.toast(hooks.i18n.t('editor.auth.delete.error'))

        emitter.emit('plugin-progress-end')

        return
      }

      resetAndRedirect()

      emitter.emit('plugin-progress-end')
    },
    () => {},
  ])
}
