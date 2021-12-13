<template>
  <div class="flex flex-1 flex-col w-full md:w-96 p-3 shadow-lg">
    <div class="flex w-full items-center">
      <h2 class="font-bold font-poppins text-lg mr-5">
        {{ t('editor.addons.statistics.repeated') }}
      </h2>
      <InputSelect
        v-model="data"
        :arr="PROJECT.pages.map((page) => page.title)"
      />
    </div>
    <div class="flex max-h-72 overflow-y-auto flex-col w-full mt-5">
      <div
        v-for="(obj, index) in words"
        :key="index"
        class="flex justify-between items-center p-1 w-full"
      >
        <p class="truncate p-0.5">{{ obj[0] }}</p>
        <p>{{ obj[1] }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useProjectStore } from '@/store/project'
  import { useProject } from '@/use/project'
  import { ref, watch } from 'vue'
  import { useI18n } from 'vue-i18n'

  const PROJECT = useProjectStore()

  const project = useProject()
  const { t } = useI18n()

  const data = ref(PROJECT.pages[0].title)
  const words = ref(project.utils().getWordOccurrences(PROJECT.pages[0]))

  watch(data, (_data) => {
    const target = PROJECT.pages.filter((page) => page.title === _data)[0]
    console.log(target)
    words.value = project.utils().getWordOccurrences(target)
  })
</script>
