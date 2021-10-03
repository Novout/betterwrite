import { createStore } from 'vuex'
import context from '@/store/module/context'
import editor from '@/store/module/editor'
import project from '@/store/module/project'
import absolute from '@/store/module/absolute'
import shortcuts from '@/store/module/shortcuts'
import logger from '@/store/module/logger'
import pdf from '@/store/module/pdf'
import auth from '@/store/module/auth'

export default createStore({
  modules: {
    context,
    editor,
    project,
    absolute,
    shortcuts,
    logger,
    pdf,
    auth,
  },
})
