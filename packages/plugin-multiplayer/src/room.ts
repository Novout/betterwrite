import { On } from 'better-write-plugin-core'
import type {
  ContextState,
  LivesharePresenceItem,
  Maybe,
  PluginTypes,
  ProjectObject,
} from 'better-write-types'
import type { RealtimeChannel, User } from '@supabase/supabase-js'
import { nanoid } from 'nanoid'
import { computed } from 'vue-demi'
import { getOwner } from './utils'

export const RoomSet = (
  emitter: PluginTypes.PluginEmitter,
  stores: PluginTypes.PluginStores,
  hooks: PluginTypes.PluginHooks
) => {
  const removePresence = async (channel: RealtimeChannel) => {
    await channel.unsubscribe().catch(() => {})

    stores.LIVESHARE.$reset()
  }

  const setCTX = (object: ProjectObject, ctx: ContextState) => {
    // TODO: better method for track changes

    stores.CONTEXT.$state = ctx
    stores.PROJECT.$state = object.project
    stores.EDITOR.$state = object.editor
    stores.PDF.$state = object.pdf
    stores.DOCX.$state = object.docx

    emitter.emit('plugin-theme-set')
  }

  const getCTX = (): {
    type: string
    event: string
    payload: { object: ProjectObject; ctx: ContextState; user: Maybe<User> }
  } => ({
    type: 'broadcast',
    event: 'ctx',
    payload: {
      object: hooks.storage.getProjectObject(),
      ctx: stores.CONTEXT.$state,
      user: stores.AUTH.account.user,
    },
  })

  const setWatcher = (channel: RealtimeChannel) => {
    hooks.vueuse.core.watchDebounced(
      [
        computed(() => stores.PROJECT.$state),
        computed(() => stores.CONTEXT.$state),
      ],
      () => {
        const ctx = getCTX()

        channel.send(ctx)
      },
      { debounce: 1000, maxWait: 2000, immediate: true, deep: true }
    )
  }

  const setRoom = (
    channel: RealtimeChannel,
    type: 'owner' | 'visit'
  ): RealtimeChannel => {
    channel
      .on('presence', { event: 'join' }, ({ key, newPresences }) => {
        stores.LIVESHARE.add({
          [key]: newPresences,
        })

        if (type === 'owner') stores.LIVESHARE.ownerKey = key
      })
      .on('presence', { event: 'leave' }, async ({ key, leftPresences }) => {
        try {
          delete stores.LIVESHARE.presence[key]
        } catch (e) {}

        if (key === stores.LIVESHARE.ownerKey) {
          await removePresence(channel)
        }
      })
      .on('presence', { event: 'sync' }, async () => {
        const state = channel.presenceState<LivesharePresenceItem>()

        stores.LIVESHARE.presence = state
      })
      .on('broadcast', { event: 'ctx' }, ({ payload }) => {
        if (type === 'owner') return

        setCTX(payload.object, payload.ctx)
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          // TODO: use's safe random color or predefined arr colors
          const hexColor = hooks.utils.text().randomColor()

          const tracked = await channel.track({
            id: stores.AUTH.account.user?.email ?? stores.AUTH.account.user?.id,
            type,
            avatar_url:
              stores.AUTH.account.user?.user_metadata?.avatar_url ?? undefined,
            online_at: new Date().toISOString(),
            color: hexColor,
          })

          if (tracked !== 'ok') {
            await removePresence(channel)

            hooks.toast.error(hooks.i18n.t('toast.generics.error'))

            return
          }

          const target = getCTX()

          if (type === 'owner') {
            channel.send(target)
            stores.LIVESHARE.lastUpdatedColor = hexColor
          } else {
            setCTX(target.payload.object, target.payload.ctx)
          }
        }
      })

    return channel
  }

  On.externals().PluginPresenceRoomCreate(emitter, [
    () => {
      const id = nanoid(30)

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

      setRoom(channel, 'visit')

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
    },
    () => {},
  ])
}
