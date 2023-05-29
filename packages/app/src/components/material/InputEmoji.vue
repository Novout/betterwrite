<template>
  <div ref="icon">
    <img v-if="props.modelValue?.startsWith('data:image/')" class="cursor-pointer w-5 h-5" :src="props.modelValue" @click="toggle(true)"/>
    <p v-else class="cursor-pointer"  @click="toggle(true)">{{ props.modelValue }}</p>
    <button v-if="!props.modelValue" class="flex cursor-pointer items-center justify-center" @click="toggle(true)">
      <slot />
    </button>
    <div v-if="value" class="flex relative left-10 items-center p-2 flex-col bg-theme-background-3 wb-text">
      <button class="bg-theme-background-2 hover:bg-theme-background-4 transition-colors cursor-pointer rounded shadow p-2 font-raleway text-sm cursor-pointer" @click.prevent.stop="onImage">{{ t('editor.schemas.icon.import') }}</button>
      <p class="my-2">{{ t('editor.schemas.icon.or') }}</p>
      <EmojiPicker :native="true" :disable-sticky-group-names="true" :hide-search="true" :disable-skin-tones="true" :hide-group-names="true" :hide-group-items="true" :display-recent="false" @select="onEmoji" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useEditorStore } from '@/store/editor';
  import { onClickOutside, useToggle } from '@vueuse/core'
  import { getImageFileRaw } from 'better-write-image-converter';
  import { Maybe } from 'better-write-types'
  import { ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useToast } from 'vue-toastification';
  import EmojiPicker from 'vue3-emoji-picker'

  const EDITOR = useEditorStore()

  const props = defineProps<{
    modelValue: Maybe<string>
  }>()
  const toast = useToast()
  const { t } = useI18n()

  const emit = defineEmits(['update:modelValue'])

  const [value, toggle] = useToggle(false)

  const icon = ref<HTMLElement | null>(null)

  onClickOutside(icon, () => {
    toggle(false)
  })

  const onImage = () => {
    getImageFileRaw({
      compress: EDITOR.configuration.compressFiles,
    })
      .then(async ({ raw, fileSize }) => {
        toggle()

        if (fileSize > 5000000) {
          toast.error(t('toast.image.limitFileSize', { limit: '5' }))

          return
        }

        emit('update:modelValue', raw)
      })
      .catch(() => {})
  }

  const onEmoji = (payload) => {
    toggle()

    emit('update:modelValue', payload.i)
  }
</script>
