export interface LivesharePresenceItem {
  id: string
  type: 'owner' | 'visit'
  avatar_url?: string
  online_at: string
  color: string
  presence_ref: string
}

export interface LiveshareState {
  presence: {
    [x: string]: LivesharePresenceItem[]
  }
  roomKey?: string
  presenceLimit: number
  ownerKey?: string
  lastUpdatedColor?: string
}
