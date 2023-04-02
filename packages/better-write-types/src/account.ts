import { ID } from './utils'

export type AccountPlan = 'beginner' | 'intermediate' | 'advanced' | 'unlimited'

export interface Account {
  id: ID<number>
  plan: AccountPlan
  created_at: string
  created_at_day: string
}
