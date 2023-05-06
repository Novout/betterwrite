<template>
  <Modal @close="onClose">
    <div class="flex items-center justify-center w-full h-screen bg-modal">
      <div
        ref="main"
        class="left-0 font-raleway gap-10 top-0 p-5 flex z-max flex-col w-full bg-rgba-blur lg:w-1/2 h-full lg:h-3/4 bg-theme-background-1 wb-text wb-scroll overflow-y-auto rounded shadow-2xl wb-scroll"
      >
        <EditorAbsoluteHeader
          :title="t('editor.presence.create.title')"
          @close="onClose"
        />
        <p v-if="!key">{{ t('editor.presence.create.description') }}</p>
        <p v-if="!key" class="text-red-600 font-bold">{{ t('editor.presence.beta') }} </p>
        <div
          v-if="!key"
          class="flex flex-col sm:flex-row gap-5 w-full items-center justify-between"
        >
          <Button
            :class="[
              wizard === 'create'
                ? 'bg-theme-background-3'
                : 'bg-theme-background-2',
            ]"
            class="flex-1 py-2 w-full"
            @click="wizard = 'create'"
            >{{ t('editor.presence.info.create') }}</Button
          >
          <Button
            :class="[
              wizard === 'enter'
                ? 'bg-theme-background-3'
                : 'bg-theme-background-2',
            ]"
            class="flex-1 py-2 w-full"
            @click="wizard = 'enter'"
            >{{ t('editor.presence.info.enter') }}</Button
          >
        </div>
        <div v-if="wizard === 'create'" class="flex flex-col gap-2">
          <h2 v-if="!key" class="text-lg font-bold font-poppins">
            {{ t('editor.presence.create.new') }}
          </h2>
          <div v-if="!key" class="flex gap-5 w-full">
            <InputSelect v-model="type" class="flex-1" :arr="defines.presence().roomType()"/>
            <div class="flex wb-text flex-1 text-justify flex-col gap-3 w-full">
              <p>{{ t('editor.presence.type.description.visit')}}</p>
              <p>{{ t('editor.presence.type.description.collaborator')}}</p>
            </div>
          </div>
          <Button
            v-if="!key"
            class="w-full p-2 bg-theme-background-2"
            @click.prevent.stop="onCreateRoom"
            >{{ t('editor.presence.create.button') }}</Button
          >
          <EditorProjectPresenceKey :id="key" />
        </div>
        <div v-if="wizard === 'enter'" class="flex flex-col gap-2">
          <h2 class="text-lg font-bold font-poppins">
            {{ t('editor.presence.create.enterInput') }}
          </h2>
          <InputText
            v-model="room"
            :placeholder="t('editor.presence.create.enterPlaceholder')"
            class="bg-transparent font-bold border-theme-border-1 border-2 w-full p-2 rounded"
            @keyup.enter="onJoinRoom"
          />
        </div>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
  import { useAbsoluteStore } from '@/store/absolute'
  import { useDefines } from '@/use/defines'
  import { useTransformer } from '@/use/generator/transformer'
  import { usePlugin } from 'better-write-plugin-core'
  import { LiveshareType } from 'better-write-types'
  import { onMounted, ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useToast } from 'vue-toastification'
  
  const defines = useDefines()

  const ABSOLUTE = useAbsoluteStore()

  const room = ref<string>('')
  const key = ref<string>('')
  const wizard = ref<'create' | 'enter'>('create')
  const type = ref(defines.presence().roomType()[0])

  const { t } = useI18n()
  const plugin = usePlugin()
  const toast = useToast()
  const transformer = useTransformer()

  onMounted(() => {
    plugin.on('plugin-presence-room-create-key', (id: string) => {
      key.value = id
    })
  })

  const onCreateRoom = () => {
    if (key.value) return

    const _type = transformer.presence().type(type.value, 'setter') as LiveshareType

    plugin.emit('plugin-presence-room-create', _type)
  }

  const onJoinRoom = () => {
    if (room.value.length !== 30 || room.value === key.value) {
      toast.error(t('toast.generics.error'))

      return
    }

    plugin.emit('plugin-presence-room-join', room.value)

    room.value = ''
  }

  const onClose = () => {
    ABSOLUTE.modal.presence.createOrJoin = false
  }
</script>
