import { useEditorStore } from '@/store/editor'
import { onAfterMounted } from '../core/cycle'
import { ThemeNormalize } from './utils'
import { useProjectStore } from '@/store/project'
import { useEnv } from '@/use/env'
import { useDefines } from '../../use/defines'
import { BetterWriteThemes } from '@/types/editor'

export const setTheme = () => {
  onAfterMounted(() => {
    setThemeInvokate()
  })
}

export const setThemeInvokate = () => {
  const EDITOR = useEditorStore()
  const PROJECT = useProjectStore()

  const env = useEnv()
  const defines = useDefines()

  let theme = EDITOR.configuration.theme

  if (PROJECT.name === env.projectEmpty()) theme = defines.themes()[1]

  const value = ThemeNormalize(theme)

  document.body.removeAttribute('class')
  document.body.classList.add(value)
}

export const setEditorLogo = (theme: BetterWriteThemes) => {
  let logo = ''

  switch (theme) {
    case 'BetterWrite - Dark':
    case 'BetterWrite - Light':
      logo = '/logo_default.svg'
      break
    case 'BetterWrite - Rise':
      logo = '/logo_rise.svg'
      break
    case 'BetterWrite - Harmonic':
      logo = '/logo_harmonic.svg'
      break
    case 'BetterWrite - Ascend':
      logo = '/logo_ascend.svg'
      break
    default:
      logo = '/logo_default.svg'
      break
  }

  return logo
}
