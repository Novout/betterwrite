<template>
  <main class="wb-base flex justify-center items-center">
    <p class="wb-title">{{ test }}</p>
    <TextInput v-model="test" @input="handler" />
  </main>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()
  const test = ref('')

  const handler = () => {
    console.log(test.value)
  }
</script>
