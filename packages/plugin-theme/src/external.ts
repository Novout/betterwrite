import { BetterWriteThemes } from 'better-write-types'

export const Themes = (): Array<[BetterWriteThemes, string]> => {
  return [
    ['BetterWrite - Light', '/logo.svg'],
    ['BetterWrite - Dark', '/logo.svg'],
    ['BetterWrite - Rise', '/logo_rise.svg'],
    ['BetterWrite - Ascend', '/logo_ascend.svg'],
    ['BetterWrite - Harmonic', '/logo_harmonic.svg'],
    ['BetterWrite - Infinity', '/logo_infinity.svg'],
  ]
}

export const setEditorLogo = (theme: BetterWriteThemes, utils: any) => {
  let logo = ''

  switch (theme) {
    case 'BetterWrite - Dark':
    case 'BetterWrite - Light':
      logo = utils.path().resolve('logo_default.svg')
      break
    case 'BetterWrite - Rise':
      logo = utils.path().resolve('logo_rise.svg')
      break
    case 'BetterWrite - Harmonic':
      logo = utils.path().resolve('logo_harmonic.svg')
      break
    case 'BetterWrite - Ascend':
      logo = utils.path().resolve('logo_ascend.svg')
      break
    case 'BetterWrite - Infinity':
      logo = utils.path().resolve('logo_infinity.svg')
      break
    case 'BetterWrite - Custom':
      logo = utils.path().resolve('logo_custom.svg')
      break
    default:
      logo = utils.path().resolve('logo_default.svg')
      break
  }

  return logo
}

export const setTailwindCssVariables = () => {
  return {
    'theme-transparent': 'var(--theme-transparent)',
    'theme-black': 'var(--theme-black)',
    'theme-white': 'var(--theme-white)',
    'theme-background-1': 'var(--theme-background-1)',
    'theme-background-2': 'var(--theme-background-2)',
    'theme-background-3': 'var(--theme-background-3)',
    'theme-background-4': 'var(--theme-background-4)',
    'theme-background-opacity-1': 'var(--theme-background-opacity-1)',
    'theme-background-absolute-1': 'var(--theme-background-absolute-1)',
    'theme-border-1': 'var(--theme-border-1)',
    'theme-border-aside-1': 'var(--theme-border-aside-1)',
    'theme-border-absolute-1': 'var(--theme-border-absolute-1)',
    'theme-border-absolute-2': 'var(--theme-border-absolute-2)',
    'theme-border-commands-1': 'var(--theme-border-commands-1)',
    'theme-aside-logo-background': 'var(--theme-aside-logo-background)',
    'theme-aside-logo-text': 'var(--theme-aside-logo-text)',
    'theme-aside-background': 'var(--theme-aside-background)',
    'theme-aside-background-hover': 'var(--theme-aside-background-hover)',
    'theme-aside-background-active': 'var(--theme-aside-background-active)',
    'theme-aside-graph-lines': 'var(--theme-aside-graph-lines)',
    'theme-aside-graph-background': 'var(--theme-aside-graph-background)',
    'theme-aside-graph-background-hover':
      'var(--theme-aside-graph-background-hover)',
    'theme-aside-graph-background-active':
      'var(--theme-aside-graph-background-active)',
    'theme-aside-graph-text': 'var(--theme-aside-graph-text)',
    'theme-aside-graph-text-hover': 'var(--theme-aside-graph-text-hover)',
    'theme-aside-graph-text-active': 'var(--theme-aside-graph-text-active)',
    'theme-editor-scrollbar-track': 'var(--theme-editor-scrollbar-track)',
    'theme-editor-scrollbar-thumb': 'var(--theme-editor-scrollbar-thumb)',
    'theme-editor-betterwrite': 'var(--theme-editor-betterwrite)',
    'theme-editor-io': 'var(--theme-editor-io)',
    'theme-editor-full-background': 'var(--theme-editor-full-background)',
    'theme-editor-full-background-hover':
      'var(--theme-editor-full-background-hover)',
    'theme-editor-full-background-active':
      'var(--theme-editor-full-background-active)',
    'theme-editor-background': 'var(--theme-editor-background)',
    'theme-editor-background-hover': 'var(--theme-editor-background-hover)',
    'theme-editor-background-active': 'var(--theme-editor-background-active)',
    'theme-editor-background-bar': 'var(--theme-editor-background-bar)',
    'theme-editor-background-bar-hover':
      'var(--theme-editor-background-bar-hover)',
    'theme-editor-background-bar-active':
      'var(--theme-editor-background-bar-active)',
    'theme-editor-entity-background': 'var(--theme-editor-entity-background)',
    'theme-editor-entity-background-hover':
      'var(--theme-editor-entity-background-hover)',
    'theme-editor-entity-background-active':
      'var(--theme-editor-entity-background-active)',
    'theme-editor-entity-text': 'var(--theme-editor-entity-text)',
    'theme-editor-entity-text-hover': 'var(--theme-editor-entity-text-hover)',
    'theme-editor-entity-text-active': 'var(--theme-editor-entity-text-active)',
    'theme-editor-entity-heading-one': 'var(--theme-editor-entity-heading-one)',
    'theme-editor-entity-heading-one-hover':
      'var(--theme-editor-entity-heading-one-hover)',
    'theme-editor-entity-heading-one-active':
      'var(--theme-editor-entity-heading-one-active)',
    'theme-editor-entity-heading-two': 'var(--theme-editor-entity-heading-two)',
    'theme-editor-entity-heading-two-hover':
      'var(--theme-editor-entity-heading-two-hover)',
    'theme-editor-entity-heading-two-active':
      'var(--theme-editor-entity-heading-two-active)',
    'theme-editor-entity-heading-three':
      'var(--theme-editor-entity-heading-three)',
    'theme-editor-entity-heading-three-hover':
      'var(--theme-editor-entity-heading-three-hover)',
    'theme-editor-entity-heading-three-active':
      'var(--theme-editor-entity-heading-three-active)',
    'theme-editor-entity-page': 'var(--theme-editor-entity-page)',
    'theme-editor-entity-line': 'var(--theme-editor-entity-line)',
    'theme-editor-entity-popover-text':
      'var(--theme-editor-entity-popover-text)',
    'theme-editor-entity-popover-text-hover':
      'var(--theme-editor-entity-popover-text-hover)',
    'theme-editor-entity-popover-text-active':
      'var(--theme-editor-entity-popover-text-active)',
    'theme-editor-entity-popover-background':
      'var(--theme-editor-entity-popover-background)',
    'theme-editor-entity-popover-background-hover':
      'var(--theme-editor-entity-popover-background-hover)',
    'theme-editor-entity-popover-background-active':
      'var(--theme-editor-entity-popover-background-active)',
    'theme-editor-entity-info': 'var(--theme-editor-entity-info)',
    'theme-editor-entity-info-hover': 'var(--theme-editor-entity-info-hover)',
    'theme-editor-entity-info-active': 'var(--theme-editor-entity-info-active)',
    'theme-editor-entity-warning': 'var(--theme-editor-entity-warning)',
    'theme-editor-entity-warning-hover':
      'var(--theme-editor-entity-warning-hover)',
    'theme-editor-entity-warning-active':
      'var(--theme-editor-entity-warning-active)',
    'theme-editor-entity-error': 'var(--theme-editor-entity-error)',
    'theme-editor-entity-error-hover': 'var(--theme-editor-entity-error-hover)',
    'theme-editor-entity-error-active':
      'var(--theme-editor-entity-error-active)',
    'theme-editor-bold-text': 'var(--theme-editor-bold-text)',
    'theme-editor-bold-text-hover': 'var(--theme-editor-bold-text-hover)',
    'theme-editor-bold-text-active': 'var(--theme-editor-bold-text-active)',
    'theme-editor-italic-text': 'var(--theme-editor-bold-text)',
    'theme-editor-italic-text-hover': 'var(--theme-editor-bold-text-hover)',
    'theme-editor-italic-text-active': 'var(--theme-editor-bold-text-active)',
    'theme-editor-input-background': 'var(--theme-editor-input-background)',
    'theme-editor-input-background-hover':
      'var(--theme-editor-input-background-hover)',
    'theme-editor-input-background-active':
      'var(--theme-editor-input-background-active)',
    'theme-editor-input-text': 'var(--theme-editor-input-text)',
    'theme-editor-input-text-hover': 'var(--theme-editor-input-text-hover)',
    'theme-editor-input-text-active': 'var(--theme-editor-input-text-active)',
    'theme-editor-input-placeholder': 'var(--theme-editor-input-placeholder)',
    'theme-editor-header-background': 'var(--theme-editor-header-background)',
    'theme-editor-header-background-hover':
      'var(--theme-editor-header-background-hover)',
    'theme-editor-header-background-active':
      'var(--theme-editor-header-background-active)',
    'theme-editor-header-list-background':
      'var(--theme-editor-header-list-background)',
    'theme-editor-header-list-background-hover':
      'var(--theme-editor-header-list-background-hover)',
    'theme-editor-header-list-background-active':
      'var(--theme-editor-header-list-background-active)',
    'theme-editor-header-list-text': 'var(--theme-editor-header-list-text)',
    'theme-editor-header-list-text-hover':
      'var(--theme-editor-header-list-text-hover)',
    'theme-editor-header-list-text-active':
      'var(--theme-editor-header-list-text-active)',
    'theme-editor-header-list-shortcuts-background':
      'var(--theme-editor-header-list-shortcuts-background)',
    'theme-editor-header-list-shortcuts-background-hover':
      'var(--theme-editor-header-list-shortcuts-background-hover)',
    'theme-editor-header-list-shortcuts-background-active':
      'var(--theme-editor-header-list-shortcuts-background-active)',
    'theme-editor-pdf-configuration-border':
      'var(--theme-editor-pdf-configuration-border)',
    'theme-editor-pdf-configuration-background':
      'var(--theme-editor-pdf-configuration-background)',
    'theme-editor-pdf-configuration-background-hover':
      'var(--theme-editor-pdf-configuration-background-hover)',
    'theme-editor-pdf-configuration-background-active':
      'var(--theme-editor-pdf-configuration-background-active)',
    'theme-editor-pdf-configuration-container-background':
      'var(--theme-editor-pdf-configuration-container-background)',
    'theme-editor-pdf-configuration-container-background-hover':
      'var(--theme-editor-pdf-configuration-container-background-hover)',
    'theme-editor-pdf-configuration-container-background-active':
      'var(--theme-editor-pdf-configuration-container-background-active)',
    'theme-editor-pdf-configuration-container-text':
      'var(--theme-editor-pdf-configuration-container-text)',
    'theme-editor-pdf-configuration-container-text-hover':
      'var(--theme-editor-pdf-configuration-container-text-hover)',
    'theme-editor-pdf-configuration-container-text-active':
      'var(--theme-editor-pdf-configuration-container-text-active)',
    'theme-editor-pdf-preview-background':
      'var(--theme-editor-pdf-preview-background)',
    'theme-editor-material-border': 'var(--theme-editor-material-border)',
    'theme-editor-material-background':
      'var(--theme-editor-material-background)',
    'theme-editor-material-background-hover':
      'var(--theme-editor-material-background-hover)',
    'theme-editor-material-background-active':
      'var(--theme-editor-material-background-active)',
    'theme-editor-material-text': 'var(--theme-editor-material-text)',
    'theme-editor-material-text-hover':
      'var(--theme-editor-material-text-hover)',
    'theme-editor-material-text-active':
      'var(--theme-editor-material-text-active)',
    'theme-editor-material-boolean-background':
      'var(--theme-editor-material-boolean-background)',
    'theme-editor-material-boolean-rounded-background':
      'var(--theme-editor-material-boolean-rounded-background)',
    'theme-editor-extras-switcher-background':
      'var(--theme-editor-extras-switcher-background)',
    'theme-editor-extras-switcher-background-hover':
      'var(--theme-editor-extras-switcher-background-hover)',
    'theme-editor-extras-switcher-background-active':
      'var(--theme-editor-extras-switcher-background-active)',
    'theme-editor-extras-switcher-text':
      'var(--theme-editor-extras-switcher-text)',
    'theme-editor-extras-switcher-text-hover':
      'var(--theme-editor-extras-switcher-text-hover)',
    'theme-editor-extras-switcher-text-active':
      'var(--theme-editor-extras-switcher-text-active)',
    'theme-editor-extras-switcher-border':
      'var(--theme-editor-extras-switcher-border)',
    'theme-editor-extras-finder-background':
      'var(--theme-editor-extras-finder-background)',
    'theme-editor-extras-finder-background-hover':
      'var(--theme-editor-extras-finder-background-hover)',
    'theme-editor-extras-finder-background-active':
      'var(--theme-editor-extras-finder-background-active)',
    'theme-editor-extras-finder-text': 'var(--theme-editor-extras-finder-text)',
    'theme-editor-extras-finder-text-hover':
      'var(--theme-editor-extras-finder-text-hover)',
    'theme-editor-extras-finder-text-active':
      'var(--theme-editor-extras-finder-text-active)',
    'theme-editor-extras-finder-border':
      'var(--theme-editor-extras-finder-border)',
    'theme-editor-external-comment-background':
      'var(--theme-editor-external-comment-background)',
    'theme-editor-external-comment-background-hover':
      'var(--theme-editor-external-comment-background-hover)',
    'theme-editor-external-comment-background-active':
      'var(--theme-editor-external-comment-background-active)',
    'theme-editor-external-comment-text':
      'var(--theme-editor-external-comment-text)',
    'theme-editor-external-comment-text-hover':
      'var(--theme-editor-external-comment-text-hover)',
    'theme-editor-external-comment-text-active':
      'var(--theme-editor-external-comment-text-active)',
    'theme-editor-external-comment-title':
      'var(--theme-editor-external-comment-title)',
    'theme-editor-external-comment-title-hover':
      'var(--theme-editor-external-comment-title-hover)',
    'theme-editor-external-comment-title-active':
      'var(--theme-editor-external-comment-title-active)',
    'theme-editor-external-comment-border':
      'var(--theme-editor-external-comment-border)',
    'theme-editor-external-comment-textarea-background':
      'var(--theme-editor-external-comment-textarea-background)',
    'theme-editor-external-comment-textarea-background-hover':
      'var(--theme-editor-external-comment-textarea-background-hover)',
    'theme-editor-external-comment-textarea-background-active':
      'var(--theme-editor-external-comment-textarea-background-active)',
    'theme-editor-tooltip-background': 'var(--theme-editor-tooltip-background)',
    'theme-editor-tooltip-text': 'var(--theme-editor-tooltip-text)',
    'theme-editor-tooltip-border': 'var(--theme-editor-tooltip-border)',
    'theme-editor-electron-update-text':
      'var(--theme-editor-electron-update-text)',
    'theme-editor-electron-update-text-hover':
      'var(--theme-editor-electron-update-text-hover)',
    'theme-editor-electron-update-text-active':
      'var(--theme-editor-electron-update-text-active)',
    'theme-editor-nprogress-background':
      'var(--theme-editor-nprogress-background)',
    'theme-editor-nprogress-height': 'var(--theme-editor-nprogress-height)',
    'theme-editor-creative-drafts-background':
      'var(--theme-editor-creative-drafts-background)',
    'theme-editor-creative-drafts-container-background':
      'var(--theme-editor-creative-drafts-container-background)',
    'theme-editor-creative-drafts-container-borders':
      'var(--theme-editor-creative-drafts-container-borders)',
    'theme-editor-creative-drafts-container-list-background':
      'var(--theme-editor-creative-drafts-container-list-background)',
    'theme-editor-creative-drafts-container-list-background-hover':
      'var(--theme-editor-creative-drafts-container-list-background-hover)',
    'theme-editor-creative-drafts-container-list-background-active':
      'var(--theme-editor-creative-drafts-container-list-background-active)',
    'theme-editor-creative-drafts-container-list-text':
      'var(--theme-editor-creative-drafts-container-list-text)',
    'theme-editor-creative-drafts-container-list-text-hover':
      'var(--theme-editor-creative-drafts-container-list-text-hover)',
    'theme-editor-creative-drafts-container-list-text-active':
      'var(--theme-editor-creative-drafts-container-list-text-active)',
    'theme-editor-creative-drafts-container-item-background':
      'var(--theme-editor-creative-drafts-container-item-background)',
    'theme-editor-creative-drafts-container-item-background-hover':
      'var(--theme-editor-creative-drafts-container-item-background-hover)',
    'theme-editor-creative-drafts-container-item-background-active':
      'var(--theme-editor-creative-drafts-container-item-background-active)',
    'theme-editor-creative-drafts-container-item-text':
      'var(--theme-editor-creative-drafts-container-item-text)',
    'theme-editor-dashboard-background-main':
      'var(--theme-editor-dashboard-background-main)',
    'theme-editor-dashboard-background-item':
      'var(--theme-editor-dashboard-background-item)',
    'theme-editor-dashboard-background-card':
      'var(--theme-editor-dashboard-background-card)',
    'theme-editor-dashboard-text': 'var(--theme-editor-dashboard-text)',
    'theme-editor-render-finder-text': 'var(--theme-editor-render-finder-text)',
    'theme-editor-render-finder-background':
      'var(--theme-editor-render-finder-background)',
    'theme-editor-render-switcher-text':
      'var(--theme-editor-render-switcher-text)',
    'theme-editor-render-switcher-background':
      'var(--theme-editor-render-switcher-background)',
    'theme-text-1': 'var(--theme-text-1)',
    'theme-text-2': 'var(--theme-text-2)',
    'theme-text-3': 'var(--theme-text-3)',
    'theme-icon': 'var(--theme-icon)',
    'theme-icon-hover': 'var(--theme-icon-hover)',
    'theme-icon-active': 'var(--theme-icon-active)',
    'theme-text-commands-1': 'var(--theme-text-commands-1)',
    'theme-grammar-error': 'var(--theme-grammar-error)',
    'theme-spelling-error': 'var(--theme-spelling-error)',
    'theme-target-text': 'var(--theme-target-text)',
    'theme-text-active': 'var(--theme-text-active)',
    'theme-logger-background': 'var(--theme-logger-background)',
    'theme-logger-log-background': 'var(--theme-logger-log-background)',
    'theme-logger-log-text': 'var(--theme-logger-log-text)',
    'theme-logger-warn-background': 'var(--theme-logger-warn-background)',
    'theme-logger-warn-text': 'var(--theme-logger-warn-text)',
    'theme-logger-error-background': 'var(--theme-logger-error-background)',
    'theme-logger-error-text': 'var(--theme-logger-error-text)',
    'theme-logger-info-background': 'var(--theme-logger-info-background)',
    'theme-logger-info-text': 'var(--theme-logger-info-text)',
    'theme-logger-entity-background': 'var(--theme-logger-entity-background)',
    'theme-logger-entity-text': 'var(--theme-logger-entity-text)',
    'theme-toast-default-background': 'var(--theme-toast-default-background)',
    'theme-toast-default-text': 'var(--theme-toast-default-text)',
    'theme-toast-default-close': 'var(--theme-toast-default-close)',
    'theme-toast-default-progress': 'var(--theme-toast-default-progress)',
    'theme-toast-info-background': 'var(--theme-toast-info-background)',
    'theme-toast-info-text': 'var(--theme-toast-info-text)',
    'theme-toast-success-background': 'var(--theme-toast-success-background)',
    'theme-toast-success-text': 'var(--theme-toast-success-text)',
    'theme-toast-error-background': 'var(--theme-toast-error-background)',
    'theme-toast-error-text': 'var(--theme-toast-error-text)',
    'theme-toast-warning-background': 'var(--theme-toast-warning-background)',
    'theme-toast-warning-text': 'var(--theme-toast-warning-text)',
    'theme-pwa-prompt-text': 'var(--theme-pwa-prompt-text)',
    'theme-pwa-prompt-background': 'var(--theme-pwa-prompt-background)',
    'theme-pwa-prompt-button-text': 'var(--theme-pwa-prompt-button-text)',
    'theme-pwa-prompt-button-background':
      'var(--theme-pwa-prompt-button-background)',
    'theme-milkdown-primary': 'var(--theme-milkdown-primary)',
    'theme-milkdown-secondary': 'var(--theme-milkdown-secondary)',
    'theme-milkdown-neutral': 'var(--theme-milkdown-neutral)',
    'theme-milkdown-solid': 'var(--theme-milkdown-solid)',
    'theme-milkdown-shadow': 'var(--theme-milkdown-shadow)',
    'theme-milkdown-line': 'var(--theme-milkdown-line)',
    'theme-milkdown-surface': 'var(--theme-milkdown-surface)',
    'theme-milkdown-background': 'var(--theme-milkdown-background)',
    'theme-milkdown-default': 'var(--theme-milkdown-default)',
  }
}

export const getPDFUtils = () => {
  const _ = getComputedStyle(document.body)

  const theme = {
    paragraph: _.getPropertyValue(
      '--theme-editor-pdf-generator-paragraph',
    ).trim(),
    'heading-one': _.getPropertyValue(
      '--theme-editor-pdf-generator-heading-one',
    ).trim(),
    'heading-two': _.getPropertyValue(
      '--theme-editor-pdf-generator-heading-two',
    ).trim(),
    'heading-three': _.getPropertyValue(
      '--theme-editor-pdf-generator-heading-three',
    ).trim(),
    page: _.getPropertyValue('--theme-editor-pdf-generator-page').trim(),
  }

  return { theme }
}
