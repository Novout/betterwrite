import keyboard from 'keyboardjs'
import { Callback } from '@/types/utils'
import { useStore } from 'vuex'
import { useLocalStorage } from './storage/local'
import { useUtils } from './utils'
import { usePage } from './page'
import { usePDF } from './pdf'
import { useEnv } from './env'

export const useKeyboard = () => {
  const store = useStore()

  const init: Callback<void> = () => {
    saveLocal()
    loadLocal()
    newProject()
    newChapter()
    deleteChapter()
    generatePDF()
    switcherRawText()
    finderRawText()
    logger()
    previewPDF()
    configurationPDF()
  }

  const destroy = () => {
    keyboard.stop()
  }

  const saveLocal = () => {
    keyboard.bind(store.state.shortcuts.localSaveProject[1], (e: Event) => {
      useUtils().prevent(e)

      if (store.state.project.name === useEnv().projectEmpty()) return

      useLocalStorage(store).onSaveProject()
    })
  }

  const loadLocal = () => {
    keyboard.bind(
      store.state.shortcuts.localLoadProject[1],
      async (e: Event) => {
        useUtils().prevent(e)

        useLocalStorage(store).onLoadProject()
      }
    )
  }

  const newProject = () => {
    keyboard.bind(store.state.shortcuts.newProject[1], (e: Event) => {
      useUtils().prevent(e)
      store.commit('absolute/switchAside', true)

      store.commit('absolute/switchProjectModal', true)
    })
  }

  const newChapter = () => {
    keyboard.bind(store.state.shortcuts.newChapter[1], (e: Event) => {
      useUtils().prevent(e)

      if (store.state.project.name === useEnv().projectEmpty()) return

      usePage(store).onCreatePage()
    })
  }

  const deleteChapter = () => {
    keyboard.bind(store.state.shortcuts.deleteChapter[1], (e: Event) => {
      useUtils().prevent(e)

      if (store.state.project.name === useEnv().projectEmpty()) return

      usePage(store).onDeletePage()
    })
  }

  const generatePDF = () => {
    keyboard.bind(store.state.shortcuts.generatePDF[1], (e: Event) => {
      useUtils().prevent(e)

      if (store.state.project.name === useEnv().projectEmpty()) return

      usePDF().external(store).onGeneratePDF()
    })
  }

  const switcherRawText = () => {
    keyboard.bind(store.state.shortcuts.switcherRawText[1], (e: Event) => {
      useUtils().prevent(e)

      if (store.state.project.name === useEnv().projectEmpty()) return

      store.commit(
        'absolute/switchShortcutSwitcher',
        !store.state.absolute.shortcuts.switcher
      )
    })
  }

  const finderRawText = () => {
    keyboard.bind(store.state.shortcuts.finderRawText[1], (e: Event) => {
      useUtils().prevent(e)

      if (store.state.project.name === useEnv().projectEmpty()) return

      store.commit(
        'absolute/switchShortcutFinder',
        !store.state.absolute.shortcuts.finder
      )
    })
  }

  const logger = () => {
    keyboard.bind(store.state.shortcuts.logger[1], (e: Event) => {
      useUtils().prevent(e)

      if (store.state.project.name === useEnv().projectEmpty()) return

      store.commit('absolute/switchLogger', !store.state.absolute.logger)
    })
  }

  const previewPDF = () => {
    keyboard.bind(store.state.shortcuts.previewPDF[1], (e: Event) => {
      useUtils().prevent(e)

      if (store.state.project.name === useEnv().projectEmpty()) return

      store.commit(
        'absolute/switchPdfPreview',
        !store.state.absolute.pdf.preview
      )
    })
  }

  const configurationPDF = () => {
    keyboard.bind(store.state.shortcuts.configurationPDF[1], (e: Event) => {
      useUtils().prevent(e)

      if (store.state.project.name === useEnv().projectEmpty()) return

      store.commit(
        'absolute/switchPdfConfiguration',
        !store.state.absolute.pdf.configuration
      )
    })
  }

  return { init, destroy }
}
