<template>
  <div
    class="
      absolute
      top-1/2
      left-1/2
      transform
      duration-700
      -translate-x-1/2 -translate-y-1/2
      w-60
      bg-white
      dark:bg-gray-700
      p-2
      rounded
      transition
      shadow-2xl
    "
  >
    <div class="flex flex-col w-60 p-3" @keypress.enter.prevent="onSwitcherAll">
      <input
        v-model="state.entry"
        class="bg-transparent border border-gray-800 mb-1 wb-text"
        placeholder="Entry"
      />
      <input
        v-model="state.output"
        class="bg-transparent border border-gray-800 wb-text"
        placeholder="Output"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useEntity } from '@/use/entity'
  import { reactive } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useStore } from 'vuex'

  const { t } = useI18n()
  const store = useStore()

  const state = reactive({
    entry: '' as string,
    output: '' as string,
  })

  const onSwitcherAll = () => {
    useEntity().switcherText(store, state.entry, state.output)
  }
</script>
