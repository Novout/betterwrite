import { setPDFI18n } from 'better-write-plugin-exporter-pdf'

export default {
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
    help: 'Ajuda',
    live: 'Compartilhar',
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
      theme: 'Tema',
      editor: {
        options: {
          googleFonts: {
            title: 'Fontes do Google API',
            description:
              'Habilitar a utilização de fontes externas no editor. Depende da conexão com a internet. Não afeta as requisições dos geradores de arquivo.',
          },
        },
        background: {
          title: 'Fundo',
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
      new: 'Novo',
      blank: 'Anotação Rápida',
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
    },
    generator: {
      substitutions: 'Substituições',
    },
    live: {
      enter: 'Entrar',
      create: 'Criar Sala',
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
  pdf: setPDFI18n().br(),
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
      annotations: 'Anotações',
    },
    configuration: {
      title: 'Configuração',
      dark: 'Modo Escuro',
      lang: 'Linguagem',
      draggable: 'Arrastável',
      bars: 'Barras Laterias',
      transition: 'Transições',
      autosave: 'Salvamento Automático',
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
  annotations: {
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
    },
    data: {
      occurrences: 'Ocorrências',
      averageOccurrences: 'Média de Ocorrências',
    },
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
        high5: 'Ajuda: ',
        description2:
          'Confira as principais formas de manipulação do projeto, como criar, salvar, alterar, carregar e consultar.',
        description3:
          'Geradores de arquivo e suas devidas definições. Cada extensão funciona com configurações distintas uma das outras.',
        description4:
          'Recursos de cunho adicional que só tentem a adicionar a sua experiência.',
        description5: 'Documentação para consultas.',
      },
    },
  },
}
