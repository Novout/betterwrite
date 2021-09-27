export default {
  text: {
    placeholder: {
      base: `Insert '/' to display a list of commands.`,
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
      },
      new: {
        title: 'New Project',
        name: 'Name',
        version: 'Version',
        confirm: 'Create',
        content: {
          name: 'Nice New Project',
          nameNew: 'Untitled',
          version: '0.1.0',
        },
      },
    },
    pdf: {
      title: 'Generate PDF',
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
}
