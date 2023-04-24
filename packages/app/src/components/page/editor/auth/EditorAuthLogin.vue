<template>
  <Modal @close="onClose">
    <div
      ref="login"
      :style="style"
      class="fixed flex flex-col w-3/4 md:w-1/2 bg-theme-background-1 wb-text rounded shadow-2xl p-5 overflow-y-auto"
    >
      <EditorAbsoluteHeader
        class="pl-3 pr-1"
        :title="t('editor.auth.login.title')"
        @close="onClose"
      />
      <div
        class="flex flex-wrap flex-row items-center justify-between w-full gap-5 p-2"
      >
        <button
          class="flex h-20 flex-1 items-center justify-center px-3 py-1 rounded-sm mt-5"
          :style="{ backgroundColor: '#FAFAFA' }"
          @click.prevent.stop="onLogin('google')"
        >
          <HeroIcon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              aria-hidden="true"
              role="img"
              class="w-8 h-8 md:(h-10 w-10)"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 24 24"
            >
              <path
                fill="#EA4335"
                d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0C7.27 0 3.198 2.698 1.24 6.65l4.026 3.115z"
              ></path>
              <path
                fill="#34A853"
                d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-4.04 3.067A11.965 11.965 0 0 0 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987z"
              ></path>
              <path
                fill="#4A90E2"
                d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9c0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21z"
              ></path>
              <path
                fill="#FBBC05"
                d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067z"
              ></path>
            </svg>
          </HeroIcon>
        </button>
        <button
          class="flex h-20 flex-1 items-center justify-center bg-theme-background-2 border-theme-border-1 px-3 py-1 rounded-sm mt-5"
          :style="{ backgroundColor: '#FFF' }"
          @click.prevent.stop="onLogin('notion')"
        >
          <HeroIcon>
            <svg
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              class="w-8 h-8 md:(h-10 w-10)"
              viewBox="0 0 122.88 128.1"
            >
              <path
                class="cls-1"
                d="M21.19,22.46c4,3.23,5.48,3,13,2.49l70.53-4.24c1.5,0,.25-1.49-.25-1.74L92.72,10.5a14.08,14.08,0,0,0-11-3.23l-68.29,5c-2.49.24-3,1.49-2,2.49l9.73,7.72ZM25.42,38.9v74.21c0,4,2,5.48,6.48,5.23l77.52-4.48c4.49-.25,5-3,5-6.23V33.91c0-3.23-1.25-5-4-4.73l-81,4.73c-3,.25-4,1.75-4,5Zm76.53,4c.49,2.24,0,4.48-2.25,4.73L96,48.36v54.79c-3.24,1.74-6.23,2.73-8.72,2.73-4,0-5-1.24-8-5L54.83,62.55V99.66l7.73,1.74s0,4.48-6.23,4.48l-17.2,1c-.5-1,0-3.48,1.75-4l4.48-1.25V52.59l-6.23-.5a4.66,4.66,0,0,1,4.24-5.73l18.44-1.24L87.24,84V49.6l-6.48-.74a4.21,4.21,0,0,1,4-5l17.21-1ZM7.72,5.52l71-5.23C87.49-.46,89.73.05,95.21,4L117.89,20c3.74,2.74,5,3.48,5,6.47v87.42c0,5.47-2,8.71-9,9.21l-82.5,5c-5.24.25-7.73-.5-10.47-4L4.24,102.4c-3-4-4.24-7-4.24-10.46V14.24C0,9.76,2,6,7.72,5.52Z"
              />
            </svg>
          </HeroIcon>
        </button>
        <button
          class="flex h-20 flex-1 items-center justify-center bg-theme-background-2 border-theme-border-1 px-3 py-1 rounded-sm mt-5"
          :style="{ backgroundColor: '#111111' }"
          @click.prevent.stop="onLogin('github')"
        >
          <HeroIcon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              aria-hidden="true"
              role="img"
              class="w-8 h-8 md:(h-10 w-10) text-white"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 .198a8 8 0 0 0-2.529 15.591c.4.074.547-.174.547-.385c0-.191-.008-.821-.011-1.489c-2.226.484-2.695-.944-2.695-.944c-.364-.925-.888-1.171-.888-1.171c-.726-.497.055-.486.055-.486c.803.056 1.226.824 1.226.824c.714 1.223 1.872.869 2.328.665c.072-.517.279-.87.508-1.07c-1.777-.202-3.645-.888-3.645-3.954c0-.873.313-1.587.824-2.147c-.083-.202-.357-1.015.077-2.117c0 0 .672-.215 2.201.82A7.672 7.672 0 0 1 8 4.066c.68.003 1.365.092 2.004.269c1.527-1.035 2.198-.82 2.198-.82c.435 1.102.162 1.916.079 2.117c.513.56.823 1.274.823 2.147c0 3.073-1.872 3.749-3.653 3.947c.287.248.543.735.543 1.481c0 1.07-.009 1.932-.009 2.195c0 .213.144.462.55.384A8 8 0 0 0 8.001.196z"
                fill="currentColor"
              ></path>
            </svg>
          </HeroIcon>
        </button>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
  import { useAbsoluteStore } from '@/store/absolute'
  import { onClickOutside, useDraggable } from '@vueuse/core'
  import { ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { SupabaseIntegrations } from 'better-write-types'
  import { usePlugin } from 'better-write-plugin-core'

  const ABSOLUTE = useAbsoluteStore()

  const plugin = usePlugin()
  const { t } = useI18n()

  const login = ref<HTMLElement | null>(null)

  const { style } = useDraggable(login as any, {
    initialValue: { x: window.innerWidth / 4, y: window.innerHeight / 3 },
  })

  onClickOutside(login as any, () => {
    onClose()
  })

  const onClose = () => {
    ABSOLUTE.auth.supabase = false
  }

  const onLogin = (provider: SupabaseIntegrations) => {
    plugin.emit('plugin-oauth-login-with-provider', provider)
  }
</script>
