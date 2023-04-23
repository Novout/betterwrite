export default {
  generics: {
    load: 'Wait a moment...',
    error: 'An unexpected error occurred :(',
    supported: 'Your browser does not support this feature :(',
    cancel: 'The action has been cancelled!',
    copy: 'Successfully copied!',
    limit: 'The limit has been reached!',
    configurationFail: 'The imported configuration is not valid!',
    invalidName: 'The name is empty or already exists!',
    successAdded: 'Successfully Added!',
    successUpdated: 'Successfully Updated!',
    successCreated: 'Successfully Created!',
    successSet: 'Successfully Set!',
    successChanged: 'Changed Successfully!',
    successRestarted: 'Successfully Restarted!',
    successRemoved: 'Successfully Removed!',
    onlyOnline: 'You are without internet access to access this feature!',
  },
  epub: {
    disabled: 'The .EPUB generator is temporarily disabled :(',
  },
  pdf: {
    error: 'Could not generate the pdf.',
    configuration: {
      save: 'Configurações salvas com sucesso!',
    },
    create: 'Successfully Downloaded PDF!',
    preview: 'PDF Preview successfully completed!',
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
    deleteProject:
      'Are you sure you want to load a new project? All local data will be lost.',
    import: 'Do you want to load {name}?',
    create: 'Successfully created project!',
    load: 'Successfully loaded project!',
    save: 'Successfully saved project!',
    error: 'Could not load project :(',
    export: 'Project exported to extension (.bw) successfully!',
    delete: 'Project successfully deleted!',
    unsupportedExtension: 'This extension is not supported by Better Write!',
    docx: {
      generate: 'Successfully Downloaded DOCX!',
    },
    html: {
      generate: 'Successfully Downloaded HTML!',
    },
    txt: {
      generate: 'Successfully Downloaded TXT!',
    },
    epub: {
      generate: 'Successfully Downloaded EPUB!',
    },
    md: {
      generate: 'Successfully Downloaded Markdown!',
    },
    annotations: {
      fileDelete: 'Are you sure you want to delete the file?',
      folderDelete: 'Are you sure you want to delete the folder?',
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
  material: {
    number: {
      positive: 'Numbers greater than {number} are not allowed!',
      negative: 'Numbers smaller than {number} are not allowed!',
    },
  },
  corrector: {
    apply: 'Effects applied successfully!',
  },
  image: {
    warningLimitFileSize: 'Not recommended to use images above {limit}MB!',
    limitFileSize: 'Exceeded maximum file size limit ({limit}MB)!',
  },
}
