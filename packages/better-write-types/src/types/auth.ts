import { User } from '@supabase/supabase-js'
import { ID, Maybe } from './utils'

export interface AuthStateAccount {
  user: User | null
  project_id_activity: ID<number> | null
}

export interface AuthState {
  dropbox: AuthStateDropbox
  account: AuthStateAccount
}

export interface AuthStateDropbox {
  accessToken: Maybe<string>
}

export type SupabaseIntegrations = 'google' | 'github' | 'gitlab' | 'notion'
