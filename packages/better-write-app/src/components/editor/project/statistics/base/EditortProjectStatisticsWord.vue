<template>
  <div class="flex flex-1 flex-col w-full p-3 shadow-lg">
    <div class="flex w-full items-center">
      <h2 class="font-bold font-poppins text-lg mr-5">
        {{ t('editor.addons.statistics.repeated') }}
      </h2>
      <InputSelect
        v-model="data"
        :arr="PROJECT.pages.map((page) => page.title)"
      />
    </div>
    <div class="flex flex-row justify-around flex-wrap w-full mt-5">
      <div
        v-for="(obj, index) in bests"
        :key="index"
        class="flex flex-1 flex-col justify-center items-center p-1 text-2xl min-w-40"
      >
        <p class="truncate p-0.5 border-b-2 border-theme-border-1 max-w-xl">
          {{ obj[0] }}
        </p>
        <p>{{ obj[1] }}</p>
      </div>
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
  import { tryOnMounted } from '@vueuse/core'

  const PROJECT = useProjectStore()

  const project = useProject()
  const { t } = useI18n()

  const data = ref(PROJECT.pages[0].title)

  const bests = ref<Map<string, number>>(new Map())
  const words = ref<Map<string, number>>(new Map())

  watch(data, (_data) => {
    onSet()
  })

  tryOnMounted(() => {
    onSet()
  })

  const onSet = () => {
    const target = PROJECT.pages.filter((page) => page.title === data.value)[0]

    const result = project.utils().getWordOccurrences(target)

    const arr = [...result]

    bests.value.clear()

    const max = result.size < 5 ? result.size : 5

    for (let i = 0; i < max; i++) {
      if (arr[i][0] !== undefined) {
        bests.value.set(arr[i][0], arr[i][1])
        result.delete(arr[i][0])
      }
    }

    words.value = result
  }
</script>
