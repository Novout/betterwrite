<template>
  <div class="flex justify-end w-full">
    <HeroIcon
      class="wb-icon p-1"
      @click.prevent.stop="ABSOLUTE.project.preferences = false"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </HeroIcon>
  </div>
  <div class="flex flex-col justify-end w-full lg:w-1/2 wb-text shadow-lg">
    <div
      class="
        flex
        font-bold
        text-base text-theme-text-2
        justify-between
        items-center
        w-full
        px-2
        py-1
      "
    >
      <p>{{ t('editor.aside.configuration.lang') }}</p>
      <InputSelect v-model="lang" :arr="['Português do Brasil', 'English']" />
    </div>
    <div
      class="
        flex
        font-bold
        text-base text-theme-text-2
        justify-between
        items-center
        w-full
        px-2
        py-1
      "
    >
      <p>{{ t('editor.aside.configuration.dark') }}</p>
      <InputSelect
        v-model="EDITOR.configuration.theme"
        :arr="useDefines().themes()"
      />
    </div>
    <div
      class="
        flex
        font-bold
        text-base text-theme-text-2
        justify-between
        items-center
        w-full
        px-2
        py-1
      "
    >
      <p>{{ t('editor.aside.configuration.autosave') }}</p>
      <InputSelect v-model="auto" :arr="[1, 2, 5, 15, 30, 'never']" />
    </div>
  </div>
</template>
<script setup lang="ts">
  import { useEditorStore } from '@/store/editor'
  import { ref, watch, nextTick, computed } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useAbsoluteStore } from '@/store/absolute'
  import { useLocalStorage } from '@/use/storage/local'
  import { useDefines } from '@/use/defines'
  import { ThemeNormalize } from '@/plugin/theme/utils'

  const ABSOLUTE = useAbsoluteStore()
  const EDITOR = useEditorStore()

  const local = useLocalStorage()

  const { t, locale } = useI18n()

  const auto = ref(EDITOR.configuration.auto)
  const theme = computed(() => EDITOR.configuration.theme)

  watch(auto, async (_auto) => {
    EDITOR.setAutoSave(_auto)

    await nextTick

    local.onSaveProject().then(() => {
      window.location.reload()
    })
  })

  watch(theme, (_theme) => {
    const value = ThemeNormalize(_theme)

    document.body.removeAttribute('class')
    document.body.classList.add(value)
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
