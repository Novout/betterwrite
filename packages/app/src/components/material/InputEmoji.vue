<template>
  <div class="cursor-pointer">
    <p @click="toggle(true)">{{ props.modelValue }}</p>
    <button v-if="!props.modelValue" class="flex items-center justify-center" @click="toggle(true)">
      <slot />
    </button>
    <EmojiPicker v-if="value" :native="true" :disable-sticky-group-names="true" :hide-search="true" :disable-skin-tones="true" :hide-group-names="true" :hide-group-items="true" :display-recent="false" @select="onEmoji" />
  </div>
</template>

<script setup lang="ts">
  import { useToggle } from '@vueuse/core'
  import { Maybe } from 'better-write-types'
  import EmojiPicker from 'vue3-emoji-picker'

  const props = defineProps<{
    modelValue: Maybe<string>
  }>()

  const emit = defineEmits(['update:modelValue'])

  const [value, toggle] = useToggle(false)

  const onEmoji = (payload) => {
    toggle()

    emit('update:modelValue', payload.i)
  }
</script>
