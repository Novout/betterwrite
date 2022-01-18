import editor from './editor'
import toast from './toast'
import landing from './landing'
import seo from './seo'
import dashboard from './dashboard'
import logger from './plugin/logger'

export default {
  editor,
  toast,
  landing,
  seo,
  dashboard,
  plugin: {
    logger,
  },
  generics: {
    input: {
      image: 'Insert Image',
    },
  },
}
