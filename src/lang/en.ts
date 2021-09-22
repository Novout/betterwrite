export default {
  editor: {
    text: {
      placeholder: {
        base: 'Take a look at the text commands in the sidebar.',
        paragraph: 'Paragraph',
        headingone: 'H1',
        headingtwo: 'H2',
        headingthree: 'H3',
      },
    },
    aside: {
      graph: {
        actuallyPage: 'Página Atual',
        projectPages: 'Projeto',
      },
      configuration: {
        title: 'Settings',
        dark: 'Dark Mode',
        lang: 'PT-BR / EN-US',
        draggable: 'Draggable',
      },
      project: {
        title: 'Project',
        blocked: 'Create or load a project!!!',
        page: {
          new: {
            title: 'New Page',
          },
        },
        new: {
          title: 'New Project',
          name: 'Name',
          version: 'Version',
          confirm: 'Create',
          content: {
            name: 'Nice New Project',
            version: '0.1.0',
          },
        },
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
        ],
      },
    },
  },
}
