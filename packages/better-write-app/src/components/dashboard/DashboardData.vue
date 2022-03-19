<template>
  <div
    v-if="profile && profile.plan && profile.plan !== '__NOT_DEFINED__'"
    v-motion
    :initial="{ opacity: 0 }"
    :enter="{ opacity: 1 }"
    :delay="200"
    class="flex flex-wrap w-full text-theme-text-1 p-5"
  >
    <div class="flex flex-col w-full md:w-1/2">
      <div class="flex flex-col">
        <h2 class="mb-2 text-lg">{{ t('dashboard.account.plans.title') }}</h2>
        <div
          class="flex justify-between items-center p-3 bg-theme-background-opacity-1 rounded font-bold text-lg"
        >
          <p class="mr-5">{{ getCorrectPlan(profile.plan) }}</p>
          <button
            class="px-2 md:px-5 py-1 bg-theme-background-opacity-1 rounded-full text-sm wb-icon font-poppins"
            @click.prevent.stop="onPlanRoute"
          >
            {{ t('dashboard.account.plans.upgrade') }}
          </button>
        </div>
      </div>
      <div class="flex flex-col mt-5">
        <h2 class="mb-2 text-lg">{{ t('dashboard.account.created.title') }}</h2>
        <p class="p-3 bg-theme-background-opacity-1 rounded font-bold">
          {{ profile.created_at_day }}
        </p>
      </div>
    </div>
  </div>
  <Spinner v-else :width="70" :height="70" />
</template>

<script lang="ts" setup>
  import { useSupabase } from '@/use/storage/supabase'
  import { useNProgress } from '@vueuse/integrations'
  import { onMounted, ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useRouter } from 'vue-router'

  const { getProfile, getCorrectPlan } = useSupabase()
  const { t } = useI18n()
  const router = useRouter()
  const { isLoading } = useNProgress()

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
