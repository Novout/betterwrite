import { ProjectObject } from './project'
import { Maybe } from './utils'

export interface VaultState {
  projects?: Maybe<ProjectObject[]>
}
