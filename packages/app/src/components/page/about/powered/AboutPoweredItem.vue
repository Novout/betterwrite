<template>
  <div
v-motion
        :initial="{
          y: 15,
        }"
        :visible="{
          y: 0,
          transition: {
            duration: 1200,
            repeat: Infinity,
            repeatType: 'mirror',
          },
        }" :style="{ backgroundColor: bg }" class="cursor-pointer z-50 p-5 w-40 h-45 flex gap-2 flex-col items-center justify-center rounded shadow-xl" @click="onOpen">
    <div>
      <slot />
    </div>
    <p :style="{ color: text }" class="font-bold font-poppins text-xl text-center">{{ name }}</p>
  </div>
</template>

<script setup lang="ts">
const { bg, text, name, link } = defineProps<{
  bg: string,
  text: string,
  name: string
  link: string
}>()

const onOpen = () => {
  window.open(link, '_blank');
}
</script>