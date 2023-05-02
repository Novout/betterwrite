export default {
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
    annotations: {
      fileDelete: 'Você tem certeza que deseja deletar o arquivo?',
      folderDelete: 'Você tem certeza que deseja deletar a pasta?',
    },
  },
  dropbox: {
    load: 'Conectado com o Dropbox!',
    save: 'Salvo no Dropbox em Aplicativos > Better Write',
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
    warningLimitFileSize: 'Não é recomendado usar imagens acima de {limit}MB!',
    limitFileSize: 'Excedeu o limite máximo de tamanho do arquivo ({limit}MB)!',
  },
}