<template>
  <Modal @close="onClose">
    <div class="flex items-center justify-center w-full h-screen bg-modal">
      <div
        ref="main"
        class="left-0 font-raleway gap-10 top-0 p-5 flex z-max flex-col w-full bg-rgba-blur lg:w-1/2 h-full lg:h-3/4 bg-theme-background-1 wb-text wb-scroll overflow-y-auto rounded shadow-2xl wb-scroll"
      >
        <EditorAbsoluteHeader :title="t('editor.presence.create.title')" @close="onClose" />
        <p>{{ t('editor.presence.create.description') }}</p>
        <div class="flex flex-col sm:flex-row gap-5 w-full items-center justify-between">
          <button :class="[wizard === 'create' ? 'bg-theme-background-3' : 'bg-theme-background-2']" class="flex-1 py-2 w-full" @click="wizard = 'create'">Criar</button>
          <button :class="[wizard === 'enter' ? 'bg-theme-background-3' : 'bg-theme-background-2']" class="flex-1 py-2 w-full" @click="wizard = 'enter'">Entrar</button>
        </div>
        <div v-if="wizard === 'create'" class="flex flex-col gap-2">
          <h2 class="text-lg font-bold font-poppins">{{ t('editor.presence.create.new') }}</h2>
          <button v-if="!key" class="w-full p-2 bg-theme-background-2" @click.prevent.stop="onCreateRoom">{{ t('editor.presence.create.button') }}</button>
          <div v-if="key" class="flex w-full items-center rounded-full p-1 justify-between">
            <p class="font-bold text-lg">{{ key }}</p>
            <button class="wb-icon" @click.prevent.stop="onCopy">
              <IconCopyLink class="w-6 h-6" />
            </button>
          </div>
        </div>
        <div v-if="wizard === 'enter'" class="flex flex-col gap-2">
          <h2 class="text-lg font-bold font-poppins">{{ t('editor.presence.create.enterInput') }}</h2>
          <InputText v-model="room" :placeholder="t('editor.presence.create.enterPlaceholder')" class="bg-transparent font-bold border-theme-border-1 border-2 w-full p-2 rounded" @keyup.enter="onJoinRoom" />
        </div>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
  import { useAbsoluteStore } from '@/store/absolute'
  import { useClipboard } from '@vueuse/core'
  import { usePlugin } from 'better-write-plugin-core'
  import { onMounted, ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useToast } from 'vue-toastification'

  const ABSOLUTE = useAbsoluteStore()

  const room = ref<string>('')
  const key = ref<string>('')
  const wizard = ref<'create' | 'enter'>('create')

  const { t } = useI18n()
  const plugin = usePlugin()
  const toast = useToast()
  const { copy, isSupported } = useClipboard({ source: key })

  onMounted(() => {
    plugin.on('plugin-presence-room-create-key', (id: string) => {
      key.value = id
    })
  })

  const onCreateRoom = () => {
    if(key.value) return

    plugin.emit('plugin-presence-room-create')
  }

  const onJoinRoom = () => {
    if(room.value.length !== 30 || room.value === key.value) return

    plugin.emit('plugin-presence-room-join', room.value)

    room.value = ''
  }

  const onClose = () => {
    ABSOLUTE.modal.presence.createOrJoin = false
  }

  const onCopy = async () => {
    if(isSupported.value) {
      await copy()

      toast.success(t('toast.generics.copy'))
    }
  }
</script>
