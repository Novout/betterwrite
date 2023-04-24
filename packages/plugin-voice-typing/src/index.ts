import { PluginTypes } from 'better-write-types'
import { createPlugin } from 'better-write-plugin-core'
import { CollectorSet } from './collector'

export const VoiceTypingPlugin = (): PluginTypes.Plugin =>
  createPlugin({ name: 'voice-typing' }, [CollectorSet])
