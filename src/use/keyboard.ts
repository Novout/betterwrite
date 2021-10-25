import keyboard from 'keyboardjs'
import { Callback } from '@/types/utils'
import { useLocalStorage } from './storage/local'
import { useUtils } from './utils'
import { usePage } from './page'
import { usePDF } from './pdf'
import { useEnv } from './env'
import { useProject } from './project'
import { useProjectStore } from '@/store/project'
import { useContextStore } from '@/store/context'
import { useShortcutsStore } from '@/store/shortcuts'
import { useAbsoluteStore } from '@/store/absolute'

export const useKeyboard = () => {
  const PROJECT = useProjectStore()
  const SHORTCUTS = useShortcutsStore()
  const ABSOLUTE = useAbsoluteStore()
  const CONTEXT = useContextStore()

  const local = useLocalStorage()
  const page = usePage()
  const pdf = usePDF()
  const env = useEnv()
  const utils = useUtils()
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

      local.onLoadProject()
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
      utils.prevent(e)

      if (PROJECT.name === env.projectEmpty()) return

      pdf.external().onGeneratePDF()
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
