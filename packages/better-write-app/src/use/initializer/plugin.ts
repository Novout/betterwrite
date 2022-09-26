import { PluginTypes } from 'better-write-types'
import { useExternalsStore } from '@/store/externals'
import { useSubstitution } from '../tools/substitution'
import { useToast } from 'vue-toastification'
import { useBreakpoint } from '../breakpoint'
import { useDOCXStore } from '@/store/docx'
import { useTransformer } from '../generator/transformer'
import { useNProgress } from '@vueuse/integrations/useNProgress'
import { useFormat } from '../format'
import { useEnv } from '../env'
import { useAuthStore } from '@/store/auth'
import { useAbsoluteStore } from '@/store/absolute'
import { useContextStore } from '@/store/context'
import { useEditorStore } from '@/store/editor'
import { usePDFStore } from '@/store/pdf'
import { useProjectStore } from '@/store/project'
import { useCore, usePlugin } from 'better-write-plugin-core'
import { useLocalStorage } from '../storage/local'
import { useStorage } from '../storage/storage'
import { useCreativeType } from '../type/creative'
import { useDefines } from '../defines'
import { useEditor } from '../editor'
import { useEntity } from '../entity'
import { useFactory } from '../factory'
import { useGraph } from '../graph'
import { useInput } from '../input'
import { usePage } from '../page'
import { usePopulate } from '../populate'
import { useProject } from '../project'
import { useRaw } from '../raw'
import { useScroll } from '../scroll'
import { useUtils } from '../utils'
import { useI18n } from 'vue-i18n'
import * as VUEUSE_CORE from '@vueuse/core'
import useEmitter from '../emitter'

export const usePluginInitializer = () => {
  const core = useCore()

  const init = async (plugins: PluginTypes.Plugins) => {
    await core.start(
      {
        ABSOLUTE: useAbsoluteStore(),
        AUTH: useAuthStore(),
        CONTEXT: useContextStore(),
        EDITOR: useEditorStore(),
        PDF: usePDFStore(),
        DOCX: useDOCXStore(),
        PROJECT: useProjectStore(),
        EXTERNALS: useExternalsStore(),
      } as any,
      plugins,
      {
        local: useLocalStorage(),
        storage: useStorage(),
        creative: useCreativeType(),
        defines: useDefines(),
        editor: useEditor(),
        entity: useEntity(),
        env: useEnv(),
        factory: useFactory(),
        format: useFormat(),
        graph: useGraph(),
        input: useInput(),
        page: usePage(),
        populate: usePopulate(),
        project: useProject(),
        raw: useRaw(),
        scroll: useScroll(),
        utils: useUtils(),
        i18n: useI18n(),
        emitter: useEmitter(),
        plugin: usePlugin(),
        substitution: useSubstitution(),
        toast: useToast(),
        breakpoints: useBreakpoint(),
        transformer: useTransformer(),
        vueuse: {
          core: VUEUSE_CORE,
          integration: {
            progress: useNProgress(),
          },
        },
      }
    )
  }

  return { init }
}