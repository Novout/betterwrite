<template>
  <div>
    <div id="bw-timeline" class="w-full wb-scroll overflow-auto"></div>
  </div>
</template>

<script setup lang="ts">
  import { useCanvasTimeline } from '@/use/canvas/timeline'
  import { onMounted } from 'vue'

  const timeline = useCanvasTimeline()

  onMounted(() => {
    timeline.start()
  })
</script>
