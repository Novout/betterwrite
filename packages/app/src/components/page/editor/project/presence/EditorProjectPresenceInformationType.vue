<template>
  <div class="text-center font-raleway">
    <p
      v-if="type === 'owner'"
      :style="{ backgroundColor: '#500', borderColor: '#F00', color: '#F00' }"
      class="px-2 font-bold border-2 rounded-full"
    >
      {{ t('editor.presence.type.owner') }}
    </p>
    <p
      v-if="type === 'visit'"
      :style="{ backgroundColor: '#9A0', borderColor: '#FF0', color: '#FF0' }"
      class="px-2 font-bold border-2 rounded-full"
    >
      {{ t('editor.presence.type.visit') }}
    </p>
  </div>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n'

  defineProps<{
    type: 'owner' | 'visit'
  }>()

  const { t } = useI18n()
</script>
