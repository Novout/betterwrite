<template>
  <div
    v-cloak
    class="flex bg-theme-aside-logo-background justify-around md:justify-between items-center w-full p-2"
  >
    <img
      class="object-contain"
      :class="[!s.auth.user() ? 'cursor-pointer' : '']"
      :width="props.width"
      alt="Better Write Logo"
      :src="path"
      @click.stop.prevent="onClick"
    />
    <p
      :class="[!back ? 'hidden md:flex text-lg' : 'text-xl']"
      class="font-raleway text-theme-aside-logo-text ml-3"
    >
      betterwrite<span class="text-theme-background-3 font-bold">.io</span>
    </p>
  </div>
</template>

<script setup lang="ts">
  import { useLocalStorage } from '@/use/storage/local'
  import { useRouter } from 'vue-router'
  import { useEditorStore } from '@/store/editor'
  import { computed, watch, ref } from 'vue'
  import { setEditorLogo } from 'better-write-plugin-theme'
  import { Cycle } from 'better-write-plugin-core'
  import { useUtils } from '@/use/utils'
  import { s } from '@/use/storage/supabase'

  const props = defineProps<{
    width: number
    back: boolean
  }>()

  const EDITOR = useEditorStore()

  const router = useRouter()
  const local = useLocalStorage()
  const utils = useUtils()

  const path = ref(utils.path().resolve('logo_default.svg'))
  const theme = computed(() => EDITOR.configuration.theme)

  Cycle.onAfterMounted(() => {
    path.value = setEditorLogo(theme.value, useUtils())
  })

  watch(theme, (_theme) => {
    path.value = setEditorLogo(_theme, useUtils())
  })

  const onClick = () => {
    if (s.auth.user()) return

    local.onSaveProject().then(() => {
      props.back ? router.back() : router.push('/')
    })
  }
</script>
