<template>
  <div class="flex gap-2">
    <Button @click.prevent.stop="importer()">
      <template #icon>
        <IconImport class="w-5 h-5 wb-text" />
      </template>
      <p>Importar</p>
    </Button>
    <Button @click.prevent.stop="exporter()">
      <template #icon>
        <IconExport class="w-5 h-5 wb-text" />
      </template>
      <p>Exportar</p>
    </Button>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    importer: () => void
    exporter: () => void
  }>()
</script>
