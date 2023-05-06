<template>
  <Modal @close="onClose">
    <div class="flex items-center justify-center w-full h-screen bg-modal">
      <div
        ref="main"
        class="left-0 top-0 p-5 flex z-max flex-col w-full bg-rgba-blur lg:w-1/2 h-full lg:h-3/4 bg-theme-background-1 wb-text wb-scroll overflow-y-auto rounded shadow-2xl wb-scroll"
      >
        <EditorAbsoluteHeader
          :title="
            t('editor.presence.info.title') +
            ` - ${presence.length} / ${LIVESHARE.presenceLimit}`
          "
          @close="onClose"
        />
        <div
          v-if="presence.length > 0"
          class="flex mt-5 flex-col gap-5"
          @click.prevent.stop="ABSOLUTE.modal.presence.info = true"
        >
          <h2 class="text-lg font-bold">Chave da Sala:</h2>
          <EditorProjectPresenceKey :id="LIVESHARE.roomKey" />
          <h2 class="text-lg font-bold">Usuários Conectados:</h2>
          <div
            v-for="[index, [user]] in presence"
            :key="index"
            class="flex border-3 rounded-full shadow-lg p-2 justify-between items-center w-full"
            :style="{ borderColor: user.color }"
          >
            <div class="flex items-center justify-between w-full gap-5">
              <div class="flex gap-2">
                <img
                  v-if="user.avatar_url"
                  class="bg-cover rounded-full h-8 w-8"
                  :src="user.avatar_url"
                />
                <p
                  class="flex items-center truncate justify-center font-bold font-raleway rounded-full wb-text text-sm h-8 sm:text-lg"
                >
                  {{ user.id }}
                </p>
              </div>
              <EditorProjectPresenceInformationType :type="user.type" />
            </div>
          </div>
        </div>
        <Button
          @click="plugin.emit('plugin-presence-room-leave', LIVESHARE.roomKey)"
          >{{ t('editor.presence.info.leave') }}</Button
        >
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import { useAbsoluteStore } from '@/store/absolute'
  import { useLiveshareStore } from '@/store/liveshare'
  import { computed } from 'vue'
  import { usePlugin } from 'better-write-plugin-core'

  const ABSOLUTE = useAbsoluteStore()
  const LIVESHARE = useLiveshareStore()

  const { t } = useI18n()
  const plugin = usePlugin()

  const presence = computed({
    get() {
      return Object.entries(LIVESHARE.presence)
    },
    set(value) {
      return value
    },
  })

  const onClose = () => {
    ABSOLUTE.modal.presence.info = false
  }
</script>
