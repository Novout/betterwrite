<template>
  <div
    v-cloak
    class="flex cursor-pointer bg-theme-aside-logo-background justify-around md:justify-between items-center w-full mr-5 md:mr-0"
    @click.stop.prevent="onClick"
  >
    <img
      class="object-contain"
      :width="props.width"
      alt="Better Write Logo"
      :src="path"
    />
    <h1
      :class="[!back ? 'hidden md:flex text-lg' : 'text-xl']"
      class="font-raleway text-theme-editor-betterwrite ml-3"
    >
      betterwrite<span
        class="text-theme-background-3 font-bold text-theme-editor-io"
        >.io</span
      >
    </h1>
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
    local.onSaveProject().then(() => {
      props.back ? router.back() : router.push('/')
    })
  }
</script>
