import { Callback } from '@/types/utils'
import { useStore } from 'vuex'
import { nextTick } from 'vue'
import keyboard from 'keyboardjs'
import { useLocalStorage } from './storage/local'
import { useUtils } from './utils'

export const useKeyboard: Callback<any> = () => {
  const store = useStore()

  const init: Callback<void> = () => {
    save()
    load()

    keyboard.resume()
  }

  const destroy = () => {
    keyboard.pause()
  }

  const save = () => {
    keyboard.bind(store.state.shortcuts.localSaveProject[1], (e: Event) => {
      useUtils().prevent(e)

      useLocalStorage(store).onSaveProject()
    })
  }

  const load = () => {
    keyboard.bind(
      store.state.shortcuts.localLoadProject[1],
      async (e: Event) => {
        useUtils().prevent(e)

        const context = useLocalStorage().getProject()

        if (!context) return

        store.commit('project/load', context.project)
        await nextTick

        store.commit('context/load', store.state.project.pages[0])
      }
    )
  }

  return { init, destroy }
}
