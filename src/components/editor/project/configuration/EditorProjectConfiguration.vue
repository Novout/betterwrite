<template>
  <div class="flex justify-end w-full">
    <HeroIcon
      class="wb-icon p-1"
      @click.prevent.stop="ABSOLUTE.project.configuration = false"
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
  <div class="flex flex-col w-full p-5">
    <div class="flex flex-col w-full p-1 my-8 shadow-lg lg:w-1/2">
      <h3 class="md:text-2xl text-xl mb-5 font-bold text-theme-text-2">
        {{ t('editor.project.configuration.title') }}
      </h3>
      <div class="wb-configuration">
        <p>{{ t('editor.project.configuration.creator') }}</p>
        <InputText
          v-model="PROJECT.creator"
          class="wb-configuration-input-text"
        />
      </div>
      <div class="wb-configuration">
        <p>{{ t('editor.project.configuration.name') }}</p>
        <InputText
          v-model="PROJECT.nameRaw"
          class="wb-configuration-input-text"
        />
      </div>
      <div class="wb-configuration">
        <p>{{ t('editor.project.configuration.subject') }}</p>
        <InputText
          v-model="PROJECT.subject"
          class="wb-configuration-input-text"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import { useAbsoluteStore } from '@/store/absolute'
  import { useProjectStore } from '@/store/project'
  import { watch, computed } from 'vue'
  import { useText } from '@/use/text'

  const ABSOLUTE = useAbsoluteStore()
  const PROJECT = useProjectStore()

  const { t } = useI18n()
  const text = useText()

  const name = computed(() => PROJECT.nameRaw)

  watch(name, () => {
    PROJECT.name = text.kebab(PROJECT.nameRaw)

    console.log(PROJECT.name)
  })
</script>
