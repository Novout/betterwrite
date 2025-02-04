import { On } from 'better-write-plugin-core'
import type {
  ContextState,
  LivesharePresenceItem,
  LiveshareType,
  Maybe,
  PluginTypes,
  ProjectObject,
} from 'better-write-types'
import { computed } from 'vue-demi'
import {
  genKey,
  getKey,
  getOwner,
  isCollaborateRoom,
  isEmptyObject,
} from './utils'
import { LiveshareState } from 'better-write-types'

interface $CTX {
  object: ProjectObject
  ctx: ContextState
  liveshare: LiveshareState
  user: Maybe<{}>
}

export const RoomSet = (
  emitter: PluginTypes.PluginEmitter,
  stores: PluginTypes.PluginStores,
  hooks: PluginTypes.PluginHooks
) => {
  const removePresence = async (channel: any) => {
    await channel.unsubscribe().catch(() => {})

    stores.LIVESHARE.$reset()
  }

  const setCTXPayload = (payload: $CTX): void => {
    // ignore same user for avoid double payload
    if (stores.LIVESHARE.yourColor === payload.liveshare.yourColor) return

    // TODO: better method for track changes
    stores.CONTEXT.$state = payload.ctx
    stores.PROJECT.$state = payload.object.project
    stores.EDITOR.$state = payload.object.editor
    stores.PDF.$state = payload.object.pdf
    stores.DOCX.$state = payload.object.docx

    stores.LIVESHARE.activeColor = payload.liveshare.yourColor

    emitter.emit('plugin-theme-set')
  }

  const getCTXPayload = (): {
    type: string
    event: string
    payload: {
      object: ProjectObject
      ctx: ContextState
      liveshare: LiveshareState
      user: Maybe<{}>
    }
  } => ({
    type: 'broadcast',
    event: 'ctx',
    payload: {
      object: hooks.storage.getProjectObject(),
      ctx: stores.CONTEXT.$state,
      liveshare: stores.LIVESHARE.$state,
      user: stores.AUTH.account.user,
    },
  })

  const setWatcher = (channel) => {
    hooks.vueuse.core.watchDebounced(
      [
        computed(() => stores.PROJECT.$state),
        computed(() => stores.CONTEXT.$state),
      ],
      () => {
        const ctx = getCTXPayload()

        channel.send(ctx)
      },
      { debounce: 1000, maxWait: 10000, immediate: true, deep: true }
    )
  }

  const setRoom = (
    channel: any,
    type: LiveshareType
  )  => {
    channel
      .on('presence', { event: 'join' }, ({ key, newPresences }) => {
        stores.LIVESHARE.add({
          [key]: newPresences,
        })
      })
      .on('presence', { event: 'leave' }, async ({ key, leftPresences }) => {
        try {
          delete stores.LIVESHARE.presence[key]
        } catch (e) {}

        if (leftPresences.some((presence) => getOwner(presence))) {
          await removePresence(channel)

          if (type !== 'owner') {
            hooks.local.deleteProject()
            stores.CONTEXT.$reset()
            stores.PROJECT.$reset()
          }
        }
      })
      .on('presence', { event: 'sync' }, async () => {
        const state = channel.presenceState()

        if (!isEmptyObject(state) && !getOwner(state)) {
          hooks.toast.error(hooks.i18n.t('editor.presence.off'))

          await removePresence(channel)

          return
        }

        stores.LIVESHARE.presence = state
      })
      .on('broadcast', { event: 'ctx' }, ({ payload }) => {
        setCTXPayload(payload)
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          // TODO: use's safe random color or predefined arr colors
          const hexColor = hooks.utils.text().randomColor()

          const user = {
            id:
              stores.AUTH.account.user?.email ??
              (stores.AUTH.account.user?.id as string),
            type,
            avatar_url:
              stores.AUTH.account.user?.user_metadata?.avatar_url ?? undefined,
            online_at: new Date().toISOString(),
            color: hexColor,
          }

          const tracked = await channel.track(user)

          if (tracked !== 'ok') {
            await removePresence(channel)

            hooks.toast.error(hooks.i18n.t('toast.generics.error'))

            return
          }

          stores.LIVESHARE.user = { presence_ref: '', ...user }
          stores.LIVESHARE.yourColor = hexColor

          const target = getCTXPayload()

          if (type === 'owner') {
            channel.send(target)
            stores.LIVESHARE.activeColor = hexColor
          } else {
            setCTXPayload(target.payload)
          }
        }
      })

    return channel
  }

  On.externals().PluginPresenceRoomCreate(emitter, [
    (type: LiveshareType) => {
      const id = genKey(type)

      const channel = hooks.supabase.channel(id)

      setRoom(channel, 'owner')
      setWatcher(channel)

      stores.LIVESHARE.roomKey = id

      emitter.emit('plugin-presence-room-create-key', id)

      hooks.toast.success(hooks.i18n.t('toast.generics.successCreated'))
    },
    () => {},
  ])

  On.externals().PluginPresenceRoomJoin(emitter, [
    async (id: string) => {
      if (stores.LIVESHARE.roomKey) return

      const channel = hooks.supabase.channel(id)

      if (!channel) return

      if (
        Object.entries(channel.presence.state).length >=
        stores.LIVESHARE.presenceLimit
      ) {
        hooks.toast.error(hooks.i18n.t('toast.generics.limit'))

        return
      }

      const key = getKey(id)

      setRoom(channel, key ?? 'visit')
      if (isCollaborateRoom(id)) setWatcher(channel)

      stores.LIVESHARE.roomKey = id
      stores.ABSOLUTE.modal.presence.info = false
      stores.ABSOLUTE.modal.presence.createOrJoin = false

      hooks.toast.success(hooks.i18n.t('toast.generics.successCreated'))
    },
    () => {},
  ])

  On.externals().PluginPresenceRoomLeave(emitter, [
    async (id: string) => {
      const channel = hooks.supabase.channel(id)

      await channel.unsubscribe().catch(() => {})

      stores.LIVESHARE.$reset()
      stores.ABSOLUTE.modal.presence.info = false
      stores.ABSOLUTE.modal.presence.createOrJoin = false

      hooks.toast.warning(hooks.i18n.t('toast.generics.successRemoved'))
    },
    () => {},
  ])
}
