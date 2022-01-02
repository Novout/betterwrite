import editor from './editor'
import toast from './toast'
import landing from './landing'
import seo from './seo'
import logger from './plugin/logger'

export default {
  editor,
  toast,
  landing,
  seo,
  plugin: {
    logger,
  },
  generics: {
    input: {
      image: 'Inserir Imagem',
    },
  },
}
