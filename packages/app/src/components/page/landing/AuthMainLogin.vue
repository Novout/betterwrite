<template>
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
      class="w-full p-3 rounded bg-gray-900 border-none"
    />
    <input
      v-model="user.password"
      type="password"
      autocomplete="on"
      :placeholder="t('landing.auth.passwordPlaceholder')"
      class="w-full p-3 rounded bg-gray-900 border-none"
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
        {{
          error.$propertyPath === 'termsOfUse'
            ? t('landing.auth.termsError')
            : ''
        }}
      </div>
    </div>
    <button
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
</template>

<script setup lang="ts">
  import { computed, reactive } from 'vue'
  import { useVuelidate } from '@vuelidate/core'
  import { minLength, required, email } from '@vuelidate/validators'
  import { useI18n } from 'vue-i18n'
  import { useNProgress } from '@vueuse/integrations/useNProgress'
  import { useToast } from 'vue-toastification'
  import { usePlugin } from 'better-write-plugin-core'

  const plugin = usePlugin()
  const { t } = useI18n()
  const toast = useToast()
  const { isLoading } = useNProgress()

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
      minLength: minLength(6),
    },
  }))

  const v = useVuelidate(rules, user)

  const onSubmit = () => {
    if (v.value.$invalid) {
      v.value.$touch()

      return
    }

    isLoading.value = true

    toast.info(t('toast.generics.load'))

    plugin.emit('plugin-oauth-login', {
      email: user.email,
      password: user.password,
    })
  }
</script>
