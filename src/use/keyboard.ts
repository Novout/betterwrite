import { Callback } from '@/types/utils'
import { useStore } from 'vuex'
import keyboard from 'keyboardjs'
import { useLocalStorage } from './storage/local'
import { useUtils } from './utils'

export const useKeyboard: Callback<any> = () => {
  const store = useStore()

  const init: Callback<void> = () => {
    keyboard.resume()

    save()
  }

  const destroy = () => {
    keyboard.pause()
  }

  const save = () => {
    keyboard.bind(store.state.shortcuts.localSaveProject, (e: Event) => {
      useUtils().prevent(e)

      useLocalStorage(store).onSaveProject()
    })
  }

  return { init, destroy }
}
