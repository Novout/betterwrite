export default {
  on: {
    entity: {
      inputFirst: '<{arguments}> INSERTED IN {index} POSITION.',
      edit: 'POSITION {index} UPDATED TO <{arguments}>.',
      delete: 'POSITION {index} HAS BEEN DELETED!',
      swap: 'POSITION {index} EXCHANGED WITH POSITION {destination}.',
    },
    project: {
      new: 'PAGE {index} CREATED!',
      delete: 'PAGE {index} HAS BEEN DELETED',
      swap: 'PAGE {index} HAS BEEN CHANGED WITH POSITION {target}.',
    },
  },
}
