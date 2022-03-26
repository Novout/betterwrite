<template>
  <div>
    <div
      :class="[mobile ? 'w-32' : 'w-auto']"
      class="flex items-center px-3 font-poppins py-1 mr-2 bg-black-opacity border-theme-border-1 wb-text rounded-full"
    >
      <button
        class="flex items-center truncate"
        @click.prevent.stop="onDashboard"
      >
        <HeroIcon class="mr-2">
          <svg
            v-if="user && user.app_metadata.provider === 'google'"
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
          <svg
            v-else-if="user && user.app_metadata.provider === 'github'"
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
          <svg
            v-else-if="user && user.app_metadata.provider === 'notion'"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            class="h-5 w-5"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 15 15"
          >
            <path
              fill="currentColor"
              d="M3.258 3.117c.42.341.577.315 1.366.262l7.433-.446c.158 0 .027-.157-.026-.183l-1.235-.893c-.236-.184-.551-.394-1.155-.341l-7.198.525c-.262.026-.315.157-.21.262l1.025.814Zm.446 1.732v7.821c0 .42.21.578.683.552l8.17-.473c.472-.026.525-.315.525-.656V4.324c0-.34-.131-.525-.42-.499l-8.538.499c-.315.026-.42.184-.42.525Zm8.065.42c.052.236 0 .472-.237.499l-.394.078v5.774c-.341.184-.657.29-.92.29c-.42 0-.525-.132-.84-.526L6.803 7.342v3.911l.815.184s0 .472-.657.472l-1.812.105c-.053-.105 0-.367.184-.42l.472-.13V6.292L5.15 6.24c-.053-.236.078-.577.446-.604l1.944-.13L10.22 9.6V5.978l-.683-.079c-.053-.289.157-.499.42-.525l1.813-.105Zm-9.93-3.937L9.326.781c.919-.08 1.155-.026 1.733.394l2.39 1.68c.395.288.526.367.526.682v9.212c0 .578-.21.92-.946.971l-8.694.525c-.552.027-.815-.052-1.104-.42l-1.76-2.283c-.315-.42-.446-.735-.446-1.103V2.25c0-.472.21-.866.814-.918Z"
            ></path>
          </svg>
          <svg
            v-else-if="user && user.app_metadata.provider === 'gitlab'"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            class="h-5 w-5"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 32 32"
          >
            <path
              fill="#e24329"
              d="m16 28.896l5.156-15.867H10.844L16 28.896z"
            ></path>
            <path
              fill="#fc6d26"
              d="m16 28.896l-5.156-15.867H3.619L16 28.896z"
            ></path>
            <path
              fill="#fca326"
              d="m3.619 13.029l-1.567 4.822a1.067 1.067 0 0 0 .388 1.193L16 28.9L3.619 13.029Z"
            ></path>
            <path
              fill="#e24329"
              d="M3.619 13.029h7.225L7.739 3.473a.534.534 0 0 0-1.015 0l-3.105 9.556Z"
            ></path>
            <path
              fill="#fc6d26"
              d="m16 28.896l5.156-15.867h7.225L16 28.896z"
            ></path>
            <path
              fill="#fca326"
              d="m28.381 13.029l1.567 4.822a1.067 1.067 0 0 1-.388 1.193L16 28.9l12.381-15.871Z"
            ></path>
            <path
              fill="#e24329"
              d="M28.381 13.029h-7.225l3.105-9.557a.534.534 0 0 1 1.015 0l3.105 9.557Z"
            ></path>
          </svg>
        </HeroIcon>
        <p v-if="mobile && user" class="truncate cursor-pointer">
          {{ user.email || '' }}
        </p>
        <HeroIcon
          v-if="env.isDev()"
          class="wb-icon"
          @click.prevent.stop="supabase.out"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            class="w-5 h-5"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"
            ></path>
          </svg>
        </HeroIcon>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useAuthStore } from '@/store/auth'
  import { useEnv } from '@/use/env'
  import { useSupabase } from '@/use/storage/supabase'
  import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
  import { computed } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useRouter } from 'vue-router'

  const AUTH = useAuthStore()
  const user = computed(() => AUTH.account.user)

  const { t } = useI18n()
  const env = useEnv()
  const router = useRouter()
  const supabase = useSupabase()

  const breakpoints = useBreakpoints(breakpointsTailwind)
  const mobile = breakpoints.greater('sm')

  const onDashboard = () => {
    router.push('/dashboard')
  }
</script>
