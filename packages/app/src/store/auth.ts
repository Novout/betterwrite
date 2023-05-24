import { AuthState } from 'better-write-types'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => {
    return {
      account: {
        user: null,
        project_id_activity: null,
        multiplayer: { client: null, connect: null },
        dropboxAccessToken: null,
      },
    }
  },
  actions: {},
})
