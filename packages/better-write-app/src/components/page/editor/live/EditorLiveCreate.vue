<template>
  <Modal @close="onClose">
    <div
      ref="base"
      :style="style"
      class="fixed flex gap-5 flex-col w-3/4 md:w-1/2 bg-theme-background-1 wb-text rounded shadow-2xl p-5 overflow-y-auto wb-scroll"
    >
      <EditorAbsoluteHeader
        class="pl-5"
        :title="t('editor.live.create.title')"
        @close="onClose"
      />
      <p class="text-lg">{{ t('editor.live.create.description') }}</p>
      <Button
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 200,
          },
        }"
        @click.prevent.stop="plugin.emit('plugin-multiplayer-create')"
        >{{ t('editor.live.create.button') }}</Button
      >
      <div
        v-if="id"
        v-motion
        :initial="{ opacity: 0 }"
        :enter="{
          opacity: 1,
          transition: {
            delay: 50,
            duration: 300,
          },
        }"
        class="flex gap-1 flex-col w-full"
      >
        <p>{{ t('editor.live.create.code') }}</p>
        <div
          class="flex items-center justify-between w-full p-3 bg-theme-background-3"
        >
          <p>{{ id }}</p>
          <IconClipboard
            class="w-6 h-6 wb-icon cursor-pointer"
            @click.prevent.stop="onClipboard"
          />
        </div>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
  import { useAbsoluteStore } from '@/store/absolute'
  import { useAuthStore } from '@/store/auth'
  import { onClickOutside, useClipboard, useDraggable } from '@vueuse/core'
  import { useNProgress } from '@vueuse/integrations/useNProgress'
  import { usePlugin } from 'better-write-plugin-core'
  import { ID } from 'better-write-types'
  import { onMounted, ref, nextTick } from 'vue'
  import { useI18n } from 'vue-i18n'

  const ABSOLUTE = useAbsoluteStore()
  const AUTH = useAuthStore()

  const { t } = useI18n()
  const plugin = usePlugin()
  const clipboard = useClipboard()
  const { isLoading } = useNProgress()

  const id = ref<ID<string> | null>(null)
  const base = ref<HTMLElement | null>(null)

  const { style } = useDraggable(base as any, {
    initialValue: { x: window.innerWidth / 4, y: window.innerHeight / 3 },
  })

  onClickOutside(base as any, () => {
    onClose()
  })

  const onClose = () => {
    ABSOLUTE.live.create = false
  }

  onMounted(() => {
    plugin.on('plugin-multiplayer-room-id', (_id: ID<string>) => {
      id.value = _id

      AUTH.account.multiplayer.connect = {
        key: _id,
        type: 'owner',
      }
    })
  })

  const onClipboard = async () => {
    isLoading.value = true

    await nextTick

    clipboard.copy((id.value as string) || '')

    isLoading.value = false
  }
</script>
