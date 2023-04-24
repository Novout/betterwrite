import { PluginTypes } from 'better-write-types'
import { createPlugin } from 'better-write-plugin-core'
import { DOCXSet } from './docx'
import { TXTSet } from './txt'
import { BWSet } from './bw'

export const ImporterPlugin = (): PluginTypes.Plugin =>
  createPlugin({ name: 'importer' }, [DOCXSet, TXTSet, BWSet])

export * from './reader'
