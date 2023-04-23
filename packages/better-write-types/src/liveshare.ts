export interface LivesharePresenceItem {
  id: string
  avatar_url?: string
  online_at: string
  color: string
  presence_ref: string
}

export interface LiveshareState {
  presence: {
    [x: string]: LivesharePresenceItem[]
  }
  presenceLimit: number
  ownerKey?: string
}
