<template>
  <button
    class="flex h-12 flex-1 items-center justify-center px-3 py-1 rounded-sm mt-5"
    :style="{ backgroundColor: color }"
    @click.prevent.stop="onLogin(provider)"
  >
    <HeroIcon>
      <slot></slot>
    </HeroIcon>
  </button>
</template>

<script lang="ts" setup>
  import { SupabaseIntegrations } from 'better-write-types'
  import { useSupabase } from '@/use/storage/supabase'

  defineProps<{
    provider: SupabaseIntegrations
    color: string
  }>()

  const supabase = useSupabase()

  const onLogin = (provider: SupabaseIntegrations) => {
    supabase.login(provider)
  }
</script>
