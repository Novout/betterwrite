<template>
  <div
    :class="[!props.hidden ? 'w-full cursor-pointer' : 'w-auto']"
    class="flex bg-theme-aside-logo-background justify-around md:justify-between items-center mr-5 md:mr-0"
    @click.stop.prevent="onClick"
  >
    <img
      class="object-contain"
      :width="props.width"
      alt="Better Write Logo"
      :src="path"
    />
    <h1
      v-if="!props.hidden"
      :class="[!back ? 'hidden md:flex text-lg' : 'text-xl']"
      class="font-raleway font-normal text-theme-editor-betterwrite ml-3"
    >
      betterwrite<span
        class="text-theme-background-3 font-poppins font-bold text-theme-editor-io"
        >.io</span
      >
    </h1>
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router'
  import { useEditorStore } from '@/store/editor'
  import { computed, watch, ref } from 'vue'
  import { setEditorLogo } from 'better-write-plugin-theme'
  import { Cycle } from 'better-write-plugin-core'
  import { useUtils } from '@/use/utils'

  const props = defineProps<{
    width: number
    back?: boolean
    hidden?: boolean
  }>()

  const EDITOR = useEditorStore()

  const router = useRouter()
  const utils = useUtils()

  const path = ref(utils.path().resolve('logo_default.svg'))
  const theme = computed(() => EDITOR.configuration.theme)

  Cycle.onAfterMounted(() => {
    path.value = setEditorLogo(
      EDITOR.styles.base.backgroundData ? 'BetterWrite - Custom' : theme.value,
      useUtils()
    )
  })

  watch(theme, (_theme) => {
    path.value = setEditorLogo(
      EDITOR.styles.base.backgroundData ? 'BetterWrite - Custom' : _theme,
      useUtils()
    )
  })

  watch(
    computed(() => EDITOR.styles.base.backgroundData),
    () => {
      path.value = setEditorLogo(
        EDITOR.styles.base.backgroundData
          ? 'BetterWrite - Custom'
          : theme.value,
        useUtils()
      )
    }
  )

  const onClick = () => {
    if (props.hidden) return

    if (props.back) {
      router.back()

      return
    }

    router.push('/about')
  }
</script>
