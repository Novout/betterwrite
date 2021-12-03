<template>
  <div
    v-cloak
    class="flex bg-theme-aside-logo-background justify-around md:justify-between items-center w-full p-2"
  >
    <img
      class="object-contain cursor-pointer"
      width="60"
      :src="path"
      @click.stop.prevent="onClick"
    />
    <p class="font-raleway text-3xl md:text-xl text-theme-aside-logo-text">
      Better Write
    </p>
  </div>
</template>

<script setup lang="ts">
  import { useLocalStorage } from '@/use/storage/local'
  import { useRouter } from 'vue-router'
  import { useEditorStore } from '@/store/editor'
  import { computed, watch, ref } from 'vue'
  import { setEditorLogo } from '@/plugin/theme/external'
  import { onAfterMounted } from '@/plugin/core/cycle'
  import { useUtils } from '@/use/utils'

  const EDITOR = useEditorStore()

  const router = useRouter()
  const local = useLocalStorage()
  const utils = useUtils()

  const path = ref(utils.path().resolve('logo_default.svg'))
  const theme = computed(() => EDITOR.configuration.theme)

  onAfterMounted(() => {
    path.value = setEditorLogo(theme.value)
  })

  watch(theme, (_theme) => {
    path.value = setEditorLogo(_theme)
  })

  const onClick = () => {
    local.onSaveProject().then(() => {
      router.push('/landing')
    })
  }
</script>
