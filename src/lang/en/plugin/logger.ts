export default {
  on: {
    entity: {
      inputFirst: '<{arguments}> INSERT IN EDITOR AT {index} POSITION',
      edit: 'POSITION {index} UPDATED FOR <{arguments}>',
      delete: 'POSITION {index} HAS BEEN DELETED!',
      swap: 'POSITION {index} EXCHANGED WITH {destination}',
    },
  },
}
