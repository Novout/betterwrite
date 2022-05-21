import { PluginTypes } from 'better-write-types'
import { createPlugin } from 'better-write-plugin-core'
import { PluginPDFSet } from './generate'
import { PluginPDFBase } from './base'

export const PDFPlugin = (): PluginTypes.Plugin =>
  createPlugin({ name: 'pdf' }, [PluginPDFBase, PluginPDFSet])

export * from './externals'
export * from './vfs'
