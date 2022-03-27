<template>
  <div
    v-motion
    :initial="{ opacity: 0, y: 50 }"
    :enter="{ opacity: 1, y: 0, transition: { delay: 0 } }"
    class="flex items-center flex-col w-full sm:w-1/2 md:w-1/3 bg-black-opacity shadow-lg p-5"
  >
    <img
      v-motion
      :initial="{ opacity: 0 }"
      :enter="{ opacity: 1, transition: { delay: 120 } }"
      alt="Better Write Logo"
      src="/logo_default.svg"
      class="my-5"
      width="50"
    />
    <form
      v-motion
      :initial="{ opacity: 0 }"
      :enter="{ opacity: 1, transition: { delay: 240 } }"
      class="flex flex-col w-full gap-5"
      @submit.prevent.stop="onSubmit"
    >
      <input
        v-model="user.email"
        type="email"
        placeholder="Email"
        class="w-full p-3 rounded bg-black-opacity"
      />
      <input
        v-model="user.password"
        type="password"
        autocomplete="current-password"
        placeholder="Senha"
        class="w-full p-3 rounded bg-black-opacity"
      />
      <div
        v-for="error of v.$errors"
        v-if="v.$errors"
        :key="error.$uid"
        class="flex flex-col"
      >
        <div
          v-motion
          :initial="{ opacity: 0, color: '#FF0000', y: 10 }"
          :enter="{
            opacity: 1,
            y: 0,
            color: '#FFF',
            transition: { delay: 0, duration: 500 },
          }"
          class="flex items-center gap-2"
        >
          <div
            :style="{ backgroundColor: 'red' }"
            class="w-2 h-2 rounded-full"
          ></div>
          {{ error.$propertyPath === 'email' && ((error.$params as any).type === 'email' || (error.$params as any).type === 'required') ? t('landing.auth.email') : '' }}
          {{ error.$propertyPath === 'password' && ((error.$params as any).type === 'minLength' || (error.$params as any).type === 'required') ? t('landing.auth.password', (error.$params as any).min) : '' }}
        </div>
      </div>
      <div v-if="verification" class="flex items-center gap-2 font-bold">
        <div
          :style="{ backgroundColor: '#F0E501' }"
          class="w-2 h-2 rounded-full"
        ></div>
        {{ t('landing.auth.verification') }}
      </div>
      <button
        v-if="!verification"
        v-motion
        :initial="{ opacity: 0 }"
        :enter="{ opacity: 1, transition: { delay: 360 } }"
        class="flex gap-1 items-center justify-center w-full p-2 mt-5 rounded bg-gray-900"
      >
        <p>Entrar</p>
        <HeroIcon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            class="iconify iconify--ic"
            width="32"
            height="32"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="m12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"
            ></path>
          </svg>
        </HeroIcon>
      </button>
    </form>
    <div
      v-motion
      :initial="{ opacity: 0, y: 10 }"
      :enter="{ opacity: 1, transition: { delay: 420 } }"
      class="flex justify-center font-thin items-center w-full mt-7 text-lg border-b"
    >
      {{ t('landing.auth.integration') }}
    </div>

    <AuthIntegrations
      v-motion
      :initial="{ opacity: 0, y: 10 }"
      :enter="{ opacity: 1, y: 0, transition: { delay: 480 } }"
    />
  </div>
</template>

<script setup lang="ts">
  import { useSupabase } from '@/use/storage/supabase'
  import { ref, computed, reactive } from 'vue'
  import { useVuelidate } from '@vuelidate/core'
  import { minLength, required, email } from '@vuelidate/validators'
  import { useI18n } from 'vue-i18n'

  const supabase = useSupabase()
  const { t } = useI18n()

  const verification = ref<boolean>(false)
  const user = reactive({
    email: '' as string,
    password: '' as string,
  })
  const rules = computed(() => ({
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(7),
    },
  }))

  const v = useVuelidate(rules, user)

  const onSubmit = () => {
    if (v.value.$invalid) {
      v.value.$touch()

      return
    }

    user.password = ''

    supabase.loginWithEmailAndPassword(user).then(() => {
      verification.value = true
    })
  }
</script>
