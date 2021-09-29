export default {
  text: {
    placeholder: {
      base: `Insira '/' para exibir a lista de comandos.`,
      paragraph: 'Parágrafo',
      headingone: 'H1',
      headingtwo: 'H2',
      headingthree: 'H3',
    },
  },
  pdf: {
    custom: {
      generics: {
        font: 'Fonte',
        fontSize: 'Tamanho da Fonte',
        lineHeight: 'Altura da Linha',
        bold: 'Negrito',
        italics: 'Itálico',
        aligment: 'Alinhamento',
        characterSpacing: 'Espaço de Caracteres',
        color: 'Cor do Texto',
        background: 'Cor do Fundo' as string,
        markerColor: 'Cor da Marca' as string,
        decoration: 'Decoração',
        decorationStyle: 'Estilo da Decoração',
        decorationColor: 'Cor da Decoração',
      },
      save: 'Salvar',
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
      save: {
        title: 'Salvar Simples',
      },
      load: {
        title: 'Carregar Simples',
      },
      blocked: 'Crie ou carregue um projeto!!!',
      page: {
        new: {
          title: 'Novo Capítulo',
        },
        delete: {
          title: 'Deletar Capítulo',
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
      configuration: 'Configurar PDF',
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
}
