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
    room.subscribe('others', (others) => {
      console.log(others.toArray())
    })
  }

  On.multiplayer().PluginMultiplayerCreate(emitter, [
    () => {
      const random = (
        Math.random().toString(36).slice(2, 7) +
        Math.random().toString(36).slice(2, 7)
      ).toUpperCase()
      const key = `BETTERWRITE-PUBLIC-${random}`

      room = client.enter(key, {
        initialPresence: { cursor: null },
        initialStorage: {
          instance: new LiveObject(hooks.storage.getProjectObject()),
        },
      })

      hooks.plugin.emit('plugin-multiplayer-room-id', key)

      stores.AUTH.account.multiplayer.connect = {
        key,
        type: 'owner',
      }

      setContext(room)
    },
    () => {},
  ])

  On.multiplayer().PluginMultiplayerEnter(emitter, [
    async (id: ID<string>) => {
      room = client.enter(id)

      const object = await room.getStorage()

      stores.AUTH.account.multiplayer.connect = {
        key: id,
        type: 'guest',
      }

      setContext(room)
    },
    () => {},
  ])

  On.multiplayer().PluginMultiplayerLeave(emitter, [
    (key: ID<string>) => {
      client.leave(key)
    },
    () => {},
  ])
}
