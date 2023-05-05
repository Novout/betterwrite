import { PluginTypes } from 'better-write-types'
import { createPlugin } from 'better-write-plugin-core'
import { PluginPDFSet } from './generate'

export const PDFPlugin = (): PluginTypes.Plugin =>
  createPlugin({ name: 'pdf' }, [PluginPDFSet])

export * from './vfs'
