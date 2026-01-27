<template>
  <div class="rounded-full" ref="container">
    <Button @click="onOpen" class="flex justify-center items-center rounded-full w-8">
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
            <IconClose class="h-6 sw-6" />
          </div>
        </Button>
        </div>
        <h4 class="font-poppins">{{ t('backend.title') }}</h4>
        <InputText :placeholder="t('backend.name')" class="bg-theme-background-3 hover:bg-theme-background-1 px-3 py-1 rounded-full" v-model="setter.name" />
        <InputText type="email" :placeholder="t('backend.email')" class="bg-theme-background-3 hover:bg-theme-background-1 px-3 py-1 rounded-full" v-model="setter.email" />
        <InputText type="password" :placeholder="t('backend.password')" class="bg-theme-background-3 hover:bg-theme-background-1 px-3 py-1 rounded-full" v-model="setter.password" />
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
    <div
      v-else-if="AUTH.user && all"
      class="wb-text bg-theme-background-2 p-5 w-full mt-30 gap-5 text-xs flex flex-col text-center items-center justify-center"
    >
    <div class="flex mt-10 p-5 flex-col gap-8 w-full">
      <div class="flex w-full justify-end items-center">
        <div @click="onClose" class="rounded-full wb-icon w-8 shadow-xl">
          <IconClose class="h-6 w-6" />
        </div>
      </div>
      <h2 class="text-lg">{{ AUTH.user.name }}</h2>
      <h2 class="text-lg">{{ AUTH.user.email }}</h2>
      <h2 class="text-lg">Level {{ AUTH.user.level }}  |  {{ AUTH.user.acc }} XP</h2>
    </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useAuthStore } from '@/store/auth'
  import { useEnv } from '@/use/env'
  import { onClickOutside } from '@vueuse/core'
  import { reactive, ref, useTemplateRef } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useToast } from 'vue-toastification'

  const { t } = useI18n()
  const toast = useToast()
  const container = useTemplateRef('container')

  const AUTH = useAuthStore()

  const setter = reactive({
    name: '',
    email: '',
    password: ''
  })

  const env = useEnv()
  const open = ref(false)
  const all = ref(true)

  onClickOutside(container, () => {
    open.value = false
    all.value = false
  })

  const onClose = () => {
    open.value = false
    all.value = false
  }

  const onOpen = () => {
    open.value = true
    all.value = true
  }

  const onLoad = () => {
    toast.warning(t('backend.loadingUser'))

    fetch(`${env.api()}/login`, { method: 'POST',  body: new URLSearchParams({ name: setter.name, email: setter.email, password: setter.password })})
      .then((res) => res.json())
      .then(({ user }) => {
        AUTH.user = user
        open.value = false

        toast.success(t('backend.getUserSuccess'))
    }).catch(() => {
      fetch(`${env.api()}/user`, { method: 'GET',  body: new URLSearchParams({ email: setter.email, password: setter.password })})
        .then((res) => res.json())
        .then(({ user }) => {
           AUTH.user = user
           open.value = false

           toast.success(t('backend.getUserSuccess'))
        }).catch(() => {
          toast.error(t('backend.getUserError'))
        })
    }).catch(() => {
      toast.error(t('backend.getUserError'))
    })
  }
</script>
