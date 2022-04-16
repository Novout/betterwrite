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
    create: 'Successfully created project!',
    load: 'Successfully loaded project!',
    save: 'Successfully saved project!',
    error: 'Could not load project :(',
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
  },
  speech: {
    microphone: 'No microphone was recognized by the system!',
  },
}
