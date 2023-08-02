import type {
  PDFDocOptions,
  PluginTypes,
  ImporterParams,
  ProjectStateSchemaCreate,
  ProjectStateSchemaFolder,
  ProjectStateSchemaFile,
  ProjectStateSchema,
  BetterWriteThemes,
  LiveshareType,
  SupabaseIntegrations,
} from 'better-write-types'

export const entity = () => {
  const PluginEntityInputInitial = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn,
  ) => {
    emitter.on(
      'plugin-input-watch-initial',
      (item: PluginTypes.PluginLoggerDefault) => {
        if (!item.data) return

        const created = content[0]

        created && created(item)
      },
    )
  }

  const PluginEntityInputLast = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn,
  ) => {
    emitter.on(
      'plugin-input-watch-last',
      (item: PluginTypes.PluginLoggerDefault) => {
        if (!item.data) return

        const created = content[0]

        created && created(item)
      },
    )
  }

  const PluginEntityDelete = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn,
  ) => {
    emitter.on('plugin-entity-delete', (index: number) => {
      if (!index) return

      const created = content[0]

      created && created(index)
    })
  }

  const PluginEntitySwapper = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn,
  ) => {
    emitter.on(
      'plugin-entity-swap',
      (index: PluginTypes.PluginLoggerEntitySwapper) => {
        if (!index) return

        const created = content[0]

        created && created(index)
      },
    )
  }

  const PluginEntityCreate = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn,
  ) => {
    emitter.on(
      'plugin-entity-create',
      (obj: PluginTypes.PluginLoggerDefault) => {
        if (!obj) return

        const created = content[0]

        created && created(obj)
      },
    )
  }

  const PluginEntityCreateEmpty = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn,
  ) => {
    emitter.on('plugin-entity-create-empty', (index: number) => {
      if (!index) return

      const created = content[0]

      created && created(index)
    })
  }

  const PluginEntityPageBreak = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn,
  ) => {
    emitter.on(
      'plugin-entity-page-break',
      (obj: PluginTypes.PluginLoggerDefault) => {
        if (!obj) return

        const created = content[0]

        created && created(obj)
      },
    )
  }

  const PluginAlterInPage = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn,
  ) => {
    emitter.on(
      'plugin-entity-alter-in-page',
      (obj: PluginTypes.PluginLoggerDefault) => {
        if (!obj) return

        const created = content[0]

        created && created(obj)
      },
    )
  }

  const PluginPasteInPage = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn,
  ) => {
    emitter.on(
      'plugin-entity-paste-in-page',
      (obj: PluginTypes.PluginLoggerPaste) => {
        if (!obj) return

        const created = content[0]

        created && created(obj)
      },
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
    content: PluginTypes.PluginContentOn,
  ) => {
    emitter.on('plugin-project-page-new', (index: number) => {
      if (!index) return

      const created = content[0]

      created && created(index)
    })
  }

  const PluginProjectPageDelete = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn,
  ) => {
    emitter.on('plugin-project-page-delete', (name: string) => {
      if (!name) return

      const created = content[0]

      created && created(name)
    })
  }

  const PluginProjectPageSwap = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn,
  ) => {
    emitter.on(
      'plugin-project-page-swap',
      (item: PluginTypes.PluginLoggerEntitySwapper) => {
        if (item.index === -1) return

        const created = content[0]

        created && created(item)
      },
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
    content: PluginTypes.PluginContentOn,
  ) => {
    emitter.on('plugin-editor-header-create-open', () => {
      const created = content[0]

      created && created()
    })
  }

  const PluginEditorHeaderExternalsOpen = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn,
  ) => {
    emitter.on('plugin-editor-header-externals-open', () => {
      const created = content[0]

      created && created()
    })
  }

  const PluginEditorHeaderHelpOpen = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn,
  ) => {
    emitter.on('plugin-editor-header-help-open', () => {
      const created = content[0]

      created && created()
    })
  }

  const PluginEditorHeaderProjectOpen = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn,
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
    content: PluginTypes.PluginContentOn,
  ) => {
    emitter.on('plugin-theme-set', (theme: BetterWriteThemes) => {
      const created = content[0]

      created && created(theme)
    })
  }

  const PluginPDFGenerate = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn,
  ) => {
    emitter.on('plugin-pdf-generate', (options: PDFDocOptions) => {
      const created = content[0]

      created && created(options)
    })
  }

  const PluginPDFPreview = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn,
  ) => {
    emitter.on('plugin-pdf-preview', (options: PDFDocOptions) => {
      const created = content[0]

      created && created(options)
    })
  }

  const PluginPDFInit = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn,
  ) => {
    emitter.on('plugin-pdf-init', () => {
      const created = content[0]

      created && created()
    })
  }

  const PluginDocxGenerate = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn,
  ) => {
    emitter.on('plugin-docx-generate', () => {
      const created = content[0]

      created && created()
    })
  }

  const PluginTxtGenerate = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn,
  ) => {
    emitter.on('plugin-txt-generate', () => {
      const created = content[0]

      created && created()
    })
  }

  const PluginEpubGenerate = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn,
  ) => {
    emitter.on('plugin-epub-generate', () => {
      const created = content[0]

      created && created()
    })
  }

  const PluginHtmlGenerate = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn,
  ) => {
    emitter.on('plugin-html-generate', () => {
      const created = content[0]

      created && created()
    })
  }

  const PluginImporterDOCX = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn,
  ) => {
    emitter.on('plugin-importer-docx', (obj: ImporterParams) => {
      const created = content[0]

      created && created(obj)
    })
  }

  const PluginImporterTXT = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn,
  ) => {
    emitter.on('plugin-importer-txt', (obj: ImporterParams) => {
      const created = content[0]

      created && created(obj)
    })
  }

  const PluginImporterBW = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn,
  ) => {
    emitter.on('plugin-importer-bw', (obj: ImporterParams) => {
      const created = content[0]

      created && created(obj)
    })
  }

  const PluginSchemasStart = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn,
  ) => {
    emitter.on('plugin-schemas-start', (obj) => {
      const created = content[0]

      created && created(obj)
    })
  }

  const PluginSchemasCreateFolder = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn,
  ) => {
    emitter.on('plugin-schemas-folder-create', (schema: ProjectStateSchema) => {
      const created = content[0]

      created && created(schema)
    })
  }

  const PluginSchemasDeleteFolder = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn,
  ) => {
    emitter.on(
      'plugin-schemas-folder-delete',
      (folder: ProjectStateSchemaFolder) => {
        const created = content[0]

        created && created(folder)
      },
    )
  }

  const PluginSchemasCreateFile = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn,
  ) => {
    emitter.on(
      'plugin-schemas-file-create',
      (folder: ProjectStateSchemaFolder) => {
        const created = content[0]

        created && created(folder)
      },
    )
  }

  const PluginSchemasDeleteFile = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn,
  ) => {
    emitter.on(
      'plugin-schemas-file-delete',
      (obj: {
        file: ProjectStateSchemaFile
        folder: ProjectStateSchemaFolder
      }) => {
        const created = content[0]

        created && created(obj)
      },
    )
  }

  const PluginSchemasReset = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn,
  ) => {
    emitter.on('plugin-schemas-reset', () => {
      const created = content[0]

      created && created()
    })
  }

  const PluginSchemasCreate = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn,
  ) => {
    emitter.on('plugin-schemas-create', (options: ProjectStateSchemaCreate) => {
      const created = content[0]

      created && created(options)
    })
  }

  const PluginSchemasDelete = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn,
  ) => {
    emitter.on('plugin-schemas-delete', (schema: ProjectStateSchema) => {
      const created = content[0]

      created && created(schema)
    })
  }

  const PluginVoiceStart = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn,
  ) => {
    emitter.on('plugin-voice-start', () => {
      const created = content[0]

      created && created()
    })
  }

  const PluginVoiceStop = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn,
  ) => {
    emitter.on('plugin-voice-stop', () => {
      const created = content[0]

      created && created()
    })
  }

  const PluginEntityUndo = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn,
  ) => {
    emitter.on('plugin-entity-undo', () => {
      const created = content[0]

      created && created()
    })
  }

  const PluginCharactersColorBackground = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn,
  ) => {
    emitter.on('plugin-characters-color-background', (obj) => {
      const created = content[0]

      created && created(obj)
    })
  }

  const PluginProgressStart = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn,
  ) => {
    emitter.on('plugin-progress-start', (obj) => {
      const created = content[0]

      created && created(obj)
    })
  }

  const PluginProgressChange = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn,
  ) => {
    emitter.on('plugin-progress-change', (value: number) => {
      const created = content[0]

      created && created(value)
    })
  }

  const PluginProgressEnd = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn,
  ) => {
    emitter.on('plugin-progress-end', (obj) => {
      const created = content[0]

      created && created(obj)
    })
  }

  const PluginWindowDrop = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn,
  ) => {
    emitter.on('plugin-window-drop', (event: DragEvent) => {
      const created = content[0]

      created && created(event)
    })
  }

  const PluginPresenceRoomCreate = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn,
  ) => {
    emitter.on('plugin-presence-room-create', (type: LiveshareType) => {
      const created = content[0]

      created && created(type)
    })
  }

  const PluginPresenceRoomJoin = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn,
  ) => {
    emitter.on('plugin-presence-room-join', (id: string) => {
      const created = content[0]

      created && created(id)
    })
  }

  const PluginPresenceRoomLeave = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn,
  ) => {
    emitter.on('plugin-presence-room-leave', (id: string) => {
      const created = content[0]

      created && created(id)
    })
  }

  const PluginOAuthLogin = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn,
  ) => {
    emitter.on('plugin-oauth-login', (payload) => {
      const created = content[0]

      created && created(payload)
    })
  }

  const PluginOAuthLoginWithProvider = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn,
  ) => {
    emitter.on(
      'plugin-oauth-login-with-provider',
      (provider: SupabaseIntegrations) => {
        const created = content[0]

        created && created(provider)
      },
    )
  }

  const PluginOAuthRegister = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn,
  ) => {
    emitter.on('plugin-oauth-register', (payload) => {
      const created = content[0]

      created && created(payload)
    })
  }

  const PluginOAuthLogout = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn,
  ) => {
    emitter.on('plugin-oauth-logout', () => {
      const created = content[0]

      created && created()
    })
  }

  const PluginOAuthDelete = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn,
  ) => {
    emitter.on('plugin-oauth-delete', () => {
      const created = content[0]

      created && created()
    })
  }

  const PluginDropboxSet = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn,
  ) => {
    emitter.on('plugin-dropbox-set', (item) => {
      const created = content[0]

      created && created(item)
    })
  }

  const PluginDropboxSave = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn,
  ) => {
    emitter.on('plugin-dropbox-save', () => {
      const created = content[0]

      created && created()
    })
  }

  const PluginDropboxLoad = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn,
  ) => {
    emitter.on('plugin-dropbox-load', () => {
      const created = content[0]

      created && created()
    })
  }

  const PluginDropboxDelete = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn,
  ) => {
    emitter.on('plugin-dropbox-delete', (item) => {
      const created = content[0]

      created && created(item)
    })
  }

  const PluginDropboxConnect = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn,
  ) => {
    emitter.on('plugin-dropbox-connect', () => {
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
    PluginSchemasStart,
    PluginSchemasCreate,
    PluginSchemasDelete,
    PluginSchemasCreateFolder,
    PluginSchemasDeleteFolder,
    PluginSchemasCreateFile,
    PluginSchemasDeleteFile,
    PluginSchemasReset,
    PluginVoiceStart,
    PluginVoiceStop,
    PluginEntityUndo,
    PluginCharactersColorBackground,
    PluginProgressStart,
    PluginProgressChange,
    PluginProgressEnd,
    PluginWindowDrop,
    PluginPresenceRoomCreate,
    PluginPresenceRoomJoin,
    PluginPresenceRoomLeave,
    PluginOAuthLogin,
    PluginOAuthLoginWithProvider,
    PluginOAuthRegister,
    PluginOAuthLogout,
    PluginOAuthDelete,
    PluginDropboxConnect,
    PluginDropboxSet,
    PluginDropboxSave,
    PluginDropboxLoad,
    PluginDropboxDelete,
  }
}

export const save = () => {
  const PluginAutoSave = (
    emitter: PluginTypes.PluginEmitter,
    content: PluginTypes.PluginContentOn,
  ) => {
    emitter.on('plugin-auto-save', () => {
      const created = content[0]

      created && created()
    })
  }

  return { PluginAutoSave }
}
