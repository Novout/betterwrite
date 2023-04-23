import { On } from 'better-write-plugin-core'
import type {
  LivesharePresenceItem,
  PluginTypes,
  ProjectObject,
} from 'better-write-types'
import type { RealtimeChannel } from '@supabase/supabase-js'
import { nanoid } from 'nanoid'
import { computed } from 'vue-demi'

export const RoomSet = (
  emitter: PluginTypes.PluginEmitter,
  stores: PluginTypes.PluginStores,
  hooks: PluginTypes.PluginHooks
) => {
  const setCTX = (ctx: ProjectObject) => {
    // TODO: better method for track changes

    stores.PROJECT.$state = ctx.project
    stores.EDITOR.$state = ctx.editor
    stores.PDF.$state = ctx.pdf
    stores.DOCX.$state = ctx.docx
  }

  const getCTX = (): {
    type: string
    event: string
    payload: { ctx: ProjectObject }
  } => ({
    type: 'broadcast',
    event: 'ctx',
    payload: { ctx: hooks.storage.getProjectObject() },
  })

  const setRoom = (
    channel: RealtimeChannel,
    type: 'owner' | 'visit'
  ): RealtimeChannel => {
    channel
      .on('presence', { event: 'join' }, ({ key, newPresences }) => {
        // TODO: @vueuse/sound in enter new user

        if (type === 'owner') stores.LIVESHARE.ownerKey = key
      })
      .on('presence', { event: 'leave' }, async ({ key, leftPresences }) => {
        // TODO: @vueuse/sound in leave new user

        if (key === stores.LIVESHARE.ownerKey) {
          await channel.unsubscribe().catch(() => {})

          stores.LIVESHARE.$reset()

          // TODO: check if project is destroyed or not
        }
      })
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState<LivesharePresenceItem>()

        if (state) stores.LIVESHARE.presence = state
      })
      .on('broadcast', { event: 'ctx' }, (payload) => {
        if (type === 'owner') return

        setCTX(payload.ctx)
      })

    channel.subscribe(async (status) => {
      if (status === 'SUBSCRIBED') {
        await channel.track({
          id: stores.AUTH.account.user?.email ?? stores.AUTH.account.user?.id,
          avatar_url:
            stores.AUTH.account.user?.user_metadata?.avatar_url ?? undefined,
          online_at: new Date().toISOString(),
          color: hooks.utils.text().randomColor(), // TODO: use's safe random color or predefined arr colors
        })

        if (type === 'owner') channel.send(getCTX())
      }
    })

    return channel
  }

  On.externals().PluginPresenceRoomCreate(emitter, [
    () => {
      const id = nanoid(30)

      const channel = hooks.supabase.channel(id)

      setRoom(channel, 'owner')

      hooks.vueuse.core.watchDebounced(
        computed(() => stores.PROJECT.$state),
        () => {
          channel.send(getCTX())
        },
        { debounce: 1000, maxWait: 2000, immediate: true, deep: false }
      )

      emitter.emit('plugin-presence-room-create-key', id)
    },
    () => {},
  ])

  On.externals().PluginPresenceRoomJoin(emitter, [
    async (id: string) => {
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
    },
    () => {},
  ])
}
