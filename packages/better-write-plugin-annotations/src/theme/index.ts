/* This theme is based in default nord theme by Mirone. */

import {
  Emotion,
  ThemeBorder,
  ThemeColor,
  themeFactory,
  ThemeFont,
  ThemeGlobal,
  ThemeIcon,
  ThemeManager,
  ThemeScrollbar,
  ThemeShadow,
  ThemeSize,
} from '@milkdown/core'
import { useAllPresetRenderer } from '@milkdown/theme-pack-helper'
import { getStyle } from './style'

export const size = {
  radius: '4px',
  lineWidth: '1px',
}

export const createTheme = () => (emotion: Emotion, manager: ThemeManager) => {
  const { css } = emotion

  manager.set(ThemeColor, ([key]) => {
    switch (key) {
      case 'primary':
        return 'var(--theme-background-2)'
      case 'secondary':
        return 'var(--theme-background-4)'
      case 'neutral':
        return 'var(--theme-text-1)'
      case 'solid':
        return 'var(--theme-background-3)'
      case 'shadow':
        return 'var(--theme-background-3)'
      case 'line':
        return 'var(--theme-background-3)'
      case 'surface':
        return 'var(--theme-editor-background)'
      case 'background':
        return 'var(--theme-background-2)'
      default:
        return 'var(--theme-text-1)'
    }
  })

  manager.set(ThemeSize, (key) => {
    if (!key) return
    return size[key]
  })

  manager.set(ThemeFont, (key) => {
    if (key === 'typography') return 'Raleway, arial, sans-serif'

    return 'monospace'
  })

  manager.set(
    ThemeScrollbar,
    ([direction = 'y', type = 'normal'] = ['y', 'normal'] as never) => {
      const main = manager.get(ThemeColor, ['secondary', 0.38])
      const bg = manager.get(ThemeColor, ['secondary', 0.12])
      const hover = manager.get(ThemeColor, ['secondary'])

      const scrollbar = css({
        '&::-webkit-scrollbar': {
          [direction === 'y' ? 'width' : 'height']: `${
            type === 'thin' ? 2 : 12
          }px`,
          backgroundColor: 'transparent',
        },
      })

      return css`
        scrollbar-width: thin;
        scrollbar-color: ${main} ${bg};
        -webkit-overflow-scrolling: touch;
        ${scrollbar};
        &::-webkit-scrollbar-track {
          border-radius: 999px;
          background: transparent;
          border: 4px solid transparent;
        }
        &::-webkit-scrollbar-thumb {
          border-radius: 999px;
          background-color: ${main};
          border: ${type === 'thin' ? 0 : 4}px solid transparent;
          background-clip: content-box;
        }
        &::-webkit-scrollbar-thumb:hover {
          background-color: ${hover};
        }
      `
    }
  )

  manager.set(ThemeShadow, () => {
    const lineWidth = manager.get(ThemeSize, 'lineWidth')
    const getShadow = (opacity: number) =>
      manager.get(ThemeColor, ['shadow', opacity])
    return css`
      box-shadow: 0 ${lineWidth} ${lineWidth} ${getShadow(0.14)},
        0 2px ${lineWidth} ${getShadow(0.12)},
        0 ${lineWidth} 3px ${getShadow(0.2)};
    `
  })

  manager.set(ThemeBorder, (direction) => {
    const lineWidth = manager.get(ThemeSize, 'lineWidth')
    const line = manager.get(ThemeColor, ['line'])
    if (!direction) {
      return css`
        border: ${lineWidth} solid ${line};
      `
    }
    const upperCaseFirst = (str: string) =>
      str.charAt(0).toUpperCase() + str.slice(1)
    return css({
      [`border${upperCaseFirst(direction)}`]: `${lineWidth} solid ${line}`,
    })
  })

  manager.set(ThemeGlobal, () => {
    getStyle(manager, emotion)
  })

  manager.set(ThemeIcon, () => {
    const span = document.createElement('span')
    return {
      dom: span,
      label: '',
    }
  })

  useAllPresetRenderer(manager, emotion)
}

export const getBW = () =>
  themeFactory((emotion, manager) => createTheme()(emotion, manager))

export const bw = getBW()
