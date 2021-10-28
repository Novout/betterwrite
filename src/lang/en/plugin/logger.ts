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
      edit: 'POSITION <{index}>  UPDATED TO <{arguments}>.',
      delete: 'POSITION <{index}>  HAS BEEN DELETED!',
      swap: 'POSITION <{index}>  EXCHANGED WITH POSITION {destination}.',
    },
    project: {
      new: 'PAGE NUMBER <{index}> CREATED!',
      delete: 'PAGE <{index}> HAS BEEN DELETED',
      swap: 'PAGE <{index}>  HAS BEEN CHANGED WITH POSITION {target}.',
      autosave: 'PROJECT AUTOMATICALLY SAVED SUCCESSFUL!',
    },
  },
}
