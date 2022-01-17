<template>
  <Modal @close="onClose">
    <div
      ref="login"
      :style="style"
      class="fixed flex flex-col w-3/4 md:w-1/2 bg-theme-background-1 wb-text rounded shadow-2xl p-5 overflow-y-auto"
    >
      <EditorAbsoluteHeader
        class="pl-5"
        :title="t('editor.auth.login.title')"
        @close="onClose"
      />
      <div class="flex flex-col items-center justify-between w-full gap-5 p-2">
        <button
          class="flex items-center w-full bg-theme-background-2 border-theme-border-1 px-3 py-1 rounded-sm mt-5"
          @click.prevent.stop="onLogin('google')"
        >
          <HeroIcon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              aria-hidden="true"
              role="img"
              class="h-5 w-5"
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
          <p class="ml-2 font-bold">
            {{ t('editor.auth.login.google') }}
          </p>
        </button>
        <button
          class="flex items-center w-full bg-theme-background-2 border-theme-border-1 px-3 py-1 rounded-sm"
          @click.prevent.stop="onLogin('github')"
        >
          <HeroIcon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              aria-hidden="true"
              role="img"
              class="h-5 w-5"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 .198a8 8 0 0 0-2.529 15.591c.4.074.547-.174.547-.385c0-.191-.008-.821-.011-1.489c-2.226.484-2.695-.944-2.695-.944c-.364-.925-.888-1.171-.888-1.171c-.726-.497.055-.486.055-.486c.803.056 1.226.824 1.226.824c.714 1.223 1.872.869 2.328.665c.072-.517.279-.87.508-1.07c-1.777-.202-3.645-.888-3.645-3.954c0-.873.313-1.587.824-2.147c-.083-.202-.357-1.015.077-2.117c0 0 .672-.215 2.201.82A7.672 7.672 0 0 1 8 4.066c.68.003 1.365.092 2.004.269c1.527-1.035 2.198-.82 2.198-.82c.435 1.102.162 1.916.079 2.117c.513.56.823 1.274.823 2.147c0 3.073-1.872 3.749-3.653 3.947c.287.248.543.735.543 1.481c0 1.07-.009 1.932-.009 2.195c0 .213.144.462.55.384A8 8 0 0 0 8.001.196z"
                fill="currentColor"
              ></path>
            </svg>
          </HeroIcon>
          <p class="ml-2 font-bold">
            {{ t('editor.auth.login.github') }}
          </p>
        </button>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
  import { useAbsoluteStore } from '@/store/absolute'
  import { onClickOutside, MaybeElementRef, useDraggable } from '@vueuse/core'
  import { ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useSupabase } from '@/use/storage/supabase'

  const ABSOLUTE = useAbsoluteStore()

  const supabase = useSupabase()
  const { t } = useI18n()

  const login = ref<HTMLElement | null>(null)

  const { style } = useDraggable(login as any, {
    initialValue: { x: window.innerWidth / 4, y: window.innerHeight / 3 },
  })

  onClickOutside(login as MaybeElementRef, () => {
    onClose()
  })

  const onClose = () => {
    ABSOLUTE.auth.supabase = false
  }

  const onLogin = (provider: 'google' | 'github') => {
    supabase.login(provider)
  }
</script>
