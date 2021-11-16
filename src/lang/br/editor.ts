export default {
  project: {
    configuration: {
      title: 'Configurações do Projeto',
      creator: 'Autor',
      name: 'Nome',
      subject: 'Descrição',
      producer: 'Produtor',
      keywords: 'Palavras-Chave',
      tooltip: {
        base: 'Estes campos são utilizados pela aplicação para a exportação de documentos e geração de conteúdo quando for necessário. Em suma, preencha os campos corretamente.',
        creator:
          'Nome / Organização Responsável pela Criação / Escrita do Documento',
        name: 'Nome do Documento',
        subject: 'Assunto do Documento',
        producer: 'Produtor / Publicador do Documento',
        keywords: 'Palavras-Chave do Documento',
      },
    },
  },
  preferences: {
    shortcuts: {
      title: 'Teclas de Atalho',
      editor: {
        title: 'Editor de Texto',
        italic: 'Adicionar Itálico',
        bold: 'Adicionar Negrito',
        delete: 'Deletar',
        swap: 'Trocar de Posição',
        to: 'Ir Para Posição Seguinte',
      },
      global: {
        title: 'Geral',
        project: {
          title: 'Projeto',
          save: 'Salvar',
          load: 'Carregar',
          new: 'Novo',
          chapter: {
            title: 'Capítulo',
            new: 'Novo',
            delete: 'Deletar',
          },
          helpers: {
            title: 'Auxiliares',
            switcher: 'Trocar Texto',
            finder: 'Encontrar Texto',
            logger: 'Ações',
          },
          pdf: {
            title: 'PDF',
            generate: 'Criar',
            configuration: 'Configuração',
            preview: 'Visualização',
          },
        },
      },
    },
  },
  entity: {
    paragraph: 'Parágrafo',
    'heading-one': 'Título 1',
    'heading-two': 'Título 2',
    'heading-three': 'Título 3',
    'page-break': 'Quebra de Página',
    'line-break': 'Quebra de Linha',
    image: 'Imagem',
  },
  bar: {
    pdf: {
      preview: 'Simular',
      generate: 'Gerar',
      configuration: 'Configurar',
    },
    project: {
      new: 'Novo',
      configuration: 'Configurar',
      preferences: 'Preferências',
      load: 'Carregar',
      save: 'Salvar',
    },
    chapter: {
      new: 'Novo',
      delete: 'Deletar',
      up: 'Cima',
      down: 'Baixo',
    },
    dropbox: {
      connect: 'Conectar',
      save: 'Salvar',
      load: 'Carregar',
    },
    drive: {
      save: 'Salvar Google Drive',
      load: 'Carregar Google Drive',
    },
    assistants: {
      actions: 'Ações',
      finder: 'Encontrar Texto',
      swapper: 'Substituir Texto',
    },
  },
  window: {
    confirmConfiguration: 'Você quer sair salvando as configurações?',
    confirmClearLogger: 'Você quer excluir todos os dados?',
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
    project: {
      title: 'Documento',
      encryption: {
        title: 'Criptografia',
        user: 'Senha do Usuário',
        owner: 'Senha do Dono',
      },
      permissions: {
        title: 'Permissões',
        printing: 'Impressão',
        modifying: 'Modificar',
        copying: 'Copiar',
        annotating: 'Anotar',
        fillingForms: 'Assinar / Preencher',
        contentAccessibility: 'Acessibilidade de Conteúdo',
        documentAssembly: 'Montagem',
      },
      tooltip: {
        title:
          'As opções a seguir interferem no acesso do usuário ao PDF. Só interfira na configuração padrão se achar necessário.',
        permissions: {
          printing: 'Impressão',
          modifying: 'Modificar',
          copying: 'Copiar',
          annotating: 'Anotar',
          fillingForms: 'Assinar / Preencher',
          contentAccessibility: 'Acessibilidade de Conteúdo',
          documentAssembly: 'Montagem',
        },
      },
    },
    cover: {
      tooltip:
        'Até o momento, a capa inserida com imagem possui problemas com a margem superior, definida em Página. Recomendamos deixar a margem superior em 0 caso deseja utilizar o recurso da capa com imagem.',
      type: 'Imagem',
    },
    base: {
      tooltip:
        'Os recursos da página podem mudar drasticamente até a versão v1.x do BetterWrite.',
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
      footer: {
        title: 'Rodapé',
        exists: 'Habilitar',
        start: 'Início',
        alignment: 'Alinhamento',
        size: 'Tamanho',
        type: 'Estilo',
        fontFamily: 'Fonte',
      },
      header: {
        title: 'Cabeçalho',
        content: 'Conteúdo',
        exists: 'Habilitar',
        start: 'Início',
        alignment: 'Alinhamento',
        size: 'Tamanho',
        type: 'Estilo',
        fontFamily: 'Fonte',
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
        height: 'Altura',
        width: 'Largura',
        alignment: 'Alinhamento',
      },
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
      lang: 'Linguagem',
      draggable: 'Arrastável',
      autosave: 'Salvamento Automático (em minutos)',
      entity: {
        title: 'Editor',
        updateTime: 'Tempo Atualizado',
      },
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
        type: 'Estilo',
        create: 'Crie',
        types: {
          blank: {
            title: 'Em Branco',
            description:
              'Crie um projeto sem nenhum recurso adicional. Recomendado para anotações e projetos simples.',
          },
          creative: {
            title: 'Criativo',
            description:
              'Crie um projeto com toda a estrutura necessária para a criação de livros.',
          },
        },
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
  pwa: {
    prompt: {
      offlineReady: 'Aplicativo pronto para funcionar offline!',
      newContent: 'Novo conteúdo disponível, clique no botão recarregar para atualizar.',
      reload: 'Atualizar',
      close: 'Fechar',
    },
  },
}
