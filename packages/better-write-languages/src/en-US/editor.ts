import { setPDFI18n } from 'better-write-plugin-exporter-pdf'

export default {
  live: {
    enter: {
      title: 'Enter the Room',
      description: 'Enter the access code below:',
    },
    create: {
      title: 'Create Room',
      description:
        'Create a room for others to access and interact with your project!',
      button: 'Generate Room',
      code: 'The access code is:',
    },
  },
  blocked: {
    title: 'Better Write.',
    introduction: {
      name: 'Introduction',
      description1: '',
    },
    commands: {
      description1:
        'Commands are flexible items that the user can use to customize their project, ranging from typeable items (text, title, lists, checkboxes) to pinned items (image, drawing, line/page break).',
      description2: `Right Click or Press a flexible item to open the item's options menu.`,
      description3:
        'Check out the available commands and their shortcut keys below.',
      menu: {
        delete: 'Delete - Deletes the selected item.',
        up: `Top - Swap the current item's position with the top item.`,
        down: `Down - Swap the current item's position with the lower item.`,
        comments: `Comment - Available in text only, write down quick information for future reference.`,
        swap: 'Swap - Replaces the current item with another.',
        add: 'Add - Insert a new item at a position below the current item.',
        text: 'Text - Available in text only, customize text with new styles to overwrite on file generation.',
        image:
          'Image - Available on images only, change the default image settings.',
      },
      name: 'Comandos',
    },
  },
  header: {
    project: 'Project',
    export: 'Export',
    chapters: 'Chapters',
    tools: 'Tools',
    help: 'Help',
    live: 'Live',
  },
  auth: {
    login: {
      show: 'Enter',
      title: 'Better Write',
      error: 'An unexpected error occurred while authenticating the account :(',
      placeholder: 'Enter your email here.',
      success: 'Successfully logged in!',
      google: 'Login with Google Account',
      github: 'Login with Github Account',
    },
  },
  project: {
    control: {
      title: 'Chapter {suffix}',
    },
    configuration: {
      title: 'Document',
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
    header: {
      title: 'Preferences',
      close:
        'Some changes will only take effect when reloading an application. Do you want to reload an application?',
    },
    project: {
      title: 'Project',
    },
    configuration: {
      title: 'Configuration',
    },
    styles: {
      title: 'Styles',
    },
    keyboard: {
      title: 'Keyboard',
    },
    commands: {
      '1': 'Paragraph',
      '2': 'Heading Two',
      '3': 'Heading Three',
      '4': 'Line Break',
      '5': 'Page Break',
      '6': 'Checkbox',
      '7': 'List',
      '8': 'Image',
      '9': 'Drawing',
    },
    shortcuts: {
      title: 'Hotkeys',
      editor: {
        italic: 'Add Italic',
        bold: 'Add Bold',
        delete: 'Delete',
        swap: 'Change Position',
        to: 'Go To Next Position',
        dragtitle: 'Drag Position',
        dragshort: 'Alt + Mouse Left',
      },
      inserts: {
        title: 'Insert Shortcuts',
        description:
          'Set values ​​to be entered from the current caret position.',
        key: 'Shortcut',
        value: 'Value',
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
    generator: {
      template: 'Default',
    },
  },
  bar: {
    supabase: {
      load: 'Cloud Load',
      save: 'Cloud Save',
    },
    pdf: {
      preview: 'Preview (.PDF)',
      generate: 'Generate (.PDF)',
      configuration: 'Configure (.PDF)',
    },
    txt: {
      generate: 'Generate (.TXT)',
    },
    html: {
      generate: 'Generate (.HTML)',
    },
    docx: {
      configuration: 'Configure (.DOCX)',
      generate: 'Generate (.DOCX)',
    },
    project: {
      new: 'New',
      blank: 'Annotation',
      configuration: 'Configure',
      load: 'Load',
      save: 'Save',
      preferences: 'Preferences',
      statistics: 'Statistics',
      corrector: 'Corrector',
      autosave: 'Auto Save (in minutes)',
      language: 'Language',
      theme: 'Theme',
      import: 'Import',
      export: 'Export',
      exportAs: 'Export as...',
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
      speechRecognition: 'Voice Typing',
      actions: 'Actions',
      finder: 'Text Search',
      swapper: 'Text Swapper',
    },
    help: {
      doubts: 'Doubts',
      support: 'Suporte',
      terms: 'Terms of Use',
    },
    generator: {
      substitutions: 'Substitutions',
    },
    live: {
      enter: 'Enter',
      create: 'Create Room',
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
      base: `Press or Right-Click to display the options menu.`,
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
    resume: 'Resumo',
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
      title: 'Display List',
      chapters: 'Chapters',
      actuallyPage: 'Actually Page',
      projectPages: 'Project Pages',
      timeline: 'Timeline',
      annotations: 'Annotations',
    },
    configuration: {
      title: 'Settings',
      dark: 'Dark Mode',
      lang: 'Language',
      draggable: 'Draggable',
      bars: 'Sidebars',
      transition: 'Transitions',
      autosave: 'Auto-Save',
      blocked: 'Initial Tutorial',
      bottomBar: 'Bottom Bar',
      entity: {
        title: 'Editor',
        insertEntityInParagraphBreakLine: 'Insert Paragraph at line breaks',
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
      paragraph: 'Paragraph',
      customize: 'Text',
      optionsOn: 'Enable',
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
      blocked: 'Create or load a project.',
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
          title: 'Paragraph',
          tag: 'P',
          content:
            'Insert a simple paragraph. By default, all blocks start as a paragraph.',
        },
        {
          title: 'Heading One',
          tag: 'H2',
          content: 'Secondary title.',
        },
        {
          title: 'Heading Two',
          tag: 'H3',
          content: 'Tertiary title.',
        },
        {
          title: 'Heading Three',
          tag: 'BP',
          content:
            'Page Break. Generators have automatically broken the page it is on.',
        },
        {
          title: 'Line Break',
          tag: 'LB',
          content:
            'Line break. The generators automatically wrapped the line where it is inserted.',
        },
        {
          title: 'Image',
          tag: 'IM',
          content: 'Image. Add an image from your device to the editor.',
        },
        {
          title: 'Dialogue',
          tag: 'D',
          content:
            'Dialogue. The editor will insert the defined dialog objective. See Preferences for available options for this feature.',
        },
        {
          title: 'Checkbox',
          tag: 'CH',
          content:
            'Selection box. The generators will automatically render the checkbox option.',
        },
        {
          title: 'List',
          tag: 'LI',
          content:
            'List. The generators will automatically count subsequent lists.',
        },
        {
          title: 'Draw',
          tag: 'T',
          content:
            'Create ideas from your drawings. Generators convert the drawing to an image.',
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
    substitutions: {
      description:
        'Replace entire words and phrases without having to change them one by one. It is not recommended to edit or remove default items. Substitute initially as words and then enter bold/italic.',
      from: 'Replace',
      to: 'For',
      italic: 'Italic',
      bold: 'Bold',
    },
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
      resetEntityRaw: {
        title: 'Clear the Items',
        description: 'Remove the internal content of all typed items.',
      },
    },
    statistics: {
      global: 'Global',
      characters: 'Characters',
      impact: 'Estimated Reading Time',
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
  annotations: {
    items: {
      file: 'New File',
      folder: 'New Folder',
    },
    theme: {
      placeholder: 'Type / to open commands...',
      tags: {
        h1: 'Primary Title',
        h2: 'Secondary Title',
        h3: 'Tertiary Title',
        bulletList: 'Bullet List',
        orderedList: 'Ordered List',
        taskList: 'Task List',
        image: 'Image',
        quote: 'Quote',
        table: 'Table',
        code: 'Code',
        divider: 'Divider',
      },
    },
  },
}
