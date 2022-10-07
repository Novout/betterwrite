<template>
  <div
    v-if="profile && profile.plan && profile.plan !== '__NOT_DEFINED__'"
    v-motion
    :initial="{ opacity: 0 }"
    :enter="{ opacity: 1 }"
    :delay="200"
    class="flex justify-between flex-wrap w-full wb-text p-5 gap-10"
  >
    <div
      v-if="
        AUTH?.account?.user?.user_metadata?.avatar_url ||
        AUTH?.account.user?.user_metadata.name
      "
      class="flex gap-5 flex-wrap items-center flex-1 px-5"
    >
      <img
        class="rounded-full w-20 md:w-60"
        alt="Avatar"
        :src="AUTH?.account?.user?.user_metadata?.avatar_url"
      />
      <div
        v-if="AUTH?.account.user?.user_metadata.name"
        class="flex flex-col items-center justify-center"
      >
        <p class="font-poppins font-bold text-lg lg:text-xl">
          {{ AUTH?.account.user?.user_metadata.name }}
        </p>
      </div>
    </div>
    <div class="flex flex-col w-full md:w-1/2">
      <div class="flex flex-col">
        <h2 class="mb-2 text-lg">{{ t('dashboard.account.plans.title') }}</h2>
        <div
          class="flex justify-between items-center p-3 bg-theme-editor-dashboard-background-item rounded font-bold text-lg"
        >
          <p class="mr-5">{{ getCorrectPlan(profile.plan) }}</p>
          <!-- TODO: Integrate -->
          <button
            v-if="env.isDev()"
            class="px-2 md:px-5 py-1 bg-theme-editor-dashboard-background-item rounded-full text-sm wb-icon font-poppins"
            @click.prevent.stop="onPlanRoute"
          >
            {{ t('dashboard.account.plans.upgrade') }}
          </button>
        </div>
      </div>
      <div class="flex flex-col mt-5">
        <h2 class="mb-2 text-lg">{{ t('dashboard.account.created.title') }}</h2>
        <p
          class="p-3 bg-theme-editor-dashboard-background-item rounded font-bold"
        >
          {{ profile.created_at_day }}
        </p>
      </div>
    </div>
  </div>
  <Spinner v-else :width="70" :height="70" />
</template>

<script lang="ts" setup>
  import { useAuthStore } from '@/store/auth'
  import { useEnv } from '@/use/env'
  import { useSupabase } from '@/use/storage/supabase'
  import { useNProgress } from '@vueuse/integrations/useNProgress'
  import { onMounted, ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useRouter } from 'vue-router'

  const AUTH = useAuthStore()

  const { getProfile, getCorrectPlan } = useSupabase()
  const { t } = useI18n()
  const router = useRouter()
  const { isLoading } = useNProgress()
  const env = useEnv()

  const profile = ref<any>({})

  onMounted(() => {
    getProfile().then((data) => {
      profile.value = data
    })
  })

  const onPlanRoute = () => {
    isLoading.value = true

    router.push('/plans').finally(() => {
      isLoading.value = false
    })
  }
</script>
