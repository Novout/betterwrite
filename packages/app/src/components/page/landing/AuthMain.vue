<template>
  <div
    v-motion
    :initial="{ opacity: 0, y: 50 }"
    :enter="{ opacity: 1, y: 0, transition: { delay: 0 } }"
    class="flex justify-between items-center flex-col w-full md:w-3/5 xl:w-1/3 h-150 bg-black-opacity shadow-lg p-5"
  >
    <div class="absolute left-5">
      <button
        v-if="wizard === 'sign-up'"
        class="flex text-gray-200 items-center text-base rounded-full gap-2 transition-colors bg-gradient-to-br from-gray-300 to-gray-400 hover:from-gray-400 hover:to-gray-300 text-black px-4 py-2 shadow-xl transition-colors font-bold"
        @click.prevent.stop="wizard = 'sign-in'"
      >
        <p class="w-20 text-center">
          {{ t('landing.auth.enter') }}
        </p>
      </button>
      <button
        v-else
        class="flex text-gray-200 items-center text-base rounded-full gap-2 transition-colors bg-gradient-to-br from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-900 px-4 py-2 shadow-xl transition-colors font-bold"
        @click.prevent.stop="wizard = 'sign-up'"
      >
        <p class="w-20 text-center">
          {{ t('landing.auth.register') }}
        </p>
      </button>
    </div>
    <IconClose
      class="absolute wb-icon right-5 w-6 h-6"
      @click.prevent.stop="emit('close')"
    />
    <img
      v-motion
      :initial="{ opacity: 0 }"
      :enter="{ opacity: 1, transition: { delay: 120 } }"
      alt="Better Write Logo"
      src="/logo_default.svg"
      class="my-5"
      width="50"
    />
    <AuthMainRegister v-if="wizard === 'sign-up'" @reset="wizard = 'sign-in'" />
    <AuthMainLogin v-else-if="wizard === 'sign-in'" />
    <div
      v-motion
      :initial="{ opacity: 0, y: 10 }"
      :enter="{ opacity: 1, transition: { delay: 420 } }"
      class="flex justify-center font-thin items-center w-full mt-7 text-lg border-b"
    >
      {{ t('landing.auth.integration') }}
    </div>
    <EditorAuthIntegrations
      v-motion
      :initial="{ opacity: 0, y: 10 }"
      :enter="{ opacity: 1, y: 0, transition: { delay: 480 } }"
      :terms-of-use="true"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()
  const emit = defineEmits(['close'])

  const wizard = ref<'sign-up' | 'sign-in'>('sign-in')
</script>
