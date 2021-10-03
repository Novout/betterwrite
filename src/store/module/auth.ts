import { AbsoluteState } from '@/types/absolute'
import { AuthState } from '@/types/auth'

export default {
  namespaced: true,
  state: () =>
    ({
      dropbox: {
        accessToken: null,
      },
    } as AuthState),
  mutations: {
    setDropboxToken(state: AuthState, token: string) {
      state.dropbox.accessToken = token
    },
  },
  actions: {},
  getters: {},
}
