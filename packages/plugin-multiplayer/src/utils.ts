import type { LivesharePresenceItem } from 'better-write-types'
import type { RealtimePresenceState } from '@supabase/supabase-js'

export const validadeKey = (key?: string) => key?.length === 30

export const entries = (state: RealtimePresenceState<LivesharePresenceItem>) =>
  Object.entries(state)

export const getOwner = (
  presence: RealtimePresenceState<LivesharePresenceItem>
) =>
  entries(presence).find(([_, userPresence]) =>
    userPresence.find(({ type }) => type === 'owner')
  )
