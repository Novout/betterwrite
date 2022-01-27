import { head, store, core, emitter } from '../src/main'
import { MotionPlugin as motion } from '@vueuse/motion'
import toast, { POSITION } from 'vue-toastification'
import tooltip from 'v-tooltip'
import router from '../src/router'
import i18n from '../src/lang'

export const getVueMock = (): any => {
  return {
    global: {
      config: {
        globalProperties: {
          emitter,
        },
      },
      plugins: [
        router,
        i18n,
        head,
        store,
        core,
        motion,
        [
          toast,
          {
            position: POSITION.TOP_CENTER,
            timeout: 4000,
            maxToasts: 3,
          },
        ],
        [
          tooltip,
          {
            themes: {
              'better-write': {
                $extend: 'tooltip',
                $resetCss: true,
              },
            },
          },
        ],
      ],
    },
  }
}
