import { Callback } from '@/types/utils'
import { onMounted } from 'vue'

export const onAfterMounted = (cb: Callback<any>) => {
  onMounted(() => {
    setTimeout(() => {
      cb && cb()
    }, 0)
  })
}

