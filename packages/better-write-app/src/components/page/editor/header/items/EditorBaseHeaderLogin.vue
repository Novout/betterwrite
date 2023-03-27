<template>
  <div>
    <div
      :class="[mobile ? 'w-52' : 'w-auto']"
      class="flex items-center px-3 font-poppins py-1 sm:py-1 mr-2 bg-black-opacity border-theme-border-1 wb-text rounded-full"
    >
      <div class="flex items-center truncate">
        <UseImage
          alt="Profile Logo"
          class="rounded-full mr-0 sm:mr-2 w-8"
          :src="user?.user_metadata.avatar_url"
        >
          <template #loading>
            <Spinner
              class="rounded-full mr-0 sm:mr-2"
              :height="32"
              :width="32"
            />
          </template>
          <template #error>
            <HeroIcon class="rounded-full mr-0 sm:mr-2 w-8">
              <IconGoogle
                v-if="user && user.app_metadata.provider === 'google'"
                class="h-8 w-8"
              />
              <IconGithub
                v-else-if="user && user.app_metadata.provider === 'github'"
                class="h-8 w-8"
              />
              <IconNotion
                v-else-if="user && user.app_metadata.provider === 'notion'"
                class="h-8 w-8"
              />
              <IconGitlab
                v-else-if="user && user.app_metadata.provider === 'gitlab'"
                class="h-8 w-8"
              />
              <IconUser v-else />
            </HeroIcon>
          </template>
        </UseImage>
        <p v-if="mobile && user" class="truncate font-raleway">
          {{ user?.user_metadata?.name || user?.email || '' }}
        </p>
        <HeroIcon 
          class="wb-icon ml-2"
          @click.prevent.stop="supabase.out"
        >
          <IconClose class="w-6 h-6" />
        </HeroIcon>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useAuthStore } from '@/store/auth'
  import { useSupabase } from '@/use/storage/supabase'
  import { UseImage } from '@vueuse/components'
  import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
  import { computed } from 'vue'

  const AUTH = useAuthStore()
  const user = computed(() => AUTH.account.user)

  const supabase = useSupabase()

  const breakpoints = useBreakpoints(breakpointsTailwind)
  const mobile = breakpoints.greater('sm')
</script>
