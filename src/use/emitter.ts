import { getCurrentInstance, ComponentInternalInstance } from 'vue'
import { VueEmitter } from '@/types/emitter'

export default function useEmitter() {
  const internalInstance = getCurrentInstance()
  const emitter = (internalInstance as ComponentInternalInstance).appContext
    .config.globalProperties.emitter

  return emitter as VueEmitter
}