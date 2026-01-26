import { useDOCXStore } from "@/store/docx"
import { useEditorStore } from "@/store/editor"
import { usePDFStore } from "@/store/pdf"
import { useProjectStore } from "@/store/project"
import { useShortcutsStore } from "@/store/shortcuts"

export const useContent = () => {
  const PROJECT = useProjectStore()
  const EDITOR = useEditorStore()
  const PDF = usePDFStore()
  const DOCX = useDOCXStore()
  const SHORTCUTS = useShortcutsStore()

  const get = () => {
    return {
      id: undefined,
      project: PROJECT.$state,
      editor: EDITOR.$state,
      pdf: {
        styles: PDF.styles,
        fonts: [],
        normalize: {},
      },
      docx: DOCX.$state,
      shortcuts: SHORTCUTS.$state
    }
  }

  return { get }
}