<template>
  <Menu as="div" class="relative">
    <MenuButton class="flex justify-center items-center rounded-full w-8">
      <div class="rounded-full wb-icon w-8 shadow-xl">
        <IconUser class="h-8 w-8" />
      </div>
    </MenuButton>
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
      }"
      class="absolute rounded font-raleway p-4 flex flex-col gap-5 right-0 w-44 bg-theme-background-3"
    >
      <MenuItem>
        <div
          class="wb-text w-full mt-5 text-xs flex flex-col text-center items-center justify-center"
        >
          <router-link to="/terms-of-use" class="font-bold cursor-pointer">{{
            t('editor.bar.help.terms')
          }}</router-link>
          <p>&</p>
          <router-link to="/privacy" class="font-bold cursor-pointer">{{
            t('editor.bar.help.privacy')
          }}</router-link>
        </div>
      </MenuItem>
    </MenuItems>
  </Menu>
</template>

<script setup lang="ts">
  import { useAuthStore } from '@/store/auth'
  import { usePlugin } from 'better-write-plugin-core'
  import { computed } from 'vue'
  import { useI18n } from 'vue-i18n'

  const plugin = usePlugin()
  const { t } = useI18n()

  const AUTH = useAuthStore()
  const user = computed(() => AUTH.account.user)
</script>
