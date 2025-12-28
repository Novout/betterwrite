import { AuthState } from 'better-write-types'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => {
    return {
      user: null,
      account: {
        // TODO: remove id use
        project_id_activity: null,
      },
    }
  },
  actions: {},
})
