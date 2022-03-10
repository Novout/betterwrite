import keyboard from 'keyboardjs'
import { Callback } from 'better-write-types'
import { useLocalStorage } from './storage/local'
import { useUtils } from './utils'
import { usePage } from './page'
import { useEnv } from './env'
import { useProject } from './project'
import { useProjectStore } from '@/store/project'
import { useShortcutsStore } from '@/store/shortcuts'
import { useAbsoluteStore } from '@/store/absolute'
import { usePlugin } from 'better-write-plugin-core/src'

export const useKeyboard = () => {
  const PROJECT = useProjectStore()
  const SHORTCUTS = useShortcutsStore()
  const ABSOLUTE = useAbsoluteStore()

  const local = useLocalStorage()
  const page = usePage()
  const env = useEnv()
  const utils = useUtils()
  const plugin = usePlugin()
  const project = useProject()

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
    keyboard.bind(SHORTCUTS.localSaveProject[1], (e: Event) => {
      utils.prevent(e)

      if (PROJECT.name === env.projectEmpty()) return

      local.onSaveProject()
    })
  }

  const loadLocal = () => {
    keyboard.bind(SHORTCUTS.localLoadProject[1], async (e: Event) => {
      utils.prevent(e)

      project.onLoadProject()
    })
  }

  const newProject = () => {
    keyboard.bind(SHORTCUTS.newProject[1], (e: Event) => {
      utils.prevent(e)

      ABSOLUTE.aside = true
      ABSOLUTE.project.new = !ABSOLUTE.project.new
    })
  }

  const newChapter = () => {
    keyboard.bind(SHORTCUTS.newChapter[1], (e: Event) => {
      utils.prevent(e)

      if (PROJECT.name === env.projectEmpty() || !project.isCreativeProject())
        return

      page.onCreatePage()
    })
  }

  const deleteChapter = () => {
    keyboard.bind(SHORTCUTS.deleteChapter[1], (e: Event) => {
      utils.prevent(e)

      if (PROJECT.name === env.projectEmpty() || !project.isCreativeProject())
        return

      page.onDeletePage()
    })
  }

  const generatePDF = () => {
    keyboard.bind(SHORTCUTS.generatePDF[1], (e: Event) => {
      plugin.emit('plugin-pdf-generate')
    })
  }

  const switcherRawText = () => {
    keyboard.bind(SHORTCUTS.switcherRawText[1], (e: Event) => {
      utils.prevent(e)

      if (PROJECT.name === env.projectEmpty()) return

      ABSOLUTE.shortcuts.switcher = !ABSOLUTE.shortcuts.switcher
    })
  }

  const finderRawText = () => {
    keyboard.bind(SHORTCUTS.finderRawText[1], (e: Event) => {
      utils.prevent(e)

      if (PROJECT.name === env.projectEmpty()) return

      ABSOLUTE.shortcuts.finder = !ABSOLUTE.shortcuts.finder
    })
  }

  const logger = () => {
    keyboard.bind(SHORTCUTS.logger[1], (e: Event) => {
      utils.prevent(e)

      if (PROJECT.name === env.projectEmpty()) return

      ABSOLUTE.logger = !ABSOLUTE.logger
    })
  }

  const previewPDF = () => {
    keyboard.bind(SHORTCUTS.previewPDF[1], (e: Event) => {
      utils.prevent(e)

      if (PROJECT.name === env.projectEmpty()) return

      ABSOLUTE.pdf.preview = !ABSOLUTE.pdf.preview
    })
  }

  const configurationPDF = () => {
    keyboard.bind(SHORTCUTS.configurationPDF[1], (e: Event) => {
      utils.prevent(e)

      if (PROJECT.name === env.projectEmpty()) return

      ABSOLUTE.pdf.configuration = !ABSOLUTE.pdf.configuration
    })
  }

  return { init, destroy }
}
