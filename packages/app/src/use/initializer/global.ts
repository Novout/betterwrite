import { useAbsoluteStore } from '@/store/absolute'
import { useEditorStore } from '@/store/editor'
import { useMouse, usePageLeave, useTextSelection } from '@vueuse/core'
import { watch } from 'vue'

export const useGlobalInitializer = () => {
  const ABSOLUTE = useAbsoluteStore()
  const EDITOR = useEditorStore()

  const { x, y } = useMouse({ type: 'page' })
  const selection = useTextSelection()
  const isLeft = usePageLeave()

  const init = () => {
    // set global mouse tracking
    watch([x, y], ([_x, _y]) => {
      // @ts-ignore
      EDITOR.actives.global.mouse.x = _x
      // @ts-ignore
      EDITOR.actives.global.mouse.y = _y
      // @ts-ignore
      EDITOR.actives.global.mouse.vertical =
        // @ts-ignore
        window.innerHeight / 2 >= _y ? 'top' : 'bottom'

      EDITOR.actives.global.mouse.horizontal =
        // @ts-ignore
        window.innerWidth / 2 >= _x ? 'left' : 'right'
    })

    // for stop propagation problems in auto reset selection (contextmenu i.e)
    watch(selection.text, (_selection) => {
      // @ts-ignore
      if (!_selection) return

      EDITOR.actives.global.mouse.validLastSelection = true
    })

    // reset absolute variables in external case
    watch(isLeft, (_left) => {
      ABSOLUTE.entity.menu = false
    })
  }

  return { init }
}
