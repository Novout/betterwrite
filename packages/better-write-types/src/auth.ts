import { User } from '@supabase/supabase-js'
import { ID } from './utils'

export interface AuthStateAccountMultiplayerConnect {
  key: ID<string>
  type: 'owner' | 'guest'
}

export interface AuthStateAccountMultiplayer {
  client: any | null
  connect: AuthStateAccountMultiplayerConnect | null
}

export interface AuthStateAccount {
  user: User | null
  project_id_activity: ID<number> | null
  multiplayer: AuthStateAccountMultiplayer
}

export interface AuthState {
  account: AuthStateAccount
}

export type SupabaseIntegrations = 'google' | 'github' | 'notion'
