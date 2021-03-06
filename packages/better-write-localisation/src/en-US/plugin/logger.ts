export default {
  on: {
    dropbox: {
      save: {
        success: 'SUCCESSFULLY SAVED IN DROPBOX!',
        error: 'UNABLE TO SAVE TO DROPBOX!',
      },
    },
    entity: {
      inputFirst: '<{arguments}> INSERTED IN <{index}>  POSITION.',
      create: '<{data}> HAS BEEN INSERTED IN THE <{index}> POSITION.',
      createEmpty: 'NEW LINE HAS BEEN ADDED IN <{index}>!',
      edit: 'POSITION <{index}>  UPDATED TO <{arguments}>.',
      delete: 'POSITION <{index}>  HAS BEEN DELETED!',
      swap: 'POSITION <{index}>  EXCHANGED WITH POSITION {destination}.',
      break: '<{data}> SENT TO POSITION <{index}>.',
      alter: 'THE POSITION <{index}> HAS STYLE CHANGED TO <{data}>',
      paste: 'FROM THE POSITION <{index}> IT WAS ADDED <{quantity}> ITEM(S)',
    },
    project: {
      new: 'PAGE NUMBER <{index}> CREATED!',
      delete: 'PAGE <{index}> HAS BEEN DELETED',
      swap: 'PAGE <{index}>  HAS BEEN CHANGED WITH POSITION {target}.',
      autosave: 'PROJECT AUTOMATICALLY SAVED SUCCESSFUL!',
    },
    creative: {
      drafts: {
        set: 'PAGE <{name}> HAS BEEN ACTIVATED!',
        create: 'PAGE <{name}> ADDED AS DRAFT!',
        delete: 'PAGE <{name}> HAS BEEN DELETED!',
        update: 'PAGE <{name}> HAS BEEN UPDATED!',
        reset: 'PAGE <{name}> HAS BEEN CLEANED!',
      },
    },
  },
  normalize: {
    image: 'IMAGE',
    pageBreak: 'PAGE BREAK',
    lineBreak: 'LINE BREAK',
  },
}
