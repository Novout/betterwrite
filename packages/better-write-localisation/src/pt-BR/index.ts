import editor from './editor'
import toast from './toast'
import landing from './landing'
import seo from './seo'
import dashboard from './dashboard'
import questions from './questions'
import plans from './plans'
import logger from './plugin/logger'

export default {
  editor,
  toast,
  landing,
  seo,
  dashboard,
  plans,
  questions,
  plugin: {
    logger,
  },
  generics: {
    input: {
      image: 'Inserir Imagem',
    },
  },
}
