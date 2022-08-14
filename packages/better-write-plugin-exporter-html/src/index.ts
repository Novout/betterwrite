import { PluginTypes } from 'better-write-types'
import { createPlugin } from 'better-write-plugin-core'
import { PluginHtmlSet } from './set'

export const HtmlPlugin = (): PluginTypes.Plugin =>
  createPlugin({ name: 'html' }, [PluginHtmlSet])
