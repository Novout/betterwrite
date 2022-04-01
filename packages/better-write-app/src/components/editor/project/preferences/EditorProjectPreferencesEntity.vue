<template>
  <div class="flex flex-col w-full p-1 my-8 shadow-lg lg:w-1/2">
    <h3 class="text-2xl font-bold text-theme-text-2">
      {{ t('editor.aside.configuration.entity.title') }}
    </h3>
    <div class="wb-configuration">
      <p>{{ t('editor.aside.configuration.autosave') }}</p>
      <InputSelect v-model="auto" :arr="[1, 2, 5, 15, 30, 'never']" />
    </div>
    <!-- DEPRECATED -->
    <div v-if="false" class="wb-configuration">
      <p>{{ t('editor.aside.configuration.entity.updateTime') }}</p>
      <InputBoolean
        v-model="EDITOR.configuration.entity.updateTime"
        :specific="true"
      />
    </div>
    <div class="wb-configuration">
      <p>{{ t('editor.aside.configuration.bars') }}</p>
      <InputBoolean v-model="EDITOR.configuration.bars" :specific="true" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useEditorStore } from '@/store/editor'
  import { useLocalStorage } from '@/use/storage/local'

  import { ref, watch, nextTick } from 'vue'
  import { useI18n } from 'vue-i18n'

  const EDITOR = useEditorStore()

  const { t } = useI18n()

  const local = useLocalStorage()

  const auto = ref(EDITOR.configuration.auto)

  watch(auto, async (_auto) => {
    EDITOR.setAutoSave(_auto)

    await nextTick

    local.onSaveProject().then(() => {
      window.location.reload()
    })
  })
</script>
