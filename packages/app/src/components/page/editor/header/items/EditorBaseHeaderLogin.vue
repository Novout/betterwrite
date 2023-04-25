<template>
  <Menu as="div" class="relative">
    <MenuButton class="flex justify-center items-center rounded-full w-8"><UseImage
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
        <div class="rounded-full wb-icon w-8 shadow-xl">
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
          <IconUser v-else class="h-8 w-8" />
        </div>
      </template>
    </UseImage></MenuButton>
    <MenuItems
v-motion
    :initial="{ opacity: 0, y: -10 }"
    :enter="{
      opacity: 1,
      y: 0,
      transition: {
        delay: 0,
        duration: 300,
      },
    }" class="absolute rounded font-raleway p-5 flex flex-col gap-5 right-0 w-44 bg-theme-background-3">
      <p class="truncate wb-text font-poppins" v-if="user?.email">{{ user?.email }}</p>
      <MenuItem @click="plugin.emit('plugin-oauth-logout')">
        <button class="flex wb-icon rounded shadow px-2 justify-between items-center bg-theme-background-1">
          <IconLogout class="w-7 h-7" />
          <p class="font-bold">{{ t('editor.header.login.logout') }}</p>
        </button>
      </MenuItem>
      <MenuItem @click="plugin.emit('plugin-oauth-delete')">
        <button :style="{ outline: '2px solid red' }" class="flex wb-icon rounded shadow px-2 justify-between items-center bg-theme-background-1">
          <IconDelete class="w-7 h-7" />
          <p class="font-bold">{{ t('editor.header.login.delete') }}</p>
        </button>
      </MenuItem>
    </MenuItems>
  </Menu>
</template>

<script setup lang="ts">
  import { useAuthStore } from '@/store/auth'
  import { UseImage } from '@vueuse/components'
  import { usePlugin } from 'better-write-plugin-core'
  import { computed } from 'vue'
  import { useI18n } from 'vue-i18n'

  const plugin = usePlugin()
  const { t } = useI18n()

  const AUTH = useAuthStore()
  const user = computed(() => AUTH.account.user)
</script>
