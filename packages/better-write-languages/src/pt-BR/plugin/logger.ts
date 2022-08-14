export default {
  on: {
    dropbox: {
      save: {
        success: 'SALVO NO DROPBOX COM SUCESSO!',
        error: 'NÃO FOI POSSÍVEL SALVAR NO DROPBOX!',
      },
    },
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
}
