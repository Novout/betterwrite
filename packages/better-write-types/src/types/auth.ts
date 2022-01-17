import { User } from '@supabase/supabase-js'
import { Maybe } from './utils'

export interface AuthStateAccount {
  user: User | null
}

export interface AuthState {
  dropbox: AuthStateDropbox
  account: AuthStateAccount
}

interface AuthStateDropbox {
  accessToken: Maybe<string>
}
