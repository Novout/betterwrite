import { Events } from 'better-write-types'
import { Emitter } from 'mitt'
import { getCurrentInstance, ComponentInternalInstance } from 'vue'

export default function useEmitter() {
  const internalInstance = getCurrentInstance()
  const emitter = (internalInstance as ComponentInternalInstance).appContext
    .config.globalProperties.emitter

  return emitter as Emitter<Events>
}
