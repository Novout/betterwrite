import { BetterWriteThemes, PluginTypes } from 'better-write-types'
import { On } from 'better-write-plugin-core'
import { setEditorLogo, Themes } from './external'

export const PluginThemeContent = (
  emitter: PluginTypes.PluginEmitter,
  stores: PluginTypes.PluginStores,
  hooks: PluginTypes.PluginHooks,
) => {
  On.externals().PluginThemeSet(emitter, [
    (theme?: BetterWriteThemes) => {
      setTimeout(() => {
        setThemeInvokate(theme)
      }, 0)
    },
    () => {},
  ])

  const setThemeInvokate = (theme?: BetterWriteThemes) => {
    if (!theme) theme = stores.EDITOR.configuration.theme

    if (stores.PROJECT.name === hooks.env.projectEmpty())
      theme = setDefaultColorTheme()

    const value = ThemeNormalize(theme)

    setContentTheme(value)
    setStyleColorTheme(value)
    setEditorLogo(theme, hooks.utils)

    emitter.emit('plugin-theme-set-logo')
  }

  const setStyleColorTheme = (theme: string) => {
    const setColor = (color: string) => {
      document.head
        .querySelector('[name~=msapplication-TileColor][content]')
        ?.remove()
      document.head.querySelector('[name~=theme-color][content]')?.remove()

      const colorDef = document.createElement('meta')
      colorDef.name = 'theme-color'
      colorDef.content = color

      const colorMs = document.createElement('meta')
      colorMs.name = 'msapplication-TileColor'
      colorMs.content = color

      document.getElementsByTagName('head')[0].appendChild(colorDef)
      document.getElementsByTagName('head')[0].appendChild(colorMs)
    }
    // custom favicon
    switch (theme) {
      case 'betterwrite-light':
        setColor('#e9eaee')
        break
      case 'betterwrite-dark':
        setColor('#1F2937')
        break
      case 'betterwrite-rise':
        setColor('#373d66')
        break
      case 'betterwrite-harmonic':
        setColor('#b6ceeb')
        break
      case 'betterwrite-ascend':
        setColor('#fa8373')
        break
      case 'betterwrite-infinity':
        setColor('#242424')
        break
      case 'betterwrite-custom':
        setColor('#080808')
        break
      default:
        setColor('#1F2937')
        break
    }
  }

  const setDefaultColorTheme = (): BetterWriteThemes => {
    const color = hooks.vueuse.core.usePreferredColorScheme()
    const themes = Themes()

    let _color = themes[1][0] // for any case, dark theme

    switch (color.value) {
      case 'light':
        _color = themes[0][0] // white theme
        break
      case 'dark':
        _color = themes[5][0] // infinity theme
        break
      case 'no-preference':
        _color = themes[1][0] // dark theme
        break
    }

    return _color
  }

  const setContentTheme = (theme: string) => {
    const favicon = hooks.vueuse.core.useFavicon()

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
      case 'betterwrite-infinity':
        favicon.value = hooks.utils.path().resolve('logo_infinity.svg')
        break
      case 'betterwrite-custom':
        favicon.value = hooks.utils.path().resolve('logo_custom.svg')
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
        'BetterWrite - Infinity': 'betterwrite-infinity',
        'BetterWrite - Custom': 'betterwrite-custom',
      }[theme] || setDefaultColorTheme()
    )
  }
}
