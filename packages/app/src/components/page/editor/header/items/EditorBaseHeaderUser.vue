<template>
  <div>
    <Button @click="open = !open" class="flex justify-center items-center rounded-full w-8">
      <div class="rounded-full wb-icon w-8 shadow-xl">
        <IconUser class="h-8 w-8" />
      </div>
    </Button>
    <div
      v-if="open && !AUTH.user"
      class="wb-text bg-theme-background-2 p-5 w-full mt-5 gap-5 text-xs flex flex-col text-center items-center justify-center"
    >
    <div class="flex mt-100 p-5 flex-col gap-5 w-full">
        <div class="flex w-full justify-end">
           <Button @click="open = !open" class="flex justify-center items-center rounded-full w-8">
          <div class="rounded-full wb-icon w-8 shadow-xl">
            <IconClose class="h-8 w-8" />
          </div>
        </Button>
        </div>
        <h4 class="font-poppins">{{ t('backend.title') }}</h4>
        <InputText :placeholder="t('backend.email')" class="bg-theme-background-3 hover:bg-theme-background-1 px-3 py-1 rounded-full" v-model="setter.email" />
        <InputText :placeholder="t('backend.password')" class="bg-theme-background-3 hover:bg-theme-background-1 px-3 py-1 rounded-full" v-model="setter.password" />
        <Button @click="onLoad" class="bg-theme-background-3 text-md hover:bg-theme-background-4">{{ t('backend.start') }}</Button>
      </div>
      <router-link to="/terms-of-use" class="font-bold pt-10 cursor-pointer">{{
        t('editor.bar.help.terms')
      }}</router-link>
      <p>&</p>
      <router-link to="/privacy" class="font-bold cursor-pointer">{{
        t('editor.bar.help.privacy')
      }}</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useAuthStore } from '@/store/auth'
  import { reactive, ref } from 'vue'
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()

  const AUTH = useAuthStore()

  const setter = reactive({
    email: '',
    password: ''
  })
  const open = ref(false)

  const onLoad = () => {
    open.value = false
    // AUTH.user = payload
  }
</script>
