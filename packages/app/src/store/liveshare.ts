import { defineStore } from 'pinia'
import { LiveshareState } from 'better-write-types'

export const useLiveshareStore = defineStore('liveshare', {
  state: (): LiveshareState => {
    return {
      presence: {},
      presenceLimit: 5,
      user: undefined,
      roomKey: undefined,
      yourColor: undefined,
      activeColor: undefined,
    }
  },
  actions: {
    add(payload) {
      this.presence = { ...this.presence, payload }
    },
    remove(key: string) {
      const _presence = this.presence
      delete _presence[key]
      this.presence = _presence
    },
  },
})
