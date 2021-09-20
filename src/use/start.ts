import { useStore } from 'vuex'

const darkSet = (store: any) => {
  const dark = localStorage.getItem('theme')

  dark
    ? (document.querySelector('html') as HTMLElement).classList.add('dark')
    : (document.querySelector('html') as HTMLElement).classList.remove('dark')

  store.commit('editor/switchTheme', dark ? true : false)
}

export const useStart = () => {
  const store = useStore()

  const init = () => {
    darkSet(store)
  }

  return { init }
}
