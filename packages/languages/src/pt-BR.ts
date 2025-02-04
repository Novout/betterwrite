export default {
  editor: {
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
    cloud: {
      limitProjectSize:
        'Excedeu o limite máximo do projeto na nuvem ({limit}MB)! Escolha salvar localmente (.bw) ou em um dos provedores suportados (Dropbox) para não perder o projeto!',
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
        title: 'Dropbox',
        connect: 'Conectar',
        save: 'Salvar no Dropbox',
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
        schemas: 'Área de Trabalho',
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
        topBar: 'Barra Superior',
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
            content:
              'Imagem. Adicione uma imagem do seu dispositivo ao editor.',
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
        sentences: 'Sentenças',
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
          description:
            'Remover o conteúdo interno de todos os itens digitáveis.',
        },
      },
      statistics: {
        global: 'Global',
        characters: 'Caracteres',
        impact: 'Tempo de Leitura Estimado',
        letters: 'Letras',
        sentences: 'Sentenças',
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
      icon: {
        import: 'Importe uma Imagem',
        or: 'ou...',
      },
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
          high6: '',
          description2:
            'Escreva diversas versões de seu texto sem nenhuma preocupação',
          description3: 'Trate casos específicos em todos os itens.',
          description4:
            'Crie atalhos para inserir palavras ou sentenças recorrentes.',
          description5:
            'Descubra com facilidade o quanto um personagem aparece no texto ou seu impacto no contexto.',
          description6: ''
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
  },
  generator: {
    flow: {
      title: 'Fluxo',
      tooltip: 'Controle a linha de produção do seu documento.',
      item: {
        annotation: 'Anotações',
        content: 'Conteúdo',
        'break-page': 'Quebra de Página',
        bw: `Marca d'Água`,
        tooltip: {
          annotation: 'Texto adicional',
          content:
            'O conteúdo original do seu livro/anotação rápida. Não pode ser removido.',
          'break-page': 'Quebra de Página',
          bw: `Não pode ser removido.`,
        },
      },
    },
    block: {
      paragraph: 'Parágrafo',
      headingOne: 'Título Primário',
      headingTwo: 'Título Secundário',
      headingThree: 'Título Terciário',
      fontSize: 'Tamanho do Texto',
      fontColor: 'Cor do Texto',
      bold: 'Negrito',
      italics: 'Itálico',
      alignment: {
        title: 'Alinhamento',
        both: 'Justificado',
        left: 'Esquerda',
        center: 'Centro',
        right: 'Direita',
      },
      indent: 'Indentação',
      margin: {
        title: 'Margem',
        top: 'Cima',
        bottom: 'Baixo',
      },
    },
    generics: {
      settings: 'Definições',
    },
  },
  toast: {
    generics: {
      load: 'Aguarde um momento...',
      error: 'Um erro inesperado ocorreu :(',
      supported: 'O seu navegador não suporta este recurso :(',
      cancel: 'A ação foi cancelada!',
      copy: 'Copiado com sucesso!',
      limit: 'O limite foi atingido!',
      configurationFail: 'A configuração importada nao é válida!',
      invalidName: 'O nome está vazio ou já existe!',
      successAdded: 'Adicionado com Sucesso!',
      successUpdated: 'Atualizado com Sucesso!',
      successCreated: 'Criado com Sucesso!',
      successSet: 'Definido com Sucesso!',
      successChanged: 'Alterado com Sucesso!',
      successRestarted: 'Reiniciado com Sucesso!',
      successRemoved: 'Removido com Sucesso!',
      loginError: 'Ocorreu um erro ao entrar na conta!',
      registerError: 'Ocorreu um erro ao criar uma conta nova!',
      onlyOnline:
        'Voce está sem acesso à internet para conseguir acessar este recurso!',
      fileDelete: 'Você tem certeza que deseja deletar o arquivo?',
    },
    storage: {
      limitError:
        'ATENÇÃO! O aplicativo suporta até 10MB de cada projeto armazenado localmente. Recomendamos que salve este projeto externamente (.bw) ou no vazio!',
    },
    epub: {
      disabled: 'O gerador de .EPUB está temporariamente desabilitado :(',
    },
    pdf: {
      error: 'Não foi possível gerar o pdf.',
      configuration: {
        save: 'Configurações salvas com sucesso!',
      },
      create: 'PDF Baixado com Sucesso!',
      preview: 'Preview do PDF executado com sucesso!',
      generate: {
        empty: 'Selecione pelo menos um capítulo!',
      },
      previewProblems:
        'Certas features não irão aparecer no preview para evitar problemas de desempenho.',
    },
    project: {
      createAlert:
        'Você tem certeza que deseja criar um novo projeto? Você perderá todos os dados que não forem salvos na nuvem.',
      deleteAlert:
        'Você tem certeza que deseja deletar o projeto? Esta ação é irreversível!',
      deleteProject:
        'Você tem certeza que deseja carregar um novo projeto? Todos os dados locais serão perdidos.',
      import: 'Deseja carregar o projeto {name}?',
      create: 'Projeto criado com sucesso!',
      load: 'Projeto carregado com sucesso!',
      save: 'Projeto salvo com sucesso!',
      error: 'Não foi possível carregar ou salvar o projeto :(',
      export: 'Projeto exportado para a extensão (.bw) com sucesso!',
      unsupportedExtension: 'Esta extensão não é suportada por Better Write!',
      delete: 'Projeto deletado com sucesso!',
      docx: {
        generate: 'DOCX Baixado com Sucesso!',
      },
      txt: {
        generate: 'TXT Baixado com Sucesso!',
      },
      epub: {
        generate: 'EPUB Baixado com Sucesso!',
      },
      html: {
        generate: 'HTML Baixado com Sucesso!',
      },
      md: {
        generate: 'Markdown Baixado com Sucesso!',
      },
      schemas: {
        fileDelete: 'Você tem certeza que deseja deletar o arquivo?',
        folderDelete: 'Você tem certeza que deseja deletar a pasta?',
        schemaDelete: 'Você tem certeza que deseja deletar esta seção?',
      },
    },
    dropbox: {
      load: 'Conectado com o Dropbox!',
      save: 'Salvo no Dropbox em Aplicativos > Better Write',
      empty: 'Não foi encontrado nenhum projeto válido :(',
    },
    entity: {
      paragraph: {
        generator: {
          empty: 'Insira um nome para salvar o estilo!',
          exists: 'O nome do estilo já existe!',
        },
      },
      image: {
        errorLoad:
          'betterwrite.io não teve permissão para carregar a imagem em questão.',
      },
    },
    speech: {
      microphone: 'Nenhum microfone foi reconhecido pelo sistema!',
    },
    store: {
      contextWarning:
        'O identificador do capítulo não foi encontrado! Verifique se o arquivo carregado é válido!',
    },
    corrector: {
      apply: 'Corretor aplicado com sucesso!',
    },
    material: {
      number: {
        positive: 'Não é permitido números maiores que {number}!',
        negative: 'Não é permitido números menores que {number}!',
      },
    },
    image: {
      warningLimitFileSize:
        'Não é recomendado usar imagens acima de {limit}MB!',
      limitFileSize:
        'Excedeu o limite máximo de tamanho do arquivo ({limit}MB)!',
    },
  },
  landing: {
    loading: 'Aguarde um momento...',
    auth: {
      email: 'Insira um email válido!',
      emailPlaceholder: 'Email...',
      password: 'A senha precisa ter pelo menos 6 caracteres!',
      passwordPlaceholder: 'Senha...',
      termsError: 'Aceite os Termos de Uso!',
      verification: 'Código de Acesso enviado para o seu email!',
      integration: 'ou entre com sua conta do...',
      enter: 'Entrar',
      register: 'Registrar',
      createAccount: 'Criar Conta',
      privacy: {
        and: ' e concordo com a ',
        text: 'Política de Privacidade',
      },
      terms: {
        text: 'Eu aceito os ',
        link: 'Termos de Uso',
      },
    },
    first: {
      title: 'Editor para escritores criativos.',
      typical: {
        1: 'Crie como quiser, para o que quiser.',
        2: 'Todas as ferramentas em umunic',
        3: 'Todas as ferramentas em um único lugar.',
        4: 'Use a criatividade da melhor forma.',
      },
      editor: {
        website: 'Entrar',
        about: 'Saiba Mais!',
      },
      support: 'Acompanhe o projeto de perto!',
      paragraphs: [
        `      — Entre o relento e o desespero, sobrevivi.`,
        `      É possível observar uma casa modesta ao
  final da estrada, interrompendo a passagem para
  todos os tipos de locomoção.`,
        `      — Não! Não! NÃO!`,
        `      — Desculpe-me pela arrogância, podê-lo-ei 
  retribuir satisfatoriamente em outras circunstâncias.`,
        `      O que nos resta acabará por romper o futuro promissor.`,
        `      O imbróglio não pode ser resolvido. A 
  complacência dos envolvidos na discussão foi dissolvida
  pelo puro ódio individualista.`,
        `Comecei a palrar,
  Sufocando o desprovido,
  Aprendi a falhar,
  Compreendendo o improviso,
  Sustentei a salvar,
  Desfalecendo no auspício.`,
        `      Escrever melhor ou melhor escrever?`,
        `      A criatividade é a salvação para o ostracismo do cotidiano.`,
        `      — Música para meus ouvidos! Uníssono da vitória!`,
        `      — A passagem está logo ali! Vamos!`,
        `      Kino apareceu na fresta, de relance, mais que o suficiente 
  para Linea aceitar a perda.`,
        `No último esforço,
  Percebi a insolência,
  Insistindo no amor doloroso,
  Aceitei a dormência.`,
        `      Clima tenso. Correndo contra tudo, a virtude não teve dúvidas
  de quem realmente está do lado certo.`,
        `      — Aparentemente, está vazio. Cadê... tudo?`,
        `      A chave foi inserida.
        Nada acontece.
        Pullio percebe que a chave está invertida.
        A porta abre.`,
        `      — Enganação... quem esgana quem?`,
        `      — Positividade sempre.`,
        `      — Questionar é a melhor forma de nivelar e
  transparecer o pensamento.`,
        `      Foi observado diversas alternativas para
  a resolução do problema. Ele não observou.`,
        `      — A visão é um descaso para a luta. Duelo é 
  um universo a parte.`,
        `      Revelando a área coberta do palácio, o
  silêncio continuou reinando no ambiente.`,
      ],
    },
  },
  about: {
    initial: {
      title: 'Expanda seus horizontes.',
      description:
        'betterwrite.io foi projetado para extrair o máximo possível da criatividade de escritores e dos entusiastas da escrita.',
      list: {
        1: 'Customização: Deixe o editor com a sua cara, sem que isso interfira em seus documentos.',
        2: 'Ferramentas: Explore uma gama de possibilidades que contribuirão diretamente ao seu projeto.',
        3: 'O Vazio: Salve seus projetos na nuvem e os manuseie com facilidade.',
        4: 'Portabilidade: Leve o seu editor favorito para qualquer lugar.',
      },
    },
    entity: {
      title: 'Controle absolutamente tudo.',
      description:
        'Insira títulos, parágrafos, quebras de linha, quebras de página, listas, caixas de seleção, imagens e desenhos separadamente.',
      bw: 'Better Write',
      canvas: 'Outros',
    },
    powered: {
      title: 'Construído com...',
    },
    portability: {
      title: 'Crie como quiser, para o que quiser.',
      description:
        'Converta seus projetos de outras ferramentas e transforme-os como preferir.',
    },
    finish: {
      title1: 'Explore.',
      title2: 'Descubra.',
      title3: 'Transforme.',
    },
  },
  seo: {
    landing: {
      title: 'Better Write',
      description:
        'Better Write é um processador de texto para escritores criativos. Crie como quiser, para o que quiser.',
      alt: 'Logo da aplicação betterwrite.io',
    },
    editor: {
      title: 'Better Write - Editor',
      description:
        'Better Write é um processador de texto para escritores criativos. Crie como quiser, para o que quiser.',
      alt: 'Logo da aplicação betterwrite.io',
    },
    '404': {
      title: 'Better Write - 404 :(',
      description:
        'Better Write é um processador de texto para escritores criativos. Crie como quiser, para o que quiser.',
      alt: 'Logo da aplicação betterwrite.io',
    },
  },
  plans: {
    title: 'Alavanque seus projetos.',
    description: 'Suba de nível e descubra a sua criatividade.',
    month: 'Mês',
    new: 'Ver mais',
    beginner: {
      name: 'Iniciante',
      price: 'R$0',
      description: 'Tudo o que você precisa para começar a jornada.',
      features: [
        {
          status: 'yes',
          description: 'Projetos Ilimitados',
        },
        {
          status: 'meh',
          description: '2MB de Armazenamento',
        },
        {
          status: 'yes',
          description: 'Ferramentas',
        },
        {
          status: 'meh',
          description: 'Gerador (PDF / DOCX / TXT)',
        },
        {
          status: 'meh',
          description: 'Dropbox e Google Drive',
        },
        {
          status: 'no',
          description: 'Suporte',
        },
      ],
    },
    intermediate: {
      name: 'Entusiasta',
      price: 'R$8',
      description: 'Perfeito para explorar a liberdade.',
      features: [
        {
          status: 'yes',
          description: 'Projetos Ilimitados',
        },
        {
          status: 'meh',
          description: '50MB de Armazenamento',
        },
        {
          status: 'yes',
          description: 'Ferramentas',
        },
        {
          status: 'yes',
          description: 'Gerador (PDF / DOCX / TXT)',
        },
        {
          status: 'yes',
          description: 'Dropbox e Google Drive',
        },
        {
          status: 'no',
          description: 'Suporte',
        },
      ],
    },
    advanced: {
      name: 'Literato',
      price: 'R$20',
      description: 'Eleve seus livros a um novo patamar.',
      features: [
        {
          status: 'yes',
          description: 'Projetos Ilimitados',
        },
        {
          status: 'meh',
          description: '200MB de Armazenamento',
        },
        {
          status: 'yes',
          description: 'Ferramentas',
        },
        {
          status: 'yes',
          description: 'Gerador (PDF / DOCX / TXT)',
        },
        {
          status: 'yes',
          description: 'Dropbox e Google Drive',
        },
        {
          status: 'yes',
          description: 'Suporte',
        },
      ],
    },
  },
  questions: {
    default: {
      description:
        'Confira a seguir diversas respostas a perguntas comuns sobre o betterwrite.io:',
    },
    navigatorSupport: {
      title: 'Quais navegadores são suportados?',
      description:
        'betterwrite.io depende de certos recursos que não são suportados por todos os navegadores. Confira a seguir os navegadores recomendados:',
    },
    generatorSupport: {
      title: 'Por quê os geradores não possuem o mesmo suporte do (.PDF)?',
      description:
        'betterwrite.io foi exclusivamente planejado para exportar .pdf, mas trouxe novos recursos ao decorrer do desenvolvimento. Com isso, outras extensões não conseguem suportar recursos específicos, seja pela limitação da extensão ou pela falta de adaptação requisitada. Confira a seguir a tabela de recursos suportados por cada extensão.',
      items: {
        paragraph: 'Parágrafo',
        customParagraph: 'Parágrafo Customizado',
        italicAndBold: 'Itálico e Negrito',
        headings: 'Títulos',
        breakLine: 'Quebra de Linha',
        breakPage: 'Quebra de Página',
        image: 'Imagem',
        list: 'Lista',
        checkbox: 'Caixa de Seleção',
        header: 'Cabeçalho',
        summary: 'Sumário',
        footer: 'Rodapé',
      },
    },
    generatorRecommendations: {
      title: 'Qual configuração devo exportar os meus documentos?',
      description:
        'Por padrão, o aplicativo exporta nas configurações recomendadas de formado em todas as extensões que disponibiliza. Por exemplo, a extensão PDF exporta documentos em CYMK / 300dpi, ou seja, já pronto para a impressão. Recomendamos que pesquise sobre a extensão em específico caso queira alterar alguma das opções padrões.',
    },
    futureFeatures: {
      title:
        'A onde posso encontrar ou sugerir futuros recursos e modificações?',
      description:
        'betterwrite.io é um projeto de código aberto, onde sugestões, criticas e a denúncia de problemas podem serem encontradas ',
      clickHere: 'clicando aqui.',
    },
    releasePlanning: {
      title: 'Quando o aplicativo será lançado oficialmente?',
      description:
        'betterwrite.io pretende oficializar a versão 1.0 no primeiro semestre de 2023.',
    },
    importProjects: {
      title: 'Quais projetos posso trazer para aqui?',
      description:
        'O aplicativo suporta a importação de projetos com a extensão .bw, .doc, .docx e .txt. Até o momento, não possui nenhum planejamento para oferecer o suporte direto de importação de projetos do Google Docs, Microsoft Word, Overleaf ou qualquer outra ferramenta similar.',
    },
  },
  plugin: {
    logger: {
      console: {
        start:
          'Ola! Bem, se você sabe mexer nisso daqui, acredito que posso pedir a sua ajuda em',
      },
      on: {
        entity: {
          inputFirst: '<{arguments}> INSERIDO NA <{index}> POSIÇÃO.',
          createEmpty: 'NOVA LINHA FOI ADICIONADA EM <{index}>!',
          create: '<{data}> FOI INSERIDO NA <{index}> POSIÇÃO.',
          edit: 'POSIÇÃO <{index}> ATUALIZADO PARA <{arguments}>.',
          delete: 'A POSIÇÃO <{index}> FOI DELETADA!',
          swap: 'POSIÇÃO <{index}>  TROCADA COM A POSIÇÃO <{target}>.',
          break: '<{data}> ENVIADO PARA A POSIÇÃO <{index}>.',
          alter: 'A POSIÇÃO <{index}> MUDOU O ESTILO PARA <{data}>',
          paste:
            'A PARTIR DA POSIÇÃO <{index}> FOI ADICIONADO <{quantity}> ITEM(S)',
        },
        project: {
          new: 'PÁGINA DE NÚMERO <{index}> CRIADA!',
          delete: 'PÁGINA <{index}> FOI DELETADA',
          swap: 'PÁGINA <{index}> FOI TROCADA COM A DE POSIÇÃO <{target}>.',
          autosave: 'PROJETO SALVO AUTOMATICAMENTE COM SUCESSO!',
        },
        creative: {
          drafts: {
            set: 'PÁGINA <{name}> FOI ATIVADA!',
            create: 'PÁGINA <{name}> ADICIONADA COMO RASCUNHO!',
            delete: 'PÁGINA <{name}> FOI DELETADA!',
            update: 'PÁGINA <{name}> FOI ATUALIZADA!',
            reset: 'PÁGINA <{name}> FOI LIMPA!',
          },
        },
      },
      normalize: {
        image: 'IMAGEM',
        pageBreak: 'QUEBRA DE PÁGINA',
        lineBreak: 'QUEBRA DE LINHA',
      },
    },
    sentry: {
      errorWidget: {
        title: 'Parece que estamos com problemas.',
        subtitle: 'Nossa equipe foi avisada.',
        subtitle2: 'Se você quiser ajudar, conte-nos o que aconteceu abaixo.',
        labelName: 'Nome',
        labelEmail: 'Email',
        labelComments: 'O que aconteceu?',
        labelClose: 'Fechar',
        labelSubmit: 'Enviar',
        errorGeneric:
          'Ocorreu um erro desconhecido ao enviar seu relatório. Por favor, tente novamente.',
        errorFormEntry:
          'Alguns campos eram inválidos. Corrija os erros e tente novamente.',
        successMessage: 'Seu feedback foi enviado. Obrigada!',
      },
    },
  },
  generics: {
    input: {
      image: 'Inserir Imagem',
    },
  },
}
