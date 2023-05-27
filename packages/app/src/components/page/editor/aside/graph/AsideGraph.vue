<template>
  <div class="flex z-30 px-2 flex-col w-full">
    <div class="flex flex-row-reverse items-center justify-between mb-5 mt-2">
      <IconGraphClose
        v-if="PROJECT.type !== 'blank'"
        class="wb-icon w-12 h-12 md:(w-9 h-9)"
        @click.prevent.stop="ABSOLUTE.aside = false"
      />
      <InputText
        v-model="PROJECT.nameRaw"
        class="wb-text bg-transparent py-0.5 rounded hover:bg-theme-background-opacity-1 focus:bg-theme-background-opacity-1 font-bold w-2/3 text-left truncate"
      />
    </div>
    <AsideGraphChapters v-if="PROJECT.type !== 'only-annotations'" />
    <AsideGraphSchemas />
  </div>
</template>

<script setup lang="ts">
  import { useAbsoluteStore } from '@/store/absolute'
  import { useProjectStore } from '@/store/project'
  import { useUtils } from '@/use/utils'
  import { computed, watch } from 'vue'

  const PROJECT = useProjectStore()
  const ABSOLUTE = useAbsoluteStore()

  const utils = useUtils()

  const name = computed(() => PROJECT.nameRaw)

  watch(name, () => {
    PROJECT.name = utils.text().kebab(PROJECT.nameRaw)
  })
</script>
