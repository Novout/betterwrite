import { ID, Maybe } from './utils'

export interface AuthStateAccountMultiplayerConnect {
  key: ID<string>
  type: 'owner' | 'guest'
}

export interface AuthStateAccountMultiplayer {
  client: any | null
  connect: AuthStateAccountMultiplayerConnect | null
}

export interface AuthStateAccount {
  user: true | null
  project_id_activity: ID<number> | null
  multiplayer: AuthStateAccountMultiplayer
  dropboxAccessToken?: Maybe<string>
}

export interface AuthState {
  account: AuthStateAccount
}

export type SupabaseIntegrations = 'google' | 'github' | 'notion'

export interface AuthAccountPayloadRegister {
  email: string
  password: string
  termsOfUse: boolean
}
