import { useAbsoluteStore } from '@/store/absolute'
import { useEventListener } from '@vueuse/core'

export const useListener = () => {
  const ABSOLUTE = useAbsoluteStore()

  const keyboard = () => {
    const add = () => {
      useEventListener('keydown', cb)
    }

    const cb = (e: KeyboardEvent) => {
      if (e.ctrlKey && (e.key === 'f' || e.key === 'F')) {
        e.preventDefault()
        e.stopPropagation()

        ABSOLUTE.shortcuts.finder = !ABSOLUTE.shortcuts.finder
      }

      if (e.ctrlKey && (e.key === 'h' || e.key === 'H')) {
        e.preventDefault()
        e.stopPropagation()

        ABSOLUTE.shortcuts.switcher = !ABSOLUTE.shortcuts.switcher
      }
    }

    return { add }
  }

  return { keyboard }
}
