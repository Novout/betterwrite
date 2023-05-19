export default {
  new: {
    title: 'Novo Projeto',
    description1: 'O ',
    description2: 'betterwrite.io ',
    description3:
      'oferece estilos de projeto para que possa adaptar às suas necessidades como preferir.',
    blank: {
      title: 'Comum',
      description:
        'O editor padrão. Recomendado para projetos simples e que não requerem recursos específicos.',
      button: 'Criar',
    },
    creative: {
      title: 'Criativo',
      description:
        'Divida seu projeto em capítulos, anotações e rascunhos. Recomendado para a escritura e projeção de livros.',
      button: 'Criar',
    },
    annotations: {
      title: 'Anotações',
      description:
        'Use somente os recursos para anotações. Recomendado para as tarefas do dia-a-dia.',
      button: 'Criar',
    },
  },
  material: {
    fileController: {
      import: 'Importar',
      export: 'Exportar',
    },
  },
  blocked: {
    title: 'Better Write.',
    introduction: {
      name: 'Introdução',
      description1: '',
    },
    commands: {
      description1:
        'Comandos são itens flexíveis que o usuário pode utilizar para customizar o seu projeto, variando entre itens digitáveis (texto, título, listas, caixas de seleção) a itens fixados (imagem, desenho, quebra de linha/página).',
      description2:
        'Clique com Botão Direito ou Pressione um item flexível para abrir o menu de opções do item.',
      description3:
        'Confira a seguir os comandos disponíveis e suas teclas de atalho.',
      menu: {
        delete: 'Deletar - Exclui o item selecionado.',
        up: 'Cima - Troque a posição do item atual com o item superior.',
        down: 'Baixo - Troque a posição do item atual com o item inferior.',
        comments:
          'Comentário - Disponível somente em textos, anote informações rápidas para consultar futuramente.',
        swap: 'Trocar - Substitui o item atual por outro.',
        add: 'Adicionar - Insira um novo item em uma posição abaixo do item atual.',
        text: 'Texto - Disponível somente em textos, customize o texto com novos estilos para sobrescrever na geração do arquivo.',
        image:
          'Imagem - Disponível somente em imagens, modifique as configurações padrões da imagem.',
      },
      name: 'Comandos',
    },
  },
  header: {
    project: 'Arquivo',
    export: 'Exportar',
    chapters: 'Capítulos',
    tools: 'Ferramentas',
    vault: 'Vazio',
    help: 'Ajuda',
    login: {
      logout: 'Sair',
      delete: 'Deletar',
    },
  },
  auth: {
    login: {
      show: 'Entrar',
      title: 'Entrar no Better Write',
      error: 'Ocorreu um erro inesperado na autenticação da conta :(',
      placeholder: 'Digite seu email aqui.',
      success: 'Logado com sucesso!',
      google: 'Entrar com Conta Google',
      github: 'Entrar com Conta Github',
    },
    logout: {
      error: 'Ocorreu um erro inesperado para deslogar :(',
    },
    delete: {
      error: 'Ocorreu um erro inesperado ao deletar os seus dados :(',
    },
  },
  project: {
    control: {
      title: 'Capítulo {suffix}',
    },
    configuration: {
      title: 'Documento',
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
    header: {
      title: 'Preferências',
      close:
        'Algumas alterações só surtirão efeito ao recarregar a aplicação. Deseja recarregar a aplicação?',
    },
    project: {
      title: 'Projeto',
    },
    configuration: {
      title: 'Configurações',
      theme: {
        title: 'Tema',
        define: 'Pré-Definido',
        or: 'OU',
      },
      clientStorage: {
        title: 'Cliente de Armazenamento',
        description:
          'Escolha um cliente de armazenamento local. É recomendável usar o IndexedDB, pois ele aceita uma capacidade de projeto muito maior do que o armazenamento por local-storage.',
        indexeddb: 'IndexedDB',
        local: 'Local',
      },
      editor: {
        options: {
          googleFonts: {
            title: 'Fontes do Google API',
            description:
              'Habilitar a utilização de fontes externas no editor. Depende da conexão com a internet. Não afeta as requisições dos geradores de arquivo.',
          },
          compressFiles: {
            title: 'Comprimir Imagens',
            description:
              'Quanto menor o valor, menor a qualidade de imagem e o tamanho do arquivo (1.0 é o padrão). Recomendado para diminuir o tamanho geral do projeto (.bw).',
          },
          purgeEntities: {
            title: 'Expurgar Entidades',
            description:
              'Sempre ao salvar um arquivo, um "pente limpo" será executado em cada item do editor para remover itens indesejados para deixar o projeto mais leve. Caso ativado, os salvamentos estarão mais lentos.',
          },
          trackEntities: {
            title: 'Escutar Entidades',
            description:
              'Toda a criação e alteração de cada entidade será computada, podendo consultar seu tempo de criação, alteração, entre outras funcionalidades. Aumenta levemente o tamanho do projeto.',
          },
        },
        background: {
          title: 'Fundo',
          cover: 'Cobrir',
          image: 'Imagem',
          imageBlur: 'Borrão',
          imageGrayscale: 'Cinza',
          imageSaturate: 'Saturação',
          imageSepia: 'Sépia',
        },
        title: 'Editor',
        heading: 'Cabeçalho do Editor',
        header: 'Barra Superior',
        graph: 'Barra Lateral',
        text: 'Texto do Editor',
        fontFamily: 'Fonte Padrão',
        fontWeight: 'Estilo da Fonte',
        fontSize: 'Tamanho da Fonte',
      },
    },
    styles: {
      title: 'Aparência',
    },
    keyboard: {
      title: 'Teclado',
    },
    commands: {
      '1': 'Parágrafo',
      '2': 'Título Secundário',
      '3': 'Título Terciário',
      '4': 'Quebra de Página',
      '5': 'Quebra de Linha',
      '6': 'Caixa de Seleção',
      '7': 'Lista',
      '8': 'Imagem',
      '9': 'Desenho',
    },
    shortcuts: {
      title: 'Teclas de Atalho',
      editor: {
        italic: 'Adicionar Itálico',
        bold: 'Adicionar Negrito',
        underline: 'Adicionar Sublinhado',
        delete: 'Deletar',
        undo: 'Desfazer Texto',
        undoEvent: 'Desfazer Ação',
        swap: 'Trocar de Posição',
        to: 'Ir Para Posição Seguinte',
      },
      inserts: {
        title: 'Atalhos de Inserção',
        description:
          'Defina valores para serem inseridos a partir da posição atual do texto.',
        key: 'Atalho',
        value: 'Valor',
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
    generator: {
      template: 'Padrão',
    },
  },
  bar: {
    supabase: {
      load: 'Carregar da Nuvem',
      save: 'Salvar na Nuvem',
    },
    pdf: {
      preview: 'Simular (.PDF)',
      generate: 'Gerar (.PDF)',
      configuration: 'Configurar (.PDF)',
    },
    epub: {
      generate: 'Gerar (.EPUB)',
      table: 'Tabela de Conteúdos',
    },
    txt: {
      generate: 'Gerar (.TXT)',
    },
    html: {
      generate: 'Gerar (.HTML)',
    },
    docx: {
      configuration: 'Configurar (.DOCX)',
      generate: 'Gerar (.DOCX)',
    },
    project: {
      new: 'Novo Projeto',
      blank: 'Novo Projeto Simples',
      configuration: 'Configurar',
      statistics: 'Estatísticas',
      preferences: 'Preferências',
      corrector: 'Corretor',
      load: 'Carregar',
      save: 'Salvar',
      language: 'Idioma',
      theme: 'Tema',
      import: 'Importar',
      export: 'Exportar',
      exportAs: 'Exportar como...',
    },
    chapter: {
      drafts: 'Rascunhos',
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
      speechRecognition: 'Digitação por Voz',
      actions: 'Ações',
      finder: 'Encontrar Texto',
      swapper: 'Substituir Texto',
    },
    help: {
      doubts: 'Dúvidas',
      support: 'Suporte',
      terms: 'Termos de Uso',
      privacy: 'Política de Privacidade',
    },
    generator: {
      substitutions: 'Substituições',
    },
  },
  window: {
    confirmConfiguration: 'Você quer sair salvando as configurações?',
    saveDropbox: 'Você tem certeza em salvar este arquivo no Dropbox?',
    saveLocal: 'Você tem certeza em salvar este arquivo?',
    deleteChapterPage: 'Você tem certeza em excluir o capítulo atual?',
  },
  text: {
    placeholder: {
      base: `Pressione ou clique com o botão direito para exibir o menu de opções.`,
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
    gen: {
      chapters: 'Capítulos',
      color: 'Esquema de Cor',
      dpi: 'DPI',
    },
    note: {
      title: 'Considerações',
      description: 'Texto',
      bw: 'Documento produzido por',
    },
    externals: {
      generate: {
        title: 'Gerar',
        button: 'Criar',
      },
      preview: {
        title: 'Simular',
        button: 'Criar',
        warning:
          '* O modo Simular não suporta todos os recursos implementados no Better Write. Se não renderizar, opte por Gerar o PDF.',
      },
    },
    inserts: {
      nowOnline:
        'Foi detectado que você tem conexão com a internet, mas as fontes não foram carregadas. Por favor, recarregue a página.',
    },
    theme: {
      title: 'Usar Tema',
      tooltip:
        'Este recurso irá usar o tema atual do projeto e irá ignorar as outras opções do pdf que apliquem coloração.',
    },
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
          'As opções a seguir interferem no acesso do usuário ao PDF. Só interfira na configuração padrão se considerar necessário.',
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
        'Até o momento, a capa inserida com a imagem possui problemas com as margens superiores, definido na seção Página. Recomendamos deixar a margem superior em 0 caso deseja utilizar a capa com imagem.',
      type: 'Habilitar',
      image: 'Usar Imagem',
    },
    base: {
      backgroundColor: {
        title: 'Cor do Fundo',
        tooltip:
          'A Cor do Fundo só sera aplicada se a opção "Usar Tema" estiver desabilitada.',
      },
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
    lineBreak: {
      spacing: 'Espaçamento',
      active: 'Usar Imagem',
      size: 'Tamanho',
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
        lineBreak: 'Quebra de Linha',
      },
      save: 'Salvar',
    },
    configuration: {
      header: {
        content: 'Conteúdo Aqui',
      },
      footer: {
        style: {
          simple: 'Simples',
          counter: 'Contador',
        },
      },
      summary: {
        style: {
          default: 'Padrão',
        },
      },
      alignment: {
        default: 'Padrão',
        justify: 'Justificado',
        left: 'Esquerda',
        center: 'Centro',
        right: 'Direita',
      },
      orientation: {
        portrait: 'Retrato',
        landscape: 'Paisagem',
      },
    },
  },
  aside: {
    resume: 'Resume',
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
      title: 'Lista de Exibição',
      chapters: 'Capítulos',
      actuallyPage: 'Página Atual',
      projectPages: 'Projeto',
      timeline: 'Linha do Tempo',
      schemas: 'Esquemas',
    },
    configuration: {
      title: 'Configuração',
      dark: 'Modo Escuro',
      lang: 'Linguagem',
      draggable: 'Arrastável',
      bars: 'Barras Laterias',
      transition: 'Transições',
      autosave: 'Salvamento Automático Local',
      cloudAutosave: 'Salvamento Automático na Nuvem',
      blocked: 'Tutorial Inicial',
      bottomBar: 'Barra Inferior',
      advanced: 'Avançado',
      language: 'Idioma',
      entity: {
        title: 'Editor',
        insertEntityInParagraphBreakLine:
          'Inserir Parágrafo em quebras de linha',
      },
    },
    entity: {
      delete: 'Deletar',
      up: 'Cima',
      down: 'Baixo',
      switch: 'Trocar',
      add: 'Adicionar',
      image: 'Imagem',
      comments: 'Comentários',
      paragraph: 'Parágrafo',
      customize: 'Texto',
      optionsOn: 'Habilitar',
    },
    project: {
      title: 'Projeto',
      addons: {
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
      blocked: 'Crie ou carregue um projeto.',
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
          schemas: {
            title: 'Anotações',
            description:
              'Crie um projeto somente com recursos para anotações. Recomendado para as tarefas do dia-a-dia.',
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
      prefix: 'Prefixo',
      contents: [
        {
          title: 'Parágrafo',
          tag: 'P',
          content:
            'Insira um paragráfo simples. Por padrão, todos os blocos iniciam como parágrafo.',
        },
        {
          title: 'Título Secundário',
          tag: 'H2',
          content: 'Título secundário.',
        },
        {
          title: 'Título Terciário',
          tag: 'H3',
          content: 'Título terciário.',
        },
        {
          title: 'Quebra de Página',
          tag: 'BP',
          content:
            'Quebra de Página. Os geradores quebrarão automaticamente a página em que estiver inserida.',
        },
        {
          title: 'Quebra de Linha',
          tag: 'LB',
          content:
            'Quebra de Linha. Os geradores quebrarão automaticamente a linha em que estiver inserida.',
        },
        {
          title: 'Imagem',
          tag: 'IM',
          content: 'Imagem. Adicione uma imagem do seu dispositivo ao editor.',
        },
        {
          title: 'Diálogo',
          tag: 'D',
          content:
            'Diálogo. O editor irá inserir o objetivo de diálogo definido. Consulte em Preferências as opções disponíveis deste recurso.',
        },
        {
          title: 'Caixa de Seleção',
          tag: 'CH',
          content:
            'Caixa de Seleção. Os geradores vão renderizar automaticamente a opção da caixa de seleção.',
        },
        {
          title: 'Lista',
          tag: 'LI',
          content:
            'Lista. Os geradores contará automaticamente as listas subsequentes.',
        },
        {
          title: 'Desenho',
          tag: 'T',
          content:
            'Crie ideias a partir dos seus desenhos. Os geradores converterão o desenho para imagem.',
        },
      ],
    },
  },
  pwa: {
    prompt: {
      offlineReady: 'Aplicativo pronto para funcionar offline!',
      newContent: `Novo conteúdo disponível, clique no botão 'Atualizar' para carregar a nova versão.`,
      reload: 'Atualizar',
      close: 'Fechar',
    },
  },
  drafts: {
    active: 'Ativo',
    others: 'Outros',
    chapters: 'Capítulos',
    statistics: {
      characters: 'Caracteres',
      letters: 'Letras',
      paragraph: 'Parágrafos',
      heading: 'Cabeçalhos',
      fixed: 'Itens Fixados',
      longest: 'Maior Conteúdo',
    },
  },
  addons: {
    substitutions: {
      description:
        'Substitui palavras e frases inteiras sem a necessidade de trocá-las uma por uma. Não é recomendável editar ou remover os itens padrões. O gerador substituirá primeiramente as palavras para depois inserir o negrito/itálico.',
      from: 'Substituir',
      to: 'Para',
      italic: 'Itálico',
      bold: 'Negrito',
    },
    corrector: {
      convert: 'Converter',
      removeStartWhitespace: {
        title: 'Remover Espaços do Início',
        description:
          'Todos os espaços em branco no começo do parágrafo serão removidos.',
      },
      removeEndWhitespace: {
        title: 'Remover Espaços do Final',
        description:
          'Todos os espaços em branco no fim do parágrafo serão removidos.',
      },
      insertParagraphEndStop: {
        title: 'Inserir Ponto Final',
        description:
          'Todos os parágrafos terão um ponto final acrescentado se houver necessidade.',
      },
      removeExtraWhitespace: {
        title: 'Remover Múltiplos Espaços em Branco',
        description:
          'Todos os espaços em brancos desnecessários serão removidos.',
      },
      insertDialogEndStop: {
        title: 'Inserir Ponto Final no Diálogo',
        description:
          'Todos os parágrafos terão um ponto final acrescentado no final da segunda ocorrência de diálogo.',
      },
      resetEntityRaw: {
        title: 'Limpar os Itens',
        description: 'Remover o conteúdo interno de todos os itens digitáveis.',
      },
    },
    statistics: {
      global: 'Global',
      characters: 'Caracteres',
      impact: 'Tempo de Leitura Estimado',
      letters: 'Letras',
      words: 'Palavras',
      repeated: 'Palavras Repetidas',
      min: 'Mínimo de Caracteres',
      paragraph: 'Parágrafos',
      heading: 'Cabeçalhos',
      fixed: 'Itens Fixados',
      longest: 'Maior Conteúdo',
    },
  },
  schemas: {
    types: {
      default: {
        target: 'Padrão',
        description: 'Escreva suas anotações da forma que preferir.',
      },
      characters: {
        target: 'Personagens',
        description:
          'Crie um arquivo para cada personagem de sua história e veja o destaque dos parágrafos que eles participam em cada capítulo.',
      },
    },
    create: {
      title: 'Área de Trabalho',
      description:
        'Recursos adicionais que não participam da geração de documentos, servindo como auxiliar para o fluxo de produção e que acompanham toda a sua escrita!',
      name: 'Nome do Item',
      nameItem: 'Anotações',
      prefix: 'Prefixo',
      prefixDescription:
        'Escolha um prefixo que o permitirá referenciar arquivos a qualquer momento.',
      type: 'Estilo de Esquema',
      typeDescription:
        'Escolha um estilo que mais esteja relacionado com o que você busca.',
      button: 'Criar',
      templates: {
        title: 'Um segundo...',
        description:
          'Opcionalmente, você pode escolher um template adicional para começar o seu projeto com o pé direito!',
        button: 'Escolher',
        simple: {
          title: 'Simples',
          description:
            'Inicie com anotações genéricas e construa a sua área de trabalho da forma que preferir!',
        },
        enthusiast: {
          title: 'Literato',
          description:
            'Inicie seu projeto com diversos arquivos preparados para extrair o máximo da sua criatividade!',
        },
      },
    },
    defines: {
      annotations: 'Anotações',
      lore: 'História',
      characters: 'Personagens',
      timeline: 'Linha do Tempo',
    },
    items: {
      file: 'Novo Arquivo',
      folder: 'Nova Pasta',
    },
    theme: {
      placeholder: 'Digite / para abrir comandos...',
      tags: {
        h1: 'Título Primário',
        h2: 'Título Secundário',
        h3: 'Título Terciário',
        bulletList: 'Lista Marcada',
        orderedList: 'Lista Ordenada',
        taskList: 'Lista de Tarefas',
        image: 'Imagem',
        quote: 'Citação',
        table: 'Tabela',
        code: 'Código',
        divider: 'Divisor',
      },
    },
  },
  characters: {
    title: 'Personagens',
    description:
      'Obtenha o controle de palavras específicas no decorrer da escrita.',
    item: {
      addCharacter: 'Adicionar Personagem',
      name: 'Nome',
      nameCase: 'Tipo de Nome',
      nameCaseStrict: 'Estrito',
      nameCaseDefault: 'Padrão',
      nameCaseAll: 'Livre',
      color: 'Cor',
      colorAlpha: 'Opacidade',
      important: 'Sobrescrever',
      disabled: 'Desabilitar',
    },
    data: {
      occurrences: 'Ocorrências',
      averageOccurrences: 'Média de Ocorrências',
    },
  },
  vault: {
    empty: 'O vazio está... vazio.',
  },
  tutorial: {
    buttons: {
      prev: 'Anterior',
      next: 'Próximo',
    },
    pages: {
      1: {
        title: 'Criatividade.',
        description1:
          'Seja bem-vindo(a) ao processador de texto voltado para os entusiastas da escrita.',
        description2:
          'A seguir, confira um tour exclusivo para descobrir e aprender as diversas ferramentas do betterwrite.io!',
        alert: 'Não exibir o tutorial novamente.',
      },
      2: {
        title: 'Modelo Entidade',
        description1:
          'O editor principal foi projetado para possibilitar uma interação individual sobre qualquer elemento, onde cada item inserido não afeta outros elementos no mesmo editor.',
        description2:
          'A grande vantagem desta abordagem é o surgimento de recursos únicos e totalmente personalizáveis.',
        description3:
          'Para interagir com cada item (entidade) pressione ou clique com o botão direito no item em questão ou utilize o atalho de teclado CTRL + (1-9).',
      },
      3: {
        title: 'Grafo Lateral',
        description1:
          'Visualize em tempo real tudo o que acontece no projeto a todo momento.',
        high2: 'Capítulos: ',
        high3: 'Anotações: ',
        description2:
          'Divida seus manuscritos em capítulos sem se preocupar com mudar algo futuramente.',
        description3:
          'Tenha suas anotações em um único lugar e sem interferir no fluxo de exportação do projeto.',
      },
      4: {
        title: 'Barra Superior',
        description1:
          'Acesse com facilidade qualquer ferramenta desejada sem a necessidade de muitos passos desnecessários.',
        high2: 'Arquivo: ',
        high3: 'Exportar: ',
        high4: 'Ferramentas: ',
        high5: 'Vazio: ',
        high6: 'Ajuda: ',
        description2:
          'Confira as principais formas de manipulação do projeto, como criar, salvar, alterar, carregar e consultar.',
        description3:
          'Geradores de arquivo e suas devidas definições. Cada extensão funciona com configurações distintas uma das outras.',
        description4:
          'Recursos de cunho adicional que só tentem a adicionar a sua experiência.',
        description5: 'Armazene seus projetos em um local de fácil acesso.',
        description6: 'Documentação para consultas.',
      },
      5: {
        title: 'Ferramental',
        description1: 'Descubra novas maneiras de manusear seu projeto.',
        high2: 'Rascunhos: ',
        high3: 'Corretor: ',
        high4: 'Atalhos de Inserção: ',
        high5: 'Personagens: ',
        description2:
          'Escreva diversas versões de seu texto sem nenhuma preocupação',
        description3: 'Trate casos específicos em todos os itens.',
        description4:
          'Crie atalhos para inserir palavras ou sentenças recorrentes.',
        description5:
          'Descubra com facilidade o quanto um personagem aparece no texto ou seu impacto no contexto.',
      },
      final: {
        title: 'Explore.',
        description1:
          'Agora desfrute da maneira como preferir e configure da maneira que desejar.',
      },
    },
  },
  presence: {
    beta: 'Esta ferramenta ainda está em fase de desenvolvimento, e resultados inesperados podem acontecer. Lembre-se de salvar o projeto antes de criar ou entrar em uma sala.',
    off: 'Esta sala não está disponível!',
    key: {
      code: 'Code:',
      link: 'Access Link:',
      qrcode: 'QR Code:',
    },
    alert: {
      logoutAccount:
        'Você tem certeza que deseja sair da sua conta? Os dados locais serão perdidos!',
      deleteAccount:
        'Você tem certeza que deseja deletar a sua conta e todos os dados locais e na nuvem? Essa ação é irreversível!',
    },
    type: {
      owner: 'Dono',
      visit: 'Visitante',
      collaborator: 'Colaborador',
      description: {
        visit:
          'Visitante: Todos os usuários que entrarem na sala podem apenas visualizar o projeto.',
        collaborator:
          'Colaborador: Todos os usuários que entrarem na sala podem alterar os dados do projeto em tempo real, como manter uma cópia do projeto para si.',
      },
    },
    bar: {
      liveshare: 'Compartilhando...',
    },
    create: {
      title: 'Compartilhamento',
      description:
        'Compartilhe o seu projeto com outras pessoas, em tempo real, para construírem uma experiência em conjunto!',
      button: 'Criar Sala',
      key: 'Código Gerado:',
      or: 'Ou',
      new: 'Crie uma sala:',
      enterInput: 'Entre em uma sala:',
      enterPlaceholder: 'vCAQe6FD3D...',
    },
    info: {
      enter: 'Entrar',
      create: 'Criar',
      title: 'Sala Compartilhada',
      leave: 'Sair da Sala',
    },
  },
}
