<template>
  <Modal @close="onClose">
    <div
      ref="main"
      :style="style"
      :class="[!mobile ? 'fixed' : '']"
      class="flex z-20 p-10 flex-col w-full bg-rgba-blur lg:w-1/2 h-full lg:h-3/4 bg-theme-background-1 wb-text overflow-x-hidden overflow-y-auto rounded shadow-2xl wb-scroll"
    >
      <EditorAbsoluteHeader :title="t('editor.schemas.create.templates.title')" @close="onClose" />
      <p class="mb-10 font-raleway text-lg">{{ t('editor.schemas.create.templates.description')}}</p>
      <form class="flex flex-col gap-10 w-full" @submit.prevent.stop="">
        <div class="flex flex-col gap-2">
          <label class="text-lg font-bold font-poppins">{{ t('editor.schemas.create.type')}}</label>
          <p class="text-md mb-5 font-raleway">{{ t('editor.schemas.create.typeDescription')}}</p>
          <div class="flex items-center gap-2">
            <InputSelect v-model="type" class="w-36" :arr="defines.schemas().templatesType()" />
            <p v-if="setter === 'simple'" class="font-bold">{{ t('editor.schemas.create.templates.simple.description')}}</p>
            <p v-else-if="setter === 'enthusiast'" class="font-bold">{{ t('editor.schemas.create.templates.enthusiast.description')}}</p>
          </div>
        </div>
        <Button @click.prevent.stop="onCreate">{{ t('editor.schemas.create.templates.button')}}</Button>
      </form>
    </div>
  </Modal>
</template>

<script setup lang="ts">
  import { useAbsoluteStore } from '@/store/absolute'
  import { useDefines } from '@/use/defines'
  import { useTransformer } from '@/use/generator/transformer'
  import { onClickOutside, useDraggable } from '@vueuse/core'
  import { computed, ref } from 'vue'
  import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
  import { useI18n } from 'vue-i18n'
  import { useProjectStore } from '@/store/project'

  const ABSOLUTE = useAbsoluteStore()
  const PROJECT = useProjectStore()

  const { t } = useI18n()
  const transformer = useTransformer()
  const defines = useDefines()

  const type = ref<string>(transformer.schemas().template('simple', 'getter'))

  const setter = computed(() => transformer.schemas().template(type.value, 'setter'))

  const breakpoints = useBreakpoints(breakpointsTailwind)
  const mobile = breakpoints.isSmaller('lg')

  const main = ref<HTMLElement | null>(null)
  const isHoveredHeader = ref(false)

  const { style } = useDraggable(main, {
    initialValue: { x: window.innerWidth / 4, y: window.innerHeight / 6 },
    onStart: () => {
      if (!isHoveredHeader.value) return false
    },
  })

  onClickOutside(main, () => {
    onClose()
  })

  const onClose = () => {
    ABSOLUTE.schemas.template = false
  }

  const onCreate = () => {
    const template = transformer.schemas().template(type.value, 'setter') as any

    const target = defines.schemas().template(template)

    PROJECT.schemas.unshift(...target)
  }
</script>
