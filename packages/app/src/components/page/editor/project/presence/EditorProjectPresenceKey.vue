<template>
  <div v-if="props.id" class="flex flex-col gap-2 w-full">
    <p class="font-bold text-lg">{{ t('editor.presence.key.code') }}</p>
    <div class="flex w-full items-center rounded-full p-1 justify-between">
      <p
        :class="[blur ? 'filter blur' : '']"
        class="cursor-pointer font-bold text-lg"
        @click="blur = !blur"
      >
        {{ props.id }}
      </p>
      <button class="wb-icon" @click.prevent.stop="onCopy(false)">
        <IconCopyLink class="w-6 h-6" />
      </button>
    </div>
    <p class="font-bold text-lg mt-2">{{ t('editor.presence.key.link') }}</p>
    <div class="flex w-full items-center rounded-full p-1 justify-between">
      <p
        :class="[blurLink ? 'filter blur' : '']"
        class="cursor-pointer underline font-bold text-lg"
        @click="blurLink = !blurLink"
      >
        {{ pathLink }}
      </p>
      <button class="wb-icon" @click.prevent.stop="onCopy(true)">
        <IconCopyLink class="w-6 h-6" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useClipboard } from '@vueuse/core'
  import { computed, ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useToast } from 'vue-toastification'
  import { useEnv } from '@/use/env'

  const props = defineProps<{
    id: string
  }>()

  const toast = useToast()
  const { t } = useI18n()
  const env = useEnv()

  const blur = ref<boolean>(true)
  const blurLink = ref<boolean>(true)

  const pathLink = computed(
    () => `${env.getCorrectLocalUrl()}/?liveshare=${props.id}`
  )

  const onCopy = async (isLink = false) => {
    const { copy, isSupported } = useClipboard({
      source: isLink ? pathLink.value : props.id,
    })

    if (isSupported.value) {
      await copy()

      toast.success(t('toast.generics.copy'))
    }
  }
</script>
