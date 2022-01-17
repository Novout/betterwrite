import { AuthState } from 'better-write-types'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => {
    return {
      account: {
        user: null,
      },
      dropbox: {
        accessToken: null,
      },
    }
  },
  actions: {
    setDropboxToken(token: string) {
      this.dropbox.accessToken = token
    },
  },
})
