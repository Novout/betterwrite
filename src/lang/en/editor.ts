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
    project: {
      new: 'Novo',
      configuration: 'Configure',
      load: 'Load',
      save: 'Save',
      preferences: 'Preferences',
      autosave: 'Auto Save (in minutes)',
    },
    chapter: {
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
  },
  text: {
    placeholder: {
      base: `Insert '/' to display a list of commands.`,
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
  pdf: {
    cover: {
      tooltip:
        ' So far, the cover inserted with image has problems with the top margin, defined in Page. We recommend leaving the top margin at 0 if you want to use the cover with image feature.',
      type: 'Image',
    },
    base: {
      tooltip:
        'Page features can change drastically up to v1.x version of BetterWrite.',
      title: 'Page',
      pageSize: 'Size',
      pageOrientation: 'Orientations',
      pageMargins: {
        title: 'Margins',
        left: 'Left',
        top: 'Top',
        right: 'Right',
        bottom: 'Bottom',
      },
      footer: {
        title: 'Footer',
        exists: 'On',
        start: 'Initial',
        alignment: 'Alignment',
        size: 'Size',
        type: 'Style',
        fontFamily: 'Font',
      },
      header: {
        title: 'Footer',
        content: 'Content',
        exists: 'On',
        start: 'Initial',
        alignment: 'Alignment',
        size: 'Size',
        type: 'Style',
        fontFamily: 'Font',
      },
      summary: {
        title: 'Sumário',
        type: 'Estilo',
        fontSize: 'Tamanho',
        fontFamily: 'Fonte',
      },
    },
    custom: {
      image: {
        height: 'Height',
        width: 'Width',
        alignment: 'Alignment',
      },
      title: {
        cover: 'Cover',
        paragraph: 'Paragraph',
        headingOne: 'Heading One',
        headingTwo: 'Heading Two',
        headingThree: 'Heading Three',
      },
      generics: {
        font: 'Font',
        fontSize: 'Font Size',
        lineHeight: 'Line Height',
        indent: 'Indent',
        bold: 'Bold',
        italics: 'Italic',
        alignment: 'Alignment',
        characterSpacing: 'Character-Spacing',
        color: 'Text Color',
        background: 'Text Background',
        markerColor: 'Marker Color',
        decoration: 'Decoration',
        decorationStyle: 'Decoration Style',
        decorationColor: 'Decoration Color',
        breakPage: 'Break Page',
      },
      save: 'Save',
    },
  },
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
      contents: [
        {
          tag: 'P',
          title: 'Paragraph',
          description: '/p text here',
        },
        {
          tag: 'B',
          title: 'Bold',
          description: '&text here&',
        },
        {
          tag: 'I',
          title: 'Italic',
          description: '*text here*',
        },
        {
          tag: 'H1',
          title: 'Heading 1',
          description: '/h1 text here',
        },
        {
          tag: 'H2',
          title: 'Heading 2',
          description: '/h2 text here',
        },
        {
          tag: 'H3',
          title: 'Heading 3',
          description: '/h3 text here',
        },
        {
          tag: 'BP',
          title: 'Page Break',
          description: '/bp',
        },
        {
          tag: 'LB',
          title: 'Line Break',
          description: '/lb',
        },
        {
          tag: 'IM',
          title: 'Image',
          description: '/im',
        },
      ],
    },
  },
}
