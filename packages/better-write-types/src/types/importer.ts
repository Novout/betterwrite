import { EntityType } from './context'

export interface ImporterEntity {
  type: EntityType
  raw: string
}

export interface ImporterData {
  entities: ImporterEntity[]
}
