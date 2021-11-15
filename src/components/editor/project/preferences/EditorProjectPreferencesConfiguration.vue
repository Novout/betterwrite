<template>
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
