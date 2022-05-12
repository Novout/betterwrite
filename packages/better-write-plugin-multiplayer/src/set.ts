import { createClient, LiveObject, Room } from '@liveblocks/client'
import { PluginTypes } from 'better-write-types'
import { On } from 'better-write-plugin-core'
import { ID } from 'better-write-types'

export const PluginMultiplayerSet = (
  emitter: PluginTypes.PluginEmitter,
  stores: PluginTypes.PluginStores,
  hooks: PluginTypes.PluginHooks
) => {
  const client = createClient({
    publicApiKey: hooks.env.multiplayer().public(),
  })
  let room: Room | null = null

  stores.AUTH.account.multiplayer.client = client

  const setContext = async (room: Room) => {
    const { root } = await room.getStorage()

    let CONTEXT = root.get('CONTEXT')

    if (CONTEXT == null) {
      CONTEXT = new LiveObject<any>()
      root.set('CONTEXT', CONTEXT)
    } else {
      stores.CONTEXT.$state = CONTEXT as any
    }

    room.subscribe(CONTEXT as any, (T) => {
      console.log('here', T)
    })

    /*
      hooks.plugin.on('plugin-multiplayer-room-context-update', () => {
        CONTEXT = stores.CONTEXT.$state as any
      })
      */
  }

  On.multiplayer().PluginMultiplayerCreate(emitter, [
    () => {
      const random = (
        Math.random().toString(36).slice(2, 7) +
        Math.random().toString(36).slice(2, 7)
      ).toUpperCase()
      const key = `BETTERWRITE-PUBLIC-${random}`

      room = client.enter(key)

      hooks.plugin.emit('plugin-multiplayer-room-id', key)

      setContext(room)
    },
    () => {},
  ])

  On.multiplayer().PluginMultiplayerEnter(emitter, [
    async (id: ID<string>) => {
      room = client.enter(id)

      stores.AUTH.account.multiplayer.connect = {
        key: id,
        type: 'guest',
      }

      setContext(room)
    },
    () => {},
  ])

  On.multiplayer().PluginMultiplayerLeave(emitter, [
    () => {
      client.leave('BETTERWRITE-PUBLIC-1')
    },
    () => {},
  ])
}
