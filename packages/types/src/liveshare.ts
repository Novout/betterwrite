export type LiveshareType = 'owner' | 'visit' | 'collaborator'

export interface LivesharePresenceUser {
  id: string
  type: LiveshareType
  avatar_url?: string
  online_at: string
  color: string
  presence_ref: string
}

export type LivesharePresenceItem = LivesharePresenceUser

export interface LiveshareState {
  presence: {
    [x: string]: LivesharePresenceItem[]
  }
  user?: LivesharePresenceUser
  roomKey?: string
  presenceLimit: number
  yourColor?: string
  activeColor?: string
}
