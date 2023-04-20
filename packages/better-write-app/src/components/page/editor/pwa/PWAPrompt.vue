<template>
  <div
    v-if="offlineReady || needRefresh"
    class="fixed bg-rgba-blur font-poppins top-0 right-0 m-3 p-2 rounded-sm shadow-lg text-left bg-theme-pwa-prompt-background z-max w-full md:w-96 break-words"
    role="alert"
  >
    <HeroIcon
      class="absolute text-theme-pwa-prompt-text right-0 top-0 wb-icon"
      @click.prevent="close"
    >
      <IconClose class="h-6 w-6" />
    </HeroIcon>
    <div class="mt-5 text-theme-pwa-prompt-text">
      <span v-if="offlineReady">
        {{ t('editor.pwa.prompt.offlineReady') }}
      </span>
      <span v-else>
        {{ t('editor.pwa.prompt.newContent') }}
      </span>
    </div>
    <button
      v-if="needRefresh"
      class="bg-theme-pwa-prompt-button-background text-theme-pwa-prompt-button-text px-2 py-1 mt-3"
      @click="updateServiceWorker()"
    >
      {{ t('editor.pwa.prompt.reload') }}
    </button>
  </div>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import { useRegisterSW } from 'virtual:pwa-register/vue'

  const { t } = useI18n()

  const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW()

  const close = async () => {
    offlineReady.value = false
    needRefresh.value = false
  }
</script>
