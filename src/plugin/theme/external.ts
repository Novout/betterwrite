import { useEditorStore } from '@/store/editor'
import { onAfterMounted } from '../core/cycle'
import { ThemeNormalize } from './utils'
import { useProjectStore } from '@/store/project'
import { useEnv } from '@/use/env'

export const setTheme = () => {
  onAfterMounted(() => {
    setThemeInvokate()
  })
}

export const setThemeInvokate = () => {
  const EDITOR = useEditorStore()
  const PROJECT = useProjectStore()

  const env = useEnv()

  if (PROJECT.name === env.projectEmpty()) return

  const theme = EDITOR.configuration.theme

  const value = ThemeNormalize(theme)

  document.body.removeAttribute('class')
  document.body.classList.add(value)
}
