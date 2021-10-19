<template>
  <AsideBarItem :title="t('editor.aside.configuration.title')">
    <template #icon>
      <HeroIcon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
            clip-rule="evenodd"
          />
        </svg>
      </HeroIcon>
    </template>
    <div
      class="
        flex
        font-bold
        text-xs text-black
        dark:text-gray-300
        justify-between
        items-center
        w-full
        px-2
      "
    >
      <p>{{ t('editor.aside.configuration.lang') }}</p>
      <select
        v-model="lang"
        class="
          form-select
          w-20
          wb-text
          bg-transparent bg-none
          border-none
          focus:border-none
          active:border-none
        "
      >
        <option class="dark:bg-gray-700" value="Português do Brasil">
          Português do Brasil
        </option>
        <option class="dark:bg-gray-700" value="English">English</option>
      </select>
    </div>
    <SwitchGroup>
      <div class="flex px-2 items-center w-full justify-between">
        <SwitchLabel
          class="
            mr-4
            text-black
            dark:text-gray-300
            transition
            font-bold
            text-xs
          "
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
  const { t, locale } = useI18n()

  const dark = ref(store.state.editor.configuration.dark)
  watch(dark, (_dark: boolean) => {
    store.commit('editor/switchTheme', _dark)

    _dark
      ? (document.querySelector('html') as HTMLElement).classList.add('dark')
      : (document.querySelector('html') as HTMLElement).classList.remove('dark')
    _dark ? (localStorage.theme = 'dark') : localStorage.removeItem('theme')
  })

  const convert = (iso: string) => {
    return (
      {
        br: 'Português do Brasil',
        en: 'English',
      }[iso] || 'en'
    )
  }

  const lang = ref(convert(localStorage.getItem('lang') || 'en'))

  watch(lang, (_lang: string) => {
    const set =
      {
        'Português do Brasil': 'br',
        English: 'en',
      }[_lang] || 'en'

    localStorage.setItem('lang', set)
    locale.value = set

    const iso =
      {
        en: 'en-US',
        br: 'pt-BR',
      }[set] || 'en-US'

    ;(document.querySelector('html') as HTMLElement).lang = iso
  })
</script>
