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
      create: '<{data}> FOI INSERIDO NA <{index}> POSIÇÃO.',
      edit: 'POSIÇÃO <{index}>  ATUALIZADO PARA <{arguments}>.',
      delete: 'A POSIÇÃO <{index}>  FOI DELETADA!',
      swap: 'POSIÇÃO <{index}>  TROCADA COM A POSIÇÃO <{target}>.',
      break: '<{data}> ENVIADO PARA A POSIÇÃO <{index}>.',
      alter: 'A POSIÇÃO <{index}> MUDOU O ESTILO PARA <{data}>',
    },
    project: {
      new: 'PÁGINA DE NÚMERO <{index}>  CRIADA!',
      delete: 'PÁGINA <{index}>  FOI DELETADA',
      swap: 'PÁGINA <{index}>  FOI TROCADA COM A DE POSIÇÃO <{target}>.',
      autosave: 'PROJETO SALVO AUTOMATICAMENTE COM SUCESSO!',
    },
  },
  normalize: {
    image: 'IMAGEM',
    pageBreak: 'QUEBRA DE PÁGINA',
    lineBreak: 'QUEBRA DE LINHA',
  },
}
