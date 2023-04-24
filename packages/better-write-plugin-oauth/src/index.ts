import { PluginTypes } from 'better-write-types'
import { createPlugin } from 'better-write-plugin-core'
import { OAuthSet } from './set'

export const OAuthPlugin = (): PluginTypes.Plugin =>
  createPlugin({ name: 'oauth' }, [OAuthSet])
