<template>
  <div>
    <div
      class="flex justify-center items-center font-poppins wb-text rounded-full"
    >
      <div class="flex items-center truncate">
        <UseImage
          alt="Profile Logo"
          class="rounded-full w-8"
          :src="user?.user_metadata.avatar_url"
        >
          <template #loading>
            <Spinner
              class="rounded-full"
              :height="32"
              :width="32"
            />
          </template>
          <template #error>
            <div class="rounded-full w-8">
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
            </div>
          </template>
        </UseImage>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useAuthStore } from '@/store/auth'
  import { UseImage } from '@vueuse/components'
  import { computed } from 'vue'

  const AUTH = useAuthStore()
  const user = computed(() => AUTH.account.user)
</script>
