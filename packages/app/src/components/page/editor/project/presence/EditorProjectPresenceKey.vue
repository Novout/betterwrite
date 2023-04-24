<template>
  <div v-if="props.id" class="flex w-full items-center rounded-full p-1 justify-between">
    <p :class="[blur ? 'filter blur' : '']" class="cursor-pointer font-bold text-lg" @click="blur = !blur">{{ props.id }}</p>
    <button class="wb-icon" @click.prevent.stop="onCopy">
      <IconCopyLink class="w-6 h-6" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { useClipboard } from "@vueuse/core"
import { ref } from "vue"
import { useI18n } from "vue-i18n"
import { useToast } from "vue-toastification"

const props = defineProps<{
  id: string
}>()

const toast = useToast()
const { t } = useI18n()

const blur = ref<boolean>(true)

const onCopy = async () => {
  const { copy, isSupported } = useClipboard({ source: props.id })

  if(isSupported.value) {
    await copy()

    toast.success(t('toast.generics.copy'))
  }
}
</script>