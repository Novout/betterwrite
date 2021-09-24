export default {
  editor: {
    text: {
      placeholder: {
        base: `Insert '/' to display a list of commands.`,
        paragraph: 'Parágrafo',
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
        title: 'Configuração',
        dark: 'Modo Escuro',
        lang: 'PT-BR / EN-US',
        draggable: 'Arrastável',
      },
      project: {
        title: 'Projeto',
        blocked: 'Crie ou carregue um projeto!!!',
        page: {
          new: {
            title: 'Novo Capítulo',
          },
        },
        new: {
          title: 'Novo Projeto',
          name: 'Nome',
          version: 'Versão',
          confirm: 'Criar',
          content: {
            name: 'Um Novo Projeto Incrível',
            nameNew: 'Sem Título',
            version: '0.1.0',
          },
        },
      },
      pdf: {
        title: 'Gerar PDF',
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
