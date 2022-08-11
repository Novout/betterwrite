import {
  ContextState,
  ID,
  PDFDocOptions,
  PluginTypes,
  ImporterParams,
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
  const PluginEditorMounted = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn
  ) => {
    emitter.on('plugin-editor-mounted', () => {
      const created = content[0]

      created && created()
    })
  }

  return { PluginEditorMounted }
}

export const externals = () => {
  const PluginThemeSet = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn
  ) => {
    emitter.on('plugin-theme-set', () => {
      const created = content[0]

      created && created()
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

  return {
    PluginThemeSet,
    PluginPDFPreview,
    PluginPDFGenerate,
    PluginPDFInit,
    PluginDocxGenerate,
    PluginTxtGenerate,
    PluginHtmlGenerate,
    PluginImporterDOCX,
    PluginImporterTXT,
    PluginImporterBW,
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

  const PluginDropboxSave = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn
  ) => {
    emitter.on('plugin-dropbox-save', (type: PluginTypes.PluginCode) => {
      const created = content[0]
      const err = content[1]

      if (type === 'success') created && created()
      if (type === 'error') err && err()
    })
  }

  return { PluginAutoSave, PluginDropboxSave }
}

export const creative = () => {
  const drafts = () => {
    const PluginCreativeDraftsSet = (
      emitter: PluginTypes.PluginEmitter,
      content: PluginTypes.PluginContentOn
    ) => {
      emitter.on(
        'plugin-project-creative-drafts-set-draft',
        (page: ContextState) => {
          const created = content[0]

          created && created(page)
        }
      )
    }

    const PluginCreativeDraftsCreate = (
      emitter: PluginTypes.PluginEmitter,
      content: PluginTypes.PluginContentOn
    ) => {
      emitter.on(
        'plugin-project-creative-drafts-create-draft',
        (page: ContextState) => {
          const created = content[0]

          created && created(page)
        }
      )
    }

    const PluginCreativeDraftsDelete = (
      emitter: PluginTypes.PluginEmitter,
      content: PluginTypes.PluginContentOn
    ) => {
      emitter.on(
        'plugin-project-creative-drafts-delete-draft',
        (page: ContextState) => {
          const created = content[0]

          created && created(page)
        }
      )
    }

    const PluginCreativeDraftsUpdate = (
      emitter: PluginTypes.PluginEmitter,
      content: PluginTypes.PluginContentOn
    ) => {
      emitter.on(
        'plugin-project-creative-drafts-update',
        (page: ContextState) => {
          const created = content[0]

          created && created(page)
        }
      )
    }

    const PluginCreativeDraftsReset = (
      emitter: PluginTypes.PluginEmitter,
      content: PluginTypes.PluginContentOn
    ) => {
      emitter.on(
        'plugin-project-creative-drafts-reset-draft',
        (page: ContextState) => {
          const created = content[0]

          created && created(page)
        }
      )
    }

    return {
      PluginCreativeDraftsSet,
      PluginCreativeDraftsCreate,
      PluginCreativeDraftsDelete,
      PluginCreativeDraftsUpdate,
      PluginCreativeDraftsReset,
    }
  }

  return { drafts }
}

export const multiplayer = () => {
  const PluginMultiplayerCreate = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn
  ) => {
    emitter.on('plugin-multiplayer-create', () => {
      const created = content[0]

      created && created()
    })
  }

  const PluginMultiplayerRoomID = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn
  ) => {
    emitter.on('plugin-multiplayer-room-id', (id: ID<string>) => {
      if (!id) return

      const created = content[0]

      created && created(id)
    })
  }

  const PluginMultiplayerEnter = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn
  ) => {
    emitter.on('plugin-multiplayer-enter', (id: ID<string>) => {
      if (!id) return

      const created = content[0]

      created && created(id)
    })
  }

  const PluginMultiplayerLeave = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn
  ) => {
    emitter.on('plugin-multiplayer-leave', (index: number) => {
      if (!index) return

      const created = content[0]

      created && created(index)
    })
  }

  return {
    PluginMultiplayerCreate,
    PluginMultiplayerRoomID,
    PluginMultiplayerEnter,
    PluginMultiplayerLeave,
  }
}
