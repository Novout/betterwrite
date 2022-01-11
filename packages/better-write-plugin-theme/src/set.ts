import { useFavicon, usePreferredColorScheme } from '@vueuse/core'
import { BetterWriteThemes, PluginTypes } from 'better-write-types'
import { On } from 'better-write-plugin-core'
import { setEditorLogo } from './external'

export const PluginThemeContent = (
  emitter: PluginTypes.PluginEmitter,
  stores: PluginTypes.PluginStores,
  hooks: PluginTypes.PluginHooks
) => {
  On.externals().PluginThemeSet(emitter, [
    () => {
      setTimeout(() => {
        setThemeInvokate()
      }, 0)
    },
    () => {},
  ])

  const setThemeInvokate = () => {
    let theme = stores.EDITOR.configuration.theme

    if (stores.PROJECT.name === hooks.env.projectEmpty())
      theme = setDefaultColorTheme()

    const value = ThemeNormalize(theme)

    setContentTheme(value)
    setEditorLogo(theme, hooks.utils)

    emitter.emit('plugin-theme-set-logo')
  }

  const setDefaultColorTheme = (): BetterWriteThemes => {
    const color = usePreferredColorScheme()

    let _color = hooks.defines.themes()[1] // for any case, dark theme

    switch (color.value) {
      case 'light':
        _color = hooks.defines.themes()[0] // white theme
        break
      case 'dark':
      case 'no-preference':
        _color = hooks.defines.themes()[1] // dark theme
        break
    }

    return _color
  }

  const setContentTheme = (theme: string) => {
    const favicon = useFavicon()

    // custom favicon
    switch (theme) {
      case 'betterwrite-light':
      case 'betterwrite-dark':
        favicon.value = hooks.utils.path().resolve('logo_default.svg')
        break
      case 'betterwrite-rise':
        favicon.value = hooks.utils.path().resolve('logo_rise.svg')
        break
      case 'betterwrite-harmonic':
        favicon.value = hooks.utils.path().resolve('logo_harmonic.svg')
        break
      case 'betterwrite-ascend':
        favicon.value = hooks.utils.path().resolve('logo_ascend.svg')
        break
      default:
        favicon.value = hooks.utils.path().resolve('logo_default.svg')
        break
    }

    // body class for css variables
    document.body.removeAttribute('class')
    document.body.classList.add(theme)
  }

  const ThemeNormalize = (theme: BetterWriteThemes) => {
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
}
