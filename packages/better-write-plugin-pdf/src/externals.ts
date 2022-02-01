export const setPDFI18n = () => {
  const br = () => {
    return {
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
        type: 'Imagem',
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
    }
  }

  const en = () => {
    return {
      inserts: {
        nowOnline:
          'It was detected that you have an internet connection, but the fonts were not loaded. Please reload the page.',
      },
      theme: {
        title: 'Use Theme',
        tooltip:
          'This feature will use the current design theme and ignore the other pdf options that apply coloring.',
      },
      project: {
        title: 'Document',
        encryption: {
          title: 'Encryption',
          user: 'User Password',
          owner: 'Owner Password',
        },
        permissions: {
          title: 'Permissions',
          printing: 'Print',
          modifying: 'Modify',
          copying: 'Copy',
          annotating: 'Write',
          fillingForms: 'Subscribe / Fill in',
          contentAccessibility: 'Content Accessibility',
          documentAssembly: 'Mounting',
        },
        tooltip: {
          title: `The following options interfere with the user's access to the PDF. Only interfere with the default configuration if you feel it is necessary.`,
          permissions: {
            printing: 'Print',
            modifying: 'Modify',
            copying: 'Copy',
            annotating: 'Write',
            fillingForms: 'Subscribe / Fill in',
            contentAccessibility: 'Content Accessibility',
            documentAssembly: 'Mounting',
          },
        },
      },
      cover: {
        tooltip:
          ' So far, the cover inserted with image has problems with the top margin, defined in Page. We recommend leaving the top margin at 0 if you want to use the cover with image feature.',
        type: 'Image',
      },
      base: {
        backgroundColor: {
          title: 'Background Color',
          tooltip:
            'The Background Color will only be applied if the "Use Theme" option is disabled.',
        },
        tooltip:
          'Page features can change drastically up to v1.x version of BetterWrite.',
        title: 'Page',
        pageSize: 'Size',
        pageOrientation: 'Orientations',
        pageMargins: {
          title: 'Margins',
          left: 'Left',
          top: 'Top',
          right: 'Right',
          bottom: 'Bottom',
        },
        footer: {
          title: 'Footer',
          exists: 'On',
          start: 'Initial',
          alignment: 'Alignment',
          size: 'Size',
          type: 'Style',
          fontFamily: 'Font',
        },
        header: {
          title: 'Footer',
          content: 'Content',
          exists: 'On',
          start: 'Initial',
          alignment: 'Alignment',
          size: 'Size',
          type: 'Style',
          fontFamily: 'Font',
        },
        summary: {
          title: 'Sumário',
          type: 'Estilo',
          fontSize: 'Tamanho',
          fontFamily: 'Fonte',
        },
      },
      lineBreak: {
        spacing: 'Spacing',
        active: 'Use Image',
        size: 'Size',
      },
      custom: {
        image: {
          height: 'Height',
          width: 'Width',
          alignment: 'Alignment',
        },
        title: {
          cover: 'Cover',
          paragraph: 'Paragraph',
          headingOne: 'Heading One',
          headingTwo: 'Heading Two',
          headingThree: 'Heading Three',
        },
        generics: {
          font: 'Font',
          fontSize: 'Font Size',
          lineHeight: 'Line Height',
          indent: 'Indent',
          bold: 'Bold',
          italics: 'Italic',
          alignment: 'Alignment',
          characterSpacing: 'Character-Spacing',
          color: 'Text Color',
          background: 'Text Background',
          markerColor: 'Marker Color',
          decoration: 'Decoration',
          decorationStyle: 'Decoration Style',
          decorationColor: 'Decoration Color',
          breakPage: 'Break Page',
          lineBreak: 'Line Break',
        },
        save: 'Save',
      },
      configuration: {
        header: {
          content: 'Content Here',
        },
        footer: {
          style: {
            simple: 'Simple',
            counter: 'Counter',
          },
        },
        summary: {
          style: {
            default: 'Default',
          },
        },
        alignment: {
          default: 'Default',
          justify: 'Justify',
          left: 'Left',
          center: 'Center',
          right: 'Right',
        },
        orientation: {
          portrait: 'Portrait',
          landscape: 'Landscape',
        },
      },
    }
  }

  return { br, en }
}
