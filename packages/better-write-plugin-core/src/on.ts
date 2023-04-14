import {
  PDFDocOptions,
  PluginTypes,
  ImporterParams,
  ProjectStateAnnotationFolder,
  ProjectStateAnnotationFile,
  BetterWriteThemes,
} from 'better-write-types'

export const entity = () => {
  const PluginEntityInputInitial = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn
  ) => {
    emitter.on(
      'plugin-input-watch-initial',
      (item: PluginTypes.PluginLoggerDefault) => {
        if (!item.data) return

        const created = content[0]

        created && created(item)
      }
    )
  }

  const PluginEntityInputLast = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn
  ) => {
    emitter.on(
      'plugin-input-watch-last',
      (item: PluginTypes.PluginLoggerDefault) => {
        if (!item.data) return

        const created = content[0]

        created && created(item)
      }
    )
  }

  const PluginEntityDelete = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn
  ) => {
    emitter.on('plugin-entity-delete', (index: number) => {
      if (!index) return

      const created = content[0]

      created && created(index)
    })
  }

  const PluginEntitySwapper = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn
  ) => {
    emitter.on(
      'plugin-entity-swap',
      (index: PluginTypes.PluginLoggerEntitySwapper) => {
        if (!index) return

        const created = content[0]

        created && created(index)
      }
    )
  }

  const PluginEntityCreate = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn
  ) => {
    emitter.on(
      'plugin-entity-create',
      (obj: PluginTypes.PluginLoggerDefault) => {
        if (!obj) return

        const created = content[0]

        created && created(obj)
      }
    )
  }

  const PluginEntityCreateEmpty = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn
  ) => {
    emitter.on('plugin-entity-create-empty', (index: number) => {
      if (!index) return

      const created = content[0]

      created && created(index)
    })
  }

  const PluginEntityPageBreak = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn
  ) => {
    emitter.on(
      'plugin-entity-page-break',
      (obj: PluginTypes.PluginLoggerDefault) => {
        if (!obj) return

        const created = content[0]

        created && created(obj)
      }
    )
  }

  const PluginAlterInPage = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn
  ) => {
    emitter.on(
      'plugin-entity-alter-in-page',
      (obj: PluginTypes.PluginLoggerDefault) => {
        if (!obj) return

        const created = content[0]

        created && created(obj)
      }
    )
  }

  const PluginPasteInPage = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn
  ) => {
    emitter.on(
      'plugin-entity-paste-in-page',
      (obj: PluginTypes.PluginLoggerPaste) => {
        if (!obj) return

        const created = content[0]

        created && created(obj)
      }
    )
  }

  return {
    PluginEntityCreate,
    PluginEntityCreateEmpty,
    PluginEntityDelete,
    PluginEntityInputInitial,
    PluginEntityInputLast,
    PluginEntitySwapper,
    PluginEntityPageBreak,
    PluginPasteInPage,
    PluginAlterInPage,
  }
}

export const project = () => {
  const PluginProjectPageNew = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn
  ) => {
    emitter.on('plugin-project-page-new', (index: number) => {
      if (!index) return

      const created = content[0]

      created && created(index)
    })
  }

  const PluginProjectPageDelete = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn
  ) => {
    emitter.on('plugin-project-page-delete', (name: string) => {
      if (!name) return

      const created = content[0]

      created && created(name)
    })
  }

  const PluginProjectPageSwap = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn
  ) => {
    emitter.on(
      'plugin-project-page-swap',
      (item: PluginTypes.PluginLoggerEntitySwapper) => {
        if (item.index === -1) return

        const created = content[0]

        created && created(item)
      }
    )
  }

  return {
    PluginProjectPageDelete,
    PluginProjectPageNew,
    PluginProjectPageSwap,
  }
}

export const editor = () => {
  const PluginEditorHeaderCreateOpen = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn
  ) => {
    emitter.on('plugin-editor-header-create-open', () => {
      const created = content[0]

      created && created()
    })
  }

  const PluginEditorHeaderExternalsOpen = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn
  ) => {
    emitter.on('plugin-editor-header-externals-open', () => {
      const created = content[0]

      created && created()
    })
  }

  const PluginEditorHeaderHelpOpen = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn
  ) => {
    emitter.on('plugin-editor-header-help-open', () => {
      const created = content[0]

      created && created()
    })
  }

  const PluginEditorHeaderProjectOpen = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn
  ) => {
    emitter.on('plugin-editor-header-project-open', () => {
      const created = content[0]

      created && created()
    })
  }

  return {
    PluginEditorHeaderCreateOpen,
    PluginEditorHeaderExternalsOpen,
    PluginEditorHeaderHelpOpen,
    PluginEditorHeaderProjectOpen,
  }
}

export const externals = () => {
  const PluginThemeSet = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn
  ) => {
    emitter.on('plugin-theme-set', (theme: BetterWriteThemes) => {
      const created = content[0]

      created && created(theme)
    })
  }

  const PluginPDFGenerate = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn
  ) => {
    emitter.on('plugin-pdf-generate', (options: PDFDocOptions) => {
      const created = content[0]

      created && created(options)
    })
  }

  const PluginPDFPreview = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn
  ) => {
    emitter.on('plugin-pdf-preview', (options: PDFDocOptions) => {
      const created = content[0]

      created && created(options)
    })
  }

  const PluginPDFInit = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn
  ) => {
    emitter.on('plugin-pdf-init', () => {
      const created = content[0]

      created && created()
    })
  }

  const PluginDocxGenerate = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn
  ) => {
    emitter.on('plugin-docx-generate', () => {
      const created = content[0]

      created && created()
    })
  }

  const PluginTxtGenerate = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn
  ) => {
    emitter.on('plugin-txt-generate', () => {
      const created = content[0]

      created && created()
    })
  }

  const PluginEpubGenerate = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn
  ) => {
    emitter.on('plugin-epub-generate', () => {
      const created = content[0]

      created && created()
    })
  }

  const PluginHtmlGenerate = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn
  ) => {
    emitter.on('plugin-html-generate', () => {
      const created = content[0]

      created && created()
    })
  }

  const PluginImporterDOCX = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn
  ) => {
    emitter.on('plugin-importer-docx', (obj: ImporterParams) => {
      const created = content[0]

      created && created(obj)
    })
  }

  const PluginImporterTXT = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn
  ) => {
    emitter.on('plugin-importer-txt', (obj: ImporterParams) => {
      const created = content[0]

      created && created(obj)
    })
  }

  const PluginImporterBW = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn
  ) => {
    emitter.on('plugin-importer-bw', (obj: ImporterParams) => {
      const created = content[0]

      created && created(obj)
    })
  }

  const PluginAnnotationsStart = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn
  ) => {
    emitter.on(
      'plugin-annotations-start',
      (file: ProjectStateAnnotationFile) => {
        const created = content[0]

        created && created(file)
      }
    )
  }

  const PluginAnnotationsCreateFolder = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn
  ) => {
    emitter.on('plugin-annotations-folder-create', () => {
      const created = content[0]

      created && created()
    })
  }

  const PluginAnnotationsDeleteFolder = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn
  ) => {
    emitter.on(
      'plugin-annotations-folder-delete',
      (folder: ProjectStateAnnotationFolder) => {
        const created = content[0]

        created && created(folder)
      }
    )
  }

  const PluginAnnotationsCreateFile = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn
  ) => {
    emitter.on(
      'plugin-annotations-file-create',
      (folder: ProjectStateAnnotationFolder) => {
        const created = content[0]

        created && created(folder)
      }
    )
  }

  const PluginAnnotationsDeleteFile = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn
  ) => {
    emitter.on(
      'plugin-annotations-file-delete',
      (obj: {
        file: ProjectStateAnnotationFile
        folder: ProjectStateAnnotationFolder
      }) => {
        const created = content[0]

        created && created(obj)
      }
    )
  }

  const PluginAnnotationsReset = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn
  ) => {
    emitter.on('plugin-annotations-reset', () => {
      const created = content[0]

      created && created()
    })
  }

  const PluginVoiceStart = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn
  ) => {
    emitter.on('plugin-voice-start', () => {
      const created = content[0]

      created && created()
    })
  }

  const PluginVoiceStop = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn
  ) => {
    emitter.on('plugin-voice-stop', () => {
      const created = content[0]

      created && created()
    })
  }

  const PluginEntityUndo = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn
  ) => {
    emitter.on('plugin-entity-undo', () => {
      const created = content[0]

      created && created()
    })
  }

  return {
    PluginThemeSet,
    PluginPDFPreview,
    PluginPDFGenerate,
    PluginPDFInit,
    PluginEpubGenerate,
    PluginDocxGenerate,
    PluginTxtGenerate,
    PluginHtmlGenerate,
    PluginImporterDOCX,
    PluginImporterTXT,
    PluginImporterBW,
    PluginAnnotationsStart,
    PluginAnnotationsCreateFolder,
    PluginAnnotationsDeleteFolder,
    PluginAnnotationsCreateFile,
    PluginAnnotationsDeleteFile,
    PluginAnnotationsReset,
    PluginVoiceStart,
    PluginVoiceStop,
    PluginEntityUndo,
  }
}

export const save = () => {
  const PluginAutoSave = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn
  ) => {
    emitter.on('plugin-auto-save', () => {
      const created = content[0]

      created && created()
    })
  }

  return { PluginAutoSave }
}
