export default {
  window: {
    confirmConfiguration: 'Você quer sair salvando as configurações?',
  },
  text: {
    placeholder: {
      base: `Insira '/' para exibir a lista de comandos.`,
      paragraph: 'Parágrafo',
      headingone: 'H1',
      headingtwo: 'H2',
      headingthree: 'H3',
      shortcuts: {
        switcherEntry: 'Entrada',
        switcherOutput: 'Saída',
        finderEntry: 'Entrada',
      },
    },
  },
  pdf: {
    cover: {
      type: 'Imagem',
    },
    base: {
      title: 'Página',
      pageSize: 'Tamanho',
      pageOrientation: 'Orientação',
      pageMargins: {
        title: 'Margens',
        left: 'Esquerda',
        top: 'Cima',
        right: 'Direita',
        bottom: 'Baixo',
      },
    },
    custom: {
      title: {
        cover: 'Capa',
        paragraph: 'Parágrafo',
        headingOne: 'Título Principal',
        headingTwo: 'Título Secundário',
        headingThree: 'Título Terciário',
      },
      generics: {
        font: 'Fonte',
        fontSize: 'Tamanho da Fonte',
        lineHeight: 'Altura da Linha',
        indent: 'Indentação',
        bold: 'Negrito',
        italics: 'Itálico',
        alignment: 'Alinhamento',
        characterSpacing: 'Espaço de Caracteres',
        color: 'Cor do Texto',
        background: 'Cor do Fundo',
        markerColor: 'Cor da Marca',
        decoration: 'Decoração',
        decorationStyle: 'Estilo da Decoração',
        decorationColor: 'Cor da Decoração',
        breakPage: 'Quebra de Página',
      },
      save: 'Salvar',
    },
  },
  aside: {
    dropbox: {
      connect: 'Conectar',
      save: 'Salvar',
      load: 'Carregar',
    },
    drive: {
      save: 'Salvar Google Drive',
      load: 'Carregar Google Drive',
    },
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
    entity: {
      delete: 'Deletar',
      up: 'Cima',
      down: 'Baixo',
    },
    project: {
      title: 'Projeto',
      addons: {
        logger: {
          title: 'Ações',
        },
        textSwitcher: {
          title: 'Substituir Texto',
        },
        textFinder: {
          title: 'Encontrar Texto',
        },
      },
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
        creator: 'Criador',
        subject: 'Sobre',
        version: 'Versão',
        confirm: 'Criar',
        content: {
          name: 'Novo Projeto',
          nameNew: 'Sem Título',
          creator: 'Lorem Ipsum',
          subject:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur condimentum molestie metus. Etiam in metus arcu. Ut at augue neque. Donec ac felis vel arcu gravida volutpat.',
          version: '0.1.0',
        },
      },
    },
    pdf: {
      title: 'Gerar',
      preview: 'Simular',
      configuration: 'Configurar',
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
        {
          tag: 'BP',
          title: 'Quebra de Página',
          description: '/bp',
        },
        {
          tag: 'LB',
          title: 'Quebra de Linha',
          description: '/lb',
        },
        {
          tag: 'IM',
          title: 'Imagem',
          description: '/im',
        },
      ],
    },
  },
}
