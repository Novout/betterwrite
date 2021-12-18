import { BetterWriteThemes } from 'better-write-types'
import { setDefaultColorTheme } from './external'

export const ThemeNormalize = (theme: BetterWriteThemes) => {
  return (
    {
      'BetterWrite - Light': 'betterwrite-light',
      'BetterWrite - Dark': 'betterwrite-dark',
      'BetterWrite - Rise': 'betterwrite-rise',
      'BetterWrite - Ascend': 'betterwrite-ascend',
      'BetterWrite - Harmonic': 'betterwrite-harmonic',
    }[theme] || setDefaultColorTheme()
  )
}
