import { createStore } from 'vuex'
import context from '@/store/module/context'
import editor from '@/store/module/editor'
import project from '@/store/module/project'
import absolute from '@/store/module/absolute'
import shortcuts from '@/store/module/shortcuts'
import logger from '@/store/module/logger'

export default createStore({
  modules: {
    context,
    editor,
    project,
    absolute,
    shortcuts,
    logger,
  },
})
