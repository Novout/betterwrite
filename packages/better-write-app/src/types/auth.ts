import { Maybe } from './utils'

export interface AuthState {
  dropbox: AuthStateDropbox
}

interface AuthStateDropbox {
  accessToken: Maybe<string>
}
