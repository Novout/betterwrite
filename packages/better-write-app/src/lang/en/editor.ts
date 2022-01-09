import { setPDFI18n } from 'better-write-plugin-pdf'

export default {
  project: {
    configuration: {
      title: 'Project Configurations',
      creator: 'Author',
      name: 'Name',
      subject: 'Subject',
      producer: 'Producer',
      keywords: 'Keywords',
      tooltip: {
        base: 'These fields are used by the application to export documents and generate content when necessary. In short, fill in the fields correctly.',
        creator:
          'Name / Organization responsible for creating / writing the document',
        name: 'The name of the document',
        subject: 'The subject of the document',
        producer: 'Producer / Publisher of the document',
        keywords: 'Palavras-Chave do Documento',
      },
    },
  },
  preferences: {
    shortcuts: {
      title: 'Hotkeys',
      editor: {
        title: 'Text Editor',
        italic: 'Add Italic',
        bold: 'Add Bold',
        delete: 'Delete',
        swap: 'Change Position',
        to: 'Go To Next Position',
        dragtitle: 'Drag Position',
        dragshort: 'Alt + Mouse Left',
      },
      global: {
        title: 'Global',
        project: {
          title: 'Project',
          save: 'Save',
          load: 'Load',
          new: 'New',
          chapter: {
            title: 'Chapter',
            new: 'New',
            delete: 'Delete',
          },
          helpers: {
            title: 'Helpers',
            switcher: 'Change Text',
            finder: 'Find Text',
            logger: 'Actions',
          },
          pdf: {
            title: 'PDF',
            generate: 'Generate',
            configuration: 'Configuration',
            preview: 'Preview',
          },
        },
      },
    },
  },
  entity: {
    paragraph: 'Paragraph',
    'heading-one': 'Heading 1',
    'heading-two': 'Heading 2',
    'heading-three': 'Heading 3',
    'page-break': 'Page Break',
    'line-break': 'Line Break',
    image: 'Image',
  },
  bar: {
    pdf: {
      preview: 'Preview',
      generate: 'Generate',
      configuration: 'Configure',
    },
    docx: {
      generate: 'Generate',
    },
    project: {
      new: 'New',
      configuration: 'Configure',
      load: 'Load',
      save: 'Save',
      preferences: 'Preferences',
      statistics: 'Statistics',
      corrector: 'Corrector',
      autosave: 'Auto Save (in minutes)',
      import: 'Import',
      export: 'Export',
    },
    chapter: {
      drafts: 'Drafts',
      new: 'New',
      delete: 'Delete',
      up: 'Up',
      down: 'Down',
    },
    dropbox: {
      connect: 'Connect',
      save: 'Save',
      load: 'Load',
    },
    drive: {
      save: 'Google Drive Save',
      load: 'Google Drive Load',
    },
    assistants: {
      actions: 'Actions',
      finder: 'Text Search',
      swapper: 'Text Swapper',
    },
  },
  window: {
    confirmConfiguration: 'Do you want to quit saving the settings?',
    confirmClearLogger: 'Do you want to delete all data?',
    saveDropbox: 'Are you sure to save this file to Dropbox?',
    saveLocal: 'Are you sure to save this file?',
    deleteChapterPage: 'Are you sure to delete the current chapter?',
  },
  text: {
    placeholder: {
      base: `Insert '{prefix}' to display a list of commands.`,
      paragraph: 'Paragraph',
      headingone: 'H1',
      headingtwo: 'H2',
      headingthree: 'H3',
      shortcuts: {
        switcherEntry: 'Entry',
        switcherOutput: 'Output',
        finderEntry: 'Entry',
      },
    },
  },
  pdf: setPDFI18n().en(),
  aside: {
    dropbox: {
      connect: 'Connect',
      save: 'Save',
      load: 'Load',
    },
    drive: {
      save: 'Google Drive Save',
      load: 'Google Drive Load',
    },
    graph: {
      actuallyPage: 'Página Atual',
      projectPages: 'Projeto',
    },
    configuration: {
      title: 'Settings',
      dark: 'Dark Mode',
      lang: 'Language',
      draggable: 'Draggable',
      bars: 'Sidebars',
      autosave: 'Auto Save (in minutes)',
      entity: {
        title: 'Editor',
        updateTime: 'Updated Time',
      },
    },
    entity: {
      delete: 'Delete',
      up: 'Up',
      down: 'Down',
      switch: 'Change',
      add: 'Add',
      image: 'Image',
      comments: 'Comments',
    },
    project: {
      title: 'Project',
      addons: {
        logger: {
          title: 'Actions',
        },
        textSwitcher: {
          title: 'Replace Text',
        },
        textFinder: {
          title: 'Find Text',
        },
      },
      save: {
        title: 'Simple Save',
      },
      load: {
        title: 'Simple Load',
      },
      blocked: 'Create or load a project!!!',
      page: {
        new: {
          title: 'New Chapter',
        },
        delete: {
          title: 'Delete Chapter',
        },
      },
      new: {
        title: 'New Project',
        name: 'Name',
        creator: 'Creator',
        version: 'Version',
        subject: 'Subject',
        confirm: 'Create',
        type: 'Style',
        create: 'Create',
        types: {
          blank: {
            title: 'Blank',
            description:
              'Create a project without any additional features. Recommended for simple notes and projects.',
          },
          creative: {
            title: 'Creative',
            description:
              'Create a project with all the structure needed to create books.',
          },
        },
        content: {
          name: 'New Project',
          nameNew: 'Untitled',
          creator: 'Lorem Ipsum',
          subject:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur condimentum molestie metus. Etiam in metus arcu. Ut at augue neque. Donec ac felis vel arcu gravida volutpat.',
          version: '0.1.0',
        },
      },
    },
    pdf: {
      title: 'Generate',
      preview: 'Preview',
      configuration: 'Configure',
    },
    commands: {
      title: 'Commands',
      prefix: 'Prefix',
      contents: [
        {
          tag: 'P',
          title: 'Paragraph',
          prefix: '',
          description: '{prefix} text here',
          content: '',
        },
        {
          tag: 'B',
          title: 'Bold',
          prefix: '',
          description: '&text here&',
          content: '',
        },
        {
          tag: 'I',
          title: 'Italic',
          prefix: '',
          description: '*text here*',
          content: '',
        },
        {
          tag: 'H1',
          title: 'Heading 1',
          prefix: '',
          description: '{prefix} text here',
          content: '',
        },
        {
          tag: 'H2',
          title: 'Heading 2',
          prefix: '',
          description: '{prefix} text here',
          content: '',
        },
        {
          tag: 'H3',
          title: 'Heading 3',
          prefix: '',
          description: '{prefix} text here',
          content: '',
        },
        {
          tag: 'BP',
          title: 'Page Break',
          prefix: '',
          description: '{prefix}',
          content: '',
        },
        {
          tag: 'LB',
          title: 'Line Break',
          prefix: '',
          description: '{prefix}',
          content: '',
        },
        {
          tag: 'IM',
          title: 'Image',
          prefix: '',
          description: '{prefix}',
          content: '',
        },
        {
          tag: 'D',
          title: 'Dialogue',
          prefix: 'Dialogue - Prefix',
          description: '{prefix}   {value}',
          content: 'Dialogue - Value',
        },
      ],
    },
  },
  pwa: {
    prompt: {
      offlineReady: 'App ready to work offline',
      newContent: 'New content available, click on reload button to update.',
      reload: 'Reload',
      close: 'Close',
    },
  },
  drafts: {
    active: 'Active',
    others: 'Others',
    chapters: 'Chapters',
    statistics: {
      characters: 'Characters',
      letters: 'Letters',
      paragraph: "Paragraph's",
      heading: "Heading's",
      fixed: 'Fixed Items',
      longest: 'Longest Content',
    },
  },
  addons: {
    corrector: {
      convert: 'Convert',
      removeStartWhitespace: {
        title: 'Remove spaces at the beginning',
        description:
          'All white space at the beginning of the paragraph will be removed.',
      },
      removeEndWhitespace: {
        title: 'Remove spaces at the end',
        description:
          'All white space at the end of the paragraph will be removed.',
      },
      insertParagraphEndStop: {
        title: 'Insert End Point',
        description: 'All paragraphs will have a period added if necessary.',
      },
      removeExtraWhitespace: {
        title: 'Remove Multiple White Space',
        description: 'All unnecessary white space will be removed.',
      },
      insertDialogEndStop: {
        title: 'Insert End Point in Dialog',
        description:
          'All paragraphs will have a period appended at the end of the second occurrence of dialog.',
      },
    },
    statistics: {
      global: 'Global',
      characters: 'Characters',
      impact: 'Impact by Chapter',
      letters: 'Letters',
      words: 'Words',
      repeated: 'Repeated Words',
      min: 'Minimum Characters',
      paragraph: "Paragraph's",
      heading: "Heading's",
      fixed: 'Fixed Items',
      longest: 'Longest Content',
    },
  },
}
