<template>
  <div
    v-motion
    :initial="{ opacity: 0, y: 50 }"
    :enter="{ opacity: 1, y: 0, transition: { delay: 0 } }"
    class="flex items-center flex-col w-full md:w-3/5 xl:w-1/3 bg-black-opacity shadow-lg p-5"
  >
    <IconClose
      class="absolute wb-icon right-5 w-6 h-6"
      @click.prevent.stop="emit('close')"
    />
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
        :placeholder="t('landing.auth.emailPlaceholder')"
        class="w-full p-3 rounded bg-gray-900"
      />
      <input
        v-model="user.password"
        type="password"
        autocomplete="on"
        :placeholder="t('landing.auth.passwordPlaceholder')"
        class="w-full p-3 rounded bg-gray-900"
      />
      <div class="flex gap-2 items-center w-full">
        <input v-model="user.termsOfUse" type="checkbox" />
        <p>
          {{ t('landing.auth.terms.text')
          }}<span
            class="underline font-bold tracking-wide cursor-pointer"
            @click.prevent.stop="router.push('terms-of-use')"
            >{{ t('landing.auth.terms.link') }}</span
          >
        </p>
      </div>
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
          {{
            error.$propertyPath === 'termsOfUse'
              ? t('landing.auth.termsError')
              : ''
          }}
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
        <p>{{ t('landing.auth.enter') }}</p>
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
    <EditorAuthIntegrations
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
  import { useRouter } from 'vue-router'

  const supabase = useSupabase()
  const router = useRouter()
  const { t } = useI18n()
  const emit = defineEmits(['close'])

  const verification = ref<boolean>(false)
  const user = reactive({
    email: '' as string,
    password: '' as string,
    termsOfUse: false as boolean,
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
    termsOfUse: {
      checked: (checked) => checked === true,
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
