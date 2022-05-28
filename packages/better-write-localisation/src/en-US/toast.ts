export default {
  generics: {
    load: 'Wait a moment...',
    error: 'An unexpected error occurred :(',
    supported: 'Your browser does not support this feature :(',
  },
  pdf: {
    error:
      'Could not generate the pdf. As of now, Better Write does not support PDF generation without internet access.',
    configuration: {
      save: 'Configurações salvas com sucesso!',
    },
    create: 'Successfully Downloaded PDF!',
    generate: {
      empty: 'Please select at least one chapter!',
    },
    previewProblems:
      'Certain features will not appear in the preview to avoid performance issues.',
  },
  project: {
    createAlert:
      'Are you sure you want to create a new project? You will lose any data that was not saved in the cloud.',
    deleteAlert:
      'Are you sure you want to delete the project? This action is irreversible',
    import: 'Do you want to load {name}?',
    create: 'Successfully created project!',
    load: 'Successfully loaded project!',
    save: 'Successfully saved project!',
    error: 'Could not load project :(',
    export: 'Project exported to extension (.bw) successfully!',
    unsupportedExtension: 'This extension is not supported by Better Write!',
    docx: {
      generate: 'Successfully Downloaded DOCX!',
    },
    txt: {
      generate: 'Successfully Downloaded TXT!',
    },
  },
  dropbox: {
    load: 'Connected with Dropbox!',
    save: 'Saved to Dropbox under Apps > Better Write',
  },
  entity: {
    paragraph: {
      generator: {
        empty: 'Enter a name to save the style!',
        exists: 'The style name already exists!',
      },
    },
    image: {
      errorLoad:
        'betterwrite.io was not allowed to load the image in question.',
    },
  },
  speech: {
    microphone: 'No microphone was recognized by the system!',
  },
  store: {
    contextWarning:
      'Chapter identifier not found! Make sure the uploaded file is valid!',
  },
}
