import { onMounted } from 'vue-demi'

export const onAfterMounted = (cb: any) => {
  onMounted(() => {
    setTimeout(() => {
      cb && cb()
    }, 0)
  })
}
