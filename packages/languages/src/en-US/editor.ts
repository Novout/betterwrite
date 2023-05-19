export default {
  new: {
    title: 'New Project',
    description1: '',
    description2: 'betterwrite.io ',
    description3:
      'offers design styles so you can adapt to your needs as you prefer.',
    blank: {
      title: 'Blank',
      description:
        'The default editor. Recommended for simple projects that do not require specific resources.',
      button: 'Create',
    },
    creative: {
      title: 'Creative',
      description:
        'Divide your project into chapters, notes and drafts. Recommended for writing books.',
      button: 'Create',
    },
    annotations: {
      title: 'Annotations',
      description:
        'Only use features for notes. Recommended for everyday tasks.',
      button: 'Create',
    },
  },
  material: {
    fileController: {
      import: 'Import',
      export: 'Export',
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
    vault: 'Void',
    help: 'Help',
    login: {
      logout: 'Logout',
      delete: 'Delete',
    },
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
    logout: {
      error: 'An unexpected error occurred in logout :(',
    },
    delete: {
      error: 'An unexpected error occurred while deleting your data :(',
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
      theme: {
        title: 'Theme',
        define: 'Pre-Defined',
        or: 'OR',
      },
      clientStorage: {
        title: 'Client Storage',
        description:
          'Choose a local storage client. It is recommended to use IndexedDB as it accepts a much larger project capacity than local-storage.',
        indexeddb: 'IndexedDB',
        local: 'Local Storage',
      },
      editor: {
        options: {
          googleFonts: {
            title: 'Google API Fonts',
            description:
              'Enable the use of external fonts in the editor. It depends on the internet connection. Does not affect requests from file generators.',
          },
          compressFiles: {
            title: 'Compress Images',
            description:
              'The lower the value, lower the image quality (1.0 is the default). Recommended to decrease project (.bw) size.',
          },
          purgeEntities: {
            title: 'Purge Entities',
            description:
              'Every time when saving a file, a cleanup will be performed on each editor item to remove unwanted items to make the project lighter. If enabled, saves will be slower.',
          },
          trackEntities: {
            title: 'Track Entities',
            description:
              'All the creation and alteration of each entity will be computed, being able to consult its creation time, alteration, among other functionalities. Slightly increases the project size.',
          },
        },
        background: {
          title: 'Background',
          cover: 'Cover',
          image: 'Image',
          imageBlur: 'Blur',
          imageGrayscale: 'Grayscale',
          imageSaturate: 'Saturate',
          imageSepia: 'Sepia',
        },
        title: 'Editor',
        heading: 'Heading Text',
        header: 'Top Bar',
        graph: 'Sidebar',
        text: 'Editor Text',
        fontFamily: 'Font Family',
        fontWeight: 'Font Weight',
        fontSize: 'Font Size',
      },
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
        underline: 'Add Underline',
        delete: 'Delete',
        undo: 'Text Undo',
        undoEvent: 'Action Undo',
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
    epub: {
      generate: 'Generate (.EPUB)',
      table: 'Table of Content',
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
      new: 'New Project',
      blank: 'New Simple Project',
      configuration: 'Configure',
      load: 'Load',
      save: 'Save',
      preferences: 'Preferences',
      statistics: 'Statistics',
      corrector: 'Corrector',
      autosave: 'Local Auto Save',
      cloudAutosave: 'Cloud Auto Save',
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
      privacy: 'Privacy Policy',
    },
    generator: {
      substitutions: 'Substitutions',
    },
  },
  window: {
    confirmConfiguration: 'Do you want to quit saving the settings?',
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
  pdf: {
    gen: {
      chapters: 'Chapters',
      color: 'Color Schema',
      dpi: 'DPI',
    },
    note: {
      title: 'Considerations',
      description: 'Text',
      bw: 'Document produced by',
    },
    externals: {
      generate: {
        title: 'Generate',
        button: 'Create',
      },
      preview: {
        title: 'Simulate',
        button: 'Create',
        warning: `* Simulation mode does not support all Better Write implementation features. If it doesn't render, choose Generate or PDF.`,
      },
    },
    inserts: {
      nowOnline:
        'It was detected that you have an internet connection, but the fonts were not loaded. Please reload the page.',
    },
    theme: {
      title: 'Use Theme',
      tooltip:
        'This feature will use the current design theme and ignore the other pdf options that apply coloring.',
    },
    project: {
      title: 'Document',
      encryption: {
        title: 'Encryption',
        user: 'User Password',
        owner: 'Owner Password',
      },
      permissions: {
        title: 'Permissions',
        printing: 'Print',
        modifying: 'Modify',
        copying: 'Copy',
        annotating: 'Write',
        fillingForms: 'Subscribe / Fill in',
        contentAccessibility: 'Content Accessibility',
        documentAssembly: 'Mounting',
      },
      tooltip: {
        title: `The following options interfere with the user's access to the PDF. Only interfere with the default configuration if you feel it is necessary.`,
        permissions: {
          printing: 'Print',
          modifying: 'Modify',
          copying: 'Copy',
          annotating: 'Write',
          fillingForms: 'Subscribe / Fill in',
          contentAccessibility: 'Content Accessibility',
          documentAssembly: 'Mounting',
        },
      },
    },
    cover: {
      tooltip:
        ' So far, the cover inserted with image has problems with the top margin, defined in Page. We recommend leaving the top margin at 0 if you want to use the cover with image feature.',
      type: 'Enable',
      image: 'Use Image',
    },
    base: {
      backgroundColor: {
        title: 'Background Color',
        tooltip:
          'The Background Color will only be applied if the "Use Theme" option is disabled.',
      },
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
        title: 'Summary',
        type: 'Style',
        fontSize: 'Font Size',
        fontFamily: 'Font Family',
      },
    },
    lineBreak: {
      spacing: 'Spacing',
      active: 'Use Image',
      size: 'Size',
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
        lineBreak: 'Line Break',
      },
      save: 'Save',
    },
    configuration: {
      header: {
        content: 'Content Here',
      },
      footer: {
        style: {
          simple: 'Simple',
          counter: 'Counter',
        },
      },
      summary: {
        style: {
          default: 'Default',
        },
      },
      alignment: {
        default: 'Default',
        justify: 'Justify',
        left: 'Left',
        center: 'Center',
        right: 'Right',
      },
      orientation: {
        portrait: 'Portrait',
        landscape: 'Landscape',
      },
    },
  },
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
      schemas: 'Schemas',
    },
    configuration: {
      title: 'Settings',
      dark: 'Dark Mode',
      lang: 'Language',
      draggable: 'Draggable',
      bars: 'Sidebars',
      transition: 'Transitions',
      autosave: 'Auto-Save',
      cloudAutosave: 'Cloud Auto Save',
      blocked: 'Initial Tutorial',
      bottomBar: 'Bottom Bar',
      language: 'Language',
      advanced: 'Advanced',
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
          annotations: {
            title: 'Annotations',
            description:
              'Create a project with only features for annotations. Recommended for everyday tasks.',
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
  schemas: {
    types: {
      default: {
        target: 'Default',
        description: 'Write your notes however you like.',
      },
      characters: {
        target: 'Characters',
        description:
          'Create a file for each character in your story and see the highlighted paragraphs they participate in each chapter.',
      },
    },
    create: {
      title: 'Workspace',
      description:
        'Additional resources that do not participate in the generation of documents, serving as an aid to the production flow and accompanying all your writing!',
      name: 'Name',
      prefix: 'Prefix',
      prefixDescription:
        'Choose a prefix that will allow you to reference files at any time.',
      type: 'Schema Type',
      typeDescription:
        'Choose a style that is more related to what you are looking for.',
      button: 'Create',
      templates: {
        title: 'One second...',
        description:
          'Optionally, you can choose an additional template to get your project off to a good start!',
        button: 'Start',
        simple: {
          title: 'Simple',
          description:
            'Start with generic annotations and build your workspace however you like!',
        },
        enthusiast: {
          title: 'Enthusiast',
          description:
            'Start your project with several files prepared to extract the maximum of your creativity!',
        },
      },
    },
    defines: {
      annotations: 'Anotações',
      lore: 'Lore',
      characters: 'Characters',
      timeline: 'Timeline',
    },
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
  characters: {
    title: 'Characters',
    description: 'Get control of specific words as you write.',
    item: {
      addCharacter: 'Add Character',
      name: 'Name',
      nameCase: 'Type',
      nameCaseStrict: 'Strict',
      nameCaseDefault: 'Default',
      nameCaseAll: 'All',
      color: 'Color',
      colorAlpha: 'Opacity',
      important: 'Important',
      disabled: 'Disabled',
    },
    data: {
      occurrences: 'Occurrences',
      averageOccurrences: 'Average of Occurrences',
    },
  },
  vault: {
    empty: 'The void is empty.',
  },
  tutorial: {
    buttons: {
      prev: 'Previous',
      next: 'Next',
    },
    pages: {
      1: {
        title: 'Creativity.',
        description1:
          'Welcome to the word processor aimed at writing enthusiasts.',
        description2: `Here's an exclusive tour to discover and learn about betterwrite.io many tools!`,
        alert: 'Do not display the tutorial again.',
      },
      2: {
        title: 'Entity Model',
        description1:
          'The main editor is designed to allow individual interaction on any element, where each item entered does not affect other elements in the same editor.',
        description2:
          'The great advantage of this approach is the emergence of unique and fully customizable features.',
        description3:
          'To interact with each item (entity) press or right-click on the item in question or use the keyboard shortcut CTRL + (1-9).',
      },
      3: {
        title: 'Side Graph',
        description1:
          'Visualize in real time everything that happens in the project at all times.',
        high2: 'Chapters:',
        high3: 'Annotations: ',
        description2:
          'Divide your manuscripts into chapters without worrying about changing anything in the future.',
        description3: `Have your notes in one place and without interfering with the project's export flow.`,
      },
      4: {
        title: 'Top Bar',
        description1:
          'Easily access any tool you want without the need for many unnecessary steps.',
        high2: 'File: ',
        high3: 'Export: ',
        high4: 'Tools: ',
        high5: 'Void: ',
        high6: 'Help: ',
        description2:
          'Check out the main ways of manipulating the project, such as creating, saving, changing, loading and querying.',
        description3:
          'File generators and their definitions. Each extension works with different settings from each other.',
        description4:
          'Additional features that only tend to add to your experience.',
        description5: 'Store your projects in one easy-to-access location.',
        description6: 'Documentation for inquiries.',
      },
      5: {
        title: 'Tooling',
        description1: 'Discover new ways to handle your project.',
        high2: 'Drafts: ',
        high3: 'Corrector: ',
        high4: 'Insert Shortcuts: ',
        high5: 'Characters: ',
        description2:
          'Write multiple versions of your text without any worries.',
        description3: 'Handle specific cases on all items.',
        description4:
          'Create shortcuts to insert recurring words or sentences.',
        description5:
          'Easily discover how much a character appears in the text or its impact on context.',
      },
      final: {
        title: 'Explore.',
        description1:
          'Now enjoy it the way you like and configure it the way you want.',
      },
    },
  },
  presence: {
    beta: 'This tool is still under development, and unexpected results may occur. Remember to save the project before creating or joining a room.',
    off: 'This room is not available!',
    key: {
      code: 'Code:',
      link: 'Access Link:',
      qrcode: 'QR Code:',
    },
    alert: {
      logoutAccount:
        'Are you sure you want to logout of your account? Local data will be lost!',
      deleteAccount:
        'Are you sure you want to delete your account and all local and cloud data? This action is irreversible!',
    },
    type: {
      owner: 'Owner',
      visit: 'Visitant',
      collaborator: 'Collaborator',
      description: {
        visit:
          'Visitant: All users entering the room can only view the project.',
        collaborator:
          'Collaborator: All users who enter the room can change project data in real time, such as keeping a copy of the project for themselves.        ',
      },
    },
    bar: {
      liveshare: 'Sharing...',
    },
    create: {
      title: 'Live Share',
      description:
        'Share your project with others in real time to build an experience together!',
      button: 'Create Room',
      key: 'Key',
      or: 'Or',
      new: 'Create Room:',
      enterInput: 'Enter Room:',
      enterPlaceholder: 'vCAQe6FD3D...',
    },
    info: {
      enter: 'Enter',
      create: 'Create',
      title: 'Share Room',
      leave: 'Leave Room',
    },
  },
}
