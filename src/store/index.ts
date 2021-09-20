import { createStore } from 'vuex'
import context from '@/store/module/context'
import editor from '@/store/module/editor'

export default createStore({
  modules: {
    context,
    editor,
  },
})
