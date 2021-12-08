<template>
  <Modal @close="onClose">
    <div
      ref="corrector"
      :style="style"
      class="fixed flex flex-col w-3/4 md:w-1/2 h-3/4 bg-theme-background-1 wb-text rounded shadow-2xl p-5 overflow-y-auto"
    >
      <EditorAbsoluteHeader class="pl-5" :title="'Corretor'" @close="onClose" />
      <div class="flex flex-wrap flex-1 flex-col-reverse lg:flex-row mt-5">
        <div class="flex flex-1 flex-col p-5">
          <EditorProjectCorrectorRow
            v-for="(rule, index) in ADDONS.corrector.options"
            :key="index"
            :title="t(rule.title)"
            @click="onSet(rule)"
          >
            <InputBoolean v-model="rule.option" />
          </EditorProjectCorrectorRow>
        </div>
        <div class="flex justify-start flex-1 flex-col p-3">
          <div class="w-full">
            <h2 class="font-bold text-lg lg:text-xl">{{ t(set.title) }}</h2>
            <p class="mt-3">{{ t(set.description) }}</p>
          </div>
          <div class="flex flex-1 flex-col justify-cente mt-5">
            <div class="w-full my-2 bg-theme-background-2 shadow-lg">
              <p class="p-2 text-lg text-justify" v-html="set.html.before" />
            </div>
            <HeroIcon
              class="py-2 flex items-center justify-center pointer-events-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                aria-hidden="true"
                role="img"
                class="iconify iconify--mdi"
                width="32"
                height="32"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24"
              >
                <path
                  d="M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5m8 1v8.5L7.5 11l-1.42 1.42L12 18.34l5.92-5.92L16.5 11L13 14.5V6h-2z"
                  fill="currentColor"
                ></path>
              </svg>
            </HeroIcon>
            <div class="w-full mt-4 bg-theme-background-2 shadow-lg">
              <p class="p-2 text-lg text-justify" v-html="set.html.after" />
            </div>
          </div>
          <div class="flex justify-end mt-5">
            <button
              class="rounded-full px-4 py-2 bg-theme-background-2 font-bold text-lg transition-all active:bg-theme-background-4"
              @click="convertor.apply"
            >
              {{ t('editor.addons.corrector.convert') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
  import { useAbsoluteStore } from '@/store/absolute'
  import { useAddonsStore } from '@/store/addons'
  import { onClickOutside, MaybeElementRef, useDraggable } from '@vueuse/core'
  import { ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { AddonsCorrectorOption } from '@/types/addons'
  import { useCorrector } from '@/use/corrector'

  const ABSOLUTE = useAbsoluteStore()
  const ADDONS = useAddonsStore()

  const convertor = useCorrector()
  const { t } = useI18n()

  const corrector = ref<HTMLElement | null>(null)
  const set = ref<AddonsCorrectorOption>(ADDONS.corrector.options[0])

  const { style } = useDraggable(corrector as any, {
    initialValue: { x: window.innerWidth / 4, y: window.innerHeight / 6 },
  })

  onClickOutside(corrector as MaybeElementRef, () => {
    onClose()
  })

  const onClose = () => {
    ABSOLUTE.project.corrector = false
  }

  const onSet = (option: AddonsCorrectorOption) => {
    set.value = option
  }
</script>
