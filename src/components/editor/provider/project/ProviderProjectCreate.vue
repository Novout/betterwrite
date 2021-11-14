<template>
  <div
    id="pdf-absolute"
    class="
      absolute
      top-1/2
      left-1/2
      transform
      -translate-x-1/2 -translate-y-1/2
      overflow-y-auto
      duration-700
      bg-modal
      transition
      flex-col
      z-preview
      wb-text
      shadow-lg
      w-full
      h-screen
      flex
      justify-center
      items-center
    "
  >
    <div
      class="
        w-full
        md:w-1/2
        bg-theme-background-1
        h-screen
        md:h-3/4
        justify-between
        flex flex-col
        overflow-y-auto
        p-5
      "
    >
      <div class="flex w-full flex-row-reverse">
        <HeroIcon class="wb-icon" @click="ABSOLUTE.project.new = false">
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
      </div>
      <div class="flex flex-row flex-wrap justify-between w-full p-2">
        <div
          v-motion
          class="flex flex-1 flex-col p-3"
          :initial="{
            opacity: 0,
          }"
          :enter="{
            opacity: 1,
            transition: {
              delay: 100,
            },
          }"
        >
          <label class="font-bold">{{
            t('editor.aside.project.new.name')
          }}</label>
          <input v-model="name" class="shadow-xl bg-transparent p-1" />
        </div>
        <div
          v-motion
          class="flex flex-1 flex-col p-3"
          :initial="{
            opacity: 0,
          }"
          :enter="{
            opacity: 1,
            transition: {
              delay: 150,
            },
          }"
        >
          <label class="font-bold">{{
            t('editor.aside.project.new.creator')
          }}</label>
          <input v-model="creator" class="shadow-xl bg-transparent p-1" />
        </div>
      </div>
      <div class="flex flex-row flex-wrap justify-between w-full p-2">
        <div
          v-motion
          class="flex flex-1 flex-col p-3"
          :initial="{
            opacity: 0,
          }"
          :enter="{
            opacity: 1,
            transition: {
              delay: 200,
            },
          }"
        >
          <label class="font-bold">{{
            t('editor.aside.project.new.subject')
          }}</label>
          <input v-model="subject" class="shadow-xl bg-transparent p-1" />
        </div>
        <div
          v-motion
          class="flex flex-1 flex-col p-3"
          :initial="{
            opacity: 0,
          }"
          :enter="{
            opacity: 1,
            transition: {
              delay: 250,
            },
          }"
        >
          <label class="font-bold">{{
            t('editor.aside.project.new.version')
          }}</label>
          <input v-model="version" class="shadow-xl bg-transparent p-1" />
        </div>
      </div>
      <div
        v-motion
        class="flex flex-col px-5 py-2 shadow-xl"
        :initial="{
          opacity: 0,
        }"
        :enter="{
          opacity: 1,
          transition: {
            delay: 300,
          },
        }"
      >
        <label class="font-bold">{{
          t('editor.aside.project.new.type')
        }}</label>
        <div class="break-words w-full py-1">
          {{ typeDescription }}
        </div>
        <div
          v-motion
          class="flex flex-row flex-wrap items-center py-1 w-full"
          :initial="{
            opacity: 0,
          }"
          :enter="{
            opacity: 1,
            transition: {
              delay: 350,
            },
          }"
        >
          <AbsoluteProjectNewType
            :is="type"
            :title="t('editor.aside.project.new.types.blank.title')"
            @click="onTypeClick('blank')"
          />
          <AbsoluteProjectNewType
            :is="type"
            :title="t('editor.aside.project.new.types.creative.title')"
            @click="onTypeClick('creative')"
          />
        </div>
      </div>
      <button
        v-motion
        class="px-5 py-2 text-theme-text-1 bg-theme-background-2 mt-5"
        :initial="{
          opacity: 0,
        }"
        :enter="{
          opacity: 1,
          transition: {
            delay: 400,
          },
        }"
        @click.prevent.stop="onCreateProject"
      >
        {{ t('editor.aside.project.new.create') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useAbsoluteStore } from '@/store/absolute'
  import { useProject } from '@/use/project'
  import { ref } from 'vue'
  import { useI18n } from 'vue-i18n'

  const ABSOLUTE = useAbsoluteStore()
  const PROJECT = useProject()

  const { t } = useI18n()

  const name = ref(t('editor.aside.project.new.content.name'))
  const version = ref(t('editor.aside.project.new.content.version'))
  const creator = ref(t('editor.aside.project.new.content.creator'))
  const subject = ref(t('editor.aside.project.new.content.subject'))

  const type = ref(t('editor.aside.project.new.types.blank.title'))
  const typeDescription = ref(
    t('editor.aside.project.new.types.blank.description')
  )

  const onTypeClick = (define: string) => {
    type.value = t(`editor.aside.project.new.types.${define}.title`)
    typeDescription.value = t(
      `editor.aside.project.new.types.${define}.description`
    )
  }

  const onCreateProject = async () => {
    const _type =
      {
        Blank: 'blank',
        'Em Branco': 'blank',
        Creative: 'creative',
        Criativo: 'creative',
      }[type.value] || 'blank'

    PROJECT.create({
      name: name.value,
      version: version.value,
      creator: creator.value,
      subject: subject.value,
      type: _type,
    } as any)

    ABSOLUTE.project.new = false
  }
</script>
