import { Callback } from '@/types/utils'
import { onMounted } from 'vue'

export const mounted = (cb: Callback<any>) => {
  onMounted(() => {
    cb && cb()
  })
}
