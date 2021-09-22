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
    <SwitchGroup>
      <div class="flex items-center w-full justify-between">
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
      <div class="flex items-center w-full justify-between pt-3">
        <SwitchLabel
          class="mr-4 text-black dark:text-gray-300 font-bold text-xs"
          >{{ t('editor.aside.configuration.lang') }}</SwitchLabel
        >
        <Switch
          v-model="lang"
          :class="lang ? 'bg-gray-900' : 'bg-gray-500'"
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
            :class="lang ? 'translate-x-6' : 'translate-x-1'"
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
      <div class="flex items-center w-full justify-between pt-3">
        <SwitchLabel
          class="mr-4 text-black dark:text-gray-300 font-bold text-xs"
          >{{ t('editor.aside.configuration.draggable') }}</SwitchLabel
        >
        <Switch
          v-model="store.state.editor.configuration.draggable"
          :class="
            store.state.editor.configuration.draggable
              ? 'bg-gray-900'
              : 'bg-gray-500'
          "
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
            :class="
              store.state.editor.configuration.draggable
                ? 'translate-x-6'
                : 'translate-x-1'
            "
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
  <AsideBarItem :title="t('editor.aside.commands.title')">
    <template #icon>
      <HeroIcon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
          />
        </svg>
      </HeroIcon>
    </template>
    <AsideBarCommands
      :title="t('editor.aside.commands.contents[0].title')"
      :description="t('editor.aside.commands.contents[0].description')"
    >
      <template #exib>
        <p class="text-xl">{{ t('editor.aside.commands.contents[0].tag') }}</p>
      </template>
    </AsideBarCommands>
    <AsideBarCommands
      :title="t('editor.aside.commands.contents[1].title')"
      :description="t('editor.aside.commands.contents[1].description')"
    >
      <template #exib>
        <p class="font-bold text-xl">
          {{ t('editor.aside.commands.contents[1].tag') }}
        </p>
      </template>
    </AsideBarCommands>
    <AsideBarCommands
      :title="t('editor.aside.commands.contents[2].title')"
      :description="t('editor.aside.commands.contents[2].description')"
    >
      <template #exib>
        <p class="font-italic text-xl">
          {{ t('editor.aside.commands.contents[2].tag') }}
        </p>
      </template>
    </AsideBarCommands>
    <AsideBarCommands
      :title="t('editor.aside.commands.contents[4].title')"
      :description="t('editor.aside.commands.contents[4].description')"
    >
      <template #exib>
        <p class="font-bold text-xl">
          {{ t('editor.aside.commands.contents[4].tag') }}
        </p>
      </template>
    </AsideBarCommands>
    <AsideBarCommands
      :title="t('editor.aside.commands.contents[5].title')"
      :description="t('editor.aside.commands.contents[5].description')"
    >
      <template #exib>
        <p class="font-bold text-xl">
          {{ t('editor.aside.commands.contents[5].tag') }}
        </p>
      </template>
    </AsideBarCommands>
  </AsideBarItem>
  <AsideBarItem :title="t('editor.aside.project.title')">
    <template #icon>
      <HeroIcon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z"
          />
          <path d="M3 8a2 2 0 012-2v10h8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
        </svg>
      </HeroIcon>
    </template>
    <AsideProjectNew />
    <AsidePageNew />
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

  const lang = ref(locale.value === 'en' ? true : false)
  watch(lang, (_lang: boolean) => {
    localStorage.setItem('lang', _lang ? 'en' : 'br')

    _lang ? (locale.value = 'en') : (locale.value = 'br')

    _lang
      ? ((document.querySelector('html') as HTMLElement).lang = 'en-US')
      : ((document.querySelector('html') as HTMLElement).lang = 'pt-BR')
  })
</script>
