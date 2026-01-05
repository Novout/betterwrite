<template>
  <main :style="{ background: 'linear-gradient(1448deg,rgba(61, 58, 58, 1) 0%, rgba(55, 65, 81, 1) 100%)' }" class="wb-screen w-full flex flex-row justify-center flex-wrap gap-20 items-center">
    <section class="relative left-25 flex text-white justify-around items-center flex-col gap-5 w-80 h-140 rounded-xl bg-theme-background-4">
      <h2 class="font-bold text-3xl">{{ t('account.common.title') }}</h2>
      <h3 class="font-bold text-3xl">{{ t('account.common.price') }}</h3>
      <p class="font-raleway text-lg text-center">{{ t('account.common.description') }}</p>
      <Button @click="onCreateAccount('common')">{{ t('account.common.enter') }}</Button>
    </section>
    <section class="flex relative top-8 text-white justify-around items-center flex-col gap-5 w-80 h-140 rounded-xl bg-theme-background-3">
      <h2 class="font-bold text-3xl">{{ t('account.adventure.title') }}</h2>
      <h3 class="font-bold text-3xl">{{ t('account.adventure.price') }}</h3>
      <p class="font-raleway text-lg text-center">{{ t('account.adventure.description') }}</p>
      <Button @click="onCreateAccount('adventure')">{{ t('account.adventure.enter') }}</Button>
    </section>
    <section class="relative right-25 flex text-white justify-around items-center flex-col gap-5 w-80 h-140 rounded-xl bg-theme-background-1">
      <h2 class="font-bold text-3xl">{{ t('account.force.title') }}</h2>
      <h3 class="font-bold text-3xl">{{ t('account.force.price') }}</h3>
      <p class="font-raleway text-lg text-center">{{ t('account.force.description') }}</p>
      <Button @click="onCreateAccount('force')">{{ t('account.force.enter') }}</Button>
    </section>
    <img
      class="absolute right-20 bottom-20 opacity-20 shadow-lg rounded-xs w-80 md:w-80"
      alt="Better Write Logo"
      src="/logo_default.svg"
    />
  </main>
</template>

<script setup lang="ts">
  import { tryOnMounted } from '@vueuse/core'
  import { usePlugin } from 'better-write-plugin-core'
  import { useI18n } from 'vue-i18n'

  const plugin = usePlugin()
  const { t } = useI18n()

  // TODO: images in background
  tryOnMounted(async () => {
    plugin.emit('plugin-theme-set', 'BetterWrite - Dark')
  })

  const onCreateAccount = (type: 'common' | 'adventure' | 'force') => {
    plugin.emit('plugin-backend-register-user', type)
  }
</script>