<template>
  <Modal @close="onClose">
    <div
      ref="main"
      :style="style"
      :class="[!mobile ? 'fixed' : '']"
      class="flex z-20 p-10 flex-col w-full bg-rgba-blur lg:w-1/2 h-full lg:h-3/4 bg-theme-background-1 wb-text overflow-x-hidden overflow-y-auto rounded shadow-2xl wb-scroll"
    >
      <EditorAbsoluteHeader :title="t('editor.schemas.create.title')" @close="onClose" />
      <p class="mb-10 font-raleway text-lg">{{ t('editor.schemas.create.description')}}</p>
      <form class="flex flex-col gap-10 w-full" @submit.prevent.stop="">
        <div class="flex flex-col gap-2">
          <label class="text-lg font-bold font-poppins">{{ t('editor.schemas.create.name')}}</label>
          <InputText v-model="options.name" class="p-2 bg-theme-background-2 rounded shadow wb-text" />
        </div>
        <div class="flex flex-col gap-2">
          <label class="text-lg font-bold font-poppins">{{ t('editor.schemas.create.type')}}</label>
          <p>{{ t('editor.schemas.create.typeDescription')}}</p>
          <div class="flex items-center gap-2">
            <InputSelect v-model="options.type" class="w-36" :arr="[t('editor.schemas.types.default.target'), t('editor.schemas.types.characters.target')]" />
            <p v-if="setter === 'default'">{{ t('editor.schemas.types.default.description')}}</p>
            <p v-else-if="setter === 'characters'">{{ t('editor.schemas.types.characters.description')}}</p>
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <label class="text-lg font-bold font-poppins">{{ t('editor.schemas.create.prefix')}}</label>
          <p>{{ t('editor.schemas.create.prefixDescription')}}</p>
          <InputChar v-model="options.prefix" />
        </div>
        <Button @click.prevent.stop="onCreate">{{ t('editor.schemas.create.button')}}</Button>
      </form>
    </div>
  </Modal>
</template>

<script setup lang="ts">
  import { useAbsoluteStore } from '@/store/absolute'
  import { useSchemas } from '@/use/schemas'
  import { useTransformer } from '@/use/generator/transformer'
  import { onClickOutside, useDraggable } from '@vueuse/core'
  import { computed, reactive, ref } from 'vue'
  import { useVuelidate } from '@vuelidate/core'
  import { minLength, required } from '@vuelidate/validators'
  import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
  import { ProjectStateSchemaCreate } from 'better-write-types'
  import { useI18n } from 'vue-i18n'

  const ABSOLUTE = useAbsoluteStore()

  const schemas = useSchemas()
  const { t } = useI18n()
  const transformer = useTransformer()

  const options = reactive<ProjectStateSchemaCreate>({ 
    type: transformer.schemas().type('default', 'getter') as any, 
    name: t('editor.schemas.create.nameItem'), 
    prefix: '/' 
  })

  const setter = computed(() => transformer.schemas().type(options.type, 'setter'))

  const rules = computed(() => ({
    type: {
      required,
    },
    name: {
      required
    },
    prefix: {
      required,
      minLength: minLength(1),
    }
  }))

  const v = useVuelidate(rules, options)

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
    ABSOLUTE.schemas.create = false
  }

  const onCreate = () => {
    if (v.value.$invalid) {
      v.value.$touch()

      return
    }

    options.type = transformer.schemas().type(options.type, 'setter') as any

    schemas.onSchemaCreate(options)
  }
</script>
