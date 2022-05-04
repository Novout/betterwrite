import { useContextStore } from '@/store/context'
import { Ref } from 'vue'

export const useBlockText = () => {
  const CONTEXT = useContextStore()

  const save = (target: number, raw: string) => {
    CONTEXT.entities[target].raw = raw
  }

  return { save }
}
