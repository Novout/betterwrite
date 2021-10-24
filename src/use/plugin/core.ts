import { getCurrentInstance, ComponentInternalInstance } from 'vue'
import { PluginEmitter } from '@/types/plugin/core'

export default function usePlugin() {
  const internalInstance = getCurrentInstance()
  const emitter = (internalInstance as ComponentInternalInstance).appContext
    .config.globalProperties.plugin

  return emitter as PluginEmitter
}
