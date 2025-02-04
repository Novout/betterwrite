import type {
  LiveshareType,
  Maybe,
} from 'better-write-types'
import { nanoid } from 'nanoid'

const SEPARATOR = '_'

export const isEmptyObject = (obj: Record<any, any>) =>
  Object.entries(obj).length === 0

export const validadeKey = (key?: string) =>
  key?.split(SEPARATOR)?.pop()?.length === 30
export const getKey = (key?: string): Maybe<LiveshareType> =>
  key?.split(SEPARATOR)?.shift() as LiveshareType

export const entries = (state: any) =>
  Object.entries(state)

export const getOwner = (
  presence: any
) =>
  entries(presence).find(([_, userPresence]) =>
    userPresence.find(({ type }) => type === 'owner')
  )

export const isCollaborateRoom = (id: string) => /^collaborator/.test(id)
export const isVisiterRoom = (id: string) => /^visit/.test(id)

export const genKey = (type: LiveshareType) =>
  `${type}${SEPARATOR}${nanoid(30)}`
