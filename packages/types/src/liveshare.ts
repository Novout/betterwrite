export interface LivesharePresenceUser {
  id: string
  type: 'owner' | 'visit'
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
  lastUpdatedColor?: string
}
