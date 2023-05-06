<template>
  <section class="flex mx-2 h-8">
    <img v-if="props.src" class="mx-1" :src="props.src" />
    <section class="flex flex-row">
      <label
        :for="`input-file-${props.id}`"
        :class="width"
        class="flex items-center p-1 justify-center rounded cursor-pointer wb-text border-2 border-theme-background-4"
      >
        <HeroIcon class="wb-icon pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </HeroIcon>
      </label>
      <input
        :id="`input-file-${props.id}`"
        ref="inp"
        class="opacity-0 absolute z-min"
        type="file"
        @change.prevent="onChange"
      />
      <HeroIcon
        v-if="props.src"
        class="wb-icon"
        @click.prevent.stop="onDeleteBase64"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </HeroIcon>
    </section>
  </section>
</template>

<script setup lang="ts">
  import { useEditorStore } from '@/store/editor'
  import { getImageFileRaw } from 'better-write-image-converter'
  import { ref } from 'vue'

  const EDITOR = useEditorStore()

  const inp = ref<HTMLElement | null>(null as any)

  const emit = defineEmits(['load', 'error', 'exclude'])

  const props = defineProps({
    id: {
      required: false,
      type: String,
      default: 'Inserir Imagem',
    },
    width: {
      required: false,
      type: String,
      default: 'w-32',
    },
    src: {
      required: true,
      type: String,
    },
  })

  const onChange = () => {
    getImageFileRaw({ compress: EDITOR.configuration.compressFiles })
      .then(({ raw }) => {
        emit('load', raw)
      })
      .catch(() => {})
  }

  const onDeleteBase64 = () => {
    emit('exclude')
  }
</script>
