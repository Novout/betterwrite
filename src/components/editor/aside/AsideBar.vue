<template>
  <AsideBarItem :title="t('editor.aside.configuration.title')">
    <SwitchGroup>
      <div class="flex items-center">
        <SwitchLabel
          class="mr-4 text-black dark:text-gray-300 font-bold text-xs"
          >{{ t('editor.aside.configuration.dark') }}</SwitchLabel
        >
        <Switch
          v-model="dark"
          :class="dark ? 'bg-gray-900' : 'bg-gray-500'"
          class="
            relative
            inline-flex
            items-center
            h-6
            transition-colors
            rounded-full
            w-11
            focus:outline-none
          "
        >
          <span
            :class="dark ? 'translate-x-6' : 'translate-x-1'"
            class="
              inline-block
              w-4
              h-4
              transition-transform
              transform
              bg-white
              rounded-full
            "
          />
        </Switch>
      </div>
    </SwitchGroup>
  </AsideBarItem>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useStore } from 'vuex'

  const store = useStore()
  const { t } = useI18n()

  const dark = ref(store.state.editor.configuration.dark)
  watch(dark, (_dark: boolean) => {
    store.commit('editor/switchTheme', _dark)

    _dark
      ? (document.querySelector('html') as HTMLElement).classList.add('dark')
      : (document.querySelector('html') as HTMLElement).classList.remove('dark')
    _dark ? (localStorage.theme = 'dark') : localStorage.removeItem('theme')
  })
</script>
