import { tryOnBeforeUnmount, tryOnMounted } from '@vueuse/core'
import { ref } from 'vue'

export const useTouch = (duration: number = 300) => {
  const timer = ref<any>(0)
  const isLong = ref<boolean>(false)

  const touchstart = () => {
    if (!timer.value) {
      timer.value = setTimeout(() => {
        isLong.value = true
      }, duration)
    }
  }

  const touchend = () => {
    if (timer.value) {
      clearTimeout(timer.value as number)
      timer.value = null
      isLong.value = false
    }
  }

  tryOnMounted(() => {
    window.addEventListener('touchstart', touchstart, { passive: true })
    window.addEventListener('touchend', touchend, { passive: true })
  })

  tryOnBeforeUnmount(() => {
    window.removeEventListener('touchstart', touchstart, false)
    window.removeEventListener('touchend', touchend, false)
  })
  return { timer, isLong }
}
