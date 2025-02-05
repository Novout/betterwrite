<template>
  <button
    v-motion
    :initial="{
      opacity: 0,
      y: 20,
    }"
    :visible="{
      opacity: 1,
      y: 0,
      transition: {
        duration: 750,
      },
    }"
    :delay="750 + 450 * 3"
    class="flex text-gray-200 items-center text-lg rounded-full gap-2 transition-colors bg-gradient-to-br from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-900 px-7 py-3.5 md:(px-8 py-4) shadow-gray-900 shadow transition-colors font-bold"
    @click.prevent.stop="onClick"
  >
    {{ t('landing.first.editor.website') }}
    <IconAccess class="w-6 h-6" />
  </button>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import { useRouter } from 'vue-router'

  const { t } = useI18n()
  const router = useRouter()

  const onClick = () => {
    router.push('/landing')
  }
</script>
