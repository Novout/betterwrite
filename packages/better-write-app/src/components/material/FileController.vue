<template>
  <div class="flex items-center gap-2">
    <p class="font-poppins font-bold text-lg wb-text">
      {{ t('generator.generics.settings') }}
    </p>
    <Button @click.prevent.stop="importer()">
      <template #icon>
        <IconImport class="w-5 h-5 wb-text" />
      </template>
      <p class="font-raleway">
        {{ t('editor.material.fileController.import') }}
      </p>
    </Button>
    <Button @click.prevent.stop="exporter()">
      <template #icon>
        <IconExport class="w-5 h-5 wb-text" />
      </template>
      <p class="font-raleway">
        {{ t('editor.material.fileController.export') }}
      </p>
    </Button>
  </div>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n'

  defineProps<{
    importer: () => void
    exporter: () => void
  }>()

  const { t } = useI18n()
</script>
