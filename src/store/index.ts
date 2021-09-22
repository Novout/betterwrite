import { createStore } from 'vuex'
import context from '@/store/module/context'
import editor from '@/store/module/editor'
import project from '@/store/module/project'

export default createStore({
  modules: {
    context,
    editor,
    project,
  },
})
