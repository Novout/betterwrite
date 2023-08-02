import { App, inject, InjectionKey, getCurrentInstance } from 'vue-demi'
import { PluginTypes } from 'better-write-types'
import mitt from 'mitt'

export const Key: InjectionKey<PluginTypes.CorePlugin> = Symbol()

export function useCore(): PluginTypes.CorePlugin {
  const plugin = inject(Key)
  if (!plugin) throw new Error('[BETTER-WRITE]: Fail in Plugin Core Hook!')

  return plugin
}

export function usePlugin(): PluginTypes.PluginEmitter {
  return getCurrentInstance()?.appContext.config.globalProperties.plugin
}

export function createPluginCore(
  options?: PluginTypes.CoreOption,
): PluginTypes.CorePlugin {
  const start = (
    stores: PluginTypes.PluginStores,
    plugins: PluginTypes.Plugins,
    hooks: PluginTypes.PluginHooks,
  ) => {
    plugins?.forEach((plugin: PluginTypes.Plugin) => {
      plugin.init(
        getCurrentInstance()?.appContext.config.globalProperties.plugin,
        stores,
        hooks,
      )
    })
  }

  const plugin: PluginTypes.CorePlugin = {
    options,
    start,
    install(app: App) {
      app.config.globalProperties.plugin = mitt() as PluginTypes.PluginEmitter
      app.provide(Key, this)
    },
  }

  return plugin
}

export const createPlugin = (
  defines: PluginTypes.PluginDefines,
  cb: Array<Function>,
): PluginTypes.Plugin => {
  const init = (
    emitter: PluginTypes.PluginEmitter,
    stores: PluginTypes.PluginStores,
    hooks: PluginTypes.PluginHooks,
  ) => {
    cb.forEach((fn) => {
      fn && fn(emitter, stores, hooks)
    })
  }

  return { init, defines }
}

export * as Cycle from './cycle'
export * as On from './on'
export * as Calls from './calls'
