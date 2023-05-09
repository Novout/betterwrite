<template>
  <div
    v-if="presence.length > 0"
    :style="[
      LIVESHARE.activeColor
        ? { border: `1px solid ${LIVESHARE.activeColor}` }
        : {},
    ]"
    class="flex px-2 cursor-pointer items-center gap-2"
    @click.prevent.stop="ABSOLUTE.modal.presence.info = true"
  >
    <div :style="{ backgroundColor: '#FF0000' }" class="rounded-full w-3 h-3" />
    <p>{{ t('editor.presence.bar.liveshare') }}</p>
  </div>
</template>

<script setup lang="ts">
  import { useAbsoluteStore } from '@/store/absolute'
  import { useLiveshareStore } from '@/store/liveshare'
  import { computed } from 'vue'
  import { useI18n } from 'vue-i18n'

  const LIVESHARE = useLiveshareStore()
  const ABSOLUTE = useAbsoluteStore()

  const { t } = useI18n()

  const presence = computed({
    get() {
      return Object.entries(LIVESHARE.presence)
    },
    set(value) {
      return value
    },
  })
</script>
