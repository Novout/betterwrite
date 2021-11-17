import { useEditorStore } from '@/store/editor'
import { onAfterMounted } from '../core/cycle'
import { ThemeNormalize } from './utils'
import { useProjectStore } from '@/store/project'
import { useEnv } from '@/use/env'
import { useDefines } from '@/use/defines'
import { BetterWriteThemes } from '@/types/editor'
import { useFavicon, usePreferredColorScheme } from '@vueuse/core'

export const setTheme = () => {
  onAfterMounted(() => {
    setThemeInvokate()
  })
}

export const setThemeInvokate = () => {
  const EDITOR = useEditorStore()
  const PROJECT = useProjectStore()

  const env = useEnv()

  let theme = EDITOR.configuration.theme

  if (PROJECT.name === env.projectEmpty()) theme = setDefaultColorTheme()

  const value = ThemeNormalize(theme)

  setContentTheme(value)
}

export const setDefaultColorTheme = (): BetterWriteThemes => {
  const defines = useDefines()
  const color = usePreferredColorScheme()

  let _color = defines.themes()[1] // for any case, dark theme

  switch (color.value) {
    case 'light':
      _color = defines.themes()[0] // white theme
      break
    case 'dark':
    case 'no-preference':
      _color = defines.themes()[1] // dark theme
      break
  }

  return _color
}

export const setContentTheme = (theme: string) => {
  const favicon = useFavicon()

  // custom favicon
  switch (theme) {
    case 'betterwrite-light':
    case 'betterwrite-dark':
      favicon.value = '/logo_default.svg'
      break
    case 'betterwrite-rise':
      favicon.value = '/logo_rise.svg'
      break
    case 'betterwrite-harmonic':
      favicon.value = '/logo_harmonic.svg'
      break
    case 'betterwrite-ascend':
      favicon.value = '/logo_ascend.svg'
      break
    default:
      favicon.value = '/logo_default.svg'
      break
  }

  // body class for css variables
  document.body.removeAttribute('class')
  document.body.classList.add(theme)
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
