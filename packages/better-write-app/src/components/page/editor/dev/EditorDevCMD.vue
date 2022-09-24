<template>
  <div
    class="flex text-white flex-col gap-3 rounded-br absolute left-0 top-0 z-umax p-10 bg-theme-background-opacity-1"
  >
    <div class="flex items-center justify-between bg-theme-background-2 w-full">
      <p class="font-bold pointer-events-none">Dev MODE</p>
      <div @click="ABSOLUTE.cmd = false">
        <IconClose class="w-6 h-6 wb-icon" />
      </div>
    </div>
    <div>
      <div
        v-for="(command, index) in populate.cmd()"
        :key="index"
        class="flex flex-col bg-theme-background-1"
      >
        <p class="font-raleway pointer-events-none">{{ command }}</p>
      </div>
    </div>
    <InputText
      v-model="entry"
      class="bg-theme-background-2 mt-5"
      @keypress.enter="onEmit"
    />
  </div>
</template>

<script setup lang="ts">
  import { useAbsoluteStore } from '@/store/absolute'
  import { useDev } from '@/use/dev'
  import { usePopulate } from '@/use/populate'
  import { ref } from 'vue'

  const ABSOLUTE = useAbsoluteStore()

  const dev = useDev()
  const populate = usePopulate()

  const entry = ref('')

  const onEmit = () => {
    if (entry.value) dev.cmd(entry.value)

    entry.value = ''
  }
</script>
