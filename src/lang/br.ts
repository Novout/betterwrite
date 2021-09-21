export default {
  editor: {
    text: {
      placeholder: {
        base: 'Dê uma olhada nos comandos por texto na barra lateral.',
        paragraph: 'Parágrafo',
        headingone: 'H1',
        headingtwo: 'H2',
        headingthree: 'H3',
      },
    },
    aside: {
      configuration: {
        title: 'Configuração',
        dark: 'Modo Escuro',
        lang: 'PT-BR / EN-US',
      },
      project: {
        title: 'Projeto',
      },
      commands: {
        title: 'Comandos',
        contents: [
          {
            tag: 'P',
            title: 'Parágrafo',
            description: '/p texto aqui',
          },
          {
            tag: 'B',
            title: 'Negrito',
            description: '&texto aqui&',
          },
          {
            tag: 'I',
            title: 'Itálico',
            description: '*texto aqui*',
          },
          {
            tag: 'H1',
            title: 'Heading 1',
            description: '/h1 texto aqui',
          },
          {
            tag: 'H2',
            title: 'Heading 2',
            description: '/h2 texto aqui',
          },
          {
            tag: 'H3',
            title: 'Heading 3',
            description: '/h3 texto aqui',
          },
        ],
      },
    },
  },
}
