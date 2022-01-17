<template>
  <router-view></router-view>
  <PWAPrompt />
</template>

<script setup lang="ts">
  import { onBeforeUnmount } from 'vue'
  import { useStart } from '@/use/start'
  import { useDestroy } from '@/use/destroy'
  import { LoggerPlugin } from 'better-write-plugin-logger'
  import { ThemePlugin } from 'better-write-plugin-theme'
  import { PDFPlugin } from 'better-write-plugin-pdf'
  import { DocxPlugin } from 'better-write-plugin-docx'
  import { useAuthStore } from './store/auth'
  import { s } from './use/storage/supabase'
  import { Session } from '@supabase/supabase-js'

  const start = useStart()
  const destroy = useDestroy()

  const auth = useAuthStore()

  start.init([LoggerPlugin(), ThemePlugin(), PDFPlugin(), DocxPlugin()])

  auth.account.user = s.auth.user()

  s.auth.onAuthStateChange((_, session) => {
    auth.account.user = (session as Session)?.user || null
  })

  onBeforeUnmount(async () => {
    await destroy.init()
  })
</script>
