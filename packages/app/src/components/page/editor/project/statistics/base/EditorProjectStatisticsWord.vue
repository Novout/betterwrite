<template>
  <div
    v-motion
    :initial="{ opacity: 0, y: 10 }"
    :enter="{ opacity: 1, y: 0 }"
    :delay="300"
    class="flex flex-1 flex-col w-full p-3 shadow-lg"
  >
    <div class="flex gap-5 justify-around flex-wrap w-full items-center">
      <div class="flex">
        <h2 class="font-bold font-poppins text-lg mr-5">
          {{ t('editor.addons.statistics.repeated') }}
        </h2>
        <InputSelect
          v-model="chapter"
          :arr="PROJECT.chapters.map((page) => page.entities[0].raw)"
        />
      </div>
      <div class="flex">
        <h2 class="font-bold font-poppins text-lg mr-5">
          {{ t('editor.addons.statistics.min') }}
        </h2>
        <InputNumber v-model="state.min" @action="onSet" />
      </div>
    </div>
    <div class="flex flex-row justify-around flex-wrap w-full mt-5">
      <div
        v-for="(obj, index) in state.bests"
        :key="index"
        class="flex flex-1 flex-col justify-center items-center p-1 text-2xl min-w-40"
      >
        <p class="truncate p-0.5 border-b-2 border-theme-border-1 max-w-xl">
          {{ obj[0] }}
        </p>
        <p>{{ obj[1] }}</p>
      </div>
    </div>
    <div class="flex max-h-72 wb-scroll overflow-y-auto flex-col w-full mt-5">
      <div
        v-for="(obj, index) in state.words"
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
  import { reactive, watch, ref, onMounted } from 'vue'
  import { useI18n } from 'vue-i18n'

  const PROJECT = useProjectStore()

  const chapter = ref<string>(PROJECT.chapters[0].entities[0].raw)
  const project = useProject()
  const { t } = useI18n()

  const state = reactive({
    min: 2,
    bests: new Map(),
    words: new Map(),
  })

  watch(chapter, () => {
    onSet()
  })

  onMounted(() => {
    onSet()
  })

  const onSet = () => {
    const target = PROJECT.chapters.filter(
      (page) => page.entities[0].raw === chapter.value
    )[0]

    const result = project.utils().getWordOccurrences(target, state.min)

    if (!result) return

    const arr = [...result]

    state.bests.clear()

    const max = result.size < 5 ? result.size : 5

    for (let i = 0; i < max; i++) {
      if (arr[i][0] !== undefined) {
        state.bests.set(arr[i][0], arr[i][1])
        result.delete(arr[i][0])
      }
    }

    state.words = result
  }
</script>
